const { User } = require("../models/index");

async function createUsers2(options){
  try {
    const user = await User.create(options);
    return user;
  } catch (error) {
    console.log("error acquired in getUser method: ", error);
    throw error;
  }
}

async function getUser2(options) {
  try {
    const user = await User.findOne({ where: { ...options }, raw: true });
    return user;

  } catch (error) {
    console.log("error acquired in getUser method: ", error);
    throw error;
  }
}

async function updateUseer2(userId, updateData) {
  try {
    const updatedUser = await User.update(updateData, {
      where: { userId: userId },
    });

    return updatedUser;
  } catch (error) {
    console.log("error acquired in updateSession method: ", error);
    throw error;
  }
}


module.exports = {
  getUser2,
  createUsers2,
  updateUseer2
};