var express = require('express');
var router = express.Router();
var bookshelf = require('../db/config.js');
var bcrypt = require('bcrypt');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {
  return done(null, {
                      googleId: profile.id,
                      fname: profile.name.givenName,
                      lname: profile.name.familyName,
                      email: profile.emails[0].value
                    });
}
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


router.use(passport.initialize());
router.use(passport.session());

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home and add current user key to database.
    bookshelf.User.where({email: req.user.email.toLowerCase()}).fetch().then(function(user){
      var toUpdate = {};

      if(user){
        req.session.userID = user.id;
        if(!user.gid){
          toUpdate.gid = req.user.googleId;
        }else{
          req.session.message = {success: "Thanks for logging in!"}
          return res.redirect('/');
        }
        user.save(toUpdate, {patch: true}).then(function(){
          req.session.message = {success: "Thanks for logging in!"}
          return res.redirect('/');
        })
      } else {
        var generatedPass = require('crypto').randomBytes(48).toString('hex');
        generatedPass = bcrypt.hashSync(generatedPass, 8)
        new bookshelf.User({
                    email: req.user.email.toLowerCase(),
                    fname: req.user.fname,
                    lname: req.user.lname,
                    gid: req.user.google_id,
                    password: generatedPass
                  }).save().then(function(user){
                    req.session.message = {success: "Thanks for logging in!"}
                    req.session.userID = user.id;
                    res.redirect('/');
                  });
      }
    })

  });




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
     if(!req.body.newpassword === req.body.verifypassword) {
       errorArray.push('Both password fields must match');
     }
     if(errorArray.length > 0) {
       req.session.message = {error: errorArray};
       res.redirect('/register');
     }
     else{
    var hash = bcrypt.hashSync(req.body.password, 8);
    bookshelf.knex('users')
    .insert({'email': req.body.email, 'password': hash, 'fname': req.body.firstName, 'lname': req.body.lastName})
    .then(function(response){
      req.session.message = {sucess: 'You are now a registered user. Welcome!'};
      res.redirect('/');
    })
  }
  });
router.post('/login', function(req,res,next){
  console.log(bookshelf);
  bookshelf.knex('users')
  .where('email', req.body.email)
  .first()
  .then(function(response){
    if(response && bcrypt.compareSync(req.body.password, response.password)){
      req.session.userID = response.id;
      req.session.message = {success: "You are now logged in."};
      res.redirect('/');
    } else {
      req.session.message = {error:'Invalid username or password'};
      res.redirect('/login');
    }
  });
});

router.get('/logout', function(req,res,next) {
  req.session.message = {success: "You have successfully logged out"}
  req.session.userID = null;
  res.redirect('/');
});

module.exports = router;
