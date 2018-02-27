import Vehicle from './Vehicle.js';

export default class Airplane extends Vehicle {
  constructor(name, speed, capacity, wingspan) {
    super(name, speed, capacity);
    this.wingspan = wingspan;
  }
}