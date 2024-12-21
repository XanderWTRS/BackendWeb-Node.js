let currentUsers = [];
let sortState = 'default';

async function fetchAndDisplayAllUsers() {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/users`);
        if (!response.ok) {
            throw new Error('Fout bij het ophalen van gebruikers.');
        }

        const users = await response.json();
        currentUsers = users;

        displayUsers(users);
    } catch (error) {
        console.error('Fout bij het ophalen van gebruikers:', error);
        alert('Er ging iets mis bij het ophalen van gebruikers.');
    }
}

function displayUsers(users) {
    const userTableBody = document.querySelector('#user-table tbody');
    userTableBody.innerHTML = ''; 
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>${user.email}</td>
            <td>${user.phone_number}</td>
            <td>${user.age}</td>
            <td>${user.isAdmin ? 'Ja' : 'Nee'}</td>
        `;
        userTableBody.appendChild(row);
    });
}

document.getElementById('sort-button').addEventListener('click', () => {
    if (sortState === 'default') {
        const sortedUsers = [...currentUsers].sort((a, b) => {
            const nameA = a.first_name.toLowerCase();
            const nameB = b.first_name.toLowerCase();
            return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        });
        displayUsers(sortedUsers);
        sortState = 'asc';
        document.getElementById('sort-button').innerText = 'Sorteer Z-A';
    } else if (sortState === 'asc') {
        const sortedUsers = [...currentUsers].sort((a, b) => {
            const nameA = a.first_name.toLowerCase();
            const nameB = b.first_name.toLowerCase();
            return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
        });
        displayUsers(sortedUsers);
        sortState = 'desc';
        document.getElementById('sort-button').innerText = 'Reset Sorteer';
    } else if (sortState === 'desc') {
        displayUsers(currentUsers);
        sortState = 'default';
        document.getElementById('sort-button').innerText = 'Sorteer A-Z';
    }
});

document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('search-first-name').value.trim();
    const isAdmin = document.getElementById('search-is-admin').value;

    const params = new URLSearchParams();
    if (firstName) params.append('first_name', firstName);
    if (isAdmin) params.append('isAdmin', isAdmin);

    try {
        const response = await fetch(`${API_BASE_URL}/admin/users/search?${params.toString()}`);
        if (!response.ok) {
            throw new Error('Fout bij het zoeken naar gebruikers.');
        }

        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Fout bij het zoeken naar gebruikers:', error);
        alert('Er ging iets mis bij het zoeken naar gebruikers.');
    }
});
document.addEventListener('DOMContentLoaded', fetchAndDisplayAllUsers);