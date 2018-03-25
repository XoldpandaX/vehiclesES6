import {CONSTANTS} from "../constants/constants";
import * as Vehicles from "../classes/VehiclesClasses";

export function httpGet(url) { // get obj by url
  
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
      if (this.status === 200) {
        resolve(JSON.parse(this.responseText) );
      } else {
        const error = new Error(this.statusText);
        
        error.code = this.status;
        reject(error);
      }
    };
    
    xhr.onerror = (error) => reject(error);
    
    xhr.send();
  });
}

export function cacheData(localStorageKey, data) {
  localStorage.setItem(localStorageKey, JSON.stringify(data));
}

export function localStorageRefresh(localStorageKey, updatedData) {
  localStorage.removeItem(localStorageKey);
  localStorage.setItem(localStorageKey, JSON.stringify(updatedData));
}

export function compareTwoVehicleObjects(firstObj, secondObj) {
  for (let i = 0; i < firstObj.length; i++) {
    for (let key in firstObj[i]) {
      if (firstObj[i][key] !== secondObj[i][key]) {
        return false;
      }
    }
  }
  
  return true;
}

export function deleteData(parentsObj) {
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

export function renderListOfVehicles(data, store) {
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