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
      "models",
      [
        {
          name: "mazda_cx5",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "new_mazda_cx8",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "mazda_cx3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "mazda_cx30",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "mazda_2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "mazda_3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "new_mazda_6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "mazda_2_sport",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "mazda_3_sport",
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
    await queryInterface.bulkDelete("models", null, {});
  },
};
