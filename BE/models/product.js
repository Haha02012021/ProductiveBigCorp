'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Manager, Color, Manager_Product, Version, MODEL, Status}) {
      this.belongsTo(Status, {foreignKey: 'status_id', as: 'status', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      this.belongsTo(Version, {foreignKey: 'version_id', as: 'version', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.belongsTo(MODEL, {foreignKey: 'model_id', as: 'model', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.belongsToMany(Manager, {as: 'managers', through: Manager_Product, foreignKey: 'product_id', otherKey: "manager_id"});
      this.belongsTo(Color, {foreignKey: 'color_id', as: 'color', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    }
  }
  Product.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    model_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    version_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    color_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maintain_month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'products',
    modelName: 'Product',
  });
  return Product;
};