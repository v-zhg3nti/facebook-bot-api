const { User } = require("../models/index");

async function createUser(userData) {
  try {
    const userMainData = (await User.create(userData)).toJSON();
    console.log("created session: ", userMainData);
    return userMainData;
  } catch (error) {
    console.log("error acquired in createSession method: ", error);
    throw error;
  }
}

async function updateUser(phoneNumber, updateData) {
  try {
    const updateUser = await User.update(updateData, {
      where: { phoneNumber },
    });
    return updateUser;
  } catch (error) {
    console.log("error acquired in updateSession method: ", error);
    throw error;
  }
}

module.exports = {
  createUser,
  updateUser,
};
