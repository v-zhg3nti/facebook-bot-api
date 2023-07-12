const { xsoft2 } = require("../models/index");

async function createUser(data) {
  try {
    console.log("####Data", data);

    // Check if user already exists based on unique fields (telefoni in this case)
    const existingUser = await xsoft2.findOne({ where: { telefoni: data.telefoni } });

    if (existingUser) {
      console.log("User already registered");
      return { message: "Thank you! You are already registered and we will contact you soon." };
    }

    // If user does not exist, create a new entry
    const user = await xsoft2.create({
      email: data.email,
      telefoni: data.telefoni,
      fio: data.fio
    });

    return user;
  } catch (error) {
    console.log("Error encountered in createUser method:", error);
    throw error;
  }
}

async function updateUser(telefoni, updateData) {
  try {
    const updateUser = await xsoft2.update(updateData, {
      where: { telefoni },
    });
    return updateUser;
  } catch (error) {
    console.log("Error encountered in updateUser method:", error);
    throw error;
  }
}

module.exports = {
  createUser,
  updateUser,
};
