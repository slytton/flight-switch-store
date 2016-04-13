var express = require('express');
var router = express.Router();
var bookshelf = require('../db/config.js');

function isAdmin(req, res, next) {
  var user_id = req.session.id;
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

function isUser(req, res, next) {
  var user_id = req.session.id;
  if (user_id) {
    next();
  } else {
    res.redirect(401, '/');
  }
};

router.get('/', isUser, isAdmin, function(req, res, next) {
  bookshelf.Shirt.fetchAll({withRelated: ['designs', 'colors', 'sizes', 'shirtImageUrl']})
  .then(function(shirts) {
    var products = shirts.serialize();
    bookshelf.Order.fetchAll({withRealated: ['users', 'status', 'orderItems', 'shirts']})
    .then(function(ordRes) {
      var orders = ordRes.serialize();
      bookshelf.knex.columns(['id','email', 'admin']).select().from('users')
      .then(function(users) {
        console.log(users);
        res.render('./admin/admin', {shirts: products, orders: orders, users: users});
      })
    })
  })
});


module.exports = router;
