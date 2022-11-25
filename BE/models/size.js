'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Version}) {
      // define association here
      this.belongsTo(Version, {foreignKey: 'version_id', as: 'version', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    }
  }
  Size.init({
    version_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: ' must have a version' },
        notEmpty: { msg: 'version must not be empty' },
      },
    },
    tong_the: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    do_dai_co_so: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ban_kinh_quay: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    khoang_sang_gam: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    khoi_luong_chuan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    khoi_luong_co_tai: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    the_tich_khoang_hanh_ly: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dung_tich_nhien_lieu: {
      type: DataTypes.STRING,
      allowNull: true,
    },  
  }, {
    sequelize,
    tableName: 'sizes',
    modelName: 'Size',
  });
  return Size;
};