const { User } = require("../models/index");
const { Email } = require("../models/index");

async function getUser(options) {
  try {
    console.log("@@@@@@@Options", options);
    const user = await Email.findOne({ where: { ...options }, raw: true });

    return user;
  } catch (error) {
    console.log("error acquired in getUser method: ", error);
    throw error;
  }
}

module.exports = {
  getUser,
};
