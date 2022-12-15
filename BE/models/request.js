'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product, Manager}) {
      // define association here
      this.hasMany(Product, {foreignKey: 'request_id', as: 'products', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.belongsTo(Manager, {foreignKey: 'factory_id', as: 'factory', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.belongsTo(Manager, {foreignKey: 'store_id', as: 'store', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    }
  }
  Request.init({
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    factory_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};