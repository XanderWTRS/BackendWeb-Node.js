const db = require('../models/db');
async function seedTasks() {
    const tasks = [
        { user_id: 1, title: 'Taak 1', description: 'Beschrijving van taak 1', status: 'open' },
        { user_id: 2, title: 'Taak 2', description: 'Beschrijving van taak 2', status: 'completed' },
        { user_id: 3, title: 'Taak 3', description: 'Beschrijving van taak 3', status: 'open' },
        { user_id: 4, title: 'Taak 4', description: 'Beschrijving van taak 4', status: 'open' },
        { user_id: 5, title: 'Taak 5', description: 'Beschrijving van taak 5', status: 'completed' },
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