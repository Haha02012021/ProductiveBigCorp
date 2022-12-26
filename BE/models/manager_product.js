'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manager_Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product, Manager}) {
      // define association here
      this.belongsTo(Manager, {foreignKey: 'manager_id', as: 'manager', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.belongsTo(Product, {foreignKey: 'product_id', as: 'product', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    }
  }
  Manager_Product.init({
    manager_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'manager_product',
    modelName: 'Manager_Product',
  });
  return Manager_Product;
};