const { User } = require("../models/index");

async function createUsers2(options) {
  try {
    console.log("@@@@@@@Options", options);
    const user = await User.create(options);
    return user;
  } catch (error) {
    console.log("Error in createUsers2:", error);
    throw error;
  }
}

async function getUser2(options) {
  try {
    console.log("@@@@@@@Options", options);
    const user = await User.findOne({ where: { ...options }, raw: true });
    return user;
  } catch (error) {
    console.log("Error in getUser2:", error);
    throw error;
  }
}

async function updateUser2(userId, updateData) {
  try {
    console.log("@@@@@@@userId", userId);
    console.log("@@@@@@@updateData", updateData);
    const updatedUser = await User.update(updateData, {
      where: { id: userId },
    });
    console.log("Updated rows:", updatedUser[0]);

    if (updatedUser[0] === 0) {
      throw new Error("User not found or no rows updated");
    }

    return updatedUser;
  } catch (error) {
    console.log("Error in updateUser2:", error);
    throw error;
  }
}

module.exports = {
  getUser2,
  createUsers2,
  updateUser2,
};
