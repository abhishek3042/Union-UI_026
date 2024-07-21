document.addEventListener("DOMContentLoaded", function () {
    // Function to switch to the sign-up form
    function redirectToSignup() {
        document.querySelector('.sign_in_box').classList.add('form_none');
        document.querySelector('.sign_up_box').classList.remove('form_none');
        document.body.classList.add('form_slide');
        document.body.style.backgroundColor = "#f47136";
    }

    // Function to switch to the sign-in form
    function redirectToLogin() {
        document.querySelector('.sign_up_box').classList.add('form_none');
        document.querySelector('.sign_in_box').classList.remove('form_none');
        document.body.classList.remove('form_slide');
        document.body.style.backgroundColor = "#b803f4";
    }

    // Function to handle login
    function login() {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        fetch(`https://chronotech-api-1.onrender.com/users?username=${username}`)
            .then(response => response.json())
            .then(users => {
                if (users.length > 0) {
                    const user = users[0];
                    if (user.password === password) {
                        alert('Logged in successfully!');
                        localStorage.setItem('current_user', JSON.stringify(user));
                        displayUsername(user.username); // Display username in the header
                        redirectToLogin(); // Hide the login form
                    } else {
                        alert('Incorrect password.');
                    }
                } else {
                    alert('User not found.');
                }
            })
            .catch(error => console.error('Error:', error));
    }

    // Function to handle signup
    function signup() {
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm_password').value;
        const email = document.getElementById('signup-email').value;

        if(username.length < 5) {
            alert('Enter valid username.');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Invalid email format.');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        fetch('https://chronotech-api-1.onrender.com/users')
            .then(response => response.json())
            .then(users => {
                const existingUser = users.find(user => user.username === username);
                if (existingUser) {
                    alert('Username already taken.');
                    return;
                }

                const newUser = {
                    username: username,
                    password: password,
                    email: email
                };

                fetch('https://chronotech-api-1.onrender.com/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(response => response.json())
                    .then(() => {
                        alert('Signed up successfully!');
                        redirectToLogin(); 
                    })
                    .catch(error => console.error('Error:', error));
            });
    }

    // Function to validate email
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Function to display username in the header
    function displayUsername(username) {
        const usernameDisplayContainer = document.getElementById('username-display-container');
        const usernameDisplay = document.getElementById('username-display');

        usernameDisplay.textContent = `${username}`;
        usernameDisplayContainer.style.display = 'block'; 

        // Hide the forms
        document.querySelector('.sign_in_box').classList.add('form_none');
        document.querySelector('.sign_up_box').classList.add('form_none');
    }

    // Function to handle logout
    function logout() {
        const usernameDisplayContainer = document.getElementById('username-display-container');
        usernameDisplayContainer.style.display = 'none'; 
        localStorage.setItem('current_user', JSON.stringify(null));
        redirectToLogin(); 
    }

    // Event listeners for form switching
    document.getElementById('sign_in_button').addEventListener('click', redirectToLogin);
    document.getElementById('sign_up_button').addEventListener('click', redirectToSignup);

    // Event listeners for form submission
    document.querySelector("#login-form .primary").addEventListener('click', login);
    document.querySelector("#signup-form .secondary").addEventListener('click', signup);

    // Event listener for logout
    document.getElementById('logoutButton').addEventListener('click', logout);
});
