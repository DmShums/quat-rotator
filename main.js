import "./style.css";
import { RotationQuaternion, Vector3 } from "./QuaternionLibrary";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

window.THREE = THREE;
const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();
scene.background = new THREE.Color("#161718");

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);

document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const loader = new THREE.TextureLoader();

const geometry = new THREE.IcosahedronGeometry(1, 8);
const material = new THREE.MeshPhongMaterial({
  map: loader.load("mars_1k_color.jpg"),
});
const marsMesh = new THREE.Mesh(geometry, material);
scene.add(marsMesh);

const light = new THREE.HemisphereLight("#FFFFFF", "#757575", 1.7);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);

  const q = new RotationQuaternion(1, 1, 1, Math.PI / 360);
  q.ApplyToThreeObject(marsMesh);

  renderer.render(scene, camera);
}

animate();
