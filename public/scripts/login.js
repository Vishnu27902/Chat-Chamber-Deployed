var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var div1 = document.getElementById("div1");
var div2 = document.getElementById("div2");
button1.addEventListener("click", function () {
    resetAdminLogin()
    div1.classList.add("active");
    div2.classList.remove("active");
    button1.classList.add("active_button");
    button2.classList.remove("active_button");
});
button2.addEventListener("click", function () {
    resetLogin()
    div1.classList.remove("active");
    div2.classList.add("active");
    button1.classList.remove("active_button");
    button2.classList.add("active_button");
});

function togglePasswordVisibility() {
    var password = document.getElementById("password");
    var showPasswordCheckbox = document.getElementById("showPasswordCheckbox");
    password.type = showPasswordCheckbox.checked ? "text" : "password";
}

function toggleAdminPasswordVisibility() {
    var password = document.getElementById("adminpassword");
    var showPasswordCheckbox = document.getElementById("showAdminPasswordCheckbox");
    password.type = showPasswordCheckbox.checked ? "text" : "password";
}

const login = async () => {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const inputData = { email: email, password: password }
    await axios.post("http://localhost:5000/home/login", inputData).then(async (res) => {
        const { success } = res.data
        if (success) {
            window.location.href = "/home/login/dashboard"
            // const res = await axios.get("http://localhost:5000/home/login/dashboard")
            // console.log(res)
            return
        }
        showStatus()
        resetLogin()
    })
}


const adminLogin = async () => {
    const email = document.getElementById("adminemail").value
    const password = document.getElementById("adminpassword").value
    const inputData = { email: email, password: password, role: "admin" }
    await axios.post("http://localhost:5000/home/adminlogin", inputData).then((res) => {
        const { success } = res.data
        if (success) {
            window.location.href = "/home/adminlogin/admindashboard"
            return
            // axios.get("http://localhost:5000/home/adminlogin/dashboard")
            // return
        }
        showAdminStatus()
        resetAdminLogin()
    })
}

function resetLogin() {
    document.getElementById("email").value = ""
    document.getElementById("password").value = ""
}

function resetAdminLogin() {
    document.getElementById("adminemail").value = ""
    document.getElementById("adminpassword").value = ""
}

function showAdminStatus() {
    document.getElementById("adminstatus").innerHTML = "Invalid Admin ID or Password"
    document.getElementById("adminstatus").classList.add("invalide")
    setTimeout(() => {
        document.getElementById("adminstatus").innerHTML = ""
    }, 3000)
}

function showStatus() {
    document.getElementById("status").innerHTML = "Invalid User ID or Password"
    document.getElementById("status").classList.add("invalide")
    setTimeout(() => {
        document.getElementById("status").innerHTML = ""
    }, 3000)
}