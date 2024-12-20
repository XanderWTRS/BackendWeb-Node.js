const db = require('../models/db');
const { faker } = require('@faker-js/faker');

async function seedUsers() {
    const users = Array.from({ length: 20 }, () => ({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        phone_number: `+32${faker.number.int({ min: 400000000, max: 499999999 })}`,
    }));

    try {
        for (const user of users) {
            await db.query('INSERT INTO users (first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?)', [
                user.first_name,
                user.last_name,
                user.email,
                user.phone_number,
            ]);
        }
        console.log('Random gebruikers succesvol toegevoegd!');
    } catch (error) {
        console.error('Fout bij het toevoegen van gebruikers:', error);
    } finally {
        db.end();
    }
}
seedUsers();