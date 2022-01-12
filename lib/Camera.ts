import * as THREE from "three";
const createTorch = () => {
  //  SpotLight / DirectionalLight
  const torch = new THREE.PointLight(0xffffff, 1);
  torch.castShadow = true;
  // torch.shadow.camera.near = 1; // default .5
  // torch.shadow.camera.far = 10; // default 500
  return torch;
};
export class Camera {
  camera: THREE.Camera;
  pov: THREE.Object3D;
  private torch;
  constructor({ pov, scene }: { pov: THREE.Object3D; scene: THREE.Scene }) {
    this.pov = pov;
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight
    ); //      ⭡y
    //       z ↙⭢ x
    this.torch = createTorch();
    this.camera.add(this.torch);
    scene.add(this.camera);
    // scene.add(this.torch, this.torch.target);
    // , this.torch.target);
    // scene.add(this.torch.target);
    scene.add(new THREE.CameraHelper(this.torch.shadow.camera));
  }
  update() {
    this.camera.position.set(
      this.pov.position.x,
      this.pov.position.y + 10,
      this.pov.position.z + 30
    );
    this.camera.rotation.set(-0.2, 0, 0);

    // this.torch.position.copy(this.object.position);
    // this.torch.target.position.copy(this.object.position);
    // this.torch.target.position.z -= 1;
    // // this.torch.updateMatrix();
    // // this.torch.rotation.set(Math.sin(time / 500) * 2 * Math.PI, 0, 0);
    // // this.torch.target(0, 0, 0);
  }
}
