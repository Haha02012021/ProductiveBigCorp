'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('engines', {
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
      cong_suat_toi_da: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      momen_xoan_cuc_dai: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hop_so: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      che_do_the_thao: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      GVC: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      he_thong_ngung_khoi_dong_thong_minh: {
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
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('engines');
  }
};