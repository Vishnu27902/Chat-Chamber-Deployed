require("dotenv").config()
const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const socketIO = require("socket.io")
const io = socketIO(server)
const path = require("path")
const mongoose = require("mongoose")
const axios = require("axios")
const { PORT } = process.env
const { MONGO_ATLAS_URI } = process.env
const messageFormatter = require("./utils/messageFormatter")
const connectDB = require("./database/connectDB")
const Router = require("./routes/roomRoute")
let roomID,username;

connectDB(MONGO_ATLAS_URI)

const BOT = "Chat Chamber"

app.use(express.urlencoded({ extended: false }), express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "node_modules", "socket.io")))

io.on("connection", (socket) => {
    socket.on("sendUserData", (data) => {
        username=data.username
        socket.emit("dbUserData", { username: data.username, _id: socket.id })
        socket.emit("message", messageFormatter(BOT, `You joined the room`))
        socket.broadcast.to(roomID).emit("message", messageFormatter(BOT, `${data.username} joined the room`))
    })

    socket.on("sendRoomID", (data) => {
        roomID = data.roomID
        socket.join(roomID)
    })

    socket.on("chatMessage", (clientObject) => {
        socket.emit("chatMessageYou", messageFormatter("You", clientObject.message))
        socket.broadcast.to(roomID).emit("chatMessageOthers", messageFormatter(clientObject.username, clientObject.message))
    })

    socket.on("disconnect", async (message) => {
        const {username}=await axios.get(`https://chat-chamber-app.onrender.com/home/getusername?userID=${socket.id}&roomID=${roomID}`)
        io.to(roomID).emit("message", messageFormatter(BOT, `${username} left the room`));
        
        (async () => await axios.delete(`https://chat-chamber-app.onrender.com/home/removeuser?userID=${socket.id}&roomID=${roomID}`))()

    })
})

app.use("/home", Router)

app.use("*", errFunction)

function errFunction(req, res) {
    res.status(200).send("<h1>Error 404 : Resource Not Found</h1>")
}

mongoose.connection.on("open", () => {
    server.listen(PORT, () => {
        console.log(`Server Running At Port ${PORT}... http://localhost:${PORT}/home`)
    })
})
