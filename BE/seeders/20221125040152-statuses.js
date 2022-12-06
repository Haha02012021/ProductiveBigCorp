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
   await queryInterface.bulkInsert('statuses', [
    {
      context: 'created'
    },
    {
      context: 'request'
    },
    {
      context: 'movingToSell'
    },
    {
      context: 'inStock'
    },
    {
      context: 'sold'
    },
    {
      context: 'requestMaintain'
    },
    {
      context: 'sendToMaintain'
    },
    {
      context: 'underMaintain'
    },
    {
      context: 'doneMaintain'
    },
    {
      context: 'maintainedAndReturn'
    },
    {
      context: 'maintainedAndReceive'
    },
    {
      context: 'broken'
    },
    {
      context: 'sendBackToFactory'
    },
    {
      context: 'destroyed'
    },
    {
      context: 'summoned'
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
     await queryInterface.bulkDelete('statuses', null, {})
  }
};
