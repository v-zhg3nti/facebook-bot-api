"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CollectAllData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CollectAllData.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        defaultValue: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefoni: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      specialoba: DataTypes.STRING,
      ganatleba: DataTypes.STRING,
      erovneba: DataTypes.STRING,
      gamocdileba: DataTypes.STRING,
      ucxoena: DataTypes.STRING,
      asaki: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CollectAllData",
      tableName: "collectAllData",
      timestamps: false,
    }
  );
  return CollectAllData;
};
