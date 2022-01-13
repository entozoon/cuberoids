import { Hero } from "./entities/Hero";
import * as THREE from "three";
import { Camera } from "./engine/Camera";
import { renderer, scene } from "./engine/renderer";
export const anaglyphMode = false;
export default class Game {
  cam: Camera;
  hero;
  constructor() {
    renderer.setAnimationLoop(this.loop.bind(this));
    this.hero = new Hero(scene);
    this.cam = new Camera({ pov: this.hero.object, scene });
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
    scene.add(cube);
    const lightAmbient = new THREE.AmbientLight(0xffffff, 0.05);
    scene.add(lightAmbient);
  }
  loop(time) {
    renderer.render(scene, this.cam.camera);
    this.hero.update(time);
    this.cam.update();
  }
}
