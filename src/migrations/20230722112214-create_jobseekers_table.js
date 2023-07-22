'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('jobseekers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fio: {
        type: Sequelize.TEXT,
      },
      email: {
        type: Sequelize.TEXT,
      },
      userId: {
        type: Sequelize.TEXT,
      },
      telefoni: {
        type: Sequelize.TEXT,
      },
      asaki: {
        type: Sequelize.TEXT,
      },
      specialoba: {
        type: Sequelize.TEXT,
      },
      grafiki: {
        type: Sequelize.TEXT,
      },
      anazgaureba: {
        type: Sequelize.TEXT,
      },
      misamarti: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: true,
        onUpdate: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('jobseekers');
  }
};