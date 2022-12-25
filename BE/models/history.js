'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Manager, Product, Status}) {
      // define association here
      this.belongsTo(Manager, {as: 'manager', foreignKey: 'manager_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.belongsTo(Product, {as: 'product', foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
      this.belongsTo(Status, {as: 'status', foreignKey: 'status_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    }
  }
  History.init({
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'History',
    tableName: 'histories',
  });
  return History;
};