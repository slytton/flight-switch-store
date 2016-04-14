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
    res.render('./user/account', {details: userserial, orders: userserial.orders})
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
