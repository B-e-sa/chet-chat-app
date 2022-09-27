const mongoose = require('mongoose')

const userScheema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        min: 4,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    avatarImage: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model("Users", userScheema)