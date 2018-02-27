import { helperFunctions } from './functions/helpFunctions.js';
import { domLoader } from "./domLoader.js";
import { CONSTANTS } from "./constants/constants.js";


window.onload = function() {
  helperFunctions.renderListOfObj(CONSTANTS.VEHICLES_URL);
};

// *** handling of update button
domLoader.updateBtn.addEventListener('click', function() {
  helperFunctions.deleteData({
    automobiles: domLoader.automobilesTable,
    airplanes: domLoader.airplanesTable,
    boats: domLoader.boatsTable
  });
  
  helperFunctions.renderListOfObj(CONSTANTS.VEHICLES_URL);
});




