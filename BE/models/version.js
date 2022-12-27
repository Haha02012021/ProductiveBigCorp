"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Version extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Product,
      MODEL,
      Chassis,
      Engine,
      Exterior,
      Interior,
      Iactivsense,
      Safety,
      Size,
      Batch,
      Request,
    }) {
      // define association here
      this.hasMany(Request, {
        foreignKey: "version_id",
        as: "requests",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(Batch, {
        foreignKey: "version_id",
        as: "batches",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(Product, {
        foreignKey: "version_id",
        as: "products",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasOne(Chassis, {
        foreignKey: "version_id",
        as: "chassis",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasOne(Engine, {
        foreignKey: "version_id",
        as: "engine",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasOne(Exterior, {
        foreignKey: "version_id",
        as: "exterior",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasOne(Interior, {
        foreignKey: "version_id",
        as: "interior",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasOne(Iactivsense, {
        foreignKey: "version_id",
        as: "i_activsense",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasOne(Safety, {
        foreignKey: "version_id",
        as: "safety",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasOne(Size, {
        foreignKey: "version_id",
        as: "size",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.belongsTo(MODEL, {
        foreignKey: "model_id",
        as: "model",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        hooks: true,
      });
    }
  }
  Version.init(
    {
      model_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
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
            const chassis = await instance.getChassis();
            await chassis.destroy();
            console.log('related chassis deleted');

            const engine = await instance.getEngine();
            await engine.destroy();
            console.log('related engine deleted');

            const exterior = await instance.getExterior();
            await exterior.destroy();
            console.log('related exterior deleted');

            const interior = await instance.getInterior();
            await interior.destroy();
            console.log('related interior deleted');

            const i_activsense = await instance.getI_activsense();
            await i_activsense.destroy();
            console.log('related i_activsense deleted');

            const safety = await instance.getSafety();
            await safety.destroy();
            console.log('related safety deleted');

            const size = await instance.getSize();
            await size.destroy();
            console.log('related size deleted');
          }
        },
        tableName: "versions",
        modelName: "Version",
      },
  );
  return Version;
};
