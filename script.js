function toggleMenu() {
    const nav = document.querySelector('.main .nav');
    nav.classList.toggle("show")
}

function openPopup(id) {
    document.getElementById(id).classList.add("show")
}

function closePopup(id) {
    document.getElementById(id).classList.remove("show");
}

//for sign in
document.getElementById('SigninForm').addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("signup-username").value.trim();
    const password = document.getElementById("signup-password").value;

    //to store data
    let users = JSON.parse(localStorage.getItem("users")) || [];

    //checks username exists or not

    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
        alert("Username already exists! Please Choose another one");

        return;
    }

    //Add a new user
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("LoggedIn", username);
    updateUIAfterLogin(username)

    closePopup('signupPopup');

    alert(`SignUp sucessful! Welcome, ${username}`);

})

//Login

document.getElementById('loginForm').addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('LoggedInUser', username);
        updateUIAfterLogin(username)

        closePopup('loginPopup');

        alert(`Login Successful! Welcome back, ${username}`);
    } else {
        alert("incorrect username or password");
    }
});

function updateUIAfterLogin(username) {
    document.querySelector('.acc').style.display = "none";

    const profileSec = document.querySelector(".Face");
    profileSec.style.display = "flex";

    document.getElementById("profileName").innerHTML = `${username}`;
}

function logout() {
    localStorage.removeItem("loggedInUser");
    document.querySelector(".Face").style.display = "none";
    document.querySelector(".acc").style.display = "flex";
}


window.onload = function () {
    const LoggedInUser = localStorage.getItem("LoggedInUser");

    if (LoggedInUser) {
        updateUIAfterLogin(LoggedInUser);
    } else {
        document.querySelector(".Face").style.display = "none";
        document.querySelector(".acc").style.display = "flex"
    }
}

let totalSpent = 0;

document.querySelector('.submit').addEventListener('click', function () {
    const title = document.getElementById('Title-names').value.trim();
    const amount = document.getElementById('Title-number').value.trim();
    const paidBy = document.getElementById('Paid-by').value.trim();
    const splitBetween = document.getElementById('Split-with').value.trim();
    const date = document.getElementById('Date').value.trim();
    const note = document.getElementById('Notes').value.trim();

    if (!title | isNaN(amount) | !paidBy) {

        alert("Please fill in the Title, Valid Amount, and Paid By fields");
        return;
    }

    const LoggedInUser = localStorage.getItem("LoggedInUser");

    const newActivity = document.createElement("div");

    newActivity.classList.add("pay1");

    let oweText = "";
    let oweClass = "";

    if (paidBy === LoggedInUser) {
        oweText = `You Lent ₹${amount}`;

        oweClass = 'green-text';
    } else {
        oweText = `You owe ₹${amount}`;
    }

    newActivity.innerHTML =
        ` <img class="pay-1" src = "face.png" alt = "User" >
                                <h6 class="payby">${paidBy} Paid ₹${amount} <br>For ${title}</br></h6>
                                <div class="u-owe ${oweClass} ">${oweText}
                                </div>`;

    document.querySelector('.pay-chat').prepend(newActivity);

    const overviewTitles = document.querySelector('.div-hero .con1 h5');

    if (overviewTitles.length > 0) {
        overviewTitles[0].innerText = title;
    }

    const logoImg = document.querySelector('.con1 h6 i');

    const UpperCaseTitle = title.toUpperCase();

    if (UpperCaseTitle.includes("beach")) {
        logoImg.className = 'fas fa-sun';
    } else if (UpperCaseTitle.includes('budget')) {
        logoImg.className = "fas fa-wallet";
    } else if (UpperCaseTitle.includes('lunch') || UpperCaseTitle.includes("food") || UpperCaseTitle.includes('dinner')) {
        logoImg.className = "fas fa-utensils";
    } else if (UpperCaseTitle.includes('groceries') || UpperCaseTitle.includes('grocery')) {
        logoImg.className = "fas fa-shopping-cart";
    } else if (UpperCaseTitle.includes('travel')) {
        logoImg.className = "fas fa-plane";
    } else if (UpperCaseTitle.includes('work')) {
        logoImg.className = "fas fa-briefcase";
    } else if (UpperCaseTitle.includes('vacation')) {
        logoImg.className = "fas fa-globe";
    } else if (UpperCaseTitle.includes('shopping')) {
        logoImg.className = "fas fa-store";
    } else if (UpperCaseTitle.includes('event')) {
        logoImg.className = "fas fa-calendar-alt";
    } else if (UpperCaseTitle.includes("gift")) {
        logoImg.className = "fas fa-gift"
    } else {
        logoImg.className = "fas fa-question"
    }

    totalSpent += parseFloat(amount);

    const totalAmountElement = document.querySelector('.total-amount');

    if (totalAmountElement) {
        totalAmountElement.innerText = Math.round(totalSpent);
    }

    document.getElementById('Title-names').value = '';
    document.getElementById('Title-number').value = '';
    document.getElementById('Paid-by').value = '';
    document.getElementById('Split-with').value = '';
    document.getElementById('Date').value = '';
    document.getElementById('Notes').value = '';
});
