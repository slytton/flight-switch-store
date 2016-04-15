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

  if (res.user) {
    next();
  } else {
    res.redirect(401, '/');
  }
};

router.get('/product/add', function(req, res, next) {
  bookshelf.knex('shirt_image_urls')
  .then(function(images) {
    bookshelf.knex('colors')
    .then(function(colors) {
      bookshelf.knex('sizes')
      .then(function(sizes) {
        res.render('./admin/addproduct', {images: images, colors: colors, sizes: sizes});
      })
    })
  })
});

router.post('/product/add', function(req, res, next) {

  bookshelf.knex('designs').where({name: req.body.designs_name})
  .then(function(designs) {
    if(!designs[0]) {
      new bookshelf.Design({name: req.body.designs_name}).save();
    }
  }).then(function(){
    bookshelf.knex('colors').where({color: req.body.colors_color})
    .then(function(colors) {
      if(!colors) {
        new bookshelf.Color({name: req.body.colors_color}).save();
      }
    })
  })
  .then(function(){
    bookshelf.knex('sizes').where({size: req.body.sizes_size})
    .then(function(sizes) {
      if(!sizes[0]) {
        new bookshelf.Size({size: req.body.sizes_size}).save();
      }
    })
  })
  .then(function() {
    bookshelf.knex('shirt_image_urls').where({url: req.body.shirtImageUrl_url})
    .then(function(urls) {
      if(!urls[0]) {
        new bookshelf.ShirtImageUrl({url: req.body.shirtImageUrl_url}).save();
      }
    })
  })
  .then(function(){
    bookshelf.knex('designs').where({name: req.body.designs_name})
    .then(function(design) {
      var designId = design[0].id;
      bookshelf.knex('colors').where({color: req.body.colors_color})
      .then(function(color) {
        var colorId = color[0].id;
        bookshelf.knex('sizes').where({size: req.body.sizes_size})
        .then(function(size) {
          var sizeId = size[0].id;
          bookshelf.knex('shirt_image_urls').where({url: req.body.shirtImageUrl_url})
          .then(function(image) {
            var urlId = image[0].id;
            new bookshelf.Shirt({design_id: designId, color_id: colorId, size_id: sizeId, shirt_image_url_id: urlId, quantity: + req.body.quantity, price: + req.body.price}).save();
            res.redirect('/admin');
          })
        })
      })
    })
  })
});

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
          res.render('./admin/admin', {shirts: products, orders: orders, users: users, images: images});
        })
      })
    })
  })
});

router.post('/product/:id', function(req, res, next) {
  bookshelf.Shirt.where({id: req.params.id}).fetch({withRelated: ['designs', 'colors', 'sizes', 'shirtImageUrl']}).then(function(product){
    product.save({quantity: req.body.quantity, price: req.body.price, shirt_image_url_id: req.body.imageurls})
    res.redirect('/admin');
  });
});

router.get('/product/:id/delete', function(req, res, next) {
  bookshelf.Shirt.where({id:req.params.id}).destroy();
  res.redirect('/admin');
});

router.post('/orders/:id', function(req, res, next) {
  bookshelf.Order.where({id: req.params.id}).fetch().then(function(order){
    console.log(req.body.city);
    order.save({address: req.body.address, city: req.body.city, state: req.body.state, zip: req.body.zip, order_status_id: req.body.order_status_id})
    res.redirect('/admin');
  });
});

router.post('/users/:id', function(req, res, next) {
  bookshelf.User.where({id: req.params.id}).fetch().then(function(user){
    user.save({fname: req.body.fname, lname: req.body.lname, email: req.body.email, admin: req.body.isadmin}, {patch: true})
    res.redirect('/admin');
  });
});

router.get('/users/:id/delete', function(req, res, next) {
  bookshelf.User.where({id:req.params.id}).destroy();
  res.redirect('/admin');
});


module.exports = router;
