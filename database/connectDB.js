const mongoose = require("mongoose")

async function connectDB(connectionString) {
    await mongoose.connect(connectionString).then(() => {
        console.log("Connection Established")
    })
}

module.exports = connectDB