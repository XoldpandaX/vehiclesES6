import {domLoader} from "../domLoader";
import Auto from "../classes/Auto";
import Airplane from "../classes/Airplane";
import Boat from "../classes/Boat";

export const helperFunctions = {
  
  deleteData(parentsObj) {
    let parents = [
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
  },
  
  httpGet(url) {
    
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
  },
  
  renderListOfObj(url) {
    helperFunctions.httpGet(url)
      .then(
        resolve => {
          let
            vehicles = resolve,
            vehiclesArrOfObj = [];
        
          vehicles.forEach((item, i, arr) => {
            if (arr[i].type === 'boat') { // create an object depending on the type property
              vehiclesArrOfObj.push(
                new Boat(arr[i].name, arr[i].speed, arr[i].capacity, arr[i].maxpower));
            } else if (arr[i].type === 'auto') {
              vehiclesArrOfObj.push(
                new Auto(arr[i].name, arr[i].speed, arr[i].capacity, arr[i].body) );
            } else {
              vehiclesArrOfObj.push(
                new Airplane(arr[i].name, arr[i].speed, arr[i].capacity, arr[i].wingspan) );
            }
          });
        
          for (let i = 0; i < vehiclesArrOfObj.length; i++) {
            let vehicle = vehiclesArrOfObj[i].constructor; // define an object constructor
          
            switch(vehicle) { // display data in the table, depending on the object's constructor
              case Auto:
                domLoader.automobilesTable.appendChild(
                  vehiclesArrOfObj[i].createHtmlNode(
                    vehiclesArrOfObj[i].body));
                break;
              case Boat:
                domLoader.boatsTable.appendChild(
                  vehiclesArrOfObj[i].createHtmlNode(vehiclesArrOfObj[i].maxpower));
                break;
              default:
                domLoader.airplanesTable.appendChild(
                  vehiclesArrOfObj[i].createHtmlNode(vehiclesArrOfObj[i].wingspan));
            }
          }
        
        },
        reject => alert('Rejected: ' + reject)
      );
  }
  
};