const mongoose = require("mongoose")
const { Schema } = mongoose

const gameSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    creator: {
        type: String
    }
})

module.exports = mongoose.model("game", gameSchema)

    // image: {
    //     type: Buffer
    // },
    // coverImageType: {
    //     type: String
    // },