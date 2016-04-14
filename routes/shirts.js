var express = require('express');
var router = express.Router();
var bookshelf = require('../db/config.js');
var _ = require('lodash');

function ShirtsByDesignAndColor(req, res, next){
  var colorId = req.params.colorId;
  var designId = req.params.designId;
  bookshelf.Shirt.where({color_id: colorId, design_id: designId}).fetchAll({withRelated: ['colors', 'sizes', 'designs', 'shirtImageUrl']}).then(function(shirt){
    req.shirt = shirt.serialize();
    next()
  })
}

function getShirts(req, res, next) {
  var result = {}
  var sortObj = {'XS':0, 'S':1, 'M':2, 'L':3, 'XL':4}
  bookshelf.ShirtImageUrl.collection().fetch({withRelated: ['shirts.sizes']}).then(function(shirtsByImage){
    req.shirts = shirtsByImage.serialize();
    req.sizes = req.shirts.map(function(imageGroup){
      return imageGroup.shirts.reduce(function(prev, next) {
        if(next.quantity > 0)
        prev.push(next.sizes.size)
        return prev;
      }, []).sort(function(a, b) {
        return sortObj[a]-sortObj[b];
      })
    })

    for (var i = 0; i < req.shirts.length; i++) {
      req.shirts[i].sizes = req.sizes[i];
      req.shirts[i].totalQuantity = req.shirts[i].shirts.reduce(function(prev, shirt){
        return prev += shirt.quantity
      }, 0)
      console.log(req.shirts[i]);
    }
    next()
  })
}

router.get('/', getShirts, function(req, res, next) {
  var message = req.session.message;
  req.session.message = null;
  res.render('index', {shirts: req.shirts, sizes: req.sizes, message: message});
})

router.get('/:designId/:colorId', ShirtsByDesignAndColor, function(req, res, next) {
  var message = req.session.message;
  req.session.message = null;
  res.render('singleShirt', {shirt: req.shirt})
});



module.exports = router;
