var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);


/* GET home page. */



router.get('/shirt/:id', function(req, res, next) {
  var shirtid = req.params.id;
    res.render('shirt', { shirt: shirt });
});



router.get('/', function(req, res, next) {
    res.render('index', { shirts: shirts });
});



module.exports = router;
