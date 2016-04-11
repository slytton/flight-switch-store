
exports.up = function(knex, Promise) {
  return knex.schema.createTable('order_status', function(table){
    table.increments();
    table.string('name').notNull();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('order_status');
};
