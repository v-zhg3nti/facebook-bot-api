'use strict';
const { Model, DatabaseError } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class damkvetebiii extends Model {
    static associate(models) {
      // Define associations here
    }
  }
  damkvetebiii.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      saxeli: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      userId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      teleponi: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      raioni: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      grapiki: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pozicia: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      moqalaqeoba: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      anazgaureba: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      asaki: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ganatleba: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      movaleobebi: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sachiroeba: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      damatebiti: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: 'damkvetebiii',
      tableName: 'damkvetebiii',
      timestamps: false,
    }
  );
  return damkvetebiii;
};
