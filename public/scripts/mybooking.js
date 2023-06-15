const sessionData = async () => {
  const data = await axios.get("http://localhost:5000/home/login/session")
  let res = data.data
  document.getElementById("user-info").innerHTML = res.firstname
  return res
}
const { firstname, lastname, email, phnumber } = sessionData()

const serverData = async () => {
  const data = await axios.get("http://localhost:5000/home/login/mybookings/getbookings")
  const res = data.data
  if (res.success) {
    appendBooking(res.bookingData, firstname, lastname, email, phnumber)
  } else {
    document.getElementById("bookings").innerHTML = "No Bookings Available"
  }
}

const appendBooking = (myBookings) => {
  if (document.getElementById("bookings").innerHTML == "No Bookings Available") {
    document.getElementById("bookings").innerHTML = ""
  }
  const bookingsDOM = document.getElementById("bookings")
  for (let i of myBookings) {
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

serverData()