
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('sizes').del(),

    // Inserts seed entries
    knex('sizes').insert({size: 'm'}),
    knex('sizes').insert({size: 'l'}),
    knex('sizes').insert({size: 'xl'})
  );
};
