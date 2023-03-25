const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1/assignment")
    .then(() => {
        console.log("mongodb connected")
    })
    .catch(() => {
        console.log("fail to connect")
    })

const NewPro = new mongoose.Schema({
    imgpro: {
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

const newpro = new mongoose.model("product", NewPro)

module.exports = newpro