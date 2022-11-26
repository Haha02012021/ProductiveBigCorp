'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('i_activesense', {
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
      AFS: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      HBC: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ALH: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      RCTA: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      LDW: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      LAS: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phanh_thong_mminh_truoc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phanh_thong_minh_sau: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      SBS: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      MRCC: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      DAA: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      BSM: {
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
    await queryInterface.dropTable('i_activesense');
  }
};