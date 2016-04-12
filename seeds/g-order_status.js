
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('order_status').del(),

    // Inserts seed entries
    knex('order_status').insert({status: 'processing'}),
    knex('order_status').insert({status: 'shipped'}),
    knex('order_status').insert({status: 'returned'})
  );
};
