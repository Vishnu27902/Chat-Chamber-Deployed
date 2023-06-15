const dateDOM = document.getElementById("date")
const timeDOM = document.getElementById("time")
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const hour = date.getHours()
const minute = date.getMinutes()
const planeNumberDOM = document.getElementById("flightnumber")

const serverData = async () => {
  const data = await axios.get("http://localhost:5000/home/adminlogin/session")
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
  if (timeDOM.value == null) {
    return false
  }
  let array = timeDOM.value.split(":")
  if (array.length == 3) {
    if (-1 < array[0] < 23 && -1 < array[1] < 60 && -1 < array[2] < 60)
      return true
  }
  return true
}

const validateFlightNumber = () => {
  const planeNumber = planeNumberDOM.value
  if (!isNaN(planeNumber)) {
    return true
  }
  return false
}

const appendBooking = (myBookings) => {
  if (document.getElementById("bookings").innerHTML == "No Bookings Available") {
    document.getElementById("bookings").innerHTML = ""
  }
  const bookingsDOM = document.getElementById("bookings")
  for (const i of myBookings) {
    const template = `<div class="flight-container">
    <div class="flight">
      <h3>Plane No :${i.flightnumber}</h3>
      <div class="points">
      <h5>First Name:${i.firstname}</h5>
      <h5>Last Name:${i.lastname}</h5>
      </div>
      <div class="points">
        <h5>Email:${i.email}</h5>
        <h5>Phone Number:${i.phnumber}</h5>
      </div>
      <div class="points">
      <h5>Boarding Point:${i.from}</h5>
      <h5>Destination Point:${i.to}</h5>
      </div>
      <div class="points">
      <h5>Timing :${i.timing}</h5>
      </div>
      </div>
      </div>`
    bookingsDOM.innerHTML += template
  }
}

const search = async () => {
  console.log(validateFlightNumber(), validateDate(), validateTime())
  if (validateFlightNumber() && validateTime() && validateDate()) {
    const inputData = { flightnumber: planeNumberDOM.value, timing: dateDOM.value + " " + timeDOM.value }
    const serverData = await axios.post("http://localhost:5000/home/adminlogin/bookings", inputData)
    const res = serverData.data
    if (res.success) {
      appendBooking(res.bookingData)
    } else {
      document.getElementById("bookings").innerHTML = "No Bookings Available"
    }
  } else {
    alert("Date and Time should be in the required Format, Plane Number should be am Integer,Past dates are not Allowed,Time should be in 24 hrs format")
  }
}

