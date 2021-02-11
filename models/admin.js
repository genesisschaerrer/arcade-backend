const mongoose = require("mongoose")
// const {Schema} = mongoose

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("admin", adminSchema)