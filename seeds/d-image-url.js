
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('shirt_image_urls').del(),

    // Inserts seed entries
    knex('shirt_image_urls').insert({url: '/images/astroblack.jpg'}),
    knex('shirt_image_urls').insert({url: '/images/cityblue.jpg'}),
    knex('shirt_image_urls').insert({url: '/images/citygrey.jpg'}),
    knex('shirt_image_urls').insert({url: '/images/citywhite.jpg'}),
    knex('shirt_image_urls').insert({url: '/images/flagblack.jpg'}),
    knex('shirt_image_urls').insert({url: '/images/flagblue.jpg'}),
    knex('shirt_image_urls').insert({url: '/images/flagred.jpg'}),
    knex('shirt_image_urls').insert({url: '/images/flagwhite.jpg'}),
    knex('shirt_image_urls').insert({url: '/images/soldierwhite.jpg'}),
    knex('shirt_image_urls').insert({url: '/images/logoblack.jpg'}),
    knex('shirt_image_urls').insert({url: '/images/logowhite.jpg'})
  );
};
