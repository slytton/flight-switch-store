
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('shirts').del(),

    // Inserts seed entries
    knex('shirts').insert({id: 1, design_id: 1, color_id: 2, size_id: 3, quantity: 22}),
    knex('shirts').insert({id: 2, design_id: 1, color_id: 2, size_id: 2, quantity: 26}),
    knex('shirts').insert({id: 3, design_id: 1, color_id: 2, size_id: 1, quantity: 21}),
    knex('shirts').insert({id: 4, design_id: 2, color_id: 3, size_id: 3, quantity: 2}),
    knex('shirts').insert({id: 5, design_id: 2, color_id: 3, size_id: 2, quantity: 1}),
    knex('shirts').insert({id: 6, design_id: 2, color_id: 3, size_id: 1, quantity: 6}),
    knex('shirts').insert({id: 7, design_id: 2, color_id: 5, size_id: 2, quantity: 9}),
    knex('shirts').insert({id: 8, design_id: 2, color_id: 5, size_id: 1, quantity: 15}),
    knex('shirts').insert({id: 9, design_id: 2, color_id: 2, size_id: 3, quantity: 6}),
    knex('shirts').insert({id: 10, design_id: 2, color_id: 2, size_id: 2, quantity: 3}),
    knex('shirts').insert({id: 11, design_id: 2, color_id: 2, size_id: 1, quantity: 5}),
    knex('shirts').insert({id: 12, design_id: 3, color_id: 2, size_id: 1, quantity: 1}),
    knex('shirts').insert({id: 13, design_id: 3, color_id: 4, size_id: 3, quantity: 6}),
    knex('shirts').insert({id: 14, design_id: 3, color_id: 4, size_id: 2, quantity: 15}),
    knex('shirts').insert({id: 15, design_id: 3, color_id: 4, size_id: 1, quantity: 17}),
    knex('shirts').insert({id: 16, design_id: 4, color_id: 1, size_id: 3, quantity: 4}),
    knex('shirts').insert({id: 17, design_id: 4, color_id: 1, size_id: 2, quantity: 7}),
    knex('shirts').insert({id: 18, design_id: 4, color_id: 1, size_id: 1, quantity: 7}),
    knex('shirts').insert({id: 19, design_id: 4, color_id: 2, size_id: 3, quantity: 9}),
    knex('shirts').insert({id: 20, design_id: 4, color_id: 2, size_id: 2, quantity: 12}),
    knex('shirts').insert({id: 21, design_id: 4, color_id: 3, size_id: 3, quantity: 2}),
    knex('shirts').insert({id: 22, design_id: 4, color_id: 3, size_id: 2, quantity: 16}),
    knex('shirts').insert({id: 23, design_id: 4, color_id: 3, size_id: 1, quantity: 5}),
    knex('shirts').insert({id: 24, design_id: 4, color_id: 4, size_id: 3, quantity: 4}),
    knex('shirts').insert({id: 25, design_id: 4, color_id: 4, size_id: 2, quantity: 10}),
    knex('shirts').insert({id: 26, design_id: 4, color_id: 4, size_id: 1, quantity: 5}),
    knex('shirts').insert({id: 27, design_id: 5, color_id: 4, size_id: 3, quantity: 17}),
    knex('shirts').insert({id: 28, design_id: 5, color_id: 4, size_id: 2, quantity: 30}),
    knex('shirts').insert({id: 29, design_id: 5, color_id: 4, size_id: 1, quantity: 14}),
    knex('shirts').insert({id: 30, design_id: 5, color_id: 2, size_id: 3, quantity: 21}),
    knex('shirts').insert({id: 31, design_id: 5, color_id: 2, size_id: 2, quantity: 41})
  );
};
