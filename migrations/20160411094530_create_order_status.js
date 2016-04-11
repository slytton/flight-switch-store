
exports.up = function(knex, Promise) {
  return knex.schema.createTable('order_status', function(table){
    table.increments();
    table.string('status').notNull();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('order_status');
};
