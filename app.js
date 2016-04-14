require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var bookshelf = require('./db/config.js')

var hbs = require('handlebars');
hbs.registerPartial('cart', '{{}}')
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
//app.use(cookieParser(process.env.SECRET));
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


app.use('/cart', cart)
app.use('/users', users);
app.use('/bookshelf', bookshelfTest);
app.use('/auth', auth);

// Add middleware to keep any non-admins from accessing admin routes.
app.use('/admin', admin);
app.use('/shirts', shirts);
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
