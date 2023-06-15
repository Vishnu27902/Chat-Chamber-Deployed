const serverData = async () => {
  const data = await axios.get("http://localhost:5000/home/adminlogin/session")
  let res = data.data
  document.getElementById("user-info").innerHTML = res.firstname
}

serverData()

const appendFlights = (flightsData) => {
  if (document.getElementById("flights").innerHTML == "No Flights Found") {
    document.getElementById("flights").innerHTML = ""
  }
  for (let i of flightsData) {
    const template = `
    <div class="flight-container">
    <div class="flight">
    <h3>Plane Number : ${i._id}</h3>
    <div class="points">
    <h5>Boarding Point: ${i.from}</h5>
    <h5>Destination Point: ${i.to}</h5>
    </div>
    <div class="points">
    <h5>Timing: ${i.timing}</h5>
    </div>
    <button class="flight-button" onclick="deleteFlight(${i._id})">Delete</button>
    </div>
    </div>`
    document.getElementById("flights").innerHTML += template
  }
}

const deleteFlight = async (flightnumber) => {
  const res = await axios.delete(`http://localhost:5000/home/adminlogin/flights/getflights/${flightnumber}`)
  window.location.href = "/home/adminlogin/flights"
}

const flights = async () => {
  const data = await axios.get("http://localhost:5000/home/adminlogin/flights/getflights")
  const res = data.data
  if (res.success) {
    appendFlights(res.flightData)
  } else {
    document.getElementById("flights").innerHTML = "No Flights Found"
  }
}

flights()