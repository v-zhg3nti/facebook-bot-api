'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Jobseeker extends Model {
    static associate(models) {
      
    }
  }

  Jobseeker.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fio: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.TEXT,
      },
      userId: {
        type: DataTypes.TEXT,
      },
      telefoni: {
        type: DataTypes.TEXT,
      },
      asaki: {
        type: DataTypes.TEXT,
      },
      specialoba: {
        type: DataTypes.TEXT,
      },
      grafiki: {
        type: DataTypes.TEXT,
      },
      anazgaureba: {
        type: DataTypes.TEXT,
      },
      misamarti: {
        type: DataTypes.TEXT,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
        onUpdate: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Jobseeker',
      tableName: 'jobseekers',
      engine: 'InnoDB',
      charset: 'utf8mb4',
      collate: 'utf8mb4_0900_ai_ci',
      timestamps: true,
    }
  );

  return Jobseeker;
};