function register() {
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful');
            window.location.href = '/login.html';
            loadEmails();
        } else {
            alert('Registration failed');
        }
    });
}

function login() {
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            alert('Login successful');
            window.location.href = '/compose.html';
            loadEmails();
            
        } else {
            alert('Login failed');
        }
    });
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
                emailElement.innerHTML = `<strong>Date:</strong> ${email.created_at}<br></br><strong>From:</strong> ${email.fromUserEmail}<br><strong>Subject:</strong> ${email.subject}<br><p>${email.body}</p>`;
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
