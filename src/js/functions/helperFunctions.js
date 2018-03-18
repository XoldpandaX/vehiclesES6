export function httpGet(url) {
  
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