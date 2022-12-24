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
      "images",
      [
        {
          model_id: 1,
          link: "https://mazdamotors.vn/media/vxvlj4du/mazda_cx5_gallery_exterior_4.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 1,
          link: "https://mazdamotors.vn/media/3sxfepw4/mazda_cx5_gallery_exterior_1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 1,
          link: "https://mazdamotors.vn/media/h1lbeqtx/mazda_cx5_gallery_exterior_5.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 1,
          link: "https://mazdamotors.vn/media/vxvlj4du/mazda_cx5_gallery_exterior_4.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 1,
          link: "https://mazdamotors.vn/media/3sxfepw4/mazda_cx5_gallery_exterior_1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 1,
          link: "https://mazdamotors.vn/media/h1lbeqtx/mazda_cx5_gallery_exterior_5.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 1,
          link: "https://mazdamotors.vn/media/vxvlj4du/mazda_cx5_gallery_exterior_4.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 1,
          link: "https://mazdamotors.vn/media/3sxfepw4/mazda_cx5_gallery_exterior_1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 1,
          link: "https://mazdamotors.vn/media/h1lbeqtx/mazda_cx5_gallery_exterior_5.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 3,
          link: "https://mazdamotors.vn/media/c1mfznf3/_tha5357-2.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 3,
          link: "https://mazdamotors.vn/media/cbun4n3b/_tha5958.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 3,
          link: "https://mazdamotors.vn/media/ewecayuo/_tha5996.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 4,
          link: "https://mazdamotors.vn/media/135gwkbl/_tha7142.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 4,
          link: "https://mazdamotors.vn/media/yxgfe4y5/_tha7021.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 4,
          link: "https://mazdamotors.vn/media/qpsbkzun/_tha7172-1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 5,
          link: "https://mazdamotors.vn/media/sdsjpu4g/new-mazda2_1.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 5,
          link: "https://mazdamotors.vn/media/anbdxtgg/new-mazda2_5.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 5,
          link: "https://mazdamotors.vn/media/guzecv4c/new-mazda2_7.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 6,
          link: "https://mazdamotors.vn/media/czzjj3bx/all-new-mazda3-9.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 6,
          link: "https://mazdamotors.vn/media/v41dp0wk/all-new-mazda3-10.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 6,
          link: "https://mazdamotors.vn/media/2h3dc1d5/all-new-mazda3-7.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 7,
          link: "https://mazdamotors.vn/media/x5shxx0l/new-mazda6_4.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 7,
          link: "https://mazdamotors.vn/media/kyxlukn2/new-mazda6_8.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 7,
          link: "https://mazdamotors.vn/media/kuufkpn3/new-mazda6_2.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 8,
          link: "https://mazdamotors.vn/media/vhbbp1we/new-mazda2-sport_10.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 8,
          link: "https://mazdamotors.vn/media/rdudsrt2/new-mazda2-sport_7.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 8,
          link: "https://mazdamotors.vn/media/vp2ovd5y/new-mazda2-sport_1-1.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 9,
          link: "https://mazdamotors.vn/media/gg2j3zbv/mazda3-sport-5.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 9,
          link: "https://mazdamotors.vn/media/ylhoozto/mazda3-sport-1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 9,
          link: "https://mazdamotors.vn/media/eepb2ey0/mazda3-sport-6.jpg",
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
    await queryInterface.bulkDelete("images", null, {});
  },
};
