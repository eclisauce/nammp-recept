const _ = require('lodash');
const fs = require('fs');


/*
 * Calls Jsonfile
 *
 */
async function getjson() {
  let arr = await require('./foodOrginal.json').LivsmedelDataset.LivsmedelsLista[0].Livsmedel;
  return arr
}


/**
 * Gets json and pick properties we want
 *
 */
getjson()
  .then(async (jsondata) => {
    let resizedArray = [];
    for (let data of jsondata) {
      let obj = _.pick(data, ['Namn', 'Naringsvarden', 'ViktGram']);

    	for (let prop in obj) {
    		if (prop !== 'Naringsvarden') {
          obj[prop] = obj[prop][0]
        }
      }
      resizedArray.push(obj);
    }

    return await resizedArray
  })
  .then(async (resizedArray) => {

    resizedArray.forEach((data) => {
      let naringsvarde = [];

      data.Naringsvarden[0].Naringsvarde.forEach((naring) => {
        if (naring.Namn[0].match(/Energi|Kolhydrater|Salt|\b(Fett)\b|Salt|Protein|Vitamin|Mineral|Summa\smättade\sfettsyror/)) {
          // ["Energi (kJ)", "Energi (kcal)", "Kolhydrater", /Salt/, "Fett", "Salt", /Vitamin/, "Mineral", "Summa mättade fettsyror"]
          let obj = _.pick(naring, ['Namn', 'Forkortning', 'Enhet', 'Varde']);

          for (let prop in obj) {
            obj[prop] = obj[prop][0]
          }
          naringsvarde.push(obj)
        }
      });

      data.Naringsvarden = naringsvarde;

    });
    return await resizedArray;
  })
  .then((resizedArray) => {
    fs.writeFile("./new-food.json", JSON.stringify(resizedArray, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      };
      console.log("File has been created");
    });
  });
