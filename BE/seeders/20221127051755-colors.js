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
      "colors",
      [
        {
          code: "#972424",
          name: "soul red crystal metalic",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "#ffffff",
          name: "snowflake white pearl mica",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "#4f535b",
          name: "machine grey",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "#101312",
          name: "jet black",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "#534b42",
          name: "titanium flash",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "#e7e7e7",
          name: "ceramic",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "#1b283d",
          name: "deep crystal blue",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "#4d7fa6",
          name: "eternal blue",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "#747d81",
          name: "polymetal grey metalic",
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
    await queryInterface.bulkDelete("colors", null, {});
  },
};
