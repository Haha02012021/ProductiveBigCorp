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
     await queryInterface.bulkInsert('models', [
      {
        name: 'mazda_cx5'
      },
      {
        name: 'new_mazda_cx8'
      },
      {
        name: 'mazda_cx3'
      },
      {
        name: 'mazda_cx30'
      },
      {
        name: 'mazda_2'
      },
      {
        name: 'mazda_3'
      },
      {
        name: 'new_mazda_6'
      },
      {
        name: 'mazda_2_sport'
      },
      {
        name: 'mazda_3_sport'
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('models', null, {})
  }
};
