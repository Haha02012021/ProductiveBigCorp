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
          price: 839000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 1,
          name: "Mazda CX-5 2.0L Luxury",
          price: 879000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 1,
          name: "Mazda CX-5 2.0L Premium",
          price: 919000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 1,
          name: "Mazda CX-5 2.5L Signature Premium AWD",
          price: 1059000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 2,
          name: "New Mazda CX-8 2.5L Luxury",
          price: 1079000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 2,
          name: "New Mazda CX-8 2.5L Premium",
          price: 1169000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 2,
          name: "New Mazda CX-8 2.5L Premium AWD ",
          price: 1259000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 2,
          name: "New Mazda CX-8 2.5L Premium AWD (6S)",
          price: 1269000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 3,
          name: "Mazda CX-3 1.5L Deluxe",
          price: 649000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 3,
          name: "Mazda CX-3 1.5L Luxury",
          price: 659000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 3,
          name: "Mazda CX-3 1.5L Premium",
          price: 729000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 4,
          name: "Mazda CX-30 2.0L Luxury",
          price: 549000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 4,
          name: "Mazda CX-30 2.0L Premium",
          price: 909000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 5,
          name: "Mazda2 1.5L AT",
          price: 479000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 5,
          name: "Mazda2 1.5L Luxury",
          price: 559000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 5,
          name: "Mazda2 1.5L Premium",
          price: 599000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 6,
          name: "Mazda3 1.5L Deluxe",
          price: 669000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 6,
          name: "Mazda3 1.5L Luxury",
          price: 719000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 6,
          name: "Mazda3 1.5L Premium",
          price: 759000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 7,
          name: "New Mazda6 2.0L Luxury",
          price: 889000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 7,
          name: "New Mazda6 2.0L Premium",
          price: 949000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 7,
          name: "New Mazda6 2.0L Premium GTCCC",
          price: 999000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 7,
          name: "New Mazda6 2.5L Signature Premium GTCCC",
          price: 1109000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 8,
          name: "Mazda2 Sport 1.5L Luxury",
          price: 574000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 8,
          name: "Mazda2 Sport 1.5L Premium",
          price: 619000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 9,
          name: "Mazda3 Sport 1.5L Luxury",
          price: 739000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 9,
          name: "Mazda3 Sport 1.5L Premium",
          price: 789000000,
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
