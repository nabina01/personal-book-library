document.getElementById('signupForm').addEventListener('submit', async (e) => {
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Sign up successful!');
            window.location.href = 'login.html';
        } else {
            alert(data.message || 'Sign up failed');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});