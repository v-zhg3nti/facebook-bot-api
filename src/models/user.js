'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
  
    }
  }
  User.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    userId: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};