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
        } else {
            alert('Registration failed');
        }
    });
}