'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Damkveti extends Model {
    static associate(models) {
      // Define associations with other models if needed
    }
  }

  Damkveti.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      saxeli: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      teleponi: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      raioni: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      grapiki: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      pozicia: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      anazgaureba: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      asaki: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      moqalaqeoba: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ganatleba: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      movaleobebi: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      sachiroeba: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      damatebiti: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      registerTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      aweria: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      charicxva: {
        type: DataTypes.STRING(10000),
        allowNull: false,
        defaultValue: 'ჩასარიცხია',
      },
      charicxva2: {
        type: DataTypes.STRING(10000),
        allowNull: true,
      },
      shedegi: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      mosakitxi: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ruqa: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      surati: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      complect: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      xelshekruleba: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      xelshekrulebadate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      xelshekrulebafile: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      logic: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      registrator: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      chatfuel_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      FromFacebookInterested: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ChangeDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      already: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      updated: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      approved: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      daintereseba: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      fb_id: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      sent: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      shedegisent: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      shedegisub: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      share_text: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Damkveti',
      tableName: 'damkveti',
      timestamps: false,
      charset: 'ucs2',
      collate: 'ucs2_unicode_ci',
    }
  );

  return Damkveti;
};