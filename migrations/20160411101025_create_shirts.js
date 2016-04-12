
exports.up = function(knex, Promise) {
  return knex.schema.createTable('shirts', function(table){
    table.increments();
    table.integer('design_id').unsigned().references('id').inTable('designs').onDelete('cascade');
    table.integer('size_id').unsigned().references('id').inTable('sizes').onDelete('cascade');
    table.integer('color_id').unsigned().references('id').inTable('colors').onDelete('cascade');
    table.integer('quantity').unsigned().notNull();
    table.float('price').notNull();
  });
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('shirts');
};
