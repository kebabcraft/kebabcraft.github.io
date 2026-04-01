// panorama.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("sky");
  if (!canvas) {
    console.error("Canvas #sky not found!");
    return;
  }

  // Szene und Kamera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 0.1; // nah an der Kugel

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // Controls (optional für Mausbewegung)
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;

  // Panorama als Sphere (nicht Cube, unterstützt nicht-quadratische Texturen)
  const geometry = new THREE.SphereGeometry(500, 60, 40); // große Kugel
  geometry.scale(-1, 1, 1); // nach innen kehren

  // Lade alle 6 Texturen
  const loader = new THREE.TextureLoader();
  const textures = [
    loader.load('/src/img/panorama/jok/26/panorama_1.png'),
    loader.load('/src/img/panorama/jok/26/panorama_3.png'),
    loader.load('/src/img/panorama/jok/26/panorama_4.png'),
    loader.load('/src/img/panorama/jok/26/panorama_5.png'),
    loader.load('/src/img/panorama/jok/26/panorama_0.png'),
    loader.load('/src/img/panorama/jok/26/panorama_2.png')
  ];

  // Alle Texturen auf sRGB setzen
  textures.forEach(tex => tex.colorSpace = THREE.SRGBColorSpace);

  // Ein einfaches ShaderMaterial zum Kombinieren der Texturen
  // Wir verwenden nur eine Textur pro Mesh, hier Beispiel mit front (+Z)
  const material = new THREE.MeshBasicMaterial({ map: textures[4] }); 
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Animation (langsame Rotation)
  function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y -= 0.0006; // Panorama langsam drehen
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // Fenstergröße ändern
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
