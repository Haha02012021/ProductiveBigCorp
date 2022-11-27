'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('safety', {
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
      so_tui_khi: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ABS: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      EBD: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      EBA: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ESS: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      DSC: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      TCS: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      HLA: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      chong_sao_chep_khoa: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      chong_trom: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cam_lui: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      canh_bao_va_cham_sau: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      canh_bao_va_cham_truoc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cam_360: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      canh_bao_day_an_toan: {
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
    await queryInterface.dropTable('safety');
  }
};