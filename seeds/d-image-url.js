
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('shirt_image_urls').del(),

    // Inserts seed entries
    knex('shirt_image_urls').insert({id: 1, url: 'http://localhost:3000/images/astroblack.jpg'}),
    knex('shirt_image_urls').insert({id: 2, url: 'http://localhost:3000/images/cityblue.jpg'}),
    knex('shirt_image_urls').insert({id: 3, url: 'http://localhost:3000/images/citygrey.jpg'}),
    knex('shirt_image_urls').insert({id: 4, url: 'http://localhost:3000/images/citywhite.jpg'}),
    knex('shirt_image_urls').insert({id: 5, url: 'http://localhost:3000/images/flagblack.jpg'}),
    knex('shirt_image_urls').insert({id: 6, url: 'http://localhost:3000/images/flagblue.jpg'}),
    knex('shirt_image_urls').insert({id: 7, url: 'http://localhost:3000/images/flagred.jpg'}),
    knex('shirt_image_urls').insert({id: 8, url: 'http://localhost:3000/images/flagwhite.jpg'}),
    knex('shirt_image_urls').insert({id: 9, url: 'http://localhost:3000/images/soldierwhite.jpg'}),
    knex('shirt_image_urls').insert({id: 10, url: 'http://localhost:3000/images/logoblack.jpg'}),
    knex('shirt_image_urls').insert({id: 11, url: 'http://localhost:3000/images/logowhite.jpg'}),
    knex('shirt_image_urls').insert({id: 12, url: 'http://localhost:3000/images/astrowhite.jpg'})
  );
};
