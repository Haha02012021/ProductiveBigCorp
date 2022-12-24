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
    await queryInterface.bulkInsert('managers', [
      {
        name: 'trụ sở chính',
        place: 'Hà Nội',
        account: 'abcd11',
        password: 'abcd!@#$',
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'nhà máy 1',
        place: 'Hà Nội',
        account: 'abcd12',
        password: 'abcd!@#$',
        role: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'cơ sở bảo dưỡng 1',
        place: 'Hà Nội',
        account: 'abcd13',
        password: 'abcd!@#$',
        role: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'cửa hàng 1',
        place: 'Hà Nội',
        account: 'abcd123',
        password: 'abcd!@#$',
        role: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
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
    await queryInterface.bulkDelete('managers', null, {});
  }
};
