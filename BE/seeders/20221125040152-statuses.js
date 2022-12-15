"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "statuses",
      [
        {
          context: "created",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          context: "request",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          context: "movingToSell",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          context: "inStock",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          context: "sold",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          context: "requestMaintain",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          context: "sendToMaintain",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          context: "underMaintain",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          context: "doneMaintain",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          context: "maintainedAndReturn",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          context: "maintainedAndReceive",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          context: "broken",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          context: "sendBackToFactory",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          context: "returnedToFactory",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          context: "destroyed",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          context: "summoned",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("statuses", null, {});
  },
};
