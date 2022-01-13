import Controllable from "../behaviours/Controllable";
import Camera from "../engine/Camera";
import Ship from "../objects/Ship";
export default class {
  public body = new Ship();
  public cam = new Camera({ pov: this.body.object });
  public controls = new Controllable(this);
  constructor() {
    this.body.object.add(this.cam.camera);
    // this.cam.camera.position.z += Math.cos(this.body.object.rotation.y) * 30;
  }
  public update(time) {
    this.body.update(time);
    this.cam.update();
  }
}
