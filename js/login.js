const loginForm = document.getElementById("loginForm");

const adminButton = document.getElementById("adminButton");

const formTitle = document.getElementById("formTitle");

const formSubtitle = document.getElementById("formSubtitle");

const loginButton = document.getElementById("loginButton");

const signupLink = document.getElementById("signupLink");

const message = document.getElementById("message");

let loginMode = "user";

// Switch between User and Admin login
adminButton.addEventListener("click", function () {

    if (loginMode === "user") {

        loginMode = "admin";

        formTitle.innerText = "Admin Login";
        formSubtitle.innerText = "Access the administration panel";

        loginButton.innerText = "ADMIN LOGIN";
        adminButton.innerText = "Back to User Login";

        signupLink.style.display = "none";

    } else {

        loginMode = "user";

        formTitle.innerText = "Welcome Back";
        formSubtitle.innerText =
            "Login to continue your learning journey.";

        loginButton.innerText = "LOGIN";
        adminButton.innerText = "Login as Admin";

        signupLink.style.display = "inline";

    }

    message.innerText = "";

});

// Handle form submission
loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!loginForm.reportValidity()) {
        return;
    }

    if (loginMode === "admin") {

        message.innerText =
            "Admin form validated. Authentication is not connected yet.";

    } else {

        message.innerText =
            "User form validated. Authentication is not connected yet.";

    }

});
