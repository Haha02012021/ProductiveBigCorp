'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      store_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      factory_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      version_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      model_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      color_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      progress: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      acceptedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        allowNull: true,
      },
      canceledAt: {
        allowNull: false,
        type: DataTypes.DATE,
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
    await queryInterface.dropTable('requests');
  }
};