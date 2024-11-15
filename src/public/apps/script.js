function showNav() {
    const navBar = document.querySelector(".header__sidebar");
    navBar.style.transform = "translateX(0)";
    navBar.style.opacity = "1";
    const navBtn = document.querySelector(".header__btn__nav");
    navBtn.style.opacity = "0.3";
}

function hideNav() {
    const navBar = document.querySelector(".header__sidebar");
    navBar.style.transform = "translateX(100%)";
    navBar.style.opacity = "0";
    const navBtn = document.querySelector(".header__btn__nav");
    navBtn.style.opacity = "1";
}

function handleSubmitSignup() {
    console.log("Signup form submitted");
    const username = document.querySelector("#signup__username").value;
    const email = document.querySelector("#signup__email").value;
    const password = document.querySelector("#signup__password").value;
    if (!email || !password || !username) {
        alert("Please fill all fields");
        return;
    }

    // Send data to server
    fetch("/api/user/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            alert(data.msg); // This should now work if `msg` exists in the response
            location.href = "/";
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("There was an error processing your request.");
        });
}