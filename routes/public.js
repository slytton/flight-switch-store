var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);
var stripe = require("stripe")(process.env.STRIPE_SECRET);
/* GET home page. */

router.get('/shirt/:design/:color', function(req, res, next) {
  var shirtid = req.params.design;
  res.render('shirt', { design: design });
});

router.post('/checkout', function(req, res, next) {
  var orderDetails = req.body;
  console.log(req.session);
  console.log(orderDetails);
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
  // var placeHolder = [1,2,3,4,5,6,7,8,9,10,11]
  return knex('shirts')
    .innerJoin('shirt_image_urls', 'shirts.shirt_image_url_id', 'shirt_image_urls.id')
    .then(function(shirts){
      console.log(shirts);
      res.render('index', { shirts: shirts });
    })
});

router.use('*', function(req, res, next){
  console.log('instart');
  res.user ? res.redirect('/') : next();
})

router.get('/login', function(req, res, next){
  console.log('Login');
  res.render('public/login');
})

module.exports = router;
