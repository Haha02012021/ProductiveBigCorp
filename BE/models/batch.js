'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Batch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({MODEL, Version, Color, Product, Manager}) {
      // define association here
      this.belongsTo(MODEL, {foreignKey: 'model_id', as: 'model', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      this.belongsTo(Version, {foreignKey: 'version_id', as: 'version', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      this.belongsTo(Color, {foreignKey: 'color_id', as: 'color', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.hasMany(Product, {foreignKey: 'batch_id', as: 'products', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.belongsTo(Manager, {foreignKey: 'factory_id', as: 'factory', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    }
  }
  Batch.init({
    factory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    model_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    version_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isSummoned: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    error: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Batch',
  });
  return Batch;
};