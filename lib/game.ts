import * as THREE from "three";
export default class Game {
  camera: THREE.Camera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
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
    // const material = new THREE.MeshBasicMaterial({
    //   color: 0x992200,
    //   // side: THREE.DoubleSide,
    //   // wireframe: true,
    //   // shadowSide: erm,
    // });
    // const material = new THREE.MeshPhongMaterial({
    //   color: 0xffdddd,
    //   // side: THREE.DoubleSide,
    //   wireframe: true,
    // });
    //
    // FILL
    const materialFill = new THREE.MeshPhongMaterial({
      color: 0x44aa44,
      side: THREE.DoubleSide, // debug only
      // shininess: 50,
      // specular: 0xffffff,
      // opacity: .6,
      // transparent: true, // illusion of shadows.. but not real
      // wireframe: true, // debug or.. maybe not? it's awesome. Maybe both! two layers
    });
    this.planeFill = new THREE.Mesh(geometry, materialFill);
    this.planeFill.castShadow = true;
    this.planeFill.receiveShadow = true;
    this.scene.add(this.planeFill);
    //
    // GRID
    const materialGrid = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      opacity: 0.1,
      transparent: true,
      side: THREE.DoubleSide, // debug only
      wireframe: true,
    });
    this.planeGrid = new THREE.Mesh(geometry, materialGrid);
    this.planeGrid.castShadow = true;
    this.planeGrid.receiveShadow = true;
    this.scene.add(this.planeGrid);

    const lightAmbient = new THREE.AmbientLight(0x222222);
    // lightAmbient.castShadow = true;
    this.scene.add(lightAmbient);

    this.light1 = new THREE.SpotLight(0x6666ff, 1);
    this.light1.castShadow = true;
    this.light1.position.set(5, 5, 0);
    this.scene.add(this.light1);
    const lightbox1Geometry = new THREE.BoxGeometry(1, 1, 1);
    const lightbox1Material = new THREE.MeshBasicMaterial({ color: 0x6666ff });
    this.lightbox1 = new THREE.Mesh(lightbox1Geometry, lightbox1Material);
    this.lightbox1.position.set(5, 5, 0);
    this.scene.add(this.lightbox1);

    this.light2 = new THREE.SpotLight(0xff6666, 1);
    this.light2.castShadow = true;
    // this.light2.shadow.mapSize.width = 256;
    // this.light2.shadow.mapSize.height = 256;
    // this.light2.shadow.camera.near = 0.2; // default .5
    // this.light2.shadow.camera.far = 10; // default 500
    this.light2.position.set(5, 5, 0);
    this.scene.add(this.light2);
    const lightbox2Geometry = new THREE.BoxGeometry(1, 1, 1);
    const lightbox2Material = new THREE.MeshBasicMaterial({ color: 0xff6666 });
    this.lightbox2 = new THREE.Mesh(lightbox2Geometry, lightbox2Material);
    this.lightbox2.position.set(5, 5, 0);
    this.scene.add(this.lightbox2);
    // const helper = new THREE.CameraHelper(this.light2.shadow.camera);
    // this.scene.add(helper);

    for (let i = 0; i < geometry.attributes.position.array.length; i += 3) {
      // @ts-ignore
      geometry.attributes.position.array[i + 2] =
        Math.sin(i / 1000) * 2 + Math.random() * 2; // x, y, z++
    }
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    // this.renderer.shadowMap.type = THREE.BasicShadowMap;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setAnimationLoop(this.animation.bind(this));
    wrapper.querySelector("canvas")?.remove();
    wrapper.appendChild(this.renderer.domElement);
  }
  animation(time) {
    this.planeFill.rotation.x = time / 5000;
    this.planeGrid.rotation.x = time / 5000;
    this.planeFill.rotation.y = time / 5000;
    this.planeGrid.rotation.y = time / 5000;
    this.lightbox1?.position.set(
      Math.sin(time / 500) * 50,
      Math.sin(time / 1000) * 50,
      10
    );
    this.light1?.position.set(
      Math.sin(time / 500) * 50,
      Math.sin(time / 1000) * 50,
      10
    );
    this.lightbox2?.position.set(
      Math.cos(-time / 1000) * 50,
      Math.sin(time / 1000) * 50,
      10
    );
    this.light2?.position.set(
      Math.cos(-time / 1000) * 50,
      Math.sin(time / 1000) * 50,
      10
    );

    this.renderer.render(this.scene, this.camera);
  }
}
