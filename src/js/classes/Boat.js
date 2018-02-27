import Vehicle from './Vehicle.js';

export default class Boat extends Vehicle {
  constructor(name, speed, capacity, maxpower) {
    super(name, speed, capacity);
    this.maxpower = maxpower;
  }
}