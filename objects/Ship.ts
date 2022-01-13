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
export class Ship {
  public object: THREE.Object3D;
  private torch;
  constructor() {
    const geometry = new THREE.BoxGeometry(6, 1, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.object = new THREE.Mesh(geometry, material);
    scene.add(this.object);
    this.torch = createTorch();
    this.object.add(this.torch);
    scene.add(this.torch, this.torch.target);
    // scene.add(new THREE.CameraHelper(this.torch.shadow.camera));
  }
  update(time) {
    this.object.position.x = Math.sin(time / 1000) * 20;
    this.object.position.y = Math.cos(time / 1000) * 100;
    this.object.position.z = Math.cos(time / 1000) * 20;
    this.torch.position.set(
      this.object.position.x,
      this.object.position.y,
      this.object.position.z - 5
    );
    this.torch.target.position.set(
      this.object.position.x,
      this.object.position.y,
      this.object.position.z - 100
    );
  }
}
