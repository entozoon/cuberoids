import * as BABYLON from "@babylonjs/core";
// import * as dynamicTerrain from "./babylon.dynamicTerrain.js";
export default class Game {
  canvas!: HTMLCanvasElement;
  engine!: BABYLON.Engine;
  scene!: BABYLON.Scene;
  camera!: BABYLON.FreeCamera | BABYLON.ArcRotateCamera;
  light!: BABYLON.HemisphericLight;
  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.canvas = canvas;
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = new BABYLON.Scene(this.engine);
    this.camera = this.initCamera();
    this.light = new BABYLON.HemisphericLight(
      "light",
      this.camera.position,
      this.scene
    );
    this.light.intensity = 0.8;
    const axes = new BABYLON.AxesViewer(this.scene, 0.5);
    // let test = BABYLON.Mesh.CreateBox("test", 0.5, this.scene);
    // test.position.z = 1;
    this.jank();
    this.engine.runRenderLoop(() => {
      this.scene.render();
      // console.log({
      //   x: Math.round(this.camera.position.x),
      //   y: Math.round(this.camera.position.y),
      //   z: Math.round(this.camera.position.z),
      // });
    });
  }
  private initCamera() {
    // const camera = new BABYLON.UniversalCamera(
    //   "camera",
    //   // ↗ y: green
    //   // ⭢x: red
    //   // ↓ z: negative blue
    //   // new BABYLON.Vector3(0, -2, -0.4),
    //   // y: green
    //   // ⭡↗ z: blue
    //   //  ⭢ x: red
    //   new BABYLON.Vector3(0, 1, -5), // up: y
    //   this.scene
    // );
    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      0,
      0,
      0,
      new BABYLON.Vector3(0, 4, -5),
      this.scene
    );
    camera.setTarget(new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(this.canvas, true);
    return camera;
  }
  private jank = function () {
    // vertices: x1,y1,z1, x2,y2,z2, ...
    // HAS to be drawn anti-clockwise.. or it's flipped and invisible
    // "Front-facing triangles are wound in counter-clockwise order"
    // var positions = [-1, 0, 0, 0, 0, 0, 0, 0, 1];
    let positions = [];
    for (let x = 0; x < 10; x++) {
      for (let z = 0; z < 10; z++) {
        positions.push(...[x, 0, z]);
      }
    }
    // var positions = [
    //   //
    //   0, 0, 0,
    //   //
    //   1, 0, 0,
    //   //
    //   1, 0, 1,
    //   //
    //   2, 0, 1,
    //   //
    //   2, 0, 2,
    //   //
    //   1, 0, 2,
    // ];
    // var indices = [0, 1, 2, 3];
    var indices = [...Array(positions.length / 3).keys()];
    // var colors = [
    //   1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1,
    // ];
    let customMesh = new BABYLON.Mesh("custom", this.scene);
    //Empty array to contain calculated values or normals added
    let normals = [];
    let vertexData = new BABYLON.VertexData();
    BABYLON.VertexData.ComputeNormals(positions, indices, normals);
    //Assign positions, indices and normals to vertexData
    vertexData.positions = positions;
    vertexData.indices = indices;
    vertexData.normals = normals;
    // vertexData.colors = colors;
    //Apply vertexData to custom mesh
    vertexData.applyToMesh(customMesh);
    //Calculations of normals added
    // BABYLON.VertexData.ComputeNormals(positions, indices, normals);
    // var vertexData = new BABYLON.VertexData();
    // vertexData.positions = positions;
    // vertexData.indices = indices;
    // vertexData.normals = normals;
    // vertexData.applyToMesh(customMesh);
    // customMesh.convertToFlatShadedMesh();
    var mat = new BABYLON.StandardMaterial("", this.scene);
    mat.backFaceCulling = false;
    mat.diffuseTexture = new BABYLON.Texture(
      "https://assets.babylonjs.com/environments/bricktile.jpg",
      this.scene
    );
    customMesh.material = mat;
    setInterval(() => {
      mat.wireframe = !mat.wireframe;
    }, 1000);
  };
}
