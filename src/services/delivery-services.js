const {Damkveti} = require('../models/index');


async function filterVacancy(event) {
    try {
      const filtervacancy = await Damkveti.findAll({
          where: { pozicia: event },
        });
       
      return filtervacancy;
    } catch (error) {
      console.log("error acquired in createSession method: ", error);
      throw error;
    }
  }
  
  
  module.exports = {
    filterVacancy
  };
  