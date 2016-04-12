var express = require('express');
var router = express.Router();
var bookshelf = require('../db/config.js');
function isAdmin(req, res, next) {
  var user_id = req.session.userID;
  bookshelf.knex('users').where({
    id: user_id
  }).then(function(user) {
    if(user[0].admin){
      next();
    }
    else {
      res.redirect(401, '/');
    }
  });
};

module.exports = router;
