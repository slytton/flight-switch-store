
exports.up = function(knex, Promise) {
  return knex.schema.createTable('colors', function(table){
    table.increments();
    table.string('color', 10);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('colors');
};
