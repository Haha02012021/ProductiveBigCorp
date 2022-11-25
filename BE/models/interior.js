'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interior extends Model {
     static associate({Version}) {
      this.belongsTo(Version, {foreignKey: 'version_id', as: 'version', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    }
  }
  Interior.init({
    version_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: ' must have a version' },
        notEmpty: { msg: 'version must not be empty' },
      },
    },
    chat_lieu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ghe_lai_dieu_chinh_dien: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ghe_lai_nho_vi_tri: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ghe_phu_dieu_chinh_dien: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dvd_player: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    man_hinh_cam_ung: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    AUX_USB_bluetooth: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    so_loa: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lay_chuyen_so: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phanh_tay_dien_tu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    giu_phanh_tu_dong: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    khoi_dong_nut: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ga_tu_dong: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dieu_hoa_tu_dong: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cua_gio_sau: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cua_so_dien: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    guong_hau_trung_tam: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hud: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    che_nang_kinh_sau_chinh_dien: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    che_nang_cua_so_sau: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tua_tay_hang_ghe_sau: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tua_tay_hang_ghe_sau_co_usb: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hang_ghe_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'interiors',
    modelName: 'Interior',
  });
  return Interior;
};