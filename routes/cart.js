var express = require('express');
var router = express.Router();
var bookshelf = require('../db/config.js');

function cartView(req, res){
  console.log('hello!');

  if(!req.session.cart) req.session.cart = {};
  if(req.body){
    if(!req.session.cart[req.body.shirt_id]) req.session.cart[req.body.shirt_id] = 0;
    req.session.cart[req.body.shirt_id] += +req.body.quantity;
  }

  var cart = req.session.cart;
  var orderTotal = 0;
  var totalItems = 0;
  var response = { messages:{}, html: "" }
  var promises = [];

  delete cart[undefined];
  itemIds = Object.keys(cart);
  for (var item_id in cart) {
    if (cart.hasOwnProperty(item_id)) {
      promises.push(bookshelf.Shirt.where('id', item_id).fetch({withRelated: ['colors', 'sizes', 'designs', 'shirtImageUrl']}));
    }
  }
  Promise.all(promises).then(function(shirts){
    shirts = shirts.map(function(shirt, index){
      shirt = shirt.serialize();

      shirt.quantityOrdered = cart[itemIds[index]];

      shirt.subTotal = +shirt.quantityOrdered * +shirt.price;
      orderTotal += shirt.subTotal;
      totalItems += shirt.quantityOrdered;
      return shirt;
    })

    res.render('public/_cart', {shirts: shirts, orderTotal: orderTotal, totalItems: totalItems, layout:false}, function(err, html){
      response.html = html;
      res.json(response);
    });
  });
}

router.get('/', function(req, res, next) {
  cartView(req, res);
})

router.post('/', function(req, res, next){
  cartView(req, res);
})


module.exports = router;
