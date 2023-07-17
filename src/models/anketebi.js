'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Email extends Model {
        static associate(models) {
        }
    }
    Email.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        email: DataTypes.STRING,
        regT: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Email',
        tableName: 'email',
        timestamps: false,
    });
    return Email;
};