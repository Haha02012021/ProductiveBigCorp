'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class I_ACTIVSENSE extends Model {
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
  I_ACTIVSENSE.init({
    version_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: ' must have a version' },
        notEmpty: { msg: 'version must not be empty' },
      },
    },
    AFS: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    HBC: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ALH: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    RCTA: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LDW: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LAS: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phanh_thong_mminh_truoc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phanh_thong_minh_sau: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SBS: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    MRCC: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DAA: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    BSM: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'i_activsense',
    modelName: 'I_ACTIVSENSE',
  });
  return I_ACTIVSENSE;
};