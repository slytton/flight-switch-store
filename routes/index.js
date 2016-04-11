var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);


/* GET home page. */



router.get('/shirt/:id', function(req, res, next) {
  var shirtid = req.params.id;
    res.render('shirt', { shirt: shirt });
});



router.get('/', function(req, res, next) {
  var placeHolder = [1,2,3,4,5,6,7,8,9,10,11]
    res.render('index', { shirts: placeHolder });
});



module.exports = router;
