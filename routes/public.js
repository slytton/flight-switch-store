var express = require('express');
var router = express.Router();
var bookshelf = require('../db/config.js');
var stripe = require("stripe")(process.env.STRIPE_SECRET);
/* GET home page. */

function isUser(req, res, next) {
  var user_id = req.session.id;
  if (user_id) {
    next();
  } else {
    res.redirect(401, '/');
  }
};

function authenticUser(req, res, next) {
  if(req.signedCookies.userID === req.params.id) {
    next();
  }else{
    res.redirect(401, '/');
  }

};

router.get('/shirt/:design/:color', function(req, res, next) {
  var shirtid = req.params.design;
  res.render('shirt', { design: design });
});

router.get('/logout', function(req, res, next) {
  res.redirect('/auth/logout');
});

router.get('/shirt/:id', function(req, res, next) {
  var shirtid = req.params.id;
  res.render('shirt', { shirt: shirt });
});

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

  bookshelf.ShirtImageUrl.collection().fetch({withRelated: ['shirts']}).then(function(shirts){

    var message = req.session.message;
    req.session.message = null;
    console.log();
    res.render('index', {shirts: shirts.serialize(), message: message});
    // res.json(shirts);
  })
});

router.use('*', function(req, res, next){
  res.user ? res.redirect('/') : next();
})

router.get('/login', function(req, res, next) {
  var message = req.session.message;
  req.session.message = null;
  res.render('./public/login', {message: message});
});

router.get('/register', function(req, res, next) {
  var message = req.session.message;
  req.session.message = null;
  res.render('./public/register', {message: message});
});


module.exports = router;
