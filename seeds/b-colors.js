
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('colors').del(),

    // Inserts seed entries
    knex('colors').insert({id: 1, color: 'red'}),
    knex('colors').insert({id: 2, color: 'white'}),
    knex('colors').insert({id: 3, color: 'blue'}),
    knex('colors').insert({id: 4, color: 'black'}),
    knex('colors').insert({id: 5, color: 'grey'}),
  );
};
