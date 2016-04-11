var knexConfig = require('../knexfile.js')['development'];
var knex = require('knex')(knexConfig);
var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
  tableName: 'users',
  orders: function() {
    return this.hasMany(Order)
  },
  shirts: function() {
    return this.hasMany(Shirt).through(Order)
  }
});

var Order = bookshelf.Model.extend({
  tableName: 'orders',
  hasTimestamps: true,
  users: function() {
    return this.belongsTo(User)
  },
  status: function() {
    return this.belongsTo(OrderStatus);
  },
  orderItems: function() {
    return this.hasMany(OrderItem);
  },
  shirts: function() {
    return this.hasMany(Shirt).through(OrderItem);
  }
});

var OrderStatus = bookshelf.Model.extend({
  tableName: 'order-status',
  orders: function(){
    return this.hasMany(Orders);
  }
});

var OrderItem = bookshelf.Model.extend({
  tableName: 'order-items',
  shirts: function(){
    return this.belongsTo(Shirt);
  },
  orders: function(){
    return this.belongsTo(Order);
  }
})

var Shirt = bookshelf.Model.extend({
  tableName: 'shirts',
  orders: function(){
    return this.belongsToMany(Order).through(OrderItem);
  },
  colors: function(){
    return this.belongsTo(Color);
  },
  sizes: function(){
    return this.belongsTo(Size);
  },
  designs: function(){
    return this.belongsTo(Design);
  }
});

var Color = bookshelf.Model.extend({
  tableName: 'colors',
  shirts: function(){
    return this.hasMany(Shirt);
  }
});

var Size = bookshelf.Model.extend({
  tableName: 'sizes',
  shirts: function(){
    return this.hasMany(Shirt);
  }
});

var Design = bookshelf.Model.extend({
  tableName: 'designs',
  shirts: function(){
    return this.hasMany(Shirt);
  }
});


module.exports = {
  User: User,
  Order: Order,
  OrderItem: OrderItem,
  OrderStatus: OrderStatus,
  Shirt: Shirt,
  Design: Design,
  Color: Color,
  Size: Size,
}
