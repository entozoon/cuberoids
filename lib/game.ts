import * as THREE from "three";
export default class Game {
  camera: THREE.Camera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  box: THREE.BoxGeometry;
  material: THREE.Material;
  mesh: THREE.Mesh;
  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.init();
  }
  init() {
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      10
    );
    this.camera.position.z = 1;
    this.scene = new THREE.Scene();
    this.box = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    this.material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh(this.box, this.material);
    this.scene.add(this.mesh);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setAnimationLoop(this.animation.bind(this));
    document.querySelector(".game-wrapper canvas")?.remove();
    document
      .querySelector(".game-wrapper")
      .appendChild(this.renderer.domElement);
  }
  animation(time) {
    this.mesh.rotation.x = time / 2000;
    this.mesh.rotation.y = time / 100;
    this.renderer.render(this.scene, this.camera);
  }
}
