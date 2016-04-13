var express = require('express');
var router = express.Router();
var bookshelf = require('../db/config.js');

function isAdmin(req, res, next) {
  if(res.user.admin){
    next();
  }
  else {
    res.redirect(401, '/');
  }
};

function isUser(req, res, next) {
  console.log(res.user);

  if (res.user) {
    next();
  } else {
    res.redirect(401, '/');
  }
};

router.get('/', isUser, isAdmin, function(req, res, next) {
  bookshelf.Shirt.query(function(data){ data.orderBy('id', 'ascend')}).fetchAll({withRelated: ['designs', 'colors', 'sizes', 'shirtImageUrl', ]})
  .then(function(shirts) {
    var products = shirts.serialize();
    bookshelf.Order.query(function(data){ data.orderBy('id', 'ascend')}).fetchAll({withRealated: ['users', 'status', 'orderItems', 'shirts']})
    .then(function(ordRes) {
      var orders = ordRes.serialize();
      bookshelf.knex.columns(['id','email', 'admin', 'fname', 'lname']).select().from('users').orderBy('id')
      .then(function(users) {
        bookshelf.knex('shirt_image_urls')
        .then(function(images) {
          console.log(products);
          res.render('./admin/admin', {shirts: products, orders: orders, users: users, images: images});
        })
      })
    })
  })
});

router.post('/product/:id', function(req, res, next) {
  bookshelf.Shirt.where({id: req.params.id}).fetch({withRelated: ['designs', 'colors', 'sizes']}).then(function(product){
    product.save({quantity: req.body.quantity, price: req.body.price, shirt_image_url_id: req.body.imageurls},{patch: true});
    res.redirect('/admin');
  });
});

router.get('/product/:id/delete', function(req, res, next) {
  bookshelf.Shirt.where({id:req.params.id}).destroy();
  res.redirect('/admin');
});

router.post('/orders/:id', function(req, res, next) {
  bookshelf.Order.where({id: req.params.id}).fetch().then(function(order){
    order.set({address: req.body.address, city: req.body.city, state: req.body.state, zip: req.body.zip, order_status_id: req.body.order_status_id}).save();
    res.redirect('/admin');
  });
});

router.post('/users/:id', function(req, res, next) {
  bookshelf.User.where({id: req.params.id}).fetch().then(function(user){
    user.set({fname: req.body.fname, lname: req.body.lname, mail: req.body.email, admin: req.body.isadmin}).save();
    res.redirect('/admin');
  });
});

router.get('/users/:id/delete', function(req, res, next) {
  bookshelf.User.where({id:req.params.id}).destroy();
  res.redirect('/admin');
});







// router.get('/product/add', function(req, res, next) {
//   bookshelf.knex('shirt_image_urls')
//   .then(function(images) {
//     console.log(images);
//     res.render('./admin/addproduct', {images: images});
//   })
// });

// router.get('/product/:id/add', function(req, res, next) {
//   bookshelf.Shirt.where({id:req.params.id}).destroy();
//   res.redirect('/admin');
// });
//




module.exports = router;
