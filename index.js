function redirectToSignup() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'flex';
}

function redirectToLogin() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'flex';
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const storedUser = localStorage.getItem(username);

    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.password === password) {
            alert('Logged in successfully!');
        } else {
            alert('Incorrect password.');
        }
    } else {
        alert('User not found.');
    }
}

function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const email = document.getElementById('signup-email').value;

    if (localStorage.getItem(username)) {
        alert('Username already taken.');
        return;
    }

    const user = {
        username: username,
        password: password,
        email: email
    };

    localStorage.setItem(username, JSON.stringify(user));
    alert('Signed up successfully!');
    redirectToLogin();
}

// Event listeners to handle form switching
document.getElementById('sign_in_button').addEventListener('click', redirectToLogin);
document.getElementById('sign_up_button').addEventListener('click', redirectToSignup);


document.addEventListener("DOMContentLoaded", function () {

    let signInBtn = document.querySelector("#sign_in_button");
    let signUpBtn = document.querySelector("#sign_up_button");
    let signInForm = document.querySelector(".sign_in_box");
    let body = document.querySelector("body");

    signUpBtn.onclick = function(){
        signInForm.classList.add('form_none');
        body.classList.add('form_slide');
        if (body.classList.contains('form_slide')){
            body.style.background = '#f47136';
        }
    }

    signInBtn.onclick = function(){
        body.style.backgroundColor = "#b803f4";
        body.classList.remove('form_slide');
        signInForm.classList.remove('form_none');
    }
});