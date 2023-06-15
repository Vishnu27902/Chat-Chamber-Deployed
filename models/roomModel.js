const mongoose = require("mongoose")
const participantSchema = require("./participantSchema")
const Schema = mongoose.Schema

const roomSchema = new Schema({
    name: {
        type: String,
        required: [true, "Room Name must be Entered"]
    },
    participants: [participantSchema]
})

const roomModel = mongoose.model("room",roomSchema)

module.exports = roomModel