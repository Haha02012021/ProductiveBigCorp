"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MODEL extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The models/index file will call this method automatically.
     */
    static associate({ Version, Color, Model_Color, Batch, Image, Request, Product }) {
      this.hasMany(Product, {
        foreignKey: "model_id",
        as: "products",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(Request, {
        foreignKey: "model_id",
        as: "requests",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(Image, {
        foreignKey: "model_id",
        as: "images",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(Version, {
        foreignKey: "model_id",
        as: "versions",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.belongsToMany(Color, {
        as: "colors",
        through: Model_Color,
        foreignKey: "model_id",
        otherKey: "color_id",
      });
      this.hasMany(Batch, {
        foreignKey: "model_id",
        as: "batches",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  MODEL.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      paranoid: true,
      hooks: {
        afterDestroy: async (instance, options) => {
          const versions = await instance.getVersions();
          versions.forEach(async element => {
            await element.destroy();
            console.log('after destroy: related versions destroyed');
          })

          const images = await instance.getImages();
          images.forEach(async element => {
            await element.destroy();
            console.log('after destroy: related images destroyed');
          })
        }
      },
      tableName: "models",
      modelName: "MODEL",
    }
  );
  return MODEL;
};
