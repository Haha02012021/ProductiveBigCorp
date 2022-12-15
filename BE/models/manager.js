'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manager extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product, Manager_Product, Batch, History, Request}) {
      // define association here
      this.belongsToMany(Product, {as: 'products', through: Manager_Product, foreignKey: 'manager_id', otherKey: 'product_id'})
      this.hasMany(Batch, {foreignKey: 'factory_id', as: 'batches', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.hasMany(History, {foreignKey: 'manager_id', as: 'history', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.hasMany(Request, {foreignKey: 'factory_id', as: 'receivedRequests', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.hasMany(Request, {foreignKey: 'store_id', as: 'sentRequest', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    }
  }
  Manager.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    place: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'managers',
    modelName: 'Manager',
  });
  //1 for master, 2 for factory, 3 for maintainer, 4 for store
  return Manager;
};