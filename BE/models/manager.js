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
    static associate({Product, Manager_Product}) {
      // define association here
      this.belongsToMany(Product, {as: 'products', through: Manager_Product, foreignKey: 'manager_id', otherKey: 'product_id'})
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
  //1 for master, 2 for factory, 3 for maintainer, 4 for seller
  return Manager;
};