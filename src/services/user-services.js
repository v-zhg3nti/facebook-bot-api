const { User } = require("../models/index");

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

module.exports = {
  getUser,
};
