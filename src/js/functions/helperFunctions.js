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

export function renderListOfVehicles(data, store, vehiclesObj, placeToRender) {
  data.forEach((item, i, arr) => {
    switch(arr[i].type) {
      case 'boat':
        store.push(new vehiclesObj.boat(arr[i].name, arr[i].speed, arr[i].capacity, arr[i].maxpower));
        placeToRender.boats.appendChild(store[i].createHtmlNode(store[i].maxpower));
        break;
      case 'auto':
        store.push(new vehiclesObj.automobile(arr[i].name, arr[i].speed, arr[i].capacity, arr[i].body) );
        placeToRender.automobiles.appendChild(store[i].createHtmlNode(store[i].body));
        break;
      default:
        store.push(new vehiclesObj.airplane(arr[i].name, arr[i].speed, arr[i].capacity, arr[i].wingspan) );
        placeToRender.airplanes.appendChild(store[i].createHtmlNode(store[i].wingspan));
    }
  });
}