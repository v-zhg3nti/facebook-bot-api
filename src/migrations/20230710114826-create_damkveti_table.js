'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('damkveti', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      saxeli: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      teleponi: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      raioni: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      grapiki: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      pozicia: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      anazgaureba: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      asaki: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      moqalaqeoba: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ganatleba: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      movaleobebi: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      sachiroeba: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      damatebiti: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      registerTime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      aweria: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      charicxva: {
        type: Sequelize.STRING(10000),
        allowNull: false,
        defaultValue: 'ჩასარიცხია',
      },
      charicxva2: {
        type: Sequelize.STRING(10000),
        allowNull: true,
      },
      shedegi: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      mosakitxi: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      ruqa: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      surati: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      complect: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      xelshekruleba: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      xelshekrulebadate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      xelshekrulebafile: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      logic: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      registrator: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      chatfuel_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      FromFacebookInterested: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ChangeDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      already: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      updated: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      approved: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      daintereseba: {
        type: Sequelize.TEXT('ucs2') + ' COLLATE ucs2_unicode_ci',
        allowNull: true,
      },
      fb_id: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      sent: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      shedegisent: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      shedegisub: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      share_text: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('damkveti');
  },
};