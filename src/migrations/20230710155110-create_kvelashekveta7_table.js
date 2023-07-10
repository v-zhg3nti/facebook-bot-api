'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('kvelashekveta7', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        defaultValue: 0,
      },
      saxeli: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      teleponi: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      raioni: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      pozicia: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      anazgaureba: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      damatebiti: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      shedegi: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      registerTime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      aweria: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    }, {
      charset: 'utf8mb3',
      collate: 'utf8mb3_unicode_ci',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('kvelashekveta7');
  }
};