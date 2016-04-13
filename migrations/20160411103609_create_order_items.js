
exports.up = function(knex, Promise) {
  return knex.schema.createTable('order_items', function(table){
    table.increments();
    table.integer('shirt_id').unsigned().references('id').inTable('shirts').onDelete('cascade').onUpdate('cascade');
    table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('cascade').onUpdate('cascade');
    table.integer('quantity');
    table.float('price');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('order_items');
};
