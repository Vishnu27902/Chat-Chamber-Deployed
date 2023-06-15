const createRoomDOM = document.getElementById("createRoom")
const activeLabelDOM = document.getElementById("activeLabel")
const activeInputDOM = document.getElementById("roomList")
const passiveDOM = document.getElementById("passive")
const submitDOM = document.getElementById("submit")
const userNameDOM = document.getElementById("userName")
const userNameInputDOM =document.getElementById("userNameInput")

activeLabelDOM.style.display = "none"
activeInputDOM.style.display = "none"
passiveDOM.style.display = "none"
submitDOM.style.display = "none"
userNameDOM.style.display = "none"
userNameInputDOM.style.display = "none"

createRoomDOM.addEventListener("click", (event) => {
    event.preventDefault()
    window.location.href = "/createRoom.html"
})

const getRoomNames = async () => {
    let res = await axios.get("https://chat-chamber-app.onrender.com/home/getrooms")
    res = res.data
    console.log(res)
    if (res.success) {
        for (let room of res.rooms) {
            activeInputDOM.innerHTML += `<option value="${room._id}">${room.name}</option>`
        }
        activeLabelDOM.style.display = "flex"
        activeInputDOM.style.display = "flex"
        submitDOM.style.display = "flex"
        userNameDOM.style.display = "flex"
        userNameInputDOM.style.display = "flex"
    } else {
        passiveDOM.style.display = "flex"
    }
}

getRoomNames()

// submitDOM.addEventListener("click", (event) => {
//     event.preventDefault()
//     if (userNameDOM.value) {
//         const userName = userNameDOM.value
//         const roomId = activeInputDOM.value
//         const data = { userName, roomId }
//         const res = (async () => {
//             return await axios.post("https://chat-chamber-app.onrender.com/home/adduser", { data }).data
//         })()
//     } else {
//         alert("User Name Should not be Empty!!")
//     }
// })