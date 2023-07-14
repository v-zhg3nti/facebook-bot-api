'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Kvelashekveta7 extends Model {
    static associate(models) {
      // Define associations with other models if needed
    }
  }

  Kvelashekveta7.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        defaultValue: 0,
      },
      saxeli: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      teleponi: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      raioni: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      pozicia: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      anazgaureba: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      damatebiti: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      shedegi: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      registerTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      aweria: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'Kvelashekveta7',
      tableName: 'kvelashekveta7',
      timestamps: false,
      charset: 'utf8mb3',
      collate: 'utf8mb3_unicode_ci',
      engine: 'MyISAM'
    }
  );

  return Kvelashekveta7;
};