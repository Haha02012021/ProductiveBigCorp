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
    he_thong_treo_truoc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    he_thong_treo_sau: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    he_thong_dan_dong: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    he_thong_phanh_truoc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    he_thong_phanh_sau: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    he_thong_tro_luc_lai: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    kich_thuoc_lop_xe: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    duong_kinh_mam_xe: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    paranoid: true,
    tableName: 'chassises',
    modelName: 'Chassis',
  });
  return Chassis;
};