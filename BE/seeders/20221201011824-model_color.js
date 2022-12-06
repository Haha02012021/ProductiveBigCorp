'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('model_color', [
      {
        model_id: 1,
        color_id: 1,
      },
      {
        model_id: 1,
        color_id: 2,
      },
      {
        model_id: 1,
        color_id: 3,
      },
      {
        model_id: 1,
        color_id: 4,
      },
      {
        model_id: 2,
        color_id: 1,
      },
      {
        model_id: 2,
        color_id: 2,
      },
      {
        model_id: 2,
        color_id: 3,
      },
      {
        model_id: 2,
        color_id: 4,
      },
      {
        model_id: 2,
        color_id: 5,
      },
      {
        model_id: 2,
        color_id: 7,
      },
      {
        model_id: 3,
        color_id: 1,
      },
      {
        model_id: 3,
        color_id: 2,
      },
      {
        model_id: 3,
        color_id: 3,
      },
      {
        model_id: 3,
        color_id: 6,
      },
      {
        model_id: 4,
        color_id: 1,
      },
      {
        model_id: 4,
        color_id: 2,
      },
      {
        model_id: 4,
        color_id: 7,
      },
      {
        model_id: 5,
        color_id: 1,
      },
      {
        model_id: 5,
        color_id: 2,
      },
      {
        model_id: 5,
        color_id: 8,
      },
      {
        model_id: 6,
        color_id: 1,
      },
      {
        model_id: 6,
        color_id: 2,
      },
      {
        model_id: 6,
        color_id: 3,
      },
      {
        model_id: 6,
        color_id: 4,
      },
      {
        model_id: 6,
        color_id: 7,
      },
      {
        model_id: 7,
        color_id: 1,
      },
      {
        model_id: 7,
        color_id: 2,
      },
      {
        model_id: 7,
        color_id: 3,
      },
      {
        model_id: 7,
        color_id: 4,
      },
      {
        model_id: 7,
        color_id: 7,
      },
      {
        model_id: 8,
        color_id: 1,
      },
      {
        model_id: 8,
        color_id: 2,
      },
      {
        model_id: 8,
        color_id: 5,
      },
      {
        model_id: 8,
        color_id: 8,
      },
      {
        model_id: 9,
        color_id: 1
      },
      {
        model_id: 9,
        color_id: 2
      },
      {
        model_id: 9,
        color_id: 3
      },
      {
        model_id: 9,
        color_id: 4
      },
      {
        model_id: 9,
        color_id: 7
      },
      {
        model_id: 9,
        color_id: 9
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('model_color', null, {})
  }
};
