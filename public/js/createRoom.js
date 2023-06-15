const createRoomDOM = document.getElementById("submit")

createRoomDOM.addEventListener("click", async (event) => {
    event.preventDefault()
    const roomName = document.getElementById("roomName").value
    await axios.post("https://chat-chamber-app.onrender.com/home/createroom", { roomName: roomName }).then((data) => {
        let res = data.data
        if (res.success) {
            alert("Room Has been Created Successfully")
            setTimeout(() => {
                window.location.href = "/home.html"
            }, 3000)
        } else {
            alert("Room Not Created!!!")
        }
    })
})