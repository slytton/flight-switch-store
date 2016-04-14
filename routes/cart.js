var express = require('express');
var router = express.Router();
var bookshelf = require('../db/config.js');
var populateCart = require('../lib/populate-cart-locals');
var deleteLineItem = require('../lib/delete-line-item-from-cart');
var addLineItem = require('../lib/add-line-item-to-cart');

router.get('/', populateCart, function(req, res, next) {
  res.json(res.partialResponse);
})

router.post('/', addLineItem, populateCart, function(req, res, next){
  res.json(res.partialResponse);
})

router.delete('/:shirtId', deleteLineItem, populateCart, function(req, res, next){
  res.json(res.partialResponse);
})

// router.post('/update', function(req, res, next) {
//   cartView(req, res);
// })


module.exports = router;
