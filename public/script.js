document.addEventListener('DOMContentLoaded', (event) => {

    document.getElementById('password').addEventListener('input', function() {
        validatePassword(this.value);
    });
});

function register() {
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!validateEmail(email) || !validatePassword(password)) {
        return;
    }

    fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            //alert('Registration successful');
            window.location.href = '/login.html';
        } else {
            //alert('Registration failed');
            console.error('Registration failed');
        }
    });
}

function login() {
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!validateEmail(email) || !validatePassword(password)) {
        return;
    }

    fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
           // alert('Login successful');
            window.location.href = '/compose.html';
        } else {
           // alert('Login failed');
          console.error('Login failed');
        }
    });
}

function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const emailError = document.getElementById('emailError');
    if (!emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        return false;
    } else {
        emailError.textContent = '';
        return true;
    }
}

function validatePassword(password) {
    const passwordError = document.getElementById('passwordError');
    if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long.';
        return false;
    } else {
        passwordError.textContent = '';
        return true;
    }
}

function loadEmails() {
    const token = localStorage.getItem('token');

    if (token) {
        fetch('/api/emails', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const emailsDiv = document.getElementById('emails');
            emailsDiv.innerHTML = '';
            data.emails.forEach(email => {
                const emailElement = document.createElement('div');
                emailElement.className = 'email';
                emailElement.innerHTML = `
                    <strong>Date:</strong> ${email.created_at}<br>
                    <strong>From:</strong> ${email.fromUserEmail}<br>
                    <strong>Subject:</strong> ${email.subject}<br>
                    <p>${email.body}</p>
                `;
                emailsDiv.appendChild(emailElement);
            });
        });
    }
}

function sendEmail() {
    const token = localStorage.getItem('token');
    const to = document.getElementById('to').value;
    const subject = document.getElementById('subject').value;
    const body = document.getElementById('body').value;

    fetch('/api/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ to, subject, body })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Email sent successfully');
            loadEmails();
        } else {
            alert('Failed to send email');
        }
    });
}


function logout() {
    window.location.href = "login.html";
}

document.getElementById("logoutButton").addEventListener("click", logout);
