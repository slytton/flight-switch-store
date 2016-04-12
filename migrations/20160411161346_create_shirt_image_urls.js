
exports.up = function(knex, Promise) {
  return knex.schema.createTable('shirt_image_urls', function(table){
    table.increments();
    table.string('url');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shirt_image_urls');
};
