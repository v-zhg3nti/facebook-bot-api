'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations between models here if needed
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      initials: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      mobile: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      generated_code: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      active: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      is_manager: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      rand: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      blocked: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      image: {
        type: DataTypes.TEXT,
      },
      incode: {
        type: DataTypes.TEXT,
      },
      last_ip: {
        type: DataTypes.TEXT,
      },
      comment: {
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
      modelName: 'User',
      tableName: 'users',
      engine: 'InnoDB',
      charset: 'utf8mb4',
      collate: 'utf8mb4_0900_ai_ci',
      timestamps: true,
    }
  );

  return User;
};