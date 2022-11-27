'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Version extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product, MODEL, Chassis, Engine, Exterior, Interior,I_ACTIVSENSE, Safety, Size, Batch}) {
      // define association here
      this.hasMany(Batch, {foreignKey: 'version_id', as: 'batches', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.hasMany(Product, {foreignKey: 'version_id', as: 'products', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.hasOne(Chassis, {foreignKey: 'version_id', as: 'chassis', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.hasOne(Engine, {foreignKey: 'version_id', as: 'engine', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.hasOne(Exterior, {foreignKey: 'version_id', as: 'exterior', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.hasOne(Interior, {foreignKey: 'version_id', as: 'interior', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.hasOne(I_ACTIVSENSE, {foreignKey: 'version_id', as: 'i_activesense', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.hasOne(Safety, {foreignKey: 'version_id', as: 'safety', onDelete: 'CASCADE', onUpdate: 'CASCADE'});    
      this.hasOne(Size, {foreignKey: 'version_id', as: 'size', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.belongsTo(MODEL, {foreignKey: 'model_id', as: 'model', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    }
  }
  Version.init({
    model_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'versions',
    modelName: 'Version',
  });
  return Version;
};