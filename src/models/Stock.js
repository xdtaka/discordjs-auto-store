const { Schema, model } =  require("mongoose");

const  stockSchema = new Schema({
    name: {
        type: String,
    },
    code: {
        type: String,
    },
    price: {
        type: Number,
    },
    stockList: {
        type: Array,
    },
    stockType: {
        type: Number,
    },
    stockStatus: {
        type: Boolean,
        default: true
    },
    role:{
        type: String,
        default: "0"
    }
})

module.exports = model("Stock", stockSchema)