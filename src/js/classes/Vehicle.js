export default class Vehicle { // **_PARENT_**
  constructor(name, speed, capacity) {
    this.name = name;
    this.speed = speed;
    this.capacity = capacity;
  }
  
  createTableRow(individualParameter) {
    return `
            <tr>
                <td>${ this.name }</td>
                <td>${ this.speed }</td>
                <td>${ this.capacity }</td>
                <td>${ individualParameter }</td>
            </tr>
            `
  }
  
  createHtmlNode(individualParameter) {
    let tr = document.createElement('tr');
    tr.className = 'server-data';
    tr.innerHTML = this.createTableRow(individualParameter);
    return tr;
  }
}