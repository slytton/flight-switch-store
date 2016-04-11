
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('sizes').del(),

    // Inserts seed entries
    knex('sizes').insert({id: 1, size: 'm'}),
    knex('sizes').insert({id: 2, size: 'l'}),
    knex('sizes').insert({id: 3, size: 'xl'})
  );
};
