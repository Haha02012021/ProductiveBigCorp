'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MODEL extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({Version, Color, Model_Color}) {
      this.hasMany(Version, {foreignKey: 'model_id', as: 'versions', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.belongsToMany(Color, {as: 'colors', through: Model_Color, foreignKey: 'model_id', otherKey: "color_id"});
    }
  }
  MODEL.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'models',
    modelName: 'MODEL',
  });
  return MODEL;
};