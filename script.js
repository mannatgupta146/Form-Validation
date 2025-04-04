const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordCheck = document.getElementById("passwordCheck");
const successMsg = document.getElementById("successMsg");

// Real-time validation
[username, email, password, passwordCheck].forEach(input => {
    input.addEventListener("input", checkInputs);
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    checkInputs();

    if (document.querySelectorAll(".control-form.fail").length === 0) {
        successMsg.innerText = "🎉 Account created successfully!";
        successMsg.style.display = "block";
        form.reset();
        setTimeout(() => {
            successMsg.style.display = "none";
        }, 3000);
    } else {
        successMsg.style.display = "none";
    }
});

function checkInputs() {
    validateField(username, username.value.trim() === "", "Username cannot be empty");
    validateField(email, email.value.trim() === "", "Email cannot be empty", !isEmail(email.value.trim()), "Enter a valid email");
    validateField(password, password.value.trim() === "", "Password cannot be empty");
    validateField(passwordCheck, passwordCheck.value.trim() === "", "Please confirm your password", password.value.trim() !== passwordCheck.value.trim(), "Passwords do not match");
}

function validateField(input, emptyCond, emptyMsg, customCond = false, customMsg = "") {
    if (emptyCond) {
        setErrorFor(input, emptyMsg);
    } else if (customCond) {
        setErrorFor(input, customMsg);
    } else {
        setSuccessFor(input);
    }
}

function setErrorFor(input, message) {
    const controlForm = input.parentElement;
    const small = controlForm.querySelector("small");
    controlForm.className = "control-form fail";
    small.innerText = message;
}

function setSuccessFor(input) {
    const controlForm = input.parentElement;
    controlForm.className = "control-form success";
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
