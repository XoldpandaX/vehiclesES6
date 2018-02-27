import Vehicle from './Vehicle.js';

export default class Auto extends Vehicle {
  constructor(name, speed, capacity, body) {
    super(name, speed, capacity);
    this.body = body;
  }
}