// register.js
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let newUsername = document.getElementById('newUsername').value;
    let newPassword = document.getElementById('newPassword').value;

    // Store the new user's credentials in localStorage (still insecure, for learning only)
    localStorage.setItem('username', newUsername);
    localStorage.setItem('password', newPassword);

    alert('Registration successful! Please login.');
    window.location.href = 'index.html'; // Redirect to login page
});

function goToLogin() {
    window.location.href = 'index.html';
}