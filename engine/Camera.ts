import * as THREE from "three";
import { Vector3 } from "three";
import { scene } from "./renderer";
export default class {
  camera: THREE.Camera;
  pov: THREE.Object3D;
  constructor({ pov }: { pov: THREE.Object3D }) {
    this.pov = pov;
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight
    ); //      ⭡y
    //       z ↙⭢ x
    scene.add(this.camera);
  }
  public update() {
    // let { position, rotation } = this.pov.clone();
    let position = this.pov.position.clone();
    let rotation = this.pov.rotation.clone();
    // const rotationUnit = rotation.toVector3().normalize();
    // const x =
    //   position.x + Math.sin(rotation.y) * 30 + Math.sin(rotation.x) * 30;
    // const z = position.z + Math.cos(rotation.y) * 30; // + Math.cos(rotation.x) * 30;
    // const y = position.y - Math.sin(rotation.x) * 30;
    // position.add(new Vector3(x, y, z));
    // // position.add(rotationUnit.negate().multiplyScalar(20));
    // this.camera.position.set(...position.toArray());
    // // // this.camera.rotation.set(-0.2, 0, 0);
    // // this.camera.rotation.setFromVector3(rotation.toVector3());
    // this.camera.setRotationFromEuler(rotation); // ****
    // this.camera.position.set(0, 0, 30);
    //
    // const pos = position.sub(rotation.toVector3().multiplyScalar(30)).toArray();
    // // console.log(pos);
    // var cwd = new Vector3();
    // this.pov.getWorldDirection(cwd);
    // console.log(this.pov.rotation.toArray());
    // // cwd.multiplyScalar(dist);
    // this.camera.position.set(...pos);
    // this.camera.translateOnAxis(rotation.toVector3(), 30);
    // const wtf = rotation.toVector3().normalize();
    // .multiply(new Vector3(1, 1, 30));
    // const erm = transformDirection;
    // this.camera.position.z = Math.cos(this.pov.rotation.y) * 30;
    if (Math.random() > 0.9) {
      // I literally don't understand rotation. facing directly backward is somehow 0
      // In fact it's only the Y axis (Q / E) (!!)
      console.log(this.pov.rotation);
    }
  }
}
