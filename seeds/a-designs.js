
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('designs').del(),

    // Inserts seed entries
    knex('designs').insert({id: 1, name: 'soldier'}),
    knex('designs').insert({id: 2, name: 'city'}),
    knex('designs').insert({id: 3, name: 'astro'}),
    knex('designs').insert({id: 4, name: 'flag'}),
    knex('designs').insert({id: 5, name: 'logo'})
  );
};
