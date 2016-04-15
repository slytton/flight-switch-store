var express = require('express');
var router = express.Router();
var bookshelf = require('../db/config.js');
var bcrypt = require('bcrypt');

function isUser(req, res, next) {
  var user_id = req.session.id;
  if (user_id) {
    next();
  } else {
    res.redirect(401, '/');
  }
};

function authenticUser(req, res, next) {
  var user_id = req.session.id;
  if(user_id == req.params.id) {
    next();
  }else{
    res.redirect(401, '/');
  }
};

// router.post('/order/:id/edit', function(req, res, next){
//   bookshelf.Order.where({id: req.params.id}).fetch().then(function(order){
//     order.set({address: req.body.address, city: req.body.city, state: req.body.state, zip: req.body.zip, order_status_id: req.body.OrderStatus}).save();
//     res.redirect('/users');
//   });
// })

router.get('/:id', function(req, res, next){
  bookshelf.User.where({id: req.params.id}).fetch({withRelated: ['orders']})
  .then(function(user) {
    var userserial = user.serialize();
    bookshelf.Shirt.query(function(data){ data.orderBy('id', 'ascend')}).fetchAll({withRelated: ['designs', 'colors', 'sizes', 'shirtImageUrl', ]})
    .then(function(shirts) {
      var products = shirts.serialize();
      bookshelf.Order.query(function(data){ data.orderBy('id', 'ascend')}).fetchAll({withRelated: ['users', 'status', 'orderItems']})
      .then(function(ordRes) {
        var orders = ordRes.serialize();



        orders = orders.map(function(order){
          order.total =  order.orderItems.reduce(function(prev, item){
            return prev += item.price * item.quantity;
          },0);
          order.orderItems = order.orderItems.map(function(orderItem){
            products.forEach(function(shirt){
              //console.log(shirt);
              if(shirt.id === orderItem.shirt_id){
                orderItem.shirt = shirt;
              }
            })
            console.log(orderItem);
            return orderItem;
          })
          return order;
        });

        res.render('./user/account', {details: userserial, orders: userserial.orders, shirts: products, ordertotal: orders})
      })
    })
  })
});

router.get('/:id/edit', function(req, res, next){
  bookshelf.knex('users').where({id: req.params.id})
  .then(function(user) {
    res.render('./user/editaccount', {user: user})
  })
});

router.post('/:id/edit', function(req, res, next){
  if(req.body.password){

    bookshelf.User.where({id: req.params.id}).fetch().then(function(user){
      var userserial = user.serialize();
      if( userserial && bcrypt.compareSync(req.body.password, userserial.password)){
        if( req.body.newpassword === req.body.verifypassword) {
          var hash = bcrypt.hashSync(req.body.newpassword, 8);
          user.save({password: hash}, {patch: true});
          res.redirect("/users/" +req.params.id)
        } else {
          res.redirect("/users/" + req.params.id +"edit");
        }
      } else {
        res.redirect("/users/" + req.params.id +"edit");
      }
    })
  } else {
    bookshelf.User.where({id: req.params.id}).fetch().then(function(user){
      console.log('hello');
      user.save({fname: req.body.fname, lname: req.body.lname, email: req.body.email}, {patch: true});
      res.redirect("/users/" + req.params.id);
    });
  }
});

//
// router.post('/:id/delete', isUser, authenticUser, function(req, res, next){
//   bookshelf.User.where({id:req.params.id}).destroy();
//   res.redirect('/');
// })

module.exports = router;
