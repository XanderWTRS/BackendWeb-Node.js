const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

exports.seed = async function (knex) {
  const users = Array.from({ length: 50 }, () => ({
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    phone_number: `+32${faker.number.int({ min: 400000000, max: 499999999 })}`,
    age: faker.number.int({ min: 18, max: 65 }),
    password: bcrypt.hashSync('password123', 10),
    isAdmin: faker.datatype.boolean(),
  }));

  await knex('users').del();
  await knex('users').insert(users);
};
