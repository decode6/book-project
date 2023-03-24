const Items = require("../models/item")

const handlers = {
    getItems: async (req, res, next) => {
        let data = [];

        try{
            data = await Items.find();
            res.status(200).json(data);
        } catch(err) {
            res.status(500).json({
                error: err
            });
        }
    },
    getItem: async (req, res, next) => {
        try{
            await Items.findOne({item_no: req.params.item_no})
            .then((item) => {
                if(item !== null)
                    res.json(item);
                else
                    res.json({
                        "message": "No item found with item number: " + req.params.item_no
                    });
            });
        } catch (err) {
            res.status(500).json({
                error: err
            });
        }
    },
    createItem: async (req, res, next) => {
        await Items.create(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            if(err.errors)
                res.json({
                    error: ""
                });
            else
                res.json({
                    error: "Item number must be unique"
                });
        })
    },
    deleteItem: async (req, res, next) => {
        try{
            await Items.findOne({item_no: req.params.item_no})
            .then((item) => {
                if(item !== null)
                    Items.deleteOne({item_no: req.params.item_no})
                    .then(async (data) => {
                        let items = [];
                        items = await Items.find();
                        
                        res.json(items);
                    });
                else
                    res.json({
                        "message": "No item found with item number: " + req.params.item_no
                    });
            });
        } catch(err) {
            res.status(500).json({
                error: err
            });
        }
    },
    updateItem: async (req, res, next) => {
        try{
            await Items.findOne({item_no: req.body.item_no})
            .then((item) => {
                if(item !== null)
                    Items.updateOne({item_no: req.body.item_no}, req.body)
                    .then((data) => {
                        res.json({
                            message: "Edited the item with item number: " + req.body.item_no + " successfully"
                        });
                    });
                else
                    res.json({
                        "message": "No item found with item number: " + req.params.item_no
                    });
            });
        } catch(err) {
            res.status(500).json({
                error: err
            });
        }
    }
}

module.exports = handlers;