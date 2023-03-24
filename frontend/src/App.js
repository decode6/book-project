import './App.css';
import { Button, createTheme, Dialog, DialogActions, DialogContent, DialogTitle, Grid, OutlinedInput, Table, TableBody, TableCell, TableHead, TableRow, ThemeProvider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#BE6B2C"
      },
      secondary: {
        main: "#ffffff"
      },
      info: {
        main: "#444444"
      }
    }
  });

  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const [item, setItem] = useState(null);

  //for create
  const [item_no, setItem_no] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:8080/items")
    .then((res) => {
      setItems(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  const handleCreate = () => {
    setItem(null);
    setCreate(true);
  }

  const createCloseHandler = () => {
    setCreate(false);
  }

  const handleEdit = (e) => {
    setItem(e);
    setEdit(true);
  }

  const handleDelete = (item_no) => {
    console.log(item_no)
    axios.delete("http://localhost:8080/item/"+item_no)
    .then((res) => {
      setItems(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const editCloseHandler = () => {
    setEdit(false);
  }

  const handleEditSubmit = () => {
    axios.put("http://localhost:8080/item", item)
    .then((res) => {
      axios.get("http://localhost:8080/items")
      .then((res) => {
        setItems(res.data);
        editCloseHandler();
      })
      .catch((err) => {
        console.log(err);
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  const handleCreateSubmit = () => {
    console.log(item);
    axios.post("http://localhost:8080/item", {
      item_no: item_no,
      name: name,
      price: price,
      quantity: quantity
    })
    .then((res) => {
      axios.get("http://localhost:8080/items")
      .then((res) => {
        setItems(res.data);
        createCloseHandler();
      })
      .catch((err) => {
        console.log(err);
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Grid container>
          <Grid item alignItems="center" className='width'>
            <Typography variant="h4" style={{margin: "1em", fontWeight: "bold"}} color="primary">INVENTORY MANAGEMENT SYSTEM</Typography>
          </Grid>
          <Grid item className='width' alignItems="center">
            <Button variant='outlined' color='primary' style={{backgroundColor: "white"}} onClick={handleCreate}>CREATE</Button>
          </Grid>
          <Grid item className='width' style={{padding: "3em"}} alignItems="center">
            <Table style={{backgroundColor: "white", borderRadius: "8 px"}}>
              <TableHead>
                <TableRow>
                  <TableCell style={{fontWeight: "bold"}}>Item No</TableCell>
                  <TableCell style={{fontWeight: "bold"}}>Name</TableCell>
                  <TableCell style={{fontWeight: "bold"}}>Price</TableCell>
                  <TableCell style={{fontWeight: "bold"}}>Quantity</TableCell>
                  <TableCell style={{fontWeight: "bold"}}>Edit</TableCell>
                  <TableCell style={{fontWeight: "bold"}}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  items.map((e) => (
                    <TableRow>
                      <TableCell>{e.item_no}</TableCell>
                      <TableCell>{e.name}</TableCell>
                      <TableCell>{e.price}</TableCell>
                      <TableCell>{e.quantity}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEdit(e)}
                        >
                          EDIT
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button variant="contained" color="error" onClick={() => handleDelete(e.item_no)}>
                          DELETE
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </Grid>
        </Grid>
        <Dialog
          open={edit}
          onClose={editCloseHandler}
        >
          <DialogTitle>Edit Item</DialogTitle>
          <DialogContent style={{width: "300px"}}>
            {
              (item !== null)?
              <Grid container spacing="10px">
                  <Grid item xs="12">
                    <OutlinedInput fullWidth type="text" placeholder="Item Number" value={item.item_no} onChange={(e) => {
                      setItem({
                        item_no: e.target.value,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity
                      });
                    }}></OutlinedInput>
                  </Grid>
                  <Grid item xs="12">
                    <OutlinedInput fullWidth type="text" placeholder="Name" value={item.name} onChange={(e) => {
                      setItem({
                        item_no: item.item_no,
                        name: e.target.value,
                        price: item.price,
                        quantity: item.quantity
                      });
                    }}></OutlinedInput>
                  </Grid>
                  <Grid item xs="12">
                    <OutlinedInput fullWidth type="number" placeholder="Price" value={item.price} onChange={(e) => {
                      setItem({
                        item_no: item.item_no,
                        name: item.name,
                        price: e.target.value,
                        quantity: item.quantity
                      });
                    }}></OutlinedInput>
                  </Grid>
                  <Grid item xs="12">
                    <OutlinedInput fullWidth type="number" placeholder="quantity" value={item.quantity} onChange={(e) => {
                      setItem({
                        item_no: item.item_no,
                        name: item.name,
                        price: item.price,
                        quantity: e.target.value
                      });
                    }}></OutlinedInput>
                  </Grid>
              </Grid>
              :
              <></>
            }
          </DialogContent>
          <DialogActions style={{paddingRight: "1.6em", marginBottom: "1em"}}>
            <Button variant='contained' color='primary' onClick={handleEditSubmit}>EDIT</Button>
            <Button variant='outlined' color='info' onClick={editCloseHandler}>CANCEL</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={create}
          onClose={createCloseHandler}
        >
          <DialogTitle>Add Item</DialogTitle>
          <DialogContent style={{width: "300px"}}>
            <Grid container spacing="10px">
                <Grid item xs="12">
                  <OutlinedInput fullWidth type="text" placeholder="Item Number" onChange={(e) => {
                    setItem_no(e.target.value);
                  }}></OutlinedInput>
                </Grid>
                <Grid item xs="12">
                  <OutlinedInput fullWidth type="text" placeholder="Name" onChange={(e) => {
                    setName(e.target.value);
                  }}></OutlinedInput>
                </Grid>
                <Grid item xs="12">
                  <OutlinedInput fullWidth type="number" placeholder="Price" onChange={(e) => {
                    setPrice(e.target.value);
                  }}></OutlinedInput>
                </Grid>
                <Grid item xs="12">
                  <OutlinedInput fullWidth type="number" placeholder="quantity" onChange={(e) => {
                    setQuantity(e.target.value);
                  }}></OutlinedInput>
                </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{paddingRight: "1.6em", marginBottom: "1em"}}>
            <Button variant='contained' color='primary' onClick={handleCreateSubmit}>ADD</Button>
            <Button variant='outlined' color='info' onClick={createCloseHandler}>CANCEL</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}

export default App;
