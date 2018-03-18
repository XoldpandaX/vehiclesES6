export class Vehicle { // **_PARENT_**
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

export class Airplane extends Vehicle {
  constructor(name, speed, capacity, wingspan) {
    super(name, speed, capacity);
    this.wingspan = wingspan;
  }
}

export class Auto extends Vehicle {
  constructor(name, speed, capacity, body) {
    super(name, speed, capacity);
    this.body = body;
  }
}
export class Boat extends Vehicle {
  constructor(name, speed, capacity, maxpower) {
    super(name, speed, capacity);
    this.maxpower = maxpower;
  }
}