const serverData = async () => {
    const data = await axios.get("http://localhost:5000/home/adminlogin/session")
    let res = data.data
    document.getElementById("firstname").innerHTML += res.firstname
    document.getElementById("lastname").innerHTML += res.lastname
    document.getElementById("phnumber").innerHTML += res.phnumber
    document.getElementById("email").innerHTML += res.email
    document.getElementById("user-info").innerHTML = res.firstname
}

serverData()