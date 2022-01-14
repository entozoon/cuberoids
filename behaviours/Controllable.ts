import { Vector3 } from "three";
export default class {
  private parent;
  private keys = [
    { key: "q", pressed: false },
    { key: "w", pressed: false },
    { key: "e", pressed: false },
    { key: "a", pressed: false },
    { key: "s", pressed: false },
    { key: "d", pressed: false },
    { key: " ", pressed: false },
  ];
  private keysReserved = this.keys.map((k) => k.key);
  private keyFind = (key) => this.keys.find((k) => k.key === key);
  constructor(parent) {
    this.parent = parent;
    document.body.addEventListener("keydown", this.keydown.bind(this), false);
    document.body.addEventListener("keyup", this.keyup.bind(this), false);
  }
  keydown(e) {
    const key = this.keyFind(e.key);
    if (!key) return;
    e.stopPropagation();
    e.preventDefault();
    if (!key.pressed) {
      key.pressed = true;
      this.actions();
    }
  }
  keyup(e) {
    const key = this.keyFind(e.key);
    if (!key) return;
    key.pressed = false;
  }
  actions() {
    const {
      position,
      rotation,
    }: // matrixWorld,
    // quaternion,
    {
      position: THREE.Vector3;
      rotation: THREE.Euler;
      // matrixWorld: THREE.Matrix4;
      // quaternion: THREE.Quaternion;
    } = this.parent.ship.object;
    // if (key === "w") {
    //   // _rotation.add(new Vector3(-0.1, 0, 0));
    //   ship.object.rotateOnAxis(new Vector3(-1, 0, 0), Math.PI / 32);
    // }
    // if (key === "s") {
    //   // _rotation.add(new Vector3(0.1, 0, 0));
    //   ship.object.rotateOnAxis(new Vector3(1, 0, 0), Math.PI / 32);
    // }
    // if (key === "e") {
    //   // _rotation.add(new Vector3(0, -0.1, 0));
    //   ship.object.rotateOnAxis(new Vector3(0, -1, 0), Math.PI / 32);
    // }
    // if (key === "q") {
    //   // _rotation.add(new Vector3(0, 0.1, 0));
    //   ship.object.rotateOnAxis(new Vector3(0, 1, 0), Math.PI / 32);
    // }
    // if (key === "d") {
    //   // _rotation.ad       d(new Vector3(0, 0, -0.1));
    //   ship.object.rotateOnAxis(new Vector3(0, 0, -1), Math.PI / 32);
    // }
    // if (key === "a") {
    //   // _rotation.add(new Vector3(0, 0, 0.1));
    //   ship.object.rotateOnAxis(new Vector3(0, 0, 1), Math.PI / 32);
    // }
  }
  public update() {
    const { ship } = this.parent;
    if (this.keyFind(" ").pressed) {
      ship.move("forward", 1);
    }
    if (this.keyFind("q").pressed) {
      ship.move("yaw", -1);
    }
    if (this.keyFind("e").pressed) {
      ship.move("yaw", 1);
    }
    if (this.keyFind("w").pressed) {
      ship.move("pitch", -1);
    }
    if (this.keyFind("s").pressed) {
      ship.move("pitch", 1);
    }
    if (this.keyFind("a").pressed) {
      ship.move("roll", -1);
    }
    if (this.keyFind("d").pressed) {
      ship.move("roll", 1);
    }
  }
}
