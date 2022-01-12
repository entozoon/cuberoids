import * as THREE from "three";
export class Ship {
  public object: THREE.Object3D;
  constructor(scene: THREE.Scene) {
    const geometry = new THREE.BoxGeometry(6, 1, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.object = new THREE.Mesh(geometry, material);
    scene.add(this.object);
  }
  update(time) {
    this.object.position.x = Math.sin(time / 1000) * 20;
    this.object.position.y = Math.cos(time / 1000) * 100;
    this.object.position.z = Math.cos(time / 1000) * 20;
  }
}
