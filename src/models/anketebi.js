"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Anketebi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Anketebi.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      specialoba: DataTypes.STRING,
      email: DataTypes.STRING,
      telefoni: DataTypes.STRING,
      fio: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Anketebi",
      tableName: "anketebi",
    }
  );
  return Anketebi;
};
