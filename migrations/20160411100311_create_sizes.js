
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sizes', function(table){
    table.increments();
    table.string('size', 4);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sizes');

};
