const socket = io()
const messageScreenDOM = document.querySelector("div.messagescreen")
const messageDOM = document.getElementById("message")
const submitDOM = document.getElementById("submit")
const usernameDOM = document.getElementById("username")
const roomnameDOM = document.getElementById("roomname")
const chatMenuDOM = document.getElementById("chatmenu")
let roomID;

async function passUserName(username) {
  socket.emit("sendUserData", { username })
}

async function passRoomID(roomID) {
  socket.emit("sendRoomID", { roomID })
}

async function getUsers() {
  let res = await axios.get(`http://localhost:5000/home/getusers?roomID=${roomID}`)
  res = res.data
  if (res.success) {
    userList(res.userList)
  } else {
    console.log(res.message)
  }
}

async function getRoomName() {
  const { username, room } = await Qs.parse(location.search, { ignoreQueryPrefix: true })
  roomID = room
  usernameDOM.innerHTML = username
  await passRoomID(room)
  await passUserName(username)
  await getUsers(room)
  let res = await axios.get(`http://localhost:5000/home/getroomname?roomID=${room}`)
  res = res.data
  if (res.success) {
    roomnameDOM.innerHTML = res.name
  }
}

getRoomName()

function onMessageEmit() {
  messageScreenDOM.scrollHeight = messageScreenDOM.scrollTop
}

socket.on("message", (serverObject) => {
  outputMessageFromBot(serverObject)
  chatMenuDOM.innerHTML = ""
  getUsers()
})

socket.on("chatMessageYou", (chatObject) => {
  // console.log(chatObject)
  outputMessageFromYou(chatObject)
})

socket.on("chatMessageOthers", (chatObject) => {
  outputMessageFromOtherUsers(chatObject)
})

socket.on("dbUserData", async (userData) => {
  userData.roomID = roomID
  let res = await axios.post("http://localhost:5000/home/adduser", userData)
  res = res.data
  if (res.success) {
    console.log('User Data Added To the Database Successfully')
  } else {
    console.log(res.message)
  }
})

submitDOM.addEventListener("click", (event) => {
  event.preventDefault()
  if(messageDOM.value.match(/\S/g))
  {
    const message = messageDOM.value
    socket.emit("chatMessage", { username: usernameDOM.innerText, message })
    console.log(message)
    messageDOM.value = ""
    messageDOM.focus()
    onMessageEmit()
  }
})

function outputMessageFromBot(serverObject) {
  const botMessageDOM = `<div class="messagemiddle">
    <p>
      <span class="username"><b>${serverObject.username}</b></span>&nbsp;&nbsp;
      <span class="time">${serverObject.time}</span>
      </p>
      <div class="chatmessage">
      ${serverObject.message}
      </div>
  </div>`
  messageScreenDOM.innerHTML += botMessageDOM
}

function outputMessageFromOtherUsers(serverObject) {
  const botMessageDOM = `<div class="messageleft">
    <p>
    <span class="username"><b>${serverObject.username}</b></span>&nbsp;&nbsp;
    <span class="time">${serverObject.time}</span>
    </p>
    <div class="chatmessage">
      ${serverObject.message}
    </div>
  </div>`
  messageScreenDOM.innerHTML += botMessageDOM
  const messageLeftDOM = document.getElementsByClassName(".messageleft")
  onMessageEmit(messageLeftDOM)
}

function outputMessageFromYou(serverObject) {
  const botMessageDOM = `<div class="messageright">
    <p>
      <span class="username"><b>${serverObject.username}</b></span>&nbsp;&nbsp;
      <span class="time">${serverObject.time}</span>
    </p>
    <div class="chatmessage">
      ${serverObject.message}
    </div>
  </div>`
  messageScreenDOM.innerHTML += botMessageDOM
}

function userList(users) {
  for (let name of users) {
    chatMenuDOM.innerHTML += `<div class="chatprofile"><p>${name}</p></div>`
  }
}