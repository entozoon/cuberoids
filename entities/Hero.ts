import { Camera } from "../engine/Camera";
import { Ship } from "../objects/Ship";
export class Hero {
  // public ship = new Ship( );
  public ship;
  public cam;
  constructor() {
    // Object.assign(this, new Ship());
    this.ship = new Ship();
    this.cam = new Camera({ pov: this.ship.object });
  }
  public update(time) {
    this.ship.update(time);
    this.cam.update(time);
  }
}
