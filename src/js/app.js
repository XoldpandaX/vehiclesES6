import { CONSTANTS } from './constants/constants.js';
import * as Vehicles from './classes/VehiclesClasses';
import * as helperFunctions from './functions/helperFunctions';

window.onload = function() {
  getVehicles(CONSTANTS.URLS.VEHICLES_URL);
  // getObjectByUrl(CONSTANTS.URLS.VEHICLES_URL);
};

// *** handling of update button
CONSTANTS.DOM.UPDATE_BTN.addEventListener('click', function() {
  deleteData({
    automobiles: CONSTANTS.DOM.AUTOMOBILES_TABLE,
    airplanes: CONSTANTS.DOM.AIRPLANES_TABLE,
    boats: CONSTANTS.DOM.BOATS_TABLE
  });
  
  getVehicles(CONSTANTS.URLS.VEHICLES_URL);
});

function deleteData(parentsObj) {
  const parents = [
    parentsObj.automobiles,
    parentsObj.airplanes,
    parentsObj.boats
  ];
  
  for (let i = 0; i < parents.length; i++) {
    let
      parent = parents[i],
      child = parent.querySelectorAll('.server-data');
    for (let j = 0; j < child.length; j++) {
      parent.removeChild(child[j]);
    }
  }
}

function getVehicles(url) {
  
  helperFunctions.httpGet(url)
    .then(resolve => {
        localStorage.setItem('vehicles', JSON.stringify(resolve));
        
        const vehicles = resolve;
        let vehiclesArrOfObj = [];

        vehicles.forEach((item, i, arr) => {
          switch(arr[i].type) {
            case 'boat':
              vehiclesArrOfObj.push(new Vehicles.Boat(arr[i].name, arr[i].speed, arr[i].capacity, arr[i].maxpower));
              CONSTANTS.DOM.BOATS_TABLE.appendChild(vehiclesArrOfObj[i].createHtmlNode(vehiclesArrOfObj[i].maxpower));
              break;
            case 'auto':
              vehiclesArrOfObj.push(new Vehicles.Auto(arr[i].name, arr[i].speed, arr[i].capacity, arr[i].body) );
              CONSTANTS.DOM.AUTOMOBILES_TABLE.appendChild(vehiclesArrOfObj[i].createHtmlNode(vehiclesArrOfObj[i].body));
              break;
            default:
              vehiclesArrOfObj.push(new Vehicles.Airplane(arr[i].name, arr[i].speed, arr[i].capacity, arr[i].wingspan) );
              CONSTANTS.DOM.AIRPLANES_TABLE.appendChild(vehiclesArrOfObj[i].createHtmlNode(vehiclesArrOfObj[i].wingspan));
          }
        });
      }
    ).catch(error => console.log(error));
}




