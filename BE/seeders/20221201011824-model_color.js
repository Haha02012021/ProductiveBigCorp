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
      "model_color",
      [
        {
          model_id: 1,
          color_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 1,
          color_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 1,
          color_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 1,
          color_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 2,
          color_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 2,
          color_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 2,
          color_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 2,
          color_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 2,
          color_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 2,
          color_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 3,
          color_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 3,
          color_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 3,
          color_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 3,
          color_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 4,
          color_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 4,
          color_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 4,
          color_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 5,
          color_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 5,
          color_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 5,
          color_id: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 6,
          color_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 6,
          color_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 6,
          color_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 6,
          color_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 6,
          color_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 7,
          color_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 7,
          color_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 7,
          color_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 7,
          color_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 7,
          color_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 8,
          color_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 8,
          color_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 8,
          color_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 8,
          color_id: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 9,
          color_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 9,
          color_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 9,
          color_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 9,
          color_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 9,
          color_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 9,
          color_id: 9,
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
    await queryInterface.bulkDelete("model_color", null, {});
  },
};
