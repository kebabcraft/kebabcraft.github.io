// panorama.js
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("sky");

  if (!canvas) {
    console.error("Canvas #sky not found!");
    return;
  }

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;

  // Load your panorama cube
  const loader = new THREE.CubeTextureLoader();
  loader.setPath('./src/img/panorama/');
  const texture = loader.load([
    'panorama_1.png', // +X (right)
    'panorama_3.png', // -X (left)
    'panorama_4.png', // +Y (top)
    'panorama_5.png', // -Y (bottom)
    'panorama_0.png', // +Z (front)
    'panorama_2.png'  // -Z (back)
  ]);

  texture.encoding = THREE.sRGBEncoding;
  scene.background = texture;

  camera.position.z = 1;

  function animate() {
    requestAnimationFrame(animate);
    camera.rotation.y -= 0.0006; // slow horizontal pan
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
