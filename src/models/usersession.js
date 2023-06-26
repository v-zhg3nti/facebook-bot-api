const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class UserSession extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  UserSession.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      sessionId: DataTypes.STRING,
      stage: DataTypes.INTEGER,
      serviceName: DataTypes.STRING,
      interest: DataTypes.STRING,
      createdAt: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "UserSession",
      defaultScope: {
        raw: true,
      },
    }
  );

  return UserSession;
};
