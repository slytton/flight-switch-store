var bookshelf = require('../db/config');

module.exports = function(req, res, next){
  var shirtID = req.body.shirt_id;
  res.errors = [];
  if(req.body){
    if(!req.session.cart[shirtID]) req.session.cart[shirtID] = 0;
    bookshelf.Shirt.where('id', shirtID).fetch().then(function(shirt){
      shirt = shirt.serialize()
      console.log(req.session.cart[shirtID] + +req.body.quantity);
      if((req.session.cart[shirtID] + +req.body.quantity) <= shirt.quantity){
        req.session.cart[shirtID] += +req.body.quantity;
      }else{
        req.session.cart[shirtID] = shirt.quantity;
        res.errors.push( 'Quantity of shirts specified are not available there are ' + shirt.quantity + ' shirts instock');
      }

      if(req.session.cart[shirtID] === 0){
          console.log(req.session.cart, 'cart won')
        delete req.session.cart[shirtID];
        console.log(req.session.cart, 'cart doo')
      }
      next();
    })
  }
}
