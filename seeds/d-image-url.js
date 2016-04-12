
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('shirt_image_urls').del(),

    // Inserts seed entries
    knex('shirt_image_urls').insert({id: 1, url: '../images/astroblack.jpg'}),
    knex('shirt_image_urls').insert({id: 2, url: '../images/cityblue.jpg'}),
    knex('shirt_image_urls').insert({id: 3, url: '../images/citygrey.jpg'}),
    knex('shirt_image_urls').insert({id: 4, url: '../images/citywhite.jpg'}),
    knex('shirt_image_urls').insert({id: 5, url: '../images/flagblack.jpg'}),
    knex('shirt_image_urls').insert({id: 6, url: '../images/flagblue.jpg'}),
    knex('shirt_image_urls').insert({id: 7, url: '../images/flagred.jpg'}),
    knex('shirt_image_urls').insert({id: 8, url: '../images/flagwhite.jpg'}),
    knex('shirt_image_urls').insert({id: 9, url: '../images/soldierwhite.jpg'}),
    knex('shirt_image_urls').insert({id: 10, url: '../images/logoblack.jpg'}),
    knex('shirt_image_urls').insert({id: 11, url: '../images/logowhite.jpg'}),
    knex('shirt_image_urls').insert({id: 12, url: '../images/astrowhite.jpg'})
  );
};
