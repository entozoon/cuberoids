import * as THREE from "three";
import { AnaglyphEffect } from "./AnaglyphEffect.js";
import { anaglyphMode } from "./game";

export const Renderer = (wrapper) => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    // precision: "lowp", // optimisation
    failIfMajorPerformanceCaveat: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type = THREE.BasicShadowMap;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  wrapper.querySelector("canvas")?.remove();
  wrapper.appendChild(renderer.domElement);
  return anaglyphMode ? new AnaglyphEffect(renderer) : renderer;
};
