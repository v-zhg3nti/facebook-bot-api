'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      initials: {
        type: Sequelize.STRING(50),
        defaultValue: null,
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      mobile: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      generated_code: {
        type: Sequelize.STRING(50),
        defaultValue: null,
      },
      active: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      is_manager: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      rand: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      blocked: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      image: {
        type: Sequelize.TEXT,
      },
      incode: {
        type: Sequelize.TEXT,
      },
      last_ip: {
        type: Sequelize.TEXT,
      },
      comment: {
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
    await queryInterface.dropTable('users');
  },
};