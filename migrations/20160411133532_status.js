
exports.up = function(knex, Promise) {
  return knex.schema.table('order_status', function(table){
      table.dropColumn('name');
      table.string('status');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('order_status', function(table){
      table.dropColumn('status');
      table.string('name');
  });
};
