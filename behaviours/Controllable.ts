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
    const quaternion: THREE.Quaternion = this.parent.body.object.quaternion;
    if (this.reservedKeys.includes(key)) {
      e.stopPropagation();
      e.preventDefault();
    }
    let _rotation = rotation.toVector3();
    if (key === " ") {
      // position.set(0, 0, position.z - 1);
      // Yeah I've no idea what I'm doing. How to get a perpendicular angle..
      // https://threejs.org/docs/index.html?q=quaternion#api/en/math/Quaternion
      console.log(
        "\nquaternion\n",
        quaternion.toArray().join(", ")
        // "\nconjugate\n"
        // the same rotation in the opposite direction about the rotational axis.
        // quaternion.clone().conjugate().toArray().join(", "),
        // "\nnormalize\n",
        // quaternion.clone().normalize().toArray().join(", ")
      );
      //  position.set(...position.add(rotation.toVector3().normalize()).toArray());
      // this.parent.body.object.translateZ(-10);
      console.log(rotation.toVector3());
      rotation.order = "YXZ"; // !!
      this.parent.body.object.translateOnAxis(
        rotation.toVector3().normalize(),
        10
      );
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
  }
}
