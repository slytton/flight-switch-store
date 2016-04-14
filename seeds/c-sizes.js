
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('sizes').del(),

    // Inserts seed entries
    knex('sizes').insert({size: 'M'}),
    knex('sizes').insert({size: 'L'}),
    knex('sizes').insert({size: 'XL'})
  );
};
