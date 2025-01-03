const { faker } = require('@faker-js/faker');

exports.seed = async function (knex) {
  const users = await knex('users').select('id');

  if (users.length === 0) {
    throw new Error('Geen gebruikers gevonden. Zorg ervoor dat de users-seeder correct is uitgevoerd.');
  }

  const tasks = Array.from({ length: 30 }, () => ({
    user_id: faker.helpers.arrayElement(users).id, 
    title: faker.lorem.sentence(3),
    description: faker.lorem.sentences(2),
    status: faker.helpers.arrayElement(['open', 'completed']),
  }));

  await knex('tasks').del();
  await knex('tasks').insert(tasks);
};
