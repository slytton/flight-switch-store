var knexConfig = require('../knexfile.js')[process.env.ENVIRONMENT];
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
  tableName: 'order_status',
  orders: function(){
    return this.hasMany(Orders);
  }
});

var OrderItem = bookshelf.Model.extend({
  tableName: 'order_items',
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
  },
  shirtImageUrl: function(){
    return this.belongsTo(ShirtImageUrl);
  }
});

var Color = bookshelf.Model.extend({
  tableName: 'colors',
  shirts: function(){
    return this.hasMany(Shirt);
  }
  // designs: function() {
  //   return this.belongsToMany(Design).through(Shirt);
  // }
});

var Size = bookshelf.Model.extend({
  tableName: 'sizes',
  shirts: function(){
    return this.hasMany(Shirt);
  }
  // designs: function() {
  //   return this.belongsToMany(Design).through(Shirt);
  // }
});

var Design = bookshelf.Model.extend({
  tableName: 'designs',
  // colors: function(){
  //   return this.hasMany(Color).through(Shirt);
  // }
  // sizes: function() {
  //   return this.hasMany(Size).through(Shirt);
  // },
  shirts: function(){
    return this.hasMany(Shirt);
  }
});

var ShirtImageUrl = bookshelf.Model.extend({
  tableName: 'shirt_image_urls',
  shirts: function(){
    return this.hasMany(Shirt);
  }
})

module.exports = {
  knex: knex,
  User: User,
  Order: Order,
  OrderItem: OrderItem,
  OrderStatus: OrderStatus,
  Shirt: Shirt,
  Design: Design,
  Color: Color,
  Size: Size,
  ShirtImageUrl: ShirtImageUrl
}
