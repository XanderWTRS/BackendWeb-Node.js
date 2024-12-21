const db = require('../models/db');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

async function seedUsers() {
    const users = Array.from({ length: 50 }, () => ({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        phone_number: `+32${faker.number.int({ min: 400000000, max: 499999999 })}`,
        age: faker.number.int({ min: 18, max: 65 }),
        password: bcrypt.hashSync('password123', 10),
        isAdmin: faker.datatype.boolean(),
    }));

    try {
        for (const user of users) {
            await db.query(
                'INSERT INTO users (first_name, last_name, email, phone_number, age, password, isAdmin) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [
                    user.first_name,
                    user.last_name,
                    user.email,
                    user.phone_number,
                    user.age,
                    user.password,
                    user.isAdmin,
                ]
            );
        }
        console.log('Random gebruikers succesvol toegevoegd!');
    } catch (error) {
        console.error('Fout bij het toevoegen van gebruikers:', error);
    } finally {
        db.end();
    }
}
seedUsers();