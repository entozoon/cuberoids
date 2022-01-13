import { Vector3 } from "three";

export default class {
  private parent;
  private reservedKeys = ["w", "a", "s", "d", "q", "e", " "];
  constructor(parent) {
    this.parent = parent;
    document.body.addEventListener("keydown", this.keypress.bind(this), false);
  }
  keypress(e) {
    const { key } = e;
    const { position, rotation } = this.parent.body.object;
    if (this.reservedKeys.includes(key)) {
      e.stopPropagation();
      e.preventDefault();
    }
    let _rotation = rotation.toVector3();
    if (key === " ") {
      // Incorrect for orientation, but yeah. normals?
      position.set(0, 0, position.z - 1);
    }
    // Will scrap when figuring out impulse
    if (key === "w") {
      // _rotation.add(new Vector3(-0.1, 0, 0));
      this.parent.body.object.rotateOnAxis(new Vector3(-1, 0, 0), Math.PI / 32);
    }
    if (key === "s") {
      // _rotation.add(new Vector3(0.1, 0, 0));
      this.parent.body.object.rotateOnAxis(new Vector3(1, 0, 0), Math.PI / 32);
    }
    if (key === "e") {
      // _rotation.add(new Vector3(0, -0.1, 0));
      this.parent.body.object.rotateOnAxis(new Vector3(0, -1, 0), Math.PI / 32);
    }
    if (key === "q") {
      // _rotation.add(new Vector3(0, 0.1, 0));
      this.parent.body.object.rotateOnAxis(new Vector3(0, 1, 0), Math.PI / 32);
    }
    if (key === "d") {
      // _rotation.add(new Vector3(0, 0, -0.1));
      this.parent.body.object.rotateOnAxis(new Vector3(0, 0, -1), Math.PI / 32);
    }
    if (key === "a") {
      // _rotation.add(new Vector3(0, 0, 0.1));
      this.parent.body.object.rotateOnAxis(new Vector3(0, 0, 1), Math.PI / 32);
    }
    // rotation.setFromVector3(_rotation);
    // console.log(this.parent.body.object.rotation.toVector3());
  }
}
