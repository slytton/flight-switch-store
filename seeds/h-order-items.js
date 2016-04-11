
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('order_items').del(),

    // Inserts seed entries
    knex('order_items').insert({id: 1, shirt_id: 1, order_id: 1, quantity: 1, price: 20}),
    knex('order_items').insert({id: 2, shirt_id: 1, order_id: 2, quantity: 2, price: 20}),
    knex('order_items').insert({id: 3, shirt_id: 16, order_id: 3, quantity: 1, price: 20}),
    knex('order_items').insert({id: 4, shirt_id: 30, order_id: 3, quantity: 1, price: 20}),
    knex('order_items').insert({id: 5, shirt_id: 4, order_id: 4, quantity: 2, price: 20}),
    knex('order_items').insert({id: 6, shirt_id: 13, order_id: 4, quantity: 1, price: 20})
  );
};
