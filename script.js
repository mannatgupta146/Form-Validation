const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordCheck = document.getElementById("passwordCheck");
const successMsg = document.getElementById("successMsg");
const strengthMeter = document.getElementById("strength");

[username, email, password, passwordCheck].forEach(input => {
    input.addEventListener("input", checkInputs);
});

password.addEventListener("input", () => {
    showStrength(password.value);
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    checkInputs();

    if (document.querySelectorAll(".control-form.fail").length === 0) {
        successMsg.innerText = "🎉 Account created successfully!";
        successMsg.style.display = "block";
        form.reset();
        strengthMeter.removeAttribute("data-strength");

        setTimeout(() => {
            successMsg.style.display = "none";
        }, 3000);
    } else {
        successMsg.style.display = "none";
    }
});

function checkInputs() {
    validateField(username, username.value.trim() === "", "Username is required");
    validateField(email, email.value.trim() === "", "Email is required", !isEmail(email.value.trim()), "Invalid email");
    validateField(password, password.value.trim() === "", "Password is required");
    validateField(passwordCheck, passwordCheck.value.trim() === "", "Please confirm password", password.value !== passwordCheck.value, "Passwords do not match");
}

function validateField(input, emptyCond, emptyMsg, customCond = false, customMsg = "") {
    const formControl = input.closest(".control-form");
    const small = formControl.querySelector("small");

    if (emptyCond) {
        formControl.className = "control-form fail";
        small.innerText = emptyMsg;
    } else if (customCond) {
        formControl.className = "control-form fail";
        small.innerText = customMsg;
    } else {
        formControl.className = "control-form success";
        small.innerText = "";
    }
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function toggleVisibility(id) {
    const field = document.getElementById(id);
    field.type = field.type === "password" ? "text" : "password";
}

function showStrength(pwd) {
    const strength = getStrength(pwd);
    strengthMeter.setAttribute("data-strength", strength);
}

function getStrength(password) {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[\W]/.test(password)) strength++;
    return strength;
}
