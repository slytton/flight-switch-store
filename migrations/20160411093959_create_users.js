
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.integer('gid').unsigned();
    table.boolean('admin').defaultTo('false');
    table.string('password').notNull();
    table.string('email').notNull();
    table.string('fname').notNull();
    table.string('lname').notNull();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
