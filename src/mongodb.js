const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1/assignment")
    .then(() => {
        console.log("mongodb connected")
    })
    .catch(() => {
        console.log("fail to connect")
    })

const LogInSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avata: {
        type: String,
        required: true
    }

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

const collection = new mongoose.model("dangnhap", LogInSchema)

module.exports = collection