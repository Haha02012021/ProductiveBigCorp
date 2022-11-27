'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({MODEL, Model_Color, Product, Batch}) {
      // define association here
      this.hasMany(Product, {foreignKey: 'color_id', as: 'products', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.belongsToMany(MODEL, {as: 'models', through: Model_Color, foreignKey: 'color_id', otherKey: "model_id"});
      this.hasMany(Batch, {foreignKey: 'color_id', as: 'batches', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    }
  }
  Color.init({
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'colors',
    modelName: 'Color',
  });
  return Color;
};