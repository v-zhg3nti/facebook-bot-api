const { CollectAllData } = require("../models/index");

async function createUser(userData) {
  try {
    const userMainData = (await CollectAllData.create(userData)).toJSON();
    console.log("created session: ", userMainData);
    return userMainData;
  } catch (error) {
    console.log("error acquired in createSession method: ", error);
    throw error;
  }
}

async function updateUser(phoneNumber, updateData) {
  try {
    const updateUser = await CollectAllData.update(updateData, {
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
