"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CollectAllData", {
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
      specialoba: Sequelize.STRING,
      ganatleba: Sequelize.STRING,
      erovneba: Sequelize.STRING,
      gamocdileba: Sequelize.STRING,
      ucxoena: Sequelize.STRING,
      asaki: Sequelize.STRING,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("CollectAllData");
  },
};
