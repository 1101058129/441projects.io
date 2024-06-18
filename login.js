//Jon Wu Yuhan723
//index
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // Simulate login validation by checking a cookie (not secure, just for demo)
    let storedUser = getCookie('username');
    let storedPass = getCookie('password');

    if (username === storedUser && password === storedPass) {
        alert('Login successful!');
        window.location.href = 'home.html'; // Redirect to products page
    } else {
        alert('Invalid username or password.');
    }
});
// Function to read cookies
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
