
document.getElementById("registrationForm")
.addEventListener("submit", function(event) {

    // Stop the form from refreshing
    event.preventDefault();

    // Get password values
    let password =
    document.getElementById("password").value;

    let confirmPassword =
    document.getElementById("confirmPassword").value;

    // Check passwords
    if (password !== confirmPassword) {

        alert("Password does not match!");

    }

    else {

        document.getElementById("message").innerHTML =
        "Registration Successful!";

        alert("Welcome to Learnify.ai!");

        // Clear the form
        document.getElementById("registrationForm").reset();

    }

});
