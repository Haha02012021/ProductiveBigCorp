'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('exteriors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('exteriors');
  }
};