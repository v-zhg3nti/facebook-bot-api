const { Job } = require("../models/index");

async function filterJobs(event) {
  try {
    const filteredJobs = await Job.findAll({
        where: { 
          sataurien: event,
        },
      });
     
    return filteredJobs;
  } catch (error) {
    console.log("error acquired in createSession method: ", error);
    throw error;
  }
}


module.exports = {
    filterJobs
};