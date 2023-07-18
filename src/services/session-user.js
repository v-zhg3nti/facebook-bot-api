const { damkvetebiii } = require("../models/index");

async function createUser(data) {
  try {
    const existingUser = await damkvetebiii.findOne({ where: { teleponi: data.teleponi } });

    if (existingUser) {
      console.log("User already registered");
      return { message: "Thank you! You are already registered, and we will contact you soon." };
    }

    const user = await damkvetebiii.create(data);
    console.log("User registered:", user);

    return user;
  } catch (error) {
    console.log("Error encountered in createUser method:", error);
    throw error;
  }
}

async function updateUser(teleponi, updateData) {
  try {
    const updatedUser = await damkvetebiii.update(updateData, { where: { teleponi } });
    console.log("User updated:", updatedUser);

    return updatedUser;
  } catch (error) {
    console.log("Error encountered in updateUser method:", error);
    throw error;
  }
}

module.exports = {
  createUser,
  updateUser,
};
