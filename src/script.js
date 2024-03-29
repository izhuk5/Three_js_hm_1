import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

// Debug

const gui = new GUI();

const cylinderSmallParams = {
  radius: 0.5,
};

const cylinderSmallFolder = gui.addFolder("Cylinder Small");
cylinderSmallFolder
  .add(cylinderSmallParams, "radius", 0.3, 0.6, 0.01)
  .name("Radius")
  .onChange(updateCylinderSmall);

const sphereParams = {
  radius: 0.3,
};

const sphereFolder = gui.addFolder("Sphere");
sphereFolder
  .add(sphereParams, "radius", 0.2, 0.31, 0.001)
  .name("Radius")
  .onChange(() => {
    updateSphere();
  });

const cylinderMediumParams = {
  radius: 0.5,
};

const cylinderMediumFolder = gui.addFolder("Cylinder Medium");
cylinderMediumFolder
  .add(cylinderMediumParams, "radius", 0.15, 0.6, 0.01)
  .name("Radius")
  .onChange(updateCylinderMedium);

const cubeParams = {
  size: 0.25,
};

const boxFolder = gui.addFolder("Cube");
boxFolder
  .add(cubeParams, "size", 0.15, 0.5, 0.01)
  .name("Cube size")
  .onChange(() => {
    updateCube();
  });

const coneParams = {
  radius: 0.2,
};

const coneFolder = gui.addFolder("Cone");
coneFolder
  .add(coneParams, "radius", 0.2, 0.3, 0.01)
  .name("Radius")
  .onChange(() => {
    updateCone();
  });

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Lights

const hemisphereLight = new THREE.HemisphereLight("white", "grey", 5);
scene.add(hemisphereLight);

// Objects

// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;
const cylinderSmallMaterial = new THREE.MeshStandardMaterial({
  color: "#6061fe",
});

const cylinderMediumMaterial = new THREE.MeshStandardMaterial({
  color: "#ff45b7",
});
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: "#ff8a7b",
});
const cubeMaterial = new THREE.MeshStandardMaterial({
  color: "#ffdb7b",
});
const coneMaterial = new THREE.MeshStandardMaterial({
  color: "#f5fca5",
});

// Objects
const cylinderSmall = new THREE.Mesh(
  new THREE.CylinderGeometry(0.5, 0.5, 0.2, 32),
  cylinderSmallMaterial
);

cylinderSmall.rotateX(300);

cylinderSmall.position.y = cylinderSmallParams.radius / 2;

let cylinderSmallPreviousRadius = cylinderSmallParams.radius;

function updateCylinderSmall() {
  const newCylinderSmallRadius = cylinderSmallParams.radius;
  const radiusDifference = newCylinderSmallRadius - cylinderSmallPreviousRadius;

  cylinderSmall.geometry.dispose();
  cylinderSmall.geometry = new THREE.CylinderGeometry(
    newCylinderSmallRadius,
    newCylinderSmallRadius,
    0.2,
    32
  );

  cylinderSmall.position.y += radiusDifference;
  sphere.position.y += 2 * radiusDifference;
  cylinderMedium.position.y += 2 * radiusDifference;
  cube.position.y += 2 * radiusDifference;
  cone.position.y += 2 * radiusDifference;

  cylinderSmallPreviousRadius = newCylinderSmallRadius;
}

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(sphereParams.radius, 16, 16),
  sphereMaterial
);
sphere.position.y = 1.05;

let spherePreviousRadius = sphereParams.radius;

function updateSphere() {
  const newSphereRadius = sphereParams.radius;
  const radiusDifference = newSphereRadius - spherePreviousRadius;

  sphere.geometry.dispose();
  sphere.geometry = new THREE.SphereGeometry(newSphereRadius, 16, 16);

  sphere.position.y += radiusDifference / 2 + radiusDifference / 2;
  cylinderMedium.position.y += 2 * radiusDifference;
  cube.position.y += 2 * radiusDifference;
  cone.position.y += 2 * radiusDifference;

  spherePreviousRadius = newSphereRadius;
}

const cylinderMedium = new THREE.Mesh(
  new THREE.CylinderGeometry(0.5, 0.5, 0.02, 32),
  cylinderMediumMaterial
);

cylinderMedium.position.y = 1.35;

let cylinderMediumPreviousRadius = cylinderMediumParams.radius;

function updateCylinderMedium() {
  const newCylinderMediumRadius = cylinderMediumParams.radius;

  cylinderMedium.geometry.dispose();
  cylinderMedium.geometry = new THREE.CylinderGeometry(
    newCylinderMediumRadius,
    newCylinderMediumRadius,
    0.02,
    32
  );

  cylinderMediumPreviousRadius = newCylinderMediumRadius;
}

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(0.25, 0.25, 0.25),
  cubeMaterial
);

cube.position.y = 1.482;

let cubePreviousSize = cubeParams.size;

function updateCube() {
  const newCubeSize = cubeParams.size;
  const sizeDifference = newCubeSize - cubePreviousSize;

  cube.geometry.dispose();
  cube.geometry = new THREE.BoxGeometry(newCubeSize, newCubeSize, newCubeSize);

  cube.position.y += 0.5 * sizeDifference;
  cone.position.y += 1 * sizeDifference;

  cubePreviousSize = newCubeSize;
}

const cone = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.2, 32), coneMaterial);
cone.position.y = 1.71;
cone.rotateX(Math.PI);

let conePreviousRadius = coneParams.radius;

function updateCone() {
  const newConeRadius = coneParams.radius;
  const radiusDifference = newConeRadius - conePreviousRadius;

  cone.geometry.dispose();
  cone.geometry = new THREE.ConeGeometry(newConeRadius, newConeRadius, 32);

  cone.position.y += radiusDifference / 2;

  conePreviousRadius = newConeRadius;
}
const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.25;

scene.add(plane, sphere, cube, cone, cylinderSmall, cylinderMedium);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();

const tick = () => {
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
