module.exports = bookshelf.Model.extend({
  tableName: 'users',
  orders: function() {
    return this.hasMany(Orders)
  }
})
