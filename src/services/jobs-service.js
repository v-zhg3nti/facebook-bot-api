const { jobs } = require('../models/index')

async function getJobs(options) {
  try {
    console.log("@@@@@@@Options", options);
    const job = await jobs.findOne({ where: { ...options }, raw: true });
    return job;
  } catch (error) {
    console.log("error acquired in getJobs method: ", error);
    throw error;
  }
}

module.exports = {
  getJobs,
};
