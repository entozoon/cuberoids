import { Ship } from "../objects/Ship";
export class Hero {
  // public ship = new Ship(scene);
  public ship;
  constructor(scene: THREE.Scene) {
    Object.assign(this, new Ship(scene));
    this.ship = new Ship(scene);
    console.log(this);
  }
  update(time) {
    this.ship.update();
  }
}
