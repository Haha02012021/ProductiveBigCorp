'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({MODEL}) {
      // define association here
      this.belongsTo(MODEL, {foreignKey: 'model_id', as: 'model', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    }
  }
  Image.init({
    model_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Image',
    tableName: 'images'
  });
  return Image;
};