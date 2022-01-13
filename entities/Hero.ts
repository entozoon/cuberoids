import Controllable from "../behaviours/Controllable";
import Camera from "../engine/Camera";
import Ship from "../objects/Ship";
export default class {
  public body = new Ship();
  public cam = new Camera({ pov: this.body.object });
  public controls = new Controllable(this);
  public update(time) {
    this.body.update(time);
    this.cam.update();
  }
}
