const db = require('../models/db');
async function seedTasks() {
    const tasks = [
        { user_id: 1, title: 'Taak 1', description: 'Beschrijving van taak 1', status: 'open' },
        { user_id: 2, title: 'Taak 2', description: 'Beschrijving van taak 2', status: 'completed' },
        { user_id: 3, title: 'Taak 3', description: 'Beschrijving van taak 3', status: 'open' },
        { user_id: 4, title: 'Taak 4', description: 'Beschrijving van taak 4', status: 'open' },
        { user_id: 5, title: 'Taak 5', description: 'Beschrijving van taak 5', status: 'completed' },
        { user_id: 6, title: 'Taak 6', description: 'Beschrijving van taak 6', status: 'open' },
        { user_id: 7, title: 'Taak 7', description: 'Beschrijving van taak 7', status: 'completed' },
        { user_id: 8, title: 'Taak 8', description: 'Beschrijving van taak 8', status: 'open' },
        { user_id: 9, title: 'Taak 9', description: 'Beschrijving van taak 9', status: 'open' },
        { user_id: 10, title: 'Taak 10', description: 'Beschrijving van taak 10', status: 'completed' },
        { user_id: 1, title: 'Taak 11', description: 'Beschrijving van taak 11', status: 'open' },
        { user_id: 2, title: 'Taak 12', description: 'Beschrijving van taak 12', status: 'open' },
        { user_id: 3, title: 'Taak 13', description: 'Beschrijving van taak 13', status: 'completed' },
        { user_id: 4, title: 'Taak 14', description: 'Beschrijving van taak 14', status: 'open' },
        { user_id: 5, title: 'Taak 15', description: 'Beschrijving van taak 15', status: 'completed' },
    ];

    try {
        for (const task of tasks) {
            await db.query('INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)', [
                task.user_id,
                task.title,
                task.description,
                task.status,
            ]);
        }
        console.log('Taken succesvol toegevoegd!');
    } catch (error) {
        console.error('Fout bij het toevoegen van taken:', error);
    } finally {
        db.end();
    }
}
seedTasks();