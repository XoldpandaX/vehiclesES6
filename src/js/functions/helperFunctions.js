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

export function cacheObj(obj) {
  return obj;
}