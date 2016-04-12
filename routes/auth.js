var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);
var bcrypt = require('bcrypt');

router.post('/signup', function(req,res,next){
  // validate that the form was filled out
   var errorArray = [];

   if(!req.body.email) {
     errorArray.push('Please enter a valid email address');
   }
   if(!req.body.password) {
     errorArray.push('Please enter a password');
   }
   if(!req.body.firstName) {
     errorArray.push('Please enter your first name');
   }
   if(!req.body.lastName) {
     errorArray.push('Please enter your last name');
   }
   if(errorArray.length > 0) {
     console.log(req.body.firstName);
     console.log(req.body.lastName);
     console.log(errorArray);
     res.render('register', {errors: errorArray});
   }
   else{
  var hash = bcrypt.hashSync(req.body.password, 8);
  knex('users')
  .insert({'email': req.body.email, 'password': hash, 'fname': req.body.firstName, 'lname': req.body.lastName})
  .then(function(response){
    console.log(response);
    res.redirect('/');
  })
}
});

router.post('/login', function(req,res,next){
  knex('users')
  .where('email', '=', req.body.email)
  .first()
  .then(function(response){
    if(response && bcrypt.compareSync(req.body.password, response.password)){
      req.session.user = response.username;
      req.session.id = response.id;
      res.redirect('/');
    } else {
      res.render('login', {error: 'Invalid username or password'});
    }
  });
});

router.get('/logout', function(req,res,next) {
  req.session.user = null;
  res.redirect('/');
});

module.exports = router;
