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
    static associate({Product, Manager, Color, Version, MODEL}) {
      // define association here
      this.hasMany(Product, {foreignKey: 'request_id', as: 'products', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.belongsTo(Manager, {foreignKey: 'factory_id', as: 'factory', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.belongsTo(Manager, {foreignKey: 'store_id', as: 'store', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.belongsTo(Color, {foreignKey: 'color_id', as: 'color', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.belongsTo(Version, {foreignKey: 'version_id', as: 'version', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.belongsTo(MODEL, {foreignKey: 'model_id', as: 'model', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
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
    version_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    model_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    color_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    progress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};