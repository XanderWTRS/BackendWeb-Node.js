const db = require('../models/db');
const { faker } = require('@faker-js/faker');

async function seedTasks() {
    const tasks = Array.from({ length: 30 }, () => ({
        user_id: faker.number.int({ min: 1, max: 50 }),
        title: faker.lorem.sentence(3),
        description: faker.lorem.sentences(2),
        status: faker.helpers.arrayElement(['open', 'completed']), 
    }));

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