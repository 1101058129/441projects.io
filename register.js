//Jon Wu Yuhan723
//register
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let newUsername = document.getElementById('newUsername').value;
    let newPassword = document.getElementById('newPassword').value;

    // Store the new user's credentials in cookies (insecure, for learning only)
    document.cookie = "username=" + newUsername + ";";
    document.cookie = "password=" + newPassword + ";";

    alert('Registration successful! Please login.');
    window.location.href = 'index.html'; // Redirect to login page
});
function goToLogin() {
    window.location.href = 'index.html';
}