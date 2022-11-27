'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Model_Color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Model_Color.init({
    model_id: DataTypes.INTEGER,
    color_id: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'model_color',
    modelName: 'Model_Color',
  });
  return Model_Color;
};