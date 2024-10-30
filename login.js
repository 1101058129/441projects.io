// login.js
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // Check if the credentials match the ones stored in localStorage
    let storedUser = localStorage.getItem('username');
    let storedPass = localStorage.getItem('password');

    if (username === storedUser && password === storedPass) {
        alert('Login successful!');
        window.location.href = 'home.html'; // Redirect to home page
    } else {
        alert('Invalid username or password.');
    }
});