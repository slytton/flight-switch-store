
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({id: 1, gid: null, admin: true, password: '', email: 'ahoymatey@argh.com', fname: 'black', lname: 'beard'}),
    knex('users').insert({id: 2, gid: null, admin: false, password: '', email: 'deadsquirrel@hair.com', fname: 'donald', lname: 'trump'}),
    knex('users').insert({id: 3, gid: null, admin: false, password: '', email: 'mspiggy@muppets.com', fname: 'hilary', lname: 'clinton'}),
    knex('users').insert({id: 4, gid: null, admin: false, password: '', email: 'theman@awesome.com', fname: 'bernie', lname: 'sanders'}),
  );
};
