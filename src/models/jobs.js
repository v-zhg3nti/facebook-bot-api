'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    static associate(models) {
      // Define associations with other models if needed
    }
  }

  Job.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    sataurige: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sataurien: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    satauriru: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    poster: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    agwerage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    agweraen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    agweraru: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    main: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Job',
    tableName: 'jobs',
    timestamps: false,
  });

  return Job;
};