const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const handlers = require("./controller/itemHandlers");

const server = express();

server.use(cors());
server.use(bodyParser());

server.get("/", (req, res, next) => {
    res.send("hello world");
})

server.get("/items", handlers.getItems);
server.get("/item/:item_no", handlers.getItem);
server.post("/item", handlers.createItem);
server.put("/item", handlers.updateItem);
server.delete("/item/:item_no", handlers.deleteItem);

mongoose.connect("mongodb://127.0.0.1:27017/itemsdb")
.then((d) => {
    server.listen(8080, () => {console.log("Server listening at port: 8080")});
})
.catch((err) => {
    console.log("ERROR: " + err);
});