var express = require('express');
var router = express.Router();
var bookshelf = require('../db/config.js');
var _ = require('lodash');

function getShirts(req, res, next) {
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
      req.result = result
      next()
    })
  })
}

router.get('/', getShirts, function(req, res, next) {
  var message = req.session.message;
  req.session.message = null;
  res.render('index', {shirts: req.result.shirts, message: message});
})

router.get('/:designid', getShirts, function(req, res, next) {
  var stuff = {}
  bookshelf.Design.where({id: req.params.designid}).fetch({withRelated: ['shirts.colors', 'shirts.sizes', 'shirts.shirtImageUrl']}).then(function(shirtsByDesign){
    function design(shirts){
      return shirts.colors.color
    }
    shirtsByDesign = shirtsByDesign.serialize()
    var groupByColor = _.groupBy(shirtsByDesign.shirts, design);

    // stuff.shirtsByDesign = shirtsByDesign
    // return bookshelf.Color.collection().fetch({withRelated: ['shirts']}).then(function(shirtsByColor){
      // console.log('wtf',stuff);
      // stuff.shirtsByColor = shirtsByColor
      // for (var i = 0; i < stuff.shirtsByDesign.length; i++) {
        // stuff.shirtsByDesign[i].colors = []
        // for (var j = 0; j < stuff.shirtsByColor.length; j++) {
        //   for (var k = 0; k < stuff.shirtsByColor[j].shirts.length; k++) {
        //     stuff.shirtsByColor[j].shirts[k]
        //     if(stuff.shirtsByDesign[i].color_id === stuff.shirtsByColor[j].shirts[k].color_id) {
        //       stuff.shirtsByDesign[i].colors.push(stuff.shirtsByColor[j].shirts[k].color_id)
        //     }
        //   }
        // }
      // }
      // res.json(stuff.shirtsByDesign.colors[1])
      res.json(groupByColor)
    // })
  })
  // for (var i = 0; i < req.result.shirts.length; i++) {
  //   if(req.result.shirts[i].id === +req.params.id) {
  //     stuff.shirt = req.result.shirts[i]
  //   }
  // }
  // res.render('shirt', { shirt: shirt });
});

module.exports = router;
