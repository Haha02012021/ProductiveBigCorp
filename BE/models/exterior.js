'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exterior extends Model {
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
  Exterior.init({
    version_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: ' must have a version' },
        notEmpty: { msg: 'version must not be empty' },
      },
    },
    chieu_gan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    chieu_xa: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Led_ngay: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    auto_bat_tat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    can_bang_goc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gap_chinh_dien: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    auto_gat_mua: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    den_sau_led: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cua_so_troi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ong_xa_kep: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'exteriors',
    modelName: 'Exterior',
  });
  return Exterior;
};