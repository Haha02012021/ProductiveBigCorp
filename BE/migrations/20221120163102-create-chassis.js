'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('chassises', {
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
    await queryInterface.dropTable('chassises');
  }
};