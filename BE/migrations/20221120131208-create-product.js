"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      model_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      version_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      color_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      batch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maintain_month: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 12,
      },
      status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      request_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      isSold: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      isCompensate: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      soldAt: {
        allowNull: true,
        type: DataTypes.DATE
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("products");
  },
};
