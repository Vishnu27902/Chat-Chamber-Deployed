function togglePasswordVisibility() {
    var password = document.getElementById("password");
    var confirmPassword = document.getElementById("confirmpassword");
    var showPasswordCheckbox = document.getElementById("showPasswordCheckbox");
    password.type = showPasswordCheckbox.checked ? "text" : "password";
    confirmPassword.type = showPasswordCheckbox.checked ? "text" : "password";
}

const validationError = () => {
    document.getElementById("status").innerHTML = "Enter Validate Data"
    document.getElementById("status").classList.add("invalide")
    document.getElementById("status").classList.remove("valide")
}

const showStatus = (status) => {
    if (status) {
        document.getElementById("status").innerHTML = "New User Added Successfully"
        document.getElementById("status").classList.add("valide")
        document.getElementById("status").classList.remove("invalide")
        setTimeout(() => {
            document.getElementById("status").innerHTML = ""
        }, 3000)
    } else {
        document.getElementById("status").innerHTML = "Email ID already exists"
        document.getElementById("status").classList.add("invalide")
        document.getElementById("status").classList.remove("valide")
        setTimeout(() => {
            document.getElementById("status").innerHTML = ""
        }, 3000)
    }
}

const reset = () => {
    document.getElementById("firstname").value = ""
    document.getElementById("firstnameStatus").innerHTML = ""
    document.getElementById("lastname").value = ""
    document.getElementById("lastnameStatus").innerHTML = ""
    document.getElementById("phnumber").value = ""
    document.getElementById("phnumberStatus").innerHTML = ""
    document.getElementById("email").value = ""
    document.getElementById("emailStatus").innerHTML = ""
    document.getElementById("password").value = ""
    document.getElementById("passwordStatus").innerHTML = ""
    document.getElementById("confirmpassword").value = ""
    document.getElementById("confirmpasswordStatus").innerHTML = ""
}

const firstnameDOM = document.getElementById("firstname")
const lastnameDOM = document.getElementById("lastname")
const phnumberDOM = document.getElementById("phnumber")
const emailDOM = document.getElementById("email")
const passwordDOM = document.getElementById("password")
const confirmPasswordDOM = document.getElementById("confirmpassword")

const validateFirstName = (event) => {
    if (firstnameDOM.value.length > 4 && firstnameDOM.value.length < 17) {
        document.getElementById("firstnameStatus").innerHTML = "Valide First Name"
        document.getElementById("firstnameStatus").classList.remove("invalide")
        document.getElementById("firstnameStatus").classList.add("valide")
        return true
    } else {
        document.getElementById("firstnameStatus").innerHTML = "4 < Name < 17"
        document.getElementById("firstnameStatus").classList.remove("valide")
        document.getElementById("firstnameStatus").classList.add("invalide")
        return false
    }
}

const validateLastName = (event) => {
    if (lastnameDOM.value.length > 4 && lastnameDOM.value.length < 17) {
        document.getElementById("lastnameStatus").innerHTML = "Valide Last Name"
        document.getElementById("lastnameStatus").classList.remove("invalide")
        document.getElementById("lastnameStatus").classList.add("valide")
        return true
    } else {
        document.getElementById("lastnameStatus").innerHTML = "4 < Name < 17"
        document.getElementById("lastnameStatus").classList.remove("valide")
        document.getElementById("lastnameStatus").classList.add("invalide")
        return false
    }
}

const validateEmail = (event) => {
    const mailFormat = /\S+@\S+\.\S+/;
    if (emailDOM.value.match(mailFormat)) {
        document.getElementById("emailStatus").innerHTML = "Valide Email"
        document.getElementById("emailStatus").classList.add("valide")
        document.getElementById("emailStatus").classList.remove("invalide")
        return true;
    } else {
        document.getElementById("emailStatus").innerHTML = "Invalide Email"
        document.getElementById("emailStatus").classList.add("invalide")
        document.getElementById("emailStatus").classList.remove("valide")
        return false;
    }
}

const validatePhnumber = (event) => {
    const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    const flag = re.test(phnumberDOM.value)
    if (flag) {
        document.getElementById("phnumberStatus").innerHTML = "Valide Phone Number"
        document.getElementById("phnumberStatus").classList.add("valide")
        document.getElementById("phnumberStatus").classList.remove("invalide")
    } else {
        document.getElementById("phnumberStatus").innerHTML = "Must Contain 10 Numbers"
        document.getElementById("phnumberStatus").classList.add("invalide")
        document.getElementById("phnumberStatus").classList.remove("valide")
    }
    return flag
}

const validatePassword = (event) => {
    var passw = /^[A-Za-z]\w{7,14}$/;
    const flag = passwordDOM.value.match(passw)
    if (flag) {
        document.getElementById("passwordStatus").innerHTML = "Valide Password"
        document.getElementById("passwordStatus").classList.add("valide")
        document.getElementById("passwordStatus").classList.remove("invalide")
    } else {
        document.getElementById("passwordStatus").innerHTML = "Password Must Contain A-Z,a-z,0-9"
        document.getElementById("passwordStatus").classList.add("invalide")
        document.getElementById("passwordStatus").classList.remove("valide")
    }
    return flag
}

const validateConfirmPassword = (event) => {
    if ((passwordDOM.value == confirmPasswordDOM.value) && validatePassword()) {
        document.getElementById("confirmpasswordStatus").innerHTML = "Valide Password"
        document.getElementById("confirmpasswordStatus").classList.add("valide")
        document.getElementById("confirmpasswordStatus").classList.remove("invalide")
        return true
    } else {
        document.getElementById("confirmpasswordStatus").innerHTML = "Password must be strong and match the password"
        document.getElementById("confirmpasswordStatus").classList.add("invalide")
        document.getElementById("confirmpasswordStatus").classList.remove("valide")
        return false
    }
}

firstnameDOM.addEventListener("focusout", validateFirstName)
lastnameDOM.addEventListener("focusout", validateLastName)
phnumberDOM.addEventListener("focusout", validatePhnumber)
emailDOM.addEventListener("focusout", validateEmail)
passwordDOM.addEventListener("focusout", validatePassword)
confirmPasswordDOM.addEventListener("focusout", validateConfirmPassword)

const register = async () => {
    if (validateFirstName() && validateConfirmPassword() && validatePassword() && validateEmail() && validatePhnumber() && validateLastName()) {
        const firstname = document.getElementById("firstname").value
        const lastname = document.getElementById("lastname").value
        const phnumber = document.getElementById("phnumber").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const inputData = { firstname: firstname, lastname: lastname, phnumber: phnumber, email: email, password: password }
        await axios.post("http://localhost:5000/home/registration", inputData).then((data) => {
            const { success } = data.data
            if (success) {
                showStatus(success)
                reset()
                return
            }
            showStatus(success)
        })
    } else {
        validationError()
    }
}