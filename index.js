

document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.getElementById("loginButton");
    const signupButton = document.getElementById("signupButton");
    const formContainer = document.getElementById("formContainer");

    loginButton.addEventListener("click", function() {
        loadForm("authencation.html", 'login');
    });

    signupButton.addEventListener("click", function() {
        loadForm("authencation.html", 'signup');
    });

    function loadForm(url, formType) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                formContainer.innerHTML = data;
                applyStylesAndScripts();
                toggleForms(formType);
            })
            .catch(error => console.error('Error loading the form:', error));
    }

    function applyStylesAndScripts() {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "authencation.css";
        document.head.appendChild(link);

        const script = document.createElement("script");
        script.src = "authencation.js";
        document.body.appendChild(script);
    }

    function toggleForms(formType) {
        const loginForm = document.querySelector("#loginForm");
        const signupForm = document.querySelector("#signupForm");

        if (formType === 'login') {
            if (loginForm) loginForm.style.display = "block";
            if (signupForm) signupForm.style.display = "none";
        } else if (formType === 'signup') {
            if (loginForm) loginForm.style.display = "none";
            if (signupForm) signupForm.style.display = "block";
        }
    }
    const Learn_morebutton = document.getElementById('Learn_more');

    Learn_morebutton.addEventListener('click', function() {
        window.location.href = "products.html"
    });

    const home=document.querySelector(".logo");

    home.addEventListener("click", function() {
        window.location.href = "index.html"
    });
});
