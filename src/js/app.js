import { CONSTANTS } from './constants/constants.js';
import * as Vehicles from './classes/VehiclesClasses';
import * as helperFunctions from './functions/helperFunctions';

window.onload = function() {
  getVehicles(CONSTANTS.URLS.VEHICLES_URL);
};

// *** handling of update button
CONSTANTS.DOM.UPDATE_BTN.addEventListener('click', function(e) {
  getVehicles(CONSTANTS.URLS.VEHICLES_URL, e);
});

function getVehicles(url, event=null) {
  let vehiclesArrOfObj = [];
  
  helperFunctions.httpGet(url)
    .then(resolve => {
        if (!event) {
          localStorage.removeItem('vehicles');
          localStorage.setItem('vehicles', JSON.stringify(resolve));
          
          renderListOfVehicles(resolve, vehiclesArrOfObj);
        } else {
          const storageVehicles = JSON.parse(localStorage.getItem('vehicles'));

          if (storageVehicles.length !== resolve.length) {
            deleteData({
              automobiles: CONSTANTS.DOM.AUTOMOBILES_TABLE,
              airplanes: CONSTANTS.DOM.AIRPLANES_TABLE,
              boats: CONSTANTS.DOM.BOATS_TABLE
            });
            localStorage.removeItem('vehicles');
            localStorage.setItem('vehicles', JSON.stringify(resolve));
            
            renderListOfVehicles(resolve, vehiclesArrOfObj);

          } else {
            const
              serverVehicles = resolve,
              storageVehicles = JSON.parse(localStorage.getItem('vehicles'));

            const compare = compareTwoVehicleObjects(serverVehicles, storageVehicles);
            if (!compare) {
              deleteData({
                automobiles: CONSTANTS.DOM.AUTOMOBILES_TABLE,
                airplanes: CONSTANTS.DOM.AIRPLANES_TABLE,
                boats: CONSTANTS.DOM.BOATS_TABLE
              });
  
              localStorage.removeItem('vehicles');
              localStorage.setItem('vehicles', JSON.stringify(resolve));
              
              renderListOfVehicles(resolve, vehiclesArrOfObj);
            }
          }
        }
      }
    ).catch(error => console.log(error));
}

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

function renderListOfVehicles(data, store) {
  data.forEach((item, i, arr) => {
    switch(arr[i].type) {
      case 'boat':
        store.push(new Vehicles.Boat(arr[i].name, arr[i].speed, arr[i].capacity, arr[i].maxpower));
        CONSTANTS.DOM.BOATS_TABLE.appendChild(store[i].createHtmlNode(store[i].maxpower));
        break;
      case 'auto':
        store.push(new Vehicles.Auto(arr[i].name, arr[i].speed, arr[i].capacity, arr[i].body) );
        CONSTANTS.DOM.AUTOMOBILES_TABLE.appendChild(store[i].createHtmlNode(store[i].body));
        break;
      default:
        store.push(new Vehicles.Airplane(arr[i].name, arr[i].speed, arr[i].capacity, arr[i].wingspan) );
        CONSTANTS.DOM.AIRPLANES_TABLE.appendChild(store[i].createHtmlNode(store[i].wingspan));
    }
  });
}

function compareTwoVehicleObjects(firstObj, secondObj) {
  for (let i = 0; i < firstObj.length; i++) {
    for (let key in firstObj[i]) {
      if (firstObj[i][key] !== secondObj[i][key]) {
        return false;
      }
    }
  }
  
  return true;
}





