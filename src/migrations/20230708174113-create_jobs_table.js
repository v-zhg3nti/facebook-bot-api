"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Jobs", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      sataurige: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sataurien: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      satauriru: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      poster: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      agwerage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      agweraen: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      agweraru: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      main: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Jobs");
  },
};
