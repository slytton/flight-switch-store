
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('order_status').del(),

    // Inserts seed entries
    knex('order_status').insert({id: 1, status: 'processing'}),
    knex('order_status').insert({id: 2, status: 'shipped'}),
    knex('order_status').insert({id: 3, status: 'returned'})
  );
};
