module.exports = function(req, res, next){
  if(req.body){
    if(!req.session.cart[req.body.shirt_id]) req.session.cart[req.body.shirt_id] = 0;
    req.session.cart[req.body.shirt_id] += +req.body.quantity;
  }
  next();
}
