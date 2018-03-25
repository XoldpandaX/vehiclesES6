import { CONSTANTS } from './constants/constants.js';
import * as Vehicles from './classes/VehiclesClasses';
import * as helper from './functions/helperFunctions';

const tableCells = {
  automobiles: CONSTANTS.DOM.AUTOMOBILES_TABLE,
  airplanes: CONSTANTS.DOM.AIRPLANES_TABLE,
  boats: CONSTANTS.DOM.BOATS_TABLE
};

const vehiclesObj = {
  automobile: Vehicles.Auto,
  airplane: Vehicles.Airplane,
  boat: Vehicles.Boat
};

window.onload = function() {
  getVehicles(CONSTANTS.URLS.VEHICLES_URL);
};

// *** handling of update button
CONSTANTS.DOM.UPDATE_BTN.addEventListener('click', function(e) {
  getVehicles(CONSTANTS.URLS.VEHICLES_URL, e);
});

function getVehicles(url, event=null) {
  let vehiclesArrOfObj = [];
  
  helper.httpGet(url)
    .then(resolve => {
        if (!event) {
          helper.cacheData('vehicles', JSON.stringify(resolve));
          helper.renderListOfVehicles(resolve, vehiclesArrOfObj, vehiclesObj);
        } else {
          const storageVehicles = JSON.parse(localStorage.getItem('vehicles'));

          if (storageVehicles.length !== resolve.length) {
            helper.deleteData(tableCells);
            
            helper.localStorageRefresh('vehicles', JSON.stringify(resolve));
            helper.renderListOfVehicles(resolve, vehiclesArrOfObj, vehiclesObj);

          } else {
            const
              serverVehicles = resolve,
              storageVehicles = JSON.parse(localStorage.getItem('vehicles'));

            const compare = helper.compareTwoVehicleObjects(serverVehicles, storageVehicles);
            if (!compare) {
              helper.deleteData(tableCells);
              helper.localStorageRefresh('vehicles', JSON.stringify(resolve));
              helper.renderListOfVehicles(resolve, vehiclesArrOfObj, vehiclesObj);
            }
          }
        }
      }
    ).catch(error => console.log(error));
}





