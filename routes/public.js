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
  var result = {}
  var sortObj = {'xs':0, 's':1, 'm':2, 'l':3, 'xl':4}
  bookshelf.Shirt.collection().fetch({withRelated: ['colors', 'sizes', 'designs']}).then(function(shirt){
    result.shirt = shirt.serialize();
    return bookshelf.ShirtImageUrl.collection().fetch({withRelated: ['shirts']}).then(function(shirts){
      result.shirts = shirts.serialize();
      for (var i = 0; i < result.shirts.length; i++) {
        result.shirts[i].sizes = []
        for (var j = 0; j < result.shirt.length; j++) {
          if(result.shirts[i].id === result.shirt[j].shirt_image_url_id) {
            result.shirts[i].sizes.push(result.shirt[j].sizes)
            result.shirts[i].sizes.sort(function(a, b){
              return sortObj[a.size]-sortObj[b.size];
            })
          }
        }
      }
      var message = req.session.message;
      req.session.message = null;
      res.render('index', {shirts: result.shirts, message: message});
    })
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
