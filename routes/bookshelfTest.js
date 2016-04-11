var express = require('express');
var router = express.Router();
var bookshelf = require('../db/config.js');

/* GET home page. */
router.get('/', function(req, res, next) {


  // new bookshelf.User({fname: 'Bob', lname:'Lytton', password:'password', email:'test@test.com'}).save().then(function(model) {
  // })

  bookshelf.User.where({id:1}).fetch().then(function(user){
    console.log(user.set({fname: 'Conrad', lname: 'Bailey'}).save());
  });
  res.render('index', { title: 'Express' });
});

router.get('/delete/:id', function(req, res, next) {

  bookshelf.User.where({id:req.params.id}).destroy().then(function(user){
    console.log(user);
  });
  res.render('index', { title: 'Express' });
});

router.get('/order/create', function(req, res, next) {
  new bookshelf.Order({user_id: 1, address:"1234 Street St.", city:"Boulder", state:"CO", zip:"80504"}).save().then(function(order){
    console.log(order);

    new bookshelf.OrderItem({shirt_id:1, order_id: order.id, price: 25, quantity: 2})
  })
});

router.get('/order/:id/list', function(req, res, next) {
  bookshelf.User.where({id: req.params.id}).fetch({withRelated: ['orders']}).then(function(orders){
    res.json(orders);
  })
})

router.get('/order/:id/update', function(req, res, next) {
  bookshelf.Order.where({id: req.params.id}).save({address:"12345 test st", city: 'Denver'}, {patch: true}).then(function(order){
    console.log(order);
    res.redirect('/');
  })
})

router.get('/item/create', function(req, res, next){
  new bookshelf.Shirt({quantity: 5}).save().then(function(order){
    console.log(order);
  })

})

module.exports = router;
