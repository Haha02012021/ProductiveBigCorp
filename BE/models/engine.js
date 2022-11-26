'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Engine extends Model {
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
  Engine.init({
    version_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: ' must have a version' },
        notEmpty: { msg: 'version must not be empty' },
      },
    },
    loai_dong_co: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    he_thong_nhien_lieu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dung_tich_xilanh: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cong_suat_max: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    momen_max: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hop_so: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sport_mode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    GVC: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    smart_start_stop: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'engines',
    modelName: 'Engine',
  });
  return Engine;
};