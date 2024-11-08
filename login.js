document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let storedUser = localStorage.getItem('username');
    let storedPass = localStorage.getItem('password');

    if (username === storedUser && password === storedPass) {
        alert('Login successful!');
        localStorage.setItem('isLoggedIn', 'true'); 
        let previousPage = localStorage.getItem('previousPage');
        if (previousPage) {
            window.location.href = previousPage; 
        } else {
            window.location.href = 'index.html'; 
        }
    } else {
        alert('Invalid username or password.');
    }
});