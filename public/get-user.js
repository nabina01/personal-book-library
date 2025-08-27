const apiUrl = "http://localhost:5050/api/users";

// Check if user is logged in
if (!localStorage.getItem('token')) {
    window.location.href = 'login.html';
}

async function getUser() {
    const userId = document.getElementById('userId').value;
    
    try {
        const response = await fetch(`http://localhost:5050/api/users/${userId}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        
        const user = await response.json();
        
        if (response.ok) {
            document.getElementById('userDetails').innerHTML = `
                <h2>User Details</h2>
                <p>Name: ${user.name}</p>
                <p>Email: ${user.email}</p>
            `;
        } else {
            alert('User not found');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}