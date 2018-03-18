import { CONSTANTS } from './constants/constants.js';
import * as Vehicles from './classes/VehiclesClasses';

window.onload = function() {
  renderListOfObj(CONSTANTS.URLS.VEHICLES_URL);
};

// *** handling of update button
CONSTANTS.DOM.UPDATE_BTN.addEventListener('click', function() {
  deleteData({
    automobiles: CONSTANTS.DOM.AUTOMOBILES_TABLE,
    airplanes: CONSTANTS.DOM.AIRPLANES_TABLE,
    boats: CONSTANTS.DOM.BOATS_TABLE
  });
  
  renderListOfObj(CONSTANTS.URLS.VEHICLES_URL);
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

function httpGet(url) {
  
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
      if (this.status === 200) {
        resolve(JSON.parse(this.responseText) );
      } else {
        let error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };
    
    xhr.onerror = () => reject(new Error('Network Error') );
    
    xhr.send();
  });
}

function renderListOfObj(url) {
  httpGet(url)
    .then(
      resolve => {
        let
          vehicles = resolve,
          vehiclesArrOfObj = [];
        
        vehicles.forEach((item, i, arr) => {
          if (arr[i].type === 'boat') { // create an object depending on the type property
            vehiclesArrOfObj.push(
              new Vehicles.Boat(arr[i].name, arr[i].speed, arr[i].capacity, arr[i].maxpower));
          } else if (arr[i].type === 'auto') {
            vehiclesArrOfObj.push(
              new Vehicles.Auto(arr[i].name, arr[i].speed, arr[i].capacity, arr[i].body) );
          } else {
            vehiclesArrOfObj.push(
              new Vehicles.Airplane(arr[i].name, arr[i].speed, arr[i].capacity, arr[i].wingspan) );
          }
        });
        
        for (let i = 0; i < vehiclesArrOfObj.length; i++) {
          let vehicle = vehiclesArrOfObj[i].constructor.name; // define an object constructor
          
          switch(vehicle) { // display data in the table, depending on the object's constructor
            case 'Auto':
              CONSTANTS.DOM.AUTOMOBILES_TABLE.appendChild(
                vehiclesArrOfObj[i].createHtmlNode(
                  vehiclesArrOfObj[i].body));
              break;
            case 'Boat':
              CONSTANTS.DOM.BOATS_TABLE.appendChild(
                vehiclesArrOfObj[i].createHtmlNode(vehiclesArrOfObj[i].maxpower));
              break;
            default:
              CONSTANTS.DOM.AIRPLANES_TABLE.appendChild(
                vehiclesArrOfObj[i].createHtmlNode(vehiclesArrOfObj[i].wingspan));
          }
        }
        
      },
      reject => alert('Rejected: ' + reject)
    );
}




