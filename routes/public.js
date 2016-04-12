var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);
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

function isAdmin(req, res, next) {
  var user_id = req.session.userID;
  knex('users').where({
    id: user_id
  }).then(function(user) {
    if(user[0].admin){
      next();
    }
    else {
      res.redirect(401, '/');
    }
  });
};

router.get('/shirt/:design/:color', function(req, res, next) {
  var shirtid = req.params.design;
  res.render('shirt', { design: design });
});



router.get('/login', function(req, res, next) {
  res.render('./public/login');
});

router.get('/register', function(req, res, next) {
  res.render('./public/register');
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
  var placeHolder = [1,2,3,4,5,6,7,8,9,10,11]
  res.render('index', { shirts: placeHolder });
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
