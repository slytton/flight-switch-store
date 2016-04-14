var express = require('express');
var router = express.Router();
var bookshelf = require('../db/config.js');
var stripe = require("stripe")(process.env.STRIPE_SECRET);
/* GET home page. */

function isNotLoggedIn(req, res, next){
  res.user ? res.redirect('/') : next();
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

router.get('/checkout', function(req, res, next) {
  res.render('checkout');
});

router.get('/', function(req, res, next) {
      // var message = req.session.message;
      // req.session.message = null;
      // res.render('index', {shirts: req.result.shirts, message: message});
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
