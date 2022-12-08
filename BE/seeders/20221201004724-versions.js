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
     await queryInterface.bulkInsert('versions', [
      {
        model_id: 1,
        name: 'Mazda CX-5 2.0L Deluxe'
      },
      {
        model_id: 1,
        name: 'Mazda CX-5 2.0L Luxury'
      },
      {
        model_id: 1,
        name: 'Mazda CX-5 2.0L Premium'
      },
      {
        model_id: 1,
        name: 'Mazda CX-5 2.5L Signature Premium AWD'
      },
      {
        model_id: 2,
        name: 'New Mazda CX-8 2.5L Luxury'
      },
      {
        model_id: 2,
        name: 'New Mazda CX-8 2.5L Premium'
      },
      {
        model_id: 2,
        name: 'New Mazda CX-8 2.5L Premium AWD '
      },
      {
        model_id: 2,
        name: 'New Mazda CX-8 2.5L Premium AWD (6S)'
      },
      {
        model_id: 3,
        name: 'Mazda CX-3 1.5L Deluxe'
      },
      {
        model_id: 3,
        name: 'Mazda CX-3 1.5L Luxury'
      },
      {
        model_id: 3,
        name: 'Mazda CX-3 1.5L Premium'
      },
      {
        model_id: 4,
        name: 'Mazda CX-30 2.0L Luxury'
      },
      {
        model_id: 4,
        name: 'Mazda CX-30 2.0L Premium'
      },
      {
        model_id: 5,
        name: 'Mazda2 1.5L AT'
      },
      {
        model_id: 5,
        name: 'Mazda2 1.5L Luxury'
      },
      {
        model_id: 5,
        name: 'Mazda2 1.5L Premium'
      },
      {
        model_id: 6,
        name: 'Mazda3 1.5L Deluxe'
      },
      {
        model_id: 6,
        name: 'Mazda3 1.5L Luxury'
      },
      {
        model_id: 6,
        name: 'Mazda3 1.5L Premium'
      },
      {
        model_id: 7,
        name: 'New Mazda6 2.0L Premium'
      },
      {
        model_id: 7,
        name: 'New Mazda6 2.0L Premium GTCCC'
      },
      {
        model_id: 7,
        name: 'New Mazda6 2.5L Signature Premium GTCCC'
      },
      {
        model_id: 8,
        name: 'Mazda2 Sport 1.5L Luxury'
      },
      {
        model_id: 8,
        name: 'Mazda2 Sport 1.5L Premium'
      },
      {
        model_id: 9,
        name: 'Mazda3 Sport 1.5L Luxury'
      },
      {
        model_id: 9,
        name: 'Mazda3 Sport 1.5L Premium'
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
     await queryInterface.bulkDelete('versions', null, {})
  }
};
