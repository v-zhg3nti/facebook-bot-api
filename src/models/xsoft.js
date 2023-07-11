"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class xsoft extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  xsoft.init(
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
    },
    {
      sequelize,
      modelName: "xsoft",
      tableName: "xsoft",
      timestamps: false,
    }
  );
  return xsoft;
};
