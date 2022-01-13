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
    const geometry = new THREE.BoxGeometry(20, 20, 20);
    const cube1 = new THREE.Mesh(
      geometry,
      new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide, // debug only
        color: 0x00aa55,
      })
    );
    cube1.castShadow = true;
    cube1.receiveShadow = true;
    cube1.position.set(0, 0, -100);
    scene.add(cube1);
    //
    const cube2 = new THREE.Mesh(
      geometry,
      new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide, // debug only
        color: 0xff0000,
      })
    );
    cube2.castShadow = true;
    cube2.receiveShadow = true;
    cube2.position.set(-100, 0, 0);
    scene.add(cube2);
    //
    const cube3 = new THREE.Mesh(
      geometry,
      new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide, // debug only
        color: 0x0000ff,
      })
    );
    cube3.castShadow = true;
    cube3.receiveShadow = true;
    cube3.position.set(100, 0, 0);
    scene.add(cube3);
    //
    const cube4 = new THREE.Mesh(
      geometry,
      new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide, // debug only
        color: 0xffff00,
      })
    );
    cube4.castShadow = true;
    cube4.receiveShadow = true;
    cube4.position.set(0, 0, 100);
    scene.add(cube4);
    //
    const lightAmbient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(lightAmbient);
    //
    setInterval(() => {
      // cube1.rotation.set(0, cube1.rotation.y + 10, 0);
      cube1.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 32);
      cube1.rotation.order = "YXZ";
      // console.log(cube1.rotation);
    }, 300);
  }
  loop(time) {
    this.hero.update(time);
    renderer.render(scene, this.hero.cam.camera);
  }
}
