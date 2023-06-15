const dateDOM = document.getElementById("date")
const timeDOM = document.getElementById("time")
let boardingPoint = document.getElementById("boardingpoint")
let destinationPoint = document.getElementById("destinationpoint")
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const hour = date.getHours()
const minute = date.getMinutes()

const serverData = async () => {
    const data = await axios.get("http://localhost:5000/home/login/session")
    let res = data.data
    document.getElementById("user-info").innerHTML = res.firstname
}
serverData()

const validateDate = () => {
    let array = dateDOM.value.split("/")
    console.log(array)
    if (array[0] >= year) {
        if (array[1] > month) {
            return true
        } else if (array[1] == month) {
            if (array[2] >= day)
                return true
        }
    }
    return false
}

const validateTime = () => {
    let array = timeDOM.value.split(":")
    if (array == null) {
        return "false"
    }
    if (array.length == 3) {
        if (-1 < array[0] < 23 && -1 < array[1] < 60 && -1 < array[2] < 60)
            return "true"
    }
    return "false"
}

const appendData = (flightData) => {
    if (document.getElementById("flights").innerHTML == "No Fights Available") {
        document.getElementById("flights").innerHTML = ""
    }
    console.log(flightData)
    for (let i of flightData) {
        const { _id, from, to, timing } = i
        const template = `<div class="flight-container">
          <div class="flight">
            <h3>Plane No :${_id}</h3>
            <div class="points">
              <h5>Boarding Point:${from}</h5>
              <h5>Destination Point:${to}</h5>
            </div>
            <div class="points">
              <h5>Timing: ${timing}</h5>
            </div>
          </div>
          <button class="flight-button" onclick="book(${_id})">Book</button>
        </div>`
        document.getElementById("flights").innerHTML += template
    }
}

const search = async () => {
    if (validateDate() && validateTime()) {
        boardingPoint = boardingPoint.value
        destinationPoint = destinationPoint.value
        const inputDate = { timing: dateDOM.value + " " + timeDOM.value, boardingPoint, destinationPoint }
        const res = await axios.post("http://localhost:5000/home/login/searchflights", inputDate)
        const { success } = res.data
        if (success) {
            appendData(res.data.flightData)
        } else {
            document.getElementById("flights").innerHTML = "No Fights Available"
        }
    } else {
        alert("Must Enter a Valid Date and Time For Filtering the Flights..Date shouldn't be past..Time show be 24 hours format")
    }
}

const book = async (flightnumber) => {
    const serverData = await axios.post(`http://localhost:5000/home/login/searchflights/${flightnumber}`)
    let { success } = serverData.data
    if (success) {
        alert("Ticket Booked")
    } else {
        alert("Error Occured")
    }
}
