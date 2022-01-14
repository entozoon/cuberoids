import { scene } from "../engine/renderer";
import * as THREE from "three";
const createTorch = () => {
  //  SpotLight / DirectionalLight / PointLight
  const torch = new THREE.SpotLight(0xffffff, 1);
  torch.castShadow = true;
  torch.shadow.camera.near = 100; // default .5 (flickering)
  // torch.shadow.camera.far = 1000; // default 500
  return torch;
};
export default class {
  public object: THREE.Object3D;
  private torch;
  constructor() {
    const geometry = new THREE.BoxGeometry(6, 1, 2);
    this.object = new THREE.Mesh(
      geometry,
      new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide, // debug only
        color: 0xaaaaaa,
        // wireframe: true,
      })
    );
    this.object.castShadow = true;
    this.object.receiveShadow = true;
    scene.add(this.object);
    this.torch = createTorch();
    this.torch.position.z = -5;
    this.torch.target.position.z = -20;
    this.object.add(this.torch, this.torch.target);
    // scene.add(new THREE.CameraHelper(this.torch.shadow.camera)); // ***
  }
  update(time) {
    // Test
    // this.object.position.x = Math.sin(time / 1000) * 20;
    // this.object.position.y = Math.cos(time / 1000) * 100;
    // this.object.position.z = Math.cos(time / 1000) * 20;
  }
}
