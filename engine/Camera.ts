import * as THREE from "three";
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
    this.camera.position.set(
      this.pov.position.x,
      this.pov.position.y + 10,
      this.pov.position.z + 30
    );
    this.camera.rotation.set(-0.2, 0, 0);
  }
}
