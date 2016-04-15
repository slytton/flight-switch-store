var express = require('express');
var router = express.Router();
var bookshelf = require('../db/config.js');
var stripe = require("stripe")(process.env.STRIPE_SECRET);
var states = Object.keys(require("../lib/states.js"));

/* GET home page. */

var populateCart = require('../lib/populate-cart-locals');

function isNotLoggedIn(req, res, next) {
  res.user ? res.redirect('/') : next();
}

function isLoggedIn(req, res, next) {
  !res.user ? res.redirect('/login') : next();
}

function hasCart(req, res, next) {
  if (Object.keys(req.session.cart).length > 0) {
    next();
  } else {
    req.session.message = {
      error: 'Please add a shirt to your cart.'
    }
    res.redirect('/');
  }
}

router.post('/checkout', function(req, res, next) {
  var orderDetails = req.body;
  var cart = req.session.cart;
  req.session.message = {};
  error = [];

  var street = req.body.address;
  var city = req.body.city;
  var zip = req.body.zip;
  var state = req.body.state.toUpperCase();

  if (street || !/^[0-9 || A-z]+$/.test(street)) {
    error.push('Please enter a valid street address (numbers and letters only)');
  }
  if (city || !/^[A-z]+$/.test(city)) {
    error.push('Please enter a valid city (letters only)');
  }
  if (zip || !/^[0-9]{5}$/.test(zip)) {
    error.push('Please enter a valid zipcode (5 digits)');
  }
  if (state || states.indexOf(state) < 0) {
    error.push('Please enter a two digit state abbreviation.');
  }

  if (!error) {
    bookshelf.Shirt.query().whereIn('id', Object.keys(cart)).then(function(shirts) {
      var total = 0;
      shirts.forEach(function(shirt) {
        total += cart[shirt.id] * shirt.price;
        if (shirt.quantity <= cart[shirt.id]) {
          bookshelf.Shirt.where('id', shirt.id).fetch({
            withRelated: ['colors', 'sizes', 'designs', 'shirtImageUrl']
          }).then(function(bsShirt) {
            bsShirt = bsShirt.serialize();
            if (bsShirt.quantity > 0) {
              cart[bsShirt.id] = bsShirt.quantity;
            } else {
              delete cart[shirt.id];
            }
            throw "These things are selling like hotcakes. We no longer have enough " +
              bsShirt.designs.name + " " +
              bsShirt.colors.color + " " +
              bsShirt.sizes.size + " to complete your order :( - we only have " +
              bsShirt.quantity + " left in stock.";
          }).catch(function(e) {
            throw e;
          })
        }
      });

      var charge = stripe.charges.create({
        amount: total * 100, // amount in cents, again
        currency: "usd",
        source: orderDetails.stripeToken,
        description: "Example charge"
      }, function(err, charge) {
        if (err && err.type === 'StripeCardError') {
          throw err;
        } else {
          shirts.forEach(function(shirt) {
            shirt.quantity -= cart[shirt.id];
          });

          var promises = shirts.map(function(shirt) {
            return bookshelf.Shirt.where('id', shirt.id).save({
              quantity: shirt.quantity
            }, {
              patch: true
            });
          })

          Promise.all(promises).then(function(updatedShirts) {
            return new bookshelf.Order({
              user_id: res.user.id,
              address: req.body.address,
              city: req.body.zip,
              state: req.body.state,
              zip: req.body.zip,
              stripe_id: charge.id,
              order_status_id: 1
            }).save()
          }).then(function(order) {
            promises = shirts.map(function(shirt) {
              return new bookshelf.OrderItem({
                shirt_id: shirt.id,
                order_id: order.id,
                price: shirt.price,
                quantity: cart[shirt.id]
              }).save();
            })
            return Promise.all(promises)
          }).then(function(orderItems) {
            orderItems = orderItems[0].serialize();
            req.session.cart = {}
            res.render('order-complete', {
              order_id: orderItems.order_id
            })
          }).catch(function(e) {
            throw e;
          });
        }
      });
    }).catch(function(e) {
      req.session.message.error = [e];
      res.redirect('/checkout');
    });
  } else {
    req.session.message.error = error;
    res.redirect('/checkout');
  }
});

router.get('/checkout', isLoggedIn, populateCart, hasCart, function(req, res, next) {
  var message = req.session.message;
  req.session.message = {};
  res.render('checkout', { message: message, states: states })
});

router.get('/', function(req, res, next) {
  res.redirect('/shirts')
});


router.get('/login', isNotLoggedIn, function(req, res, next) {
  var message = req.session.message;
  req.session.message = null;
  res.render('./public/login', {
    message: message
  });
});

router.get('/register', isNotLoggedIn, function(req, res, next) {
  var message = req.session.message;
  req.session.message = null;
  res.render('./public/register', {
    message: message
  });
});

router.post('/cart', function(req, res, next) {
  res.json(req.body)
})

module.exports = router;
