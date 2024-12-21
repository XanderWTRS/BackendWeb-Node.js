let currentPage = 1;
const USERS_PER_PAGE = 6;
let allUsers = []; 

//AUTOCOMPLETE
async function fetchAllUsers() {
    try {
        const response = await fetch(`${API_BASE_URL}/users?limit=1000`);
        if (!response.ok) {
            throw new Error('Fout bij het ophalen van gebruikers.');
        }
        allUsers = await response.json();
    } catch (error) {
        console.error('Fout bij het ophalen van gebruikers:', error);
    }
}

function filterUsers(searchTerm) {
    return allUsers.filter(user =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

function showFilteredUsers(filteredUsers) {
    const resultsContainer = document.getElementById('user-search-results');
    resultsContainer.innerHTML = ''; 

    filteredUsers.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.first_name} ${user.last_name}`;
        li.dataset.userId = user.id; 
        li.addEventListener('click', () => selectUser(user));
        resultsContainer.appendChild(li);
    });
}

function selectUser(user) {
    const searchInput = document.getElementById('task-user-search');
    searchInput.value = `${user.first_name} ${user.last_name}`; 
    searchInput.dataset.userId = user.id; 
    document.getElementById('user-search-results').innerHTML = ''; 
}

document.getElementById('task-user-search').addEventListener('input', (e) => {
    const searchTerm = e.target.value;
    if (searchTerm.length > 0) {
        const filteredUsers = filterUsers(searchTerm);
        showFilteredUsers(filteredUsers);
    } else {
        document.getElementById('user-search-results').innerHTML = ''; 
    }
});

document.getElementById('edit-task-user-search').addEventListener('input', (e) => {
    const searchTerm = e.target.value;

    if (searchTerm.length > 0) {
        const filteredUsers = filterUsers(searchTerm);
        showEditFilteredUsers(filteredUsers);
    } else {
        document.getElementById('edit-user-search-results').innerHTML = '';
}});

function showEditFilteredUsers(filteredUsers) {
    const resultsContainer = document.getElementById('edit-user-search-results');
    resultsContainer.innerHTML = ''; 

    filteredUsers.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.first_name} ${user.last_name}`;
        li.dataset.userId = user.id; 
        li.addEventListener('click', () => selectEditUser(user)); 
        resultsContainer.appendChild(li);
    });
}

function selectEditUser(user) {
    const searchInput = document.getElementById('edit-task-user-search');
    searchInput.value = `${user.first_name} ${user.last_name}`; 
    searchInput.dataset.userId = user.id; 
    document.getElementById('edit-user-search-results').innerHTML = ''; 
}

//NIEUWE GEBRUIKER
document.getElementById('user-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const age = parseInt(document.getElementById('age').value, 10);
    const password = document.getElementById('password').value;
    const isAdmin = document.getElementById('is-admin').checked ? 1 : 0;

    const userData = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        age,
        password,
        isAdmin,
    };

    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Gebruiker succesvol toegevoegd!');
            fetchUsers(); 
            fetchAllUsers();
        } else {
            console.error('Fout van de server:', result.error);
            alert(`Fout: ${result.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Er ging iets mis.');
    }
});

//WIJZIG GEBRUIKER
document.getElementById('update-user-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = document.getElementById('update-user-id').value;
    const firstName = document.getElementById('update-first-name').value;
    const lastName = document.getElementById('update-last-name').value;
    const email = document.getElementById('update-email').value;
    const phoneNumber = document.getElementById('update-phone-number').value;
    const age = parseInt(document.getElementById('update-age').value, 10);
    const password = document.getElementById('update-password').value;
    const isAdmin = document.getElementById('update-is-admin').checked ? 1 : 0;

    const updatedData = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        age,
        password,
        isAdmin,
    };

    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (response.ok) {
            alert('Gebruiker succesvol bijgewerkt!');
            fetchUsers();
        } else {
            const result = await response.json();
            alert(`Fout: ${result.error || 'Kan gebruiker niet updaten.'}`);
        }
    } catch (error) {
        console.error('Error bij het updaten van gebruiker:', error);
        alert('Er ging iets mis bij het updaten.');
    }
});

//NIEUWE TAAK
document.getElementById('task-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = document.getElementById('task-user-search').dataset.userId;
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const status = document.getElementById('task-status').value;

    const taskData = {
        user_id: parseInt(userId),
        title,
        description,
        status,
    };

    try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Taak succesvol toegevoegd!');
            fetchUsers();
        } else {
            alert(`Fout: ${result.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Er ging iets mis.');
    }
});

//UPDATE TAAK STATUS
async function updateTaskStatus(taskId, currentStatus) {
    const newStatus = currentStatus === 'open' ? 'completed' : 'open';

    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Taakstatus succesvol bijgewerkt!');
            fetchUsers();
        } else {
            alert(`Fout: ${result.error}`);
        }
    } catch (error) {
        console.error(`Fout bij het updaten van taak ${taskId}:`, error);
        alert('Er ging iets mis bij het updaten van de taakstatus.');
    }
}

