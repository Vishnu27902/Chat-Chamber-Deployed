const mongoose = require("mongoose")
const Schema = mongoose.Schema

const participantSchema = new Schema({
    _id: {
        type: String,
        required: [true, "Participant ID Must be Entered"]
    },
    name: {
        type: String,
        required: [true, "Name Must be Entered"]
    }
})

module.exports = participantSchema