import Hero from "./entities/Hero";
import * as THREE from "three";
import { renderer, reset, scene } from "./engine/renderer";
export const anaglyphMode = false;
export default class Game {
  private hero;
  constructor() {
    reset();
    renderer.setAnimationLoop(this.loop.bind(this));
    delete this.hero;
    this.hero = new Hero();
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
    this.hero.update(time);
    renderer.render(scene, this.hero.cam.camera);
  }
}
