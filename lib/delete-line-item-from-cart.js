module.exports = function(req, res, next){
  if(req.params && req.session.cart[req.params.shirtId]) delete req.session.cart[req.params.shirtId]
  next();
}
