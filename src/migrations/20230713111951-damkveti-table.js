'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('damkvetebiii', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      saxeli: {
        type: Sequelize.STRING,
        allowNull: true
      },
      teleponi: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      raioni: {
        type: Sequelize.STRING,
        allowNull: true
      },  
      grapiki: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pozicia: {
        type: Sequelize.STRING,
        allowNull: true
      },
      anazgaureba: {
        type: Sequelize.STRING,
        allowNull: true
      },
      asaki: {
        type: Sequelize.STRING,
        allowNull: true
      },
      moqalaqeoba: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ganatleba: {
        type: Sequelize.STRING,
        allowNull: true
      },
      movaleobebi: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sachiroeba: {
        type: Sequelize.STRING,
        allowNull: true
      },
      damatebiti: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('damkvetebiii');
  }
};
