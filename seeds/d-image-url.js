
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('shirt_image_urls').del(),

    // Inserts seed entries
    knex('shirt_image_urls').insert({id: 1, url: './public/images/astroblack.jpg'}),
    knex('shirt_image_urls').insert({id: 2, url: './public/images/cityblue.jpg'}),
    knex('shirt_image_urls').insert({id: 3, url: './public/images/citygrey.jpg'}),
    knex('shirt_image_urls').insert({id: 4, url: './public/images/citywhite.jpg'}),
    knex('shirt_image_urls').insert({id: 5, url: './public/images/flagblack.jpg'}),
    knex('shirt_image_urls').insert({id: 6, url: './public/images/flagblue.jpg'}),
    knex('shirt_image_urls').insert({id: 7, url: './public/images/flagred.jpg'}),
    knex('shirt_image_urls').insert({id: 8, url: './public/images/flagwhite.jpg'}),
    knex('shirt_image_urls').insert({id: 9, url: './public/images/soldierwhite.jpg'}),
    knex('shirt_image_urls').insert({id: 10, url: './public/images/logoblack.jpg'}),
    knex('shirt_image_urls').insert({id: 11, url: './public/images/logowhite.jpg'}),
    knex('shirt_image_urls').insert({id: 12, url: './public/images/astrowhite.jpg'})
  );
};
