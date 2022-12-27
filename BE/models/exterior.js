'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exterior extends Model {
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
  Exterior.init({
    version_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: ' must have a version' },
        notEmpty: { msg: 'version must not be empty' },
      },
    },
    den_chieu_gan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    den_chieu_xa: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    den_led_chay_ban_ngay: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    den_truoc_tu_dong_bat_tat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    den_truoc_tu_dong_can_bang_goc_chieu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    guong_chieu_hau_ngoai_gap_dien_chinh_dien: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gat_mua_tu_dong: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cum_den_sau_dang_led: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cua_so_troi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ong_xa_kep: {
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
    tableName: 'exteriors',
    modelName: 'Exterior',
  });
  return Exterior;
};