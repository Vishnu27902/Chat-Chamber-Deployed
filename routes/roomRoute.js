const express = require("express")
const { getHomePage, createRoom, getRooms, getRoomName, addUser, getUsers, removeUser, getUserName } = require("../controllers/RoomControllers")
const Router = express.Router()

Router.route("/").get(getHomePage)

Router.route("/createroom").post(createRoom)

Router.route("/getrooms").get(getRooms)

Router.route("/getroomname").get(getRoomName)

Router.route("/adduser").post(addUser)

Router.route("/getusers").get(getUsers)

Router.route("/removeuser").delete(removeUser)

Router.route("/getusername").get(getUserName)

module.exports = Router  
