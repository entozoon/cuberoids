import * as THREE from "three";
import { AnaglyphEffect } from "./AnaglyphEffect.js";
const anaglyphMode = false;
export default class Game {
  camera: THREE.Camera;
  scene: THREE.Scene;
  rendererOrEffect: THREE.WebGLRenderer;
  effect;
  box: THREE.BoxGeometry;
  planeFill: THREE.Mesh;
  planeGrid: THREE.Mesh;
  light1;
  lightbox1;
  light2;
  lightbox2;
  constructor({ wrapper }: { wrapper: HTMLElement }) {
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    ); // x,y,z (y is up)
    this.camera.position.z = 100;
    this.scene = new THREE.Scene();
    // const box = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    // const material = new THREE.MeshNormalMaterial();
    // this.mesh = new THREE.Mesh(box, material);
    // this.scene.add(this.mesh);
    const geometry = new THREE.PlaneGeometry(100, 100, 100, 100); // 1 unit = 1 meter,
    for (let i = 0; i < geometry.attributes.position.array.length; i += 3) {
      // @ts-ignore
      geometry.attributes.position.array[i + 2] =
        Math.sin(i / 1000) * 2 + Math.random() * 2; // x, y, z++
    }
    //
    // FILL (these things can be grouped together. Maybe whole planet)
    const materialFill = new THREE.MeshPhongMaterial({
      color: 0x666666,
      side: THREE.DoubleSide, // debug only
      // shininess: 50,
    });
    this.planeFill = new THREE.Mesh(geometry, materialFill);
    this.planeFill.castShadow = true;
    this.planeFill.receiveShadow = true;
    this.scene.add(this.planeFill);
    //
    // GRID
    // const materialGrid = new THREE.MeshPhongMaterial({
    //   color: 0xffffff,
    //   opacity: 0.1,
    //   transparent: true,
    //   side: THREE.DoubleSide, // debug only
    //   wireframe: true,
    // });
    // this.planeGrid = new THREE.Mesh(geometry, materialGrid);
    // this.planeGrid.castShadow = true;
    // this.planeGrid.receiveShadow = true;
    // this.scene.add(this.planeGrid);
    const lightAmbient = new THREE.AmbientLight(0xaa2222);
    lightAmbient.castShadow = true;
    // // this.scene.add(lightAmbient);
    this.light2 = new THREE.SpotLight(0xff6666, 1);
    this.light2.castShadow = true;
    // this.light2.shadow.camera.near = 1; // default .5
    this.light2.shadow.camera.far = 10; // default 500
    this.light2.position.set(5, 5, 0);
    this.scene.add(this.light2);
    const lightbox2Geometry = new THREE.BoxGeometry(1, 1, 1);
    const lightbox2Material = new THREE.MeshBasicMaterial({ color: 0xff6666 });
    this.lightbox2 = new THREE.Mesh(lightbox2Geometry, lightbox2Material);
    this.lightbox2.position.set(5, 5, 0);
    this.scene.add(this.lightbox2);
    // const helper = new THREE.CameraHelper(this.light2.shadow.camera);
    // this.scene.add(helper);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.BasicShadowMap;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setAnimationLoop(this.animation.bind(this));
    wrapper.querySelector("canvas")?.remove();
    wrapper.appendChild(renderer.domElement);
    this.rendererOrEffect = anaglyphMode
      ? new AnaglyphEffect(renderer)
      : renderer;
  }
  animation(time) {
    // this.planeFill.rotation.y = time / 1000;
    this.lightbox2?.position.set(
      Math.cos(-time / 1000) * 70,
      Math.sin(time / 1000) * 70,
      5
    );
    this.light2?.position.set(
      Math.cos(-time / 1000) * 70,
      Math.sin(time / 1000) * 70,
      5
    );
    this.rendererOrEffect.render(this.scene, this.camera);
  }
}
