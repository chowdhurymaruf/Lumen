const loginForm = document.getElementById("loginForm");

const adminButton = document.getElementById("adminButton");

const formTitle = document.getElementById("formTitle");

const formSubtitle = document.getElementById("formSubtitle");

const loginButton = document.getElementById("loginButton");

const signupLink = document.getElementById("signupLink");

const message = document.getElementById("message");

let loginMode = "user";

// Predefined user accounts
let users = [
    {
        email: "student@gmail.com",
        password: "12345",
        role: "Student"
    },
    {
        email: "teacher@gmail.com",
        password: "teacher123",
        role: "Teacher"
    }
];

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

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let matchedUser = null;

    // Check user credentials
    for (let i = 0; i < users.length; i++) {

        if (users[i].email === email &&
            users[i].password === password) {

            matchedUser = users[i];
            break;
        }
    }

    // Check login result
    if (matchedUser !== null) {

        window.location.href = "home.html";

    } else {

        message.innerText =
            "Incorrect email or password!";

    }

}
});
