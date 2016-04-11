var knexConfig = require('../knexfile.js')['development'];
var knex= require('knex')(knexConfig);


module.exports = require('bookshelf')(knex);
