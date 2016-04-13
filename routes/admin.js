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
  bookshelf.Order.fetchAll({withRealated: ['users', 'status', 'ordeItems', 'shirts']})
  .then(function(ordRes) {
    var orders = ordRes.serialize();
    bookshelf.knex.columns(['id','email', 'admin']).select().from('users')
    .then(function(users) {
      res.render('./admin/admin', {shirts: products, orders: orders, users: users});
    })
  })
})
});

router.post('/product/:id', function(req, res, next) {
  bookshelf.Shirt.where({id: req.params.id}).fetch({withRelated: ['designs', 'colors', 'sizes', 'shirtImageUrl']}).then(function(product){
    product.set({design_id: req.body.design_id, size_id: req.body.size_id, color_id: req.body.color_id, quantity: req.body.quantity, price: req.body.price, shirt_image_url_id: req.body.shirt_image_url_id}).save();
    res.redirect('/admin');
  });
});

router.get('/product/:id/delete', function(req, res, next) {
  bookshelf.Shirt.where({id:req.params.id}).destroy();
    res.redirect('/admin');
});

router.post('/order/:id', function(req, res, next) {
  bookshelf.Order.where({id: req.params.id}).fetch().then(function(order){
    order.set({address: req.body.address, city: req.body.city, state: req.body.state, zip: req.body.zip, order_status_id: req.body.OrderStatus}).save();
    res.redirect('/admin');
  });
});


router.post('/users/:id', function(req, res, next) {
  bookshelf.User.where({id: req.params.id}).fetch().then(function(user){
    user.set({email: req.body.email, admin: req.body.admin}).save();
    res.redirect('/admin');
  });
});

router.get('/users/:id/delete', function(req, res, next) {
  bookshelf.User.where({id:req.params.id}).destroy();
    res.redirect('/admin');
});


module.exports = router;
