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
      "versions",
      [
        {
          model_id: 1,
          name: "Mazda CX-5 2.0L Deluxe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 1,
          name: "Mazda CX-5 2.0L Luxury",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 1,
          name: "Mazda CX-5 2.0L Premium",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 1,
          name: "Mazda CX-5 2.5L Signature Premium AWD",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 2,
          name: "New Mazda CX-8 2.5L Luxury",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 2,
          name: "New Mazda CX-8 2.5L Premium",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 2,
          name: "New Mazda CX-8 2.5L Premium AWD ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 2,
          name: "New Mazda CX-8 2.5L Premium AWD (6S)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 3,
          name: "Mazda CX-3 1.5L Deluxe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 3,
          name: "Mazda CX-3 1.5L Luxury",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 3,
          name: "Mazda CX-3 1.5L Premium",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 4,
          name: "Mazda CX-30 2.0L Luxury",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 4,
          name: "Mazda CX-30 2.0L Premium",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 5,
          name: "Mazda2 1.5L AT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 5,
          name: "Mazda2 1.5L Luxury",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 5,
          name: "Mazda2 1.5L Premium",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 6,
          name: "Mazda3 1.5L Deluxe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 6,
          name: "Mazda3 1.5L Luxury",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 6,
          name: "Mazda3 1.5L Premium",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 7,
          name: "New Mazda6 2.0L Premium",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 7,
          name: "New Mazda6 2.0L Premium GTCCC",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 7,
          name: "New Mazda6 2.5L Signature Premium GTCCC",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 8,
          name: "Mazda2 Sport 1.5L Luxury",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 8,
          name: "Mazda2 Sport 1.5L Premium",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 9,
          name: "Mazda3 Sport 1.5L Luxury",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 9,
          name: "Mazda3 Sport 1.5L Premium",
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
    await queryInterface.bulkDelete("versions", null, {});
  },
};
