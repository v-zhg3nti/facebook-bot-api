const { Kvelashekveta7 } = require("../models/index");


async function filterDelivery(event) {
  try {
    const filtereDeliver = await Kvelashekveta7.findAll({
        where: { 
            pozicia: event,
        },
      });

      const filterShedegi=filtereDeliver.filter((item) => !item.shedegi.includes("დაკავდა") && !item.shedegi.includes("გაუქმდა"));
     
    return filterShedegi;
  } catch (error) {
    console.log("error acquired in createSession method: ", error);
    throw error;
  }
}


module.exports = {
    filterDelivery
};
