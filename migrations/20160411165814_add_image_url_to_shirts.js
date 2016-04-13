
exports.up = function(knex, Promise) {
  return knex.schema.table('shirts', function(table){
    table.integer('shirt_image_url_id').unsigned().references('id').inTable('shirt_image_urls').onDelete('cascade').onUpdate('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('shirts', function(table){
    table.dropColumn('shirt_image_url_id');
  })
};
