const { Kvelashekveta7 } = require("../models/index");


async function filterDelivery(event) {
  try {
    const filtereDeliver = await Kvelashekveta7.findAll({
        where: { 
            pozicia: event,
        },
      });
     
    return filtereDeliver;
  } catch (error) {
    console.log("error acquired in createSession method: ", error);
    throw error;
  }
}


module.exports = {
    filterDelivery
};
