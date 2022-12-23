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
          image: 'https://mazdamotors.vn/media/yvofptaw/cx-5_kn6alaa_46v_kd6_ext_360_36_png_0036.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 1,
          color_id: 2,
          image: 'https://mazdamotors.vn/media/dbfp1dtb/cx-5_kn6alaa_25d_kd6_ext_360_36_png_0036.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 1,
          color_id: 3,
          image: 'https://mazdamotors.vn/media/50kiifwe/cx-5_kn6alaa_46g_kd6_ext_360_36_png_0036.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 1,
          color_id: 4,
          image: 'https://mazdamotors.vn/media/dbpfki0r/cx-5_kn6alaa_41w_kd6_ext_360_36_png_0036.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 2,
          color_id: 1,
          image: 'https://mazdamotors.vn/media/p1dbrgpx/l_0023.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 2,
          color_id: 2,
          image: 'https://mazdamotors.vn/media/k25bhetp/l_0023.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 2,
          color_id: 3,
          image: 'https://mazdamotors.vn/media/vrdpuzy0/l_0023.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 2,
          color_id: 4,
          image: 'https://mazdamotors.vn/media/1yxjgtqc/l_0023.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 2,
          color_id: 5,
          image: 'https://mazdamotors.vn/media/vrdpuzy0/l_0023.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 2,
          color_id: 7,
          image: 'https://mazdamotors.vn/media/rgieh0vc/l_0023.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 3,
          color_id: 1,
          image: 'https://mazdamotors.vn/media/mr4dkpzc/cx-3_dl9nlab_46v_d0g_ext_360_36_png_0036.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 3,
          color_id: 2,
          image: 'https://mazdamotors.vn/media/ekwnb0rn/cx-3_dl9nlab_a4d_d0g_ext_360_36_png_0036.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 3,
          color_id: 3,
          image: 'https://mazdamotors.vn/media/ekwnb0rn/cx-3_dl9nlab_a4d_d0g_ext_360_36_png_0036.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 3,
          color_id: 6,
          image: 'https://mazdamotors.vn/media/pz0etti1/cx-3_dl9nlab_47a_d0g_ext_360_36_png_0036.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 4,
          color_id: 1,
          image: 'https://mazdamotors.vn/media/d02bg5zh/l_0023.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 4,
          color_id: 2,
          image: 'https://mazdamotors.vn/media/r11dsoj1/l_0023.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 4,
          color_id: 7,
          image: 'https://mazdamotors.vn/media/4g5k1n5r/l_0023.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 5,
          color_id: 1,
          image: 'https://mazdamotors.vn/media/ogtjaeim/u.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 5,
          color_id: 2,
          image: 'https://mazdamotors.vn/media/jfvj403y/w.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 5,
          color_id: 8,
          image: 'https://mazdamotors.vn/media/mxshzvvh/v.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 6,
          color_id: 1,
          image: 'https://mazdamotors.vn/media/cgehyien/mazda3_bfvgnak_46v_by3_ext_360_36_png_0036.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 6,
          color_id: 2,
          image: 'https://mazdamotors.vn/media/viejhwcw/mazda3_bfvgnak_25d_by3_ext_360_36_png_0036.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 6,
          color_id: 3,
          image: 'https://mazdamotors.vn/media/jdmfdf00/mazda3_bfvgnak_46g_by3_ext_360_36_png_0036.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 6,
          color_id: 4,
          image: 'https://mazdamotors.vn/media/pfzhmwex/mazda3_bfvgnak_41w_by3_ext_360_36_png_0036.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 6,
          color_id: 7,
          image: 'https://mazdamotors.vn/media/n5hnxuzp/mazda3_bfvgnak_42m_by3_ext_360_36_png_0036.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 7,
          color_id: 1,
          image: 'https://mazdamotors.vn/media/munl0guj/mazda6_gsj9eae_46v_gt7_ext_360_36_png_0036.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 7,
          color_id: 2,
          image: 'https://mazdamotors.vn/media/gcxbx2x1/mazda6_gsj9eae_25d_gt7_ext_360_36_png_0036.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 7,
          color_id: 3,
          image: 'https://mazdamotors.vn/media/v4op0k2s/mazda6_gsj9eae_46g_gt7_ext_360_36_png_0036.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 7,
          color_id: 4,
          image: 'https://mazdamotors.vn/media/53qj5bx5/mazda6_gsj9eae_41w_gt7_ext_360_36_png_0036.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 7,
          color_id: 7,
          image: 'https://mazdamotors.vn/media/glcjpuqh/mazda6_gsj9eae_42m_gt7_ext_360_36_png_0036.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 8,
          color_id: 1,
          image: 'https://mazdamotors.vn/media/n43cmg0c/u.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 8,
          color_id: 2,
          image: 'https://mazdamotors.vn/media/hj1itlsh/u-1.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 8,
          color_id: 5,
          image: 'https://mazdamotors.vn/media/gquluzy0/l_0000.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 8,
          color_id: 8,
          image: 'https://mazdamotors.vn/media/irkb2ebs/w.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 9,
          color_id: 1,
          image: 'https://mazdamotors.vn/media/ktnpf31q/mazda3_bcksnar_46v_by7_ext_360_36_png_0036.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 9,
          color_id: 2,
          image: 'https://mazdamotors.vn/media/z0jjhzli/mazda3_bcksnar_25d_by7_ext_360_36_png_0036.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 9,
          color_id: 3,
          image: 'https://mazdamotors.vn/media/5taj3ryr/mazda3_bcksnar_46g_by9_ext_360_36_png_0036.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 9,
          color_id: 4,
          image: 'https://mazdamotors.vn/media/arijowsb/mazda3_bcksnar_41w_by7_ext_360_36_png_0036.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 9,
          color_id: 7,
          image: 'https://mazdamotors.vn/media/fl1ln5gs/mazda3_bcksnar_42m_by7_ext_360_36_png_0036.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model_id: 9,
          color_id: 9,
          image: 'https://mazdamotors.vn/media/js4klagu/mazda3_bcksnar_47c_by7_ext_360_36_png_0036.jpg',
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
