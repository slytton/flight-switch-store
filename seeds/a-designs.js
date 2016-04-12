
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('designs').del(),

    // Inserts seed entries
    knex('designs').insert({name: 'soldier'}),
    knex('designs').insert({name: 'city'}),
    knex('designs').insert({name: 'astro'}),
    knex('designs').insert({name: 'flag'}),
    knex('designs').insert({name: 'logo'})
  );
};
