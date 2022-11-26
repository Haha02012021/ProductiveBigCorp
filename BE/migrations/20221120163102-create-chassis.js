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
    await queryInterface.dropTable('chassises');
  }
};