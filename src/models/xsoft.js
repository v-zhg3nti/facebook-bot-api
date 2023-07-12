"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class xsoft2 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  xsoft2.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      telefoni: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      specialoba: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ganatleba: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      erovneba: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      gamocdileba: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ucxoena: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      asaki: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "xsoft2",
      tableName: "xsoft2",
      timestamps: false,
    }
  );
  return xsoft2;
};
