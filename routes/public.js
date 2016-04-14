var express = require('express');
var router = express.Router();
var bookshelf = require('../db/config.js');
var stripe = require("stripe")(process.env.STRIPE_SECRET);
/* GET home page. */

var populateCart = require('../lib/populate-cart-locals');

function isNotLoggedIn(req, res, next){
  res.user ? res.redirect('/') : next();
}
function isLoggedIn(req, res, next) {
  !res.user ? res.redirect('/login') : next();
}
function hasCart(req, res, next) {
  req.session.cart ? next() : res.redirect('/')
}
router.post('/checkout', function(req, res, next) {
  var orderDetails = req.body;
  res.render('checkout');

  var charge = stripe.charges.create({
    amount: 2000, // amount in cents, again
    currency: "usd",
    source: orderDetails.stripeToken,
    description: "Example charge"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
    }
  });
});

router.get('/checkout', isLoggedIn, populateCart, hasCart, function(req, res, next) {

    // // if(!req.session.cart) req.session.cart = {};
    // // if(req.body){
    // //   if(!req.session.cart[req.body.shirt_id]) req.session.cart[req.body.shirt_id] = 0;
    // //   req.session.cart[req.body.shirt_id] += +req.body.quantity;
    // // }
    //
    // var cart = req.session.cart;
    // var orderTotal = 0;
    // var totalItems = 0;
    // var response = { messages:{}, html: "" }
    // var promises = [];
    //
    // delete cart[undefined];
    // itemIds = Object.keys(cart);
    // for (var item_id in cart) {
    //   if (cart.hasOwnProperty(item_id)) {
    //     promises.push(bookshelf.Shirt.where('id', item_id).fetch({withRelated: ['colors', 'sizes', 'designs', 'shirtImageUrl']}));
    //   }
    // }
    // Promise.all(promises).then(function(shirts){
    //   shirts = shirts.map(function(shirt, index){
    //     shirt = shirt.serialize();
    //     shirt.quantityOrdered = cart[itemIds[index]];
    //     shirt.subTotal = +shirt.quantityOrdered * +shirt.price;
    //     orderTotal += shirt.subTotal;
    //     totalItems += shirt.quantityOrdered;
    //     return shirt;
    //   })
    //   console.log(shirts);
      res.render('checkout')
    // });
});

router.get('/', function(req, res, next) {
      res.redirect('/shirts')
});


router.get('/login', isNotLoggedIn, function(req, res, next) {
  var message = req.session.message;
  req.session.message = null;
  res.render('./public/login', {message: message});
});

router.get('/register', isNotLoggedIn, function(req, res, next) {
  var message = req.session.message;
  req.session.message = null;
  res.render('./public/register', {message: message});
});

router.post('/cart', function(req, res, next){
  res.json(req.body)
})

module.exports = router;
