const { User } = require("../models/index");

async function createUsers(sessionData) {
  try {
    const userSession = (await User.create(sessionData)).toJSON();
    console.log("created session: ", userSession);
    return userSession;
  } catch (error) {
    console.log("error acquired in createSession method: ", error);
    throw error;
  }
}

async function getUser(options) {
  try {
    console.log("@@@@@@@Options", options);
    const user = await User.findOne({ where: { ...options }, raw: true });
    return user;
  } catch (error) {
    console.log("error acquired in getUser method: ", error);
    throw error;
  }
}

async function updateUser(phoneNumber, updateData) {
  try {
    const updatedSession = await UserSession.update(updateData, {
      where: { phoneNumber },
    });
    return updatedSession;
  } catch (error) {
    console.log("error acquired in updateSession method: ", error);
    throw error;
  }
}

module.exports = {
  getUser,
  createUsers,
  updateUser
};
