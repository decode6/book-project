const { Schema, default: mongoose } = require("mongoose");

const Item = new Schema({
    item_no: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true}
});

module.exports = mongoose.model("item", Item);