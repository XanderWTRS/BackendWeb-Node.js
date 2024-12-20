const API_BASE_URL = 'http://localhost:4000/api';

//NIEUWE GEBRUIKER
document.getElementById('user-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phone-number').value;

    const userData = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
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

    const updatedData = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
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

    const userId = document.getElementById('task-user-id').value;
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
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) {
            throw new Error('Fout bij het ophalen van gebruikers.');
        }

        const users = await response.json();

        const userList = document.getElementById('user-list');
        const taskUserIdSelect = document.getElementById('task-user-id');
        userList.innerHTML = ''; 
        taskUserIdSelect.innerHTML = ''; 

        users.forEach((user) => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = `${user.first_name} ${user.last_name}`;
            taskUserIdSelect.appendChild(option);

            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${user.first_name} ${user.last_name}</strong> (${user.email})<br>
                Telefoon: ${user.phone_number}<br>
                <button onclick="deleteUser(${user.id})">Verwijder gebruiker</button>
                <ul id="tasks-for-user-${user.id}"></ul>
            `;
            userList.appendChild(li);

            fetchTasksForUser(user.id);
        });
    } catch (error) {
        console.error('Fout bij ophalen gebruikers:', error);
        alert('Er ging iets mis bij het ophalen van gebruikers. Controleer de server.');
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
            const li = document.createElement('li');
            const isCompleted = task.status === 'completed';
            const completedAtText = isCompleted ? `Voltooid op: ${task.completed_at || 'Onbekend'}` : '';
        
            li.innerHTML = `
                ${task.title} (${task.status}) 
                ${completedAtText}
                <button 
                    onclick="updateTaskStatus(${task.id}, '${task.status}')"
                    ${isCompleted ? 'disabled' : ''}>
                    Wijzig status
                </button>
            `;
            taskList.appendChild(li);
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
fetchUsers();