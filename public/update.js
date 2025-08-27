// Check if user is logged in
if (!localStorage.getItem('token')) {
    window.location.href = 'login.html';
}

// Get user ID from URL
const urlParams = new URLSearchParams(window.location.search); // Get URL parameters
const userId = urlParams.get('id');

// Load user data
async function loadUserData() {
    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        
        const user = await response.json();
        
        if (response.ok) {
            document.getElementById('name').value = user.name;
            document.getElementById('email').value = user.email;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// addEventListener :tells it what to do when the form is submitted

document.getElementById('updateForm').addEventListener('submit', async (e) => {
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({ name, email })
        });
        
        if (response.ok) {
            alert('User updated successfully');
            window.location.href = 'dashboard.html';
        } else {
            alert('Update failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

loadUserData();