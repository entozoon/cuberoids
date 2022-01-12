import * as THREE from "three";
import { Camera } from "./Camera";
import { Renderer } from "./Renderer";
import { Ship } from "./Ship";
export const anaglyphMode = false;
export default class Game {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  cam: Camera;
  ship: Ship;
  constructor({ wrapper }: { wrapper: HTMLElement }) {
    this.scene = new THREE.Scene();
    this.renderer = Renderer(wrapper);
    this.renderer.setAnimationLoop(this.loop.bind(this));
    this.ship = new Ship(this.scene);
    this.cam = new Camera({ pov: this.ship.object, scene: this.scene });
    //
    // GUFF
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide, // debug only
      color: 0x00aa55,
    });
    // this.material.castShadow = true;
    // this.material.receiveShadow = true;
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.position.set(0, 0, -100);
    this.scene.add(cube);
    const lightAmbient = new THREE.AmbientLight(0xffffff, 0.05);
    this.scene.add(lightAmbient);
  }
  loop(time) {
    this.renderer.render(this.scene, this.cam.camera);
    this.ship.update(time);
    this.cam.update();
  }
}
