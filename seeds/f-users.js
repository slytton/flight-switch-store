var bcrypt = require('bcrypt');
var password = bcrypt.hashSync('password', 8);
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({gid: null, admin: true, password: password, email: 'user1@example.com', fname: 'fname1', lname: 'lname1'}),
    knex('users').insert({gid: null, admin: false, password: password, email: 'user2@example.com', fname: 'fname2', lname: 'lname2'}),
    knex('users').insert({gid: null, admin: false, password: password, email: 'user3@example.com', fname: 'fname3', lname: 'lname3'}),
    knex('users').insert({gid: null, admin: false, password: password, email: 'user4@example.com', fname: 'fname4', lname: 'lname4'})
  );
};
