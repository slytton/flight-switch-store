var bookshelf = require('../db/config.js');

module.exports= function(req, res, next){
  // console.log(req.session.cart, 'This better work');
  req.session.cart = req.session.cart || {};
  res.errors = res.errors || [];
  var cart = req.session.cart;
  var orderTotal = 0;
  var totalItems = 0;
  var response = { messages:{errors: res.errors}, html: "" }
  var promises = [];

  delete cart[undefined];
  itemIds = Object.keys(cart);

  for (var item_id in cart) {
    if (cart.hasOwnProperty(item_id)) {
      promises.push(bookshelf.Shirt.where('id', item_id).fetch({withRelated: ['colors', 'sizes', 'designs', 'shirtImageUrl']}));
    }
  }

  Promise.all(promises).then(function(shirts){
    shirts = shirts.map(function(shirt, index){
      var currentShirtId = itemIds[index];
      // console.log(cart[currentShirtId]);
      shirt = shirt.serialize();
      if ((cart[currentShirtId]) > shirt.quantity) {
        response.messages.errors.push('Quantity not available there are ' + shirt.quantity + ' shirts instock')
        shirt.quantityOrdered = shirt.quantity;
      } else {
        shirt.quantityOrdered = cart[itemIds[index]];
      }
        shirt.subTotal = +shirt.quantityOrdered * +shirt.price;
        orderTotal += shirt.subTotal;
        totalItems += shirt.quantityOrdered;
        return shirt;
    })

    res.locals = {shirts: shirts, orderTotal: orderTotal, totalItems: totalItems}

    res.render('partials/_cart-table', {layout:false}, function(err, html){
      var button = "<p id='cartbutton'> <i class='fa fa-cart-arrow-down'></i> <span>"+totalItems+"</span></p>"
      response.html = {table: html, cartButton: button}
      res.partialResponse = response;
      next();
    });
  });
}
