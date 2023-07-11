"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("xsoft", {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("xsoft");
  },
};
