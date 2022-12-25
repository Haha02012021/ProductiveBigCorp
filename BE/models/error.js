'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Error extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product}) {
      // define association here
      this.belongsTo(Product, {foreignKey: 'product_id', as: 'product', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    }
  }
  Error.init({
    product_id: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Error',
  });
  return Error;
};