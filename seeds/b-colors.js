
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('colors').del(),

    // Inserts seed entries
    knex('colors').insert({color: 'red'}),
    knex('colors').insert({color: 'white'}),
    knex('colors').insert({color: 'blue'}),
    knex('colors').insert({color: 'black'}),
    knex('colors').insert({color: 'grey'})
  );
};
