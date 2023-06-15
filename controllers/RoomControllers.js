const path = require("path")
const roomModel = require("../models/roomModel")
const public = path.join(__dirname, "..", "public")

const getHomePage = (req, res) => {
    res.status(200).sendFile(path.join(public, "home.html"))
}
const createRoom = async (req, res) => {
    const { roomName: name } = req.body
    await roomModel.create({ name: name }).then(() => {
        console.log("Room Created Successfully")
        res.status(200).json({ success: true, message: "Room Created Successfully" })
    }).catch((err) => {
        console.log(err.message)
        res.status(200).json({ success: false, message: `Error Occurred : ${err.message}` })
    })
}

const getRooms = async (req, res) => {
    const rooms = await roomModel.find({}, { name: true }).exec()
    if (rooms.length == 0) {
        console.log("No Rooms Found")
        res.status(200).json({ success: false, message: "No Rooms Found" })
        return
    }
    console.log("Rooms Found Successfully")
    res.status(200).json({ success: true, message: "Rooms Found Successfully", rooms })
}

const getRoomName = async (req, res) => {
    const { roomID } = req.query
    const { name } = await roomModel.findOne({ _id: roomID }).exec()
    res.status(200).json({ success: true, message: "Name Fetched Successfully", name })
}

const addUser = async (req, res) => {
    const { username, _id, roomID } = req.body
    await roomModel.updateOne({ _id: roomID }, { $push: { participants: { _id: _id, name: username } } }).then(() => {
        console.log("User Data Added Successfully")
        res.status(200).json({ success: true, message: "User Data Added Successfully" })
    }).catch((err) => {
        console.log(err.message)
        res.status(200).json({ success: false, message: `Error Occurred : ${err.message}` })
    })
}

const getUsers = async (req, res) => {
    const { roomID } = req.query
    let users = await roomModel.findOne({ _id: roomID }, { participants: 1 })
    users = users.participants
    let userList = []
    for (let user of users) {
        userList.push(user.name)
    }
    res.status(200).json({ success: true, message: "User List Fetched Effectively", userList })
}

const removeUser = async (req, res) => {
    const { roomID, userID } = req.query
    await roomModel.updateOne({ _id: roomID }, { $pull: { participants: { _id: userID } } }).then(() => {
        console.log("User Removed Successfully")
        res.status(200).json({ success: true, message: "User Removed Successfully" })
    }).catch((err) => {
        console.log(err.message)
        res.status(200).json({ success: false, message: `Error Occurred : ${err.message}` })
    })
}

const getUserName = async (req, res) => {
    const { roomID, userID } = req.query
    const data = await roomModel.findOne({ _id: roomID, "participants._id": userID }).exec()
    let username;
    for(i of data.participants){
        if(i._id==userID){
            username=i.name
            break
        }
    }
    res.status(200).json({ success: true, message: "User Name Fetched Successfully", username })
}

module.exports = { createRoom, getHomePage, getRooms, getRoomName, addUser, getUsers, removeUser, getUserName }
