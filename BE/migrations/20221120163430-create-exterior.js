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
      chieu_gan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      chieu_xa: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Led_ngay: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      auto_bat_tat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      can_bang_goc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gap_chinh_dien: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      auto_gat_mua: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      den_sau_led: {
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