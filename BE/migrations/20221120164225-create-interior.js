'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('interiors', {
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
      chat_lieu_noi_that: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ghe_lai_dieu_chinh_dien: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ghe_lai_co_nho_vi_tri: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ghe_phu_dieu_chinh_dien: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dvd_player: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      man_hinh_cam_ung: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      AUX_USB_bluetooth: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      so_loa: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lay_chuyen_so: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phanh_tay_dien_tu: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      giu_phanh_tu_dong: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      khoi_dong_bang_nut_bam: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ga_tu_dong: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dieu_hoa_tu_dong: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cua_gio_hang_ghe_sau: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cua_so_chinh_dien: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      guong_hau_trung_tam_chong_choi_tu_dong: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hud: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rem_che_nang_kinh_sau_chinh_dien: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rem_che_nang_cua_so_sau: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tua_tay_hang_ghe_sau: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tua_tay_ghe_sau_tich_hop_cong_usb: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hang_ghe_thu_hai_gap_theo_ti_le_60_40: {
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
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('interiors');
  }
};