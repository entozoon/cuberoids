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
    let rotationNew = {
      x: rotation.x,
      y: rotation.y,
      z: rotation.z,
    };
    console.log(rotationNew);
    if (key === " ") {
      // Incorrect for orientation, but yeah. normals?
      position.set(0, 0, position.z - 1);
    }
    if (key === "w") {
      rotationNew.x += 0.1;
    }
    if (key === "e") {
      // rotation.set(rotation.x, rotation.y - 0.1, rotation.z);
    }
    if (key === "d") {
      // rotation.set(rotation.x, rotation.y.z + 0.1);
    }
    // Vector3 (0,0,0) style. not quite sure how to interact with them individually
    rotation.set(...Object.values(rotationNew));
  }
}
