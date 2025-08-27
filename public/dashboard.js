const apiUrl = "http://localhost:3000/api/users";

//  Load users on page load
window.onload = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must login first!");
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await res.json();
    const tableBody = document.querySelector("#usersTable tbody");
    tableBody.innerHTML = "";

    users.forEach(user => {
      const row = `
        <tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.phone_number || ""}</td>
          <td>
            <button onclick="editUser('${user.id}')">Edit</button>
            <button onclick="deleteUser('${user.id}')">Delete</button>
          </td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });

  } catch (error) {
    console.error("Error loading users:", error);
    alert("Error loading users");
  }
};

//  Delete user
async function deleteUser(id) {
  if (!confirm("Are you sure you want to delete this user?")) return;

  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (res.status === 204 || res.ok) {
      alert("User deleted!");
      window.location.reload();
    } else {
      alert("Delete failed");
    }

  } catch (error) {
    console.error("Delete error:", error);
    alert("Error deleting user");
  }
}

//  Edit user
async function editUser(id) {
  const name = prompt("Enter new name:");
  const email = prompt("Enter new email:");
  const phone = prompt("Enter new phone number:");
  const password = prompt("Enter new password:");

  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ name, email, phone_number: phone, password })
    });

    if (res.ok) {
      alert("User updated!");
      window.location.reload();
    } else {
      alert("Update failed");
    }

  } catch (error) {
    console.error("Update error:", error);
    alert("Error updating user");
  }
}

//  Logout
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