//ALLE GEKOPPELDE TAKEN
async function fetchUsers() {
    const offset = (currentPage - 1) * USERS_PER_PAGE; 
    try {
        const response = await fetch(`${API_BASE_URL}/users?limit=${USERS_PER_PAGE}&offset=${offset}`);
        if (!response.ok) {
            throw new Error(`Fout bij het ophalen van gebruikers: ${response.status}`);
        }

        const users = await response.json();

        const userList = document.getElementById('user-list');
        userList.innerHTML = ''; 

        users.forEach((user) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${user.first_name} ${user.last_name}</strong> (${user.email})<br>
                Telefoon: ${user.phone_number}<br>
                Leeftijd: ${user.age}<br>
                Admin: ${user.isAdmin ? 'Ja' : 'Nee'}<br>
                <button onclick="deleteUser(${user.id})">Verwijder gebruiker</button>
            `;

            const taskList = document.createElement('ul');
            taskList.id = `tasks-for-user-${user.id}`;
            li.appendChild(taskList);

            userList.appendChild(li);
            fetchTasksForUser(user.id);
        });

        renderPaginationButtons();
    } catch (error) {
        console.error('Fout bij ophalen gebruikers:', error);
        alert('Er ging iets mis bij het ophalen van gebruikers.');
    }
}

//TAAK VOOR GEBRUIKER
async function fetchTasksForUser(userId) {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/user/${userId}`);
        const tasks = await response.json();

        const taskList = document.getElementById(`tasks-for-user-${userId}`);
        taskList.innerHTML = '';

        tasks.forEach((task) => {
            const isCompleted = task.status === 'completed';
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <strong>${task.title}</strong> (${task.status})<br>
                <p>Beschrijving: ${task.description || 'Geen beschrijving'}</p>
                <div>
                    <button 
                        onclick='openEditTaskModal(${JSON.stringify(task).replace(/'/g, "&apos;")})'
                        ${isCompleted ? 'disabled' : ''}>
                        Aanpassen
                    </button>
                    <button 
                        onclick='markTaskComplete(${task.id})'
                        ${isCompleted ? 'disabled' : ''}>
                        Complete
                    </button>
                    <button onclick="deleteTask(${task.id})" style="background: red;">Verwijderen</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    } catch (error) {
        console.error(`Error fetching tasks for user ${userId}:`, error);
        alert('Er ging iets mis bij het ophalen van taken.');
    }
}

//VERWIJDER GEBRUIKER
async function deleteUser(userId) {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Gebruiker succesvol verwijderd!');
            fetchUsers();
        } else {
            alert('Kon de gebruiker niet verwijderen.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Er ging iets mis.');
    }
}

//TAAK BEWERKEN
function openEditTaskModal(task) {
    if (task.status === 'completed') {
        alert('Een voltooide taak kan niet meer worden aangepast.');
        return;
    }

    document.getElementById('edit-task-id').value = task.id;
    document.getElementById('edit-task-title').value = task.title;
    document.getElementById('edit-task-description').value = task.description || '';
    populateUsersDropdown(task.user_id);

    document.getElementById('edit-task-modal').classList.add('active');
}

function closeEditTaskModal() {
    document.getElementById('edit-task-modal').classList.remove('active');
}

async function populateUsersDropdown(selectedUserId) {
    const userSelect = document.getElementById('edit-task-user');
    userSelect.innerHTML = '';
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        const users = await response.json();

        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = `${user.first_name} ${user.last_name}`;
            if (user.id === selectedUserId) option.selected = true;
            userSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Fout bij het ophalen van gebruikers:', error);
        alert('Kon gebruikers niet laden.');
    }
}

//TAAK VOLTOOIEN
async function markTaskComplete(taskId) {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'completed' }),
        });

        if (response.ok) {
            alert('Taak succesvol op "completed" gezet!');
            fetchUsers();
        } else {
            const result = await response.json();
            alert(`Fout: ${result.error || 'Kon taak niet op "completed" zetten.'}`);
        }
    } catch (error) {
        console.error('Fout bij het voltooien van taak:', error);
        alert('Er ging iets mis bij het voltooien van de taak.');
    }
}

document.getElementById('edit-task-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const taskId = document.getElementById('edit-task-id').value;
    const userId = document.getElementById('edit-task-user-search').dataset.userId;
    const title = document.getElementById('edit-task-title').value;
    const description = document.getElementById('edit-task-description').value;

    const updatedTask = {
        user_id: parseInt(userId),
        title,
        description,
    };

    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        });

        if (response.ok) {
            alert('Taak succesvol aangepast!');
            closeEditTaskModal();
            fetchUsers(); 
        } else {
            const result = await response.json();
            alert(`Fout: ${result.error || 'Kon taak niet aanpassen.'}`);
        }
    } catch (error) {
        console.error('Fout bij het aanpassen van taak:', error);
        alert('Er ging iets mis bij het aanpassen.');
    }
});

//TAAK VERWIJDEREN
async function deleteTask(taskId) {
    if (!confirm('Weet je zeker dat je deze taak wilt verwijderen?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Taak succesvol verwijderd!');
            fetchUsers();
        } else {
            const result = await response.json();
            alert(`Fout: ${result.error || 'Kon taak niet verwijderen.'}`);
        }
    } catch (error) {
        console.error('Fout bij het verwijderen van taak:', error);
        alert('Er ging iets mis bij het verwijderen.');
    }
}

//PAGINATIE
function renderPaginationButtons() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = `
        <button onclick="prevPage()" ${currentPage === 1 ? 'disabled' : ''}>Vorige</button>
        <span>Pagina ${currentPage}</span>
        <button onclick="nextPage()">Volgende</button>
    `;
}

function nextPage() {
    currentPage++;
    fetchUsers();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchUsers();
    }
}

fetchAllUsers();
fetchUsers();