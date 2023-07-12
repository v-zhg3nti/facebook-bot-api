"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("xsoft2", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        defaultValue: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      telefoni: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      specialoba: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ganatleba: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      erovneba: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      gamocdileba: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ucxoena: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      asaki: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("xsoft2");
  },
};
