const { damkvetebiii } = require('../models');

async function createUsers(options){
  try {
    console.log("@@@@@@@Options", options);
    const user = await damkvetebiii.create(options);
    return user;
  } catch (error) {
    console.log("error acquired in getUser method: ", error);
    throw error;
  }
}

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

async function updateUseer(userId, updateData) {
  try {
    const updatedSession = await User.update(updateData, {
      where: {userId: userId },
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
  updateUseer
};

// const { Users } = require("../models/index");

// async function createUsers(options){
//   try {
//     console.log("@@@@@@@Options", options);
//     const user = await User.create(options);
//     return user;
//   } catch (error) {
//     console.log("error acquired in getUser method: ", error);
//     throw error;
//   }
// }

// async function getUser(options) {
//   try {
//     console.log("@@@@@@@Options", options);
//     const user = await User.findOne({ where: { ...options }, raw: true });
//     return user;
//   } catch (error) {
//     console.log("error acquired in getUser method: ", error);
//     throw error;
//   }
// }

// async function updateUseer(userId, updateData) {
//   try {
//     const updatedSession = await User.update(updateData, {
//       where: {userId: userId },
//     });
//     return updatedSession;
//   } catch (error) {
//     console.log("error acquired in updateSession method: ", error);
//     throw error;
//   }
// }



// module.exports = {
//   getUser,
//   createUsers,
//   updateUseer
// };
