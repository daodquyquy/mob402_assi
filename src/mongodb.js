const mongoose = require('mongoose')

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
    filename: {
        type: String,
        required: true
    },
    role:{
        type: String
    }

})

const collection = new mongoose.model("dangnhap", LogInSchema)

module.exports = collection