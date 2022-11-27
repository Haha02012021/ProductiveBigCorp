'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chassis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Version}) {
      // define association here
      this.belongsTo(Version, {foreignKey: 'version_id', as: 'version', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    }
  }
  Chassis.init({
    version_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: ' must have a version' },
        notEmpty: { msg: 'version must not be empty' },
      },
    },
    treo_truoc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    treo_sau: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dan_dong: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phanh_truoc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phanh_sau: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tro_luc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lop_xe: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    d_mam_xe: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'chassises',
    modelName: 'Chassis',
  });
  return Chassis;
};