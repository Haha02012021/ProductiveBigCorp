"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product, History }) {
      this.hasMany(Product, {
        foreignKey: "status_id",
        as: "products",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.belongsToMany(Product, {
        as: "hasProducts",
        through: History,
        foreignKey: "status_id",
        otherKey: "product_id",
      });
      // define association here
    }
  }
  Status.init(
    {
      context: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "statuses",
      modelName: "Status",
    }
  );
  return Status;
};
