'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('sizes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      version_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: ' must have a version' },
          notEmpty: { msg: 'version must not be empty' },
        },
      },
      kich_thuoc_tong_the: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      chieu_dai_co_so: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ban_kinh_quay_vong_toi_thieu: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      khoang_sang_gam_xe: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      khoi_luong_khong_tai: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      khoi_luong_toan_tai: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      the_tich_khoang_hanh_ly: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dung_tich_thung_nhien_lieu: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('sizes');
  }
};