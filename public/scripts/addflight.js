const dateObj = new Date();
const day = dateObj.getDate();
const month = dateObj.getMonth() + 1;
const year = dateObj.getFullYear();
const hour = dateObj.getHours()
const minute = dateObj.getMinutes()

const getSessionData = async () => {
    console.log("Hello")
    const res = await axios.get("http://localhost:5000/home/adminlogin/session")
    document.getElementById("user-info").innerHTML = res.data.firstname
}
getSessionData()

const showStatus = (status) => {
    if (status) {
        reset()
        document.getElementById("status").innerHTML = "Flight Added Successfully"
        document.getElementById("status").classList.add("valide")
        document.getElementById("flightnumberstatus").innerHTML = ""
        document.getElementById("fromstatus").innerHTML = ""
        document.getElementById("tostatus").innerHTML = ""
        document.getElementById("timestatus").innerHTML = ""
        document.getElementById("datestatus").innerHTML = ""
        document.getElementById("status").classList.remove("invalide")
        setTimeout(() => {
            document.getElementById("status").innerHTML = ""
        }, 3000)
    } else {
        document.getElementById("status").innerHTML = "Flight Number Already Exists"
        document.getElementById("status").classList.add("invalide")
        document.getElementById("status").classList.remove("valide")
        setTimeout(() => {
            document.getElementById("status").innerHTML = ""
        }, 3000)
    }
}

const reset = () => {
    document.getElementById("flightnumber").value = ""
    document.getElementById("to").value = ""
    document.getElementById("from").value = ""
    document.getElementById("date").value = ""
    document.getElementById("time").value = ""
}

const from = document.getElementById("from")
const to = document.getElementById("to")
const time = document.getElementById("time")
const date = document.getElementById("date")
const flightnumber = document.getElementById("flightnumber")

const validateFrom = () => {
    if (from.value.length > 2 && from.value.length < 17) {
        document.getElementById("fromstatus").innerHTML = "Valide From Location"
        document.getElementById("fromstatus").classList.remove("invalide")
        document.getElementById("fromstatus").classList.add("valide")
        return true
    } else {
        document.getElementById("fromstatus").innerHTML = "2 < length < 17"
        document.getElementById("fromstatus").classList.remove("Valide")
        document.getElementById("fromstatus").classList.add("Invalide")
        return false
    }
}

const validateTo = () => {
    if (to.value.length > 2 && to.value.length < 17) {
        document.getElementById("tostatus").innerHTML = "Valide To Location"
        document.getElementById("tostatus").classList.remove("invalide")
        document.getElementById("tostatus").classList.add("valide")
        return true
    } else {
        document.getElementById("tostatus").innerHTML = "2 < length < 17"
        document.getElementById("tostatus").classList.remove("valide")
        document.getElementById("tostatus").classList.add("invalide")
        return false
    }
}


const validateDate = () => {
    let array = date.value.split("/")
    console.log(array)
    if (array[0] >= year) {
        if (array[1] > month) {
            document.getElementById("datestatus").innerHTML = "Valide Date"
            document.getElementById("datestatus").classList.remove("invalide")
            document.getElementById("datestatus").classList.add("valide")
            return true
        } else if (array[1] == month) {
            if (array[2] >= day)
                document.getElementById("datestatus").innerHTML = "Valide Date"
            document.getElementById("datestatus").classList.remove("invalide")
            document.getElementById("datestatus").classList.add("valide")
            return true
        }
    }
    document.getElementById("datestatus").innerHTML = "Invalide Date"
    document.getElementById("datestatus").classList.remove("valide")
    document.getElementById("datestatus").classList.add("invalide")
    return false
}

const validateTime = () => {
    if (time.value == null) {
        document.getElementById("timestatus").innerHTML = "Invalide Time"
        document.getElementById("timestatus").classList.remove("valide")
        document.getElementById("timestatus").classList.add("invalide")
        return false
    }
    let array = time.value.split(":")
    if (array.length == 3) {
        if (-1 < array[0] < 23 && -1 < array[1] < 60 && -1 < array[2] < 60) {
            document.getElementById("timestatus").innerHTML = "Valide Time"
            document.getElementById("timestatus").classList.remove("invalide")
            document.getElementById("timestatus").classList.add("valide")
            return true
        }
    }
    document.getElementById("timestatus").innerHTML = "Invalide Time"
    document.getElementById("timestatus").classList.remove("valide")
    document.getElementById("timestatus").classList.add("invalide")
    return false
}

const validateFlightNumber = () => {
    const planeNumber = flightnumber.value
    if (planeNumber == "") {
        document.getElementById("flightnumberstatus").innerHTML = "Invalide Flight Number"
        document.getElementById("flightnumberstatus").classList.remove("valide")
        document.getElementById("flightnumberstatus").classList.add("invalide")
        return false
    }
    if (!isNaN(planeNumber)) {
        document.getElementById("flightnumberstatus").innerHTML = "Valide Flight Number"
        document.getElementById("flightnumberstatus").classList.remove("invalide")
        document.getElementById("flightnumberstatus").classList.add("valide")
        return true
    }
    document.getElementById("flightnumberstatus").innerHTML = "Invalide Flight Number"
    document.getElementById("flightnumberstatus").classList.remove("valide")
    document.getElementById("flightnumberstatus").classList.add("invalide")
    return false
}

flightnumber.addEventListener("focusout", validateFlightNumber)
from.addEventListener("focusout", validateFrom)
to.addEventListener("focusout", validateTo)
time.addEventListener("focusout", validateTime)
date.addEventListener("focusout", validateDate)

const add = async () => {
    if (validateFlightNumber() && validateFrom() && validateTo() && validateTime() && validateDate()) {
        const inputData = { flightnumber: flightnumber.value, from: from.value, to: to.value, timing: date.value + " " + time.value }
        await axios.post("http://localhost:5000/home/adminlogin/addflight", inputData).then((res) => {
            const { success } = res.data
            showStatus(success)
        })
    }
    else {
        document.getElementById("status").innerHTML = "Enter Validate Input"
        document.getElementById("status").classList.add("invalide")
        document.getElementById("status").classList.remove("valide")
    }
}

add.addEventListener("click", addflight)