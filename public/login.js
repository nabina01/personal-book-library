const apiUrl = "http://localhost:5050/api/users/login";

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = 'dashboard.html';
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});