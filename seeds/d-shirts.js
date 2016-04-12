
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('shirts').del(),

    // Inserts seed entries
    knex('shirts').insert({design_id: 1, color_id: 2, size_id: 3, quantity: 22, price:25}),
    knex('shirts').insert({design_id: 1, color_id: 2, size_id: 2, quantity: 26, price:25}),
    knex('shirts').insert({design_id: 1, color_id: 2, size_id: 1, quantity: 21, price:25}),
    knex('shirts').insert({design_id: 2, color_id: 3, size_id: 3, quantity: 2, price:25}),
    knex('shirts').insert({design_id: 2, color_id: 3, size_id: 2, quantity: 1, price:25}),
    knex('shirts').insert({design_id: 2, color_id: 3, size_id: 1, quantity: 6, price:25}),
    knex('shirts').insert({design_id: 2, color_id: 5, size_id: 2, quantity: 9, price:25}),
    knex('shirts').insert({design_id: 2, color_id: 5, size_id: 1, quantity: 15, price:25}),
    knex('shirts').insert({design_id: 2, color_id: 2, size_id: 3, quantity: 6, price:25}),
    knex('shirts').insert({design_id: 2, color_id: 2, size_id: 2, quantity: 3, price:25}),
    knex('shirts').insert({design_id: 2, color_id: 2, size_id: 1, quantity: 5, price:25}),
    knex('shirts').insert({design_id: 3, color_id: 2, size_id: 1, quantity: 1, price:25}),
    knex('shirts').insert({design_id: 3, color_id: 4, size_id: 3, quantity: 6, price:25}),
    knex('shirts').insert({design_id: 3, color_id: 4, size_id: 2, quantity: 15, price:25}),
    knex('shirts').insert({design_id: 3, color_id: 4, size_id: 1, quantity: 17, price:25}),
    knex('shirts').insert({design_id: 4, color_id: 1, size_id: 3, quantity: 4, price:25}),
    knex('shirts').insert({design_id: 4, color_id: 1, size_id: 2, quantity: 7, price:25}),
    knex('shirts').insert({design_id: 4, color_id: 1, size_id: 1, quantity: 7, price:25}),
    knex('shirts').insert({design_id: 4, color_id: 2, size_id: 3, quantity: 9, price:25}),
    knex('shirts').insert({design_id: 4, color_id: 2, size_id: 2, quantity: 12, price:25}),
    knex('shirts').insert({design_id: 4, color_id: 3, size_id: 3, quantity: 2, price:25}),
    knex('shirts').insert({design_id: 4, color_id: 3, size_id: 2, quantity: 16, price:25}),
    knex('shirts').insert({design_id: 4, color_id: 3, size_id: 1, quantity: 5, price:25}),
    knex('shirts').insert({design_id: 4, color_id: 4, size_id: 3, quantity: 4, price:25}),
    knex('shirts').insert({design_id: 4, color_id: 4, size_id: 2, quantity: 10, price:25}),
    knex('shirts').insert({design_id: 4, color_id: 4, size_id: 1, quantity: 5, price:25}),
    knex('shirts').insert({design_id: 5, color_id: 4, size_id: 3, quantity: 17, price:25}),
    knex('shirts').insert({design_id: 5, color_id: 4, size_id: 2, quantity: 30, price:25}),
    knex('shirts').insert({design_id: 5, color_id: 4, size_id: 1, quantity: 14, price:25}),
    knex('shirts').insert({design_id: 5, color_id: 2, size_id: 3, quantity: 21, price:25}),
    knex('shirts').insert({design_id: 5, color_id: 2, size_id: 2, quantity: 41, price:25})
  );
};
