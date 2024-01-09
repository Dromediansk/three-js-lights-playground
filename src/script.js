import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// add meshes to the scene

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.75, 32, 32);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16);
const circleGeometry = new THREE.CircleGeometry(0.5, 32);

const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 0.0,
  roughness: 0.5,
});

const box = new THREE.Mesh(boxGeometry, material);
box.position.x = -2;
box.castShadow = true;

const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.x = 0;
sphere.castShadow = true;

const torusKnot = new THREE.Mesh(torusKnotGeometry, material);
torusKnot.position.x = 2;
torusKnot.castShadow = true;

const plane = new THREE.Mesh(circleGeometry, material);
plane.scale.setScalar(20);
plane.position.y = -1;
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;

scene.add(box, sphere, torusKnot, plane);

// initialize the light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const ambientLightFolder = pane.addFolder({
  title: "Ambient Light",
  expanded: true,
});
ambientLightFolder.addInput(ambientLight, "color", {
  color: { type: "float" },
});
ambientLightFolder.addInput(ambientLight, "intensity", {
  min: 0,
  max: 1,
  step: 0.01,
});

const hemishpereLight = new THREE.HemisphereLight("red", "blue", 0.5);
scene.add(hemishpereLight);

const hemisphericLightFolder = pane.addFolder({
  title: "Hemispheric Light",
  expanded: true,
});
hemisphericLightFolder.addInput(hemishpereLight, "color", {
  color: { type: "float" },
});
hemisphericLightFolder.addInput(hemishpereLight, "groundColor", {
  color: { type: "float" },
});
hemisphericLightFolder.addInput(hemishpereLight, "intensity", {
  min: 0,
  max: 1,
  step: 0.01,
});

const directionalLight = new THREE.DirectionalLight("green", 0.5);
scene.add(directionalLight);
directionalLight.position.x = -5;
directionalLight.position.y = 5;

directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.radius = 10;

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.5
);
scene.add(directionalLightHelper);

const directionalLightFolder = pane.addFolder({
  title: "Directional Light",
  expanded: true,
});
directionalLightFolder.addInput(directionalLight, "color", {
  color: { type: "float" },
});
directionalLightFolder.addInput(directionalLight, "intensity", {
  min: 0,
  max: 1,
  step: 0.01,
});
directionalLightFolder.addInput(directionalLight, "castShadow", {
  label: "Cast Shadow",
});

const pointLight = new THREE.PointLight(0xffffff, 0.5, 10);
scene.add(pointLight);

pointLight.position.x = 3;
pointLight.position.y = 3;

pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.radius = 10;

const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointLightHelper);

const pointLightFolder = pane.addFolder({
  title: "Point Light",
  expanded: true,
});
pointLightFolder.addInput(pointLight, "color", {
  color: { type: "float" },
});
pointLightFolder.addInput(pointLight, "intensity", {
  min: 0,
  max: 1,
  step: 0.01,
});
pointLightFolder.addInput(pointLight, "castShadow", {
  label: "Cast Shadow",
});

const spotLight = new THREE.SpotLight("blue", 0.5);
spotLight.position.set(-5, 7, 0);
spotLight.target.position.set(2, 0, -2);
scene.add(spotLight);

const spotLightFolder = pane.addFolder({
  title: "Spot Light",
  expanded: true,
});
spotLightFolder.addInput(spotLight, "angle", {
  min: 0,
  max: Math.PI / 2,
  step: 0.01,
});
spotLightFolder.addInput(spotLight, "penumbra", {
  min: 0,
  max: 1,
  step: 0.01,
});
spotLightFolder.addInput(spotLight, "decay", {
  min: 0,
  max: 5,
  step: 0.01,
});
spotLightFolder.addInput(spotLight, "distance", {
  min: 0,
  max: 10,
  step: 0.01,
});
spotLightFolder.addInput(spotLight, "color", {
  color: { type: "float" },
});
spotLightFolder.addInput(spotLight, "intensity", {
  min: 0,
  max: 1,
  step: 0.01,
});

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

const rectAreaLight = new THREE.RectAreaLight("blue", 0.5, 50, 2);
rectAreaLight.position.y = 3;
rectAreaLight.lookAt(0, 0, 0);
scene.add(rectAreaLight);

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight, 0.5);
scene.add(rectAreaLightHelper);

const rectAreaLightFolder = pane.addFolder({
  title: "Rect Area Light",
  expanded: true,
});
rectAreaLightFolder.addInput(rectAreaLight, "color", {
  color: { type: "float" },
});
rectAreaLightFolder.addInput(rectAreaLight, "intensity", {
  min: 0,
  max: 1,
  step: 0.01,
});

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
camera.position.z = 10;
camera.position.y = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// render the scene
const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
