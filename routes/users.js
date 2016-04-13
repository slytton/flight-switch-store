var express = require('express');
var router = express.Router();
var bookshelf = require('../db/config.js');

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
    res.render('./user/account', {details: userserial, orders: userserial.orders})
  })
});

router.get('/:id/info', isUser, function(req, res, next){
  bookshelf.knex('users').where({id: req.params.id})
  .then(function(user) {
    res.render('./user/account', {user: user})
  })
});

// router.post('/:id/edit', function(req, res, next){
//   bookshelf.User.where({id: req.params.id}).fetch().then(function(user){
//     if( user && bcrypt.compareSync(req.body.password, user.password)){
//       var hash = bcrypt.hashSync(req.body.password, 8);
//       user.set({fname: req.body.fname, lname: req.params.lname, email: req.body.email, password: hash}).save();
//     }
//     else {
//       res.redirect('')
//     }
//   })
// });
//
// router.post('/:id/delete', isUser, authenticUser, function(req, res, next){
//   bookshelf.User.where({id:req.params.id}).destroy();
//   res.redirect('/');
// })

module.exports = router;
