
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('orders').del(),

    // Inserts seed entries
    knex('orders').insert({user_id: 4, address: '123 main st', city: 'Coolville', state: 'CO', zip: '80010', order_status_id: 1, created_at: '2016-01-11T20:17:18.356Z' , updated_at: '2016-02-11T20:17:18.356Z'}),
    knex('orders').insert({user_id: 3, address: '321 bitch ave', city: 'New York', state: 'NY', zip: '11111', order_status_id: 2, created_at: '2016-02-11T20:17:18.356Z' , updated_at: '2016-02-14T20:17:18.356Z'}),
    knex('orders').insert({user_id: 4, address: '123 main st', city: 'Coolville', state: 'CO', zip: '80010', order_status_id: 2, created_at: '2016-03-11T20:17:18.356Z' , updated_at: '2016-03-14T20:17:18.356Z'}),
    knex('orders').insert({user_id: 4, address: '123 main st', city: 'Coolville', state: 'CO', zip: '80010', order_status_id: 3, created_at: '2016-04-01T20:17:18.356Z' , updated_at: '2016-04-10T20:17:18.356Z'})
  );
};
