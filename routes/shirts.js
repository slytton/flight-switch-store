var express = require('express');
var router = express.Router();
var bookshelf = require('../db/config.js');
var _ = require('lodash');

function getShirts(req, res, next) {
  var result = {}
  var sortObj = {'XS':0, 'S':1, 'M':2, 'L':3, 'XL':4}
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
      req.result = result
      next()
    })
  })
}

router.get('/', getShirts, function(req, res, next) {
  var message = req.session.message;
  req.session.message = null;
  res.render('index', {shirts: req.result.shirts, message: message});
  // res.json(req.result.shirts)
})

router.get('/:designId/:colorId', getShirts, function(req, res, next) {
  var singleShirt = {}
  for (var i = 0; i < req.result.shirts.length; i++) {
    if(req.result.shirts[i].shirts[0].design_id === +req.params.designId && req.result.shirts[i].shirts[0].color_id === +req.params.colorId) {
      singleShirt.shirt = req.result.shirts[i]
    }
  }
  var message = req.session.message;
  req.session.message = null;
  res.render('singleShirt', {shirt: singleShirt.shirt, message: message})
  // res.json(singleShirt)
  // var stuff = {}
  // bookshelf.Design.where({id: req.params.designid}).fetch({withRelated: ['shirts.colors', 'shirts.sizes', 'shirts.shirtImageUrl']}).then(function(shirtsByDesign){
  //   function design(shirts){
  //     return shirts.colors.color
  //   }
  //   shirtsByDesign = shirtsByDesign.serialize()
  //   var groupByColor = _.groupBy(shirtsByDesign.shirts, design);
  //      res.render('./public/singleShirt', {shirt: groupByColor})
  //     res.json(groupByColor)
    // })
  // })
  // for (var i = 0; i < req.result.shirts.length; i++) {
  //   if(req.result.shirts[i].id === +req.params.id) {
  //     stuff.shirt = req.result.shirts[i]
  //   }
  // }
  // res.render('shirt', { shirt: shirt });
});

router.post('/:designId/:colorId', function(req, res, next){
  res.json(req.body)
})

module.exports = router;
