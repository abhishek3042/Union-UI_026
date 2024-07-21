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

        fetch(`http://localhost:3000/users?username=${username}`)
            .then(response => response.json())
            .then(users => {
                if (users.length > 0) {
                    const user = users[0];
                    if (user.password === password) {
                        alert('Logged in successfully!');
                        localStorage.setItem('current_user', JSON.stringify(user));
                        displayUsername(user.username); // Display username
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

        fetch('http://localhost:3000/users')
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

                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(response => response.json())
                    .then(() => {
                        alert('Signed up successfully!');
                        redirectToLogin(); // Transition back to login after signup
                    })
                    .catch(error => console.error('Error:', error));
            });
    }

    // Function to validate email
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Function to display username after login
    function displayUsername(username) {
        const usernameDisplay = document.getElementById('username-display');
        if (usernameDisplay) {
            usernameDisplay.textContent = `Hello, ${username}!`;
        } else {
            const newUsernameDisplay = document.createElement('div');
            newUsernameDisplay.id = 'username-display';
            newUsernameDisplay.textContent = `Hello, ${username}!`;
            document.body.appendChild(newUsernameDisplay);
        }
    }

    // Event listeners for form switching
    document.getElementById('sign_in_button').addEventListener('click', redirectToLogin);
    document.getElementById('sign_up_button').addEventListener('click', redirectToSignup);

    // Event listeners for form submission
    document.querySelector("#login-form .primary").addEventListener('click', login);
    document.querySelector("#signup-form .secondary").addEventListener('click', signup);
});
