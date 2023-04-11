const mongoose = require('mongoose')

const NewProChema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    namepro: {
        type: String,
        required: true
    },
    pricepro: {
        type: String,
        required: true
    }

})

const newpro = new mongoose.model("product", NewProChema)

module.exports = newpro