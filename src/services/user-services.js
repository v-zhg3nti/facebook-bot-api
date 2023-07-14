const { damkvetebiii } = require('../models');

async function getUser(options) {
  try {
    console.log("@@@@@@@Options", options);
    const user = await damkvetebiii.findOne({
      where: { ...options },
      raw: true,
    });
    return user;
  } catch (error) {
    console.log("Error encountered in getUser method:", error);
    throw error;
  }
}

module.exports = {
  getUser,
};
