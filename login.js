document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // 检查凭据是否与存储在 localStorage 中的凭据匹配
    let storedUser = localStorage.getItem('username');
    let storedPass = localStorage.getItem('password');

    if (username === storedUser && password === storedPass) {
        alert('Login successful!');
        localStorage.setItem('isLoggedIn', 'true'); // 设置登录状态
        let previousPage = localStorage.getItem('previousPage');
        if (previousPage) {
            window.location.href = previousPage; // 重定向到用户之前访问的页面
        } else {
            window.location.href = 'index.html'; // 默认重定向到首页
        }
    } else {
        alert('Invalid username or password.');
    }
});