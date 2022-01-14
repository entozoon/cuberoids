import Controllable from "../behaviours/Controllable";
import Camera from "../engine/Camera";
import Ship from "../objects/Ship";
export default class {
  public ship = new Ship();
  public cam = new Camera({ pov: this.ship.object });
  public controls = new Controllable(this);
  public update() {
    this.ship.update();
    this.controls.update();
    this.cam.update();
  }
}
