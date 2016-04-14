require('dotenv').load();
var fs = require('fs');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var hbs = require('hbs');
hbs.registerHelper('equal', require('handlebars-helper-equal'));
var bookshelf = require('./db/config.js')

hbs.registerPartial('cart', fs.readFileSync(__dirname + '/views/partials/_cart.hbs', 'utf8'));
hbs.registerPartial('cart-table', fs.readFileSync(__dirname + '/views/partials/_cart-table.hbs', 'utf8'));

var routes = require('./routes/public');
var users = require('./routes/users');
var bookshelfTest = require('./routes/bookshelfTest');
var auth = require('./routes/auth');
var admin = require('./routes/admin');
var shirts = require('./routes/shirts');
var cart = require('./routes/cart');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieSession({
  name: 'session',
  keys: [
    process.env.SESSIONKEY1,
    process.env.SESSIONKEY2,
    process.env.SESSIONKEY3
  ]
}));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));

app.use(function(req, res, next){
  if(req.session.userID){
    bookshelf.User.where({id: req.session.userID}).fetch().then(function(user){
      if(user){
        user = user.serialize();
        res.user = user;
        res.locals.user = user;
      }
      next();
    })
  }else{
    next();
  }
})


app.use('/users', users);
app.use('/bookshelf', bookshelfTest);
app.use('/auth', auth);

// Add middleware to keep any non-admins from accessing admin routes.
app.use('/admin', admin);
app.use('/shirts', shirts);


app.use('/cart', cart)
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
