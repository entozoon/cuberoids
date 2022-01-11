import * as BABYLON from "@babylonjs/core";
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
    const axes = new BABYLON.AxesViewer(this.scene, 1); // x: red, y: green, z: blue
    this.jank();
    this.engine.runRenderLoop(() => {
      this.scene.render();
      // console.log(this.camera.position);
    });
  }
  private initCamera() {
    const camera = new BABYLON.ArcRotateCamera(
      "camera1",
      0,
      0,
      0,
      new BABYLON.Vector3(0, 0, 0), // target
      this.scene
    );
    // Flipped so that z is up (3D printer style)
    camera.setPosition(new BABYLON.Vector3(0, 2, -9));
    camera.attachControl(this.canvas, true);
    return camera;
  }
  private jank = function () {
    // vertices: x1,y1,z1, x2,y2,z2, ...
    var positions = [0, 0, 0, 1, 0, 0, 1, 1, 0];
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
    // var mat = new BABYLON.StandardMaterial("", this.scene);
    // mat.backFaceCulling = false;
    // mat.diffuseTexture = new BABYLON.Texture(
    //   "https://assets.babylonjs.com/environments/bricktile.jpg",
    //   this.scene
    // );
    //mat.wireframe = true;
    // customMesh.material = mat;
  };
}
