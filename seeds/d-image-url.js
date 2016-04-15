
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('shirt_image_urls').del(),

    // Inserts seed entries
    knex('shirt_image_urls').insert({url: '/images/astroblack.png'}),
    knex('shirt_image_urls').insert({url: '/images/cityblue.png'}),
    knex('shirt_image_urls').insert({url: '/images/citygrey.png'}),
    knex('shirt_image_urls').insert({url: '/images/citywhite.png'}),
    knex('shirt_image_urls').insert({url: '/images/flagblack.png'}),
    knex('shirt_image_urls').insert({url: '/images/flagblue.png'}),
    knex('shirt_image_urls').insert({url: '/images/flagred.png'}),
    knex('shirt_image_urls').insert({url: '/images/flagwhite.png'}),
    knex('shirt_image_urls').insert({url: '/images/soldierwhite.png'}),
    knex('shirt_image_urls').insert({url: '/images/logoblack.png'}),
    knex('shirt_image_urls').insert({url: '/images/logowhite.png'})
  );
};
