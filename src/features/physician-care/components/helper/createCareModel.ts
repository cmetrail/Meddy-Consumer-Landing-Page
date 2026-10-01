import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export type CareModel = { update: (progress: number) => void; dispose: () => void };

/** Render on scroll/resize only; there is no idle animation loop. */
export async function createCareModel(host: HTMLElement): Promise<CareModel> {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 7.8);
  scene.add(new THREE.HemisphereLight(0xfffaf0, 0x526c58, 3));
  const key = new THREE.DirectionalLight(0xfff6e8, 4);
  key.position.set(-3, 4, 5);
  const rim = new THREE.DirectionalLight(0xc9e7d2, 3);
  rim.position.set(3, 1, -2);
  scene.add(key, rim);

  let model: THREE.Group;
  try {
    model = (await new GLTFLoader().loadAsync("/models/care-pen.glb")).scene;
  } catch (error) {
    renderer.dispose();
    throw error;
  }
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  model.position.sub(center);
  const pivot = new THREE.Group();
  pivot.add(model);
  const baseScale = 3.9 / Math.max(size.x, size.y, size.z);
  scene.add(pivot);
  host.appendChild(renderer.domElement);
  renderer.domElement.setAttribute("aria-hidden", "true");

  let progress = 0;
  let disposed = false;
  const render = () => {
    if (disposed) return;
    const shrink = THREE.MathUtils.smoothstep(progress, 0.48, 1);
    pivot.rotation.set(0.08, -0.45 + progress * 1.45, -0.28 + progress * 0.14);
    pivot.scale.setScalar(baseScale * (1 - shrink * 0.2));
    pivot.position.set(0, 0.12 + shrink * 0.32, 0);
    renderer.render(scene, camera);
  };
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();

  return {
    update(value) { progress = Math.max(0, Math.min(1, value)); render(); },
    dispose() {
      disposed = true;
      observer.disconnect();
      model.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material: THREE.Material) => {
          Object.values(material).forEach((value) => {
            if (value instanceof THREE.Texture) value.dispose();
          });
          material.dispose();
        });
      });
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
