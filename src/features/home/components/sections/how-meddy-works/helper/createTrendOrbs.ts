import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export async function createTrendOrbs(
  host: HTMLElement,
  svg: SVGSVGElement,
  mask: SVGRectElement,
  paths: SVGPathElement[],
) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(0, 1, 1, 0, 0.1, 2000);
  camera.position.z = 1000;
  scene.add(new THREE.HemisphereLight(0xffffff, 0x244630, 3));
  const key = new THREE.DirectionalLight(0xffffff, 4);
  key.position.set(-200, 400, 600);
  const rim = new THREE.DirectionalLight(0xc7f4dc, 2);
  rim.position.set(400, 100, 300);
  scene.add(key, rim);
  const groups: THREE.Group[] = [];
  const dispose = () => {
    groups.forEach(group => group.traverse(object => {
      if (!(object instanceof THREE.Mesh)) return;
      object.geometry.dispose();
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach(material => {
        Object.values(material).forEach(value => {
          if (value instanceof THREE.Texture) value.dispose();
        });
        material.dispose();
      });
    }));
    renderer.dispose();
    renderer.domElement.remove();
  };
  try {
    // SVG path order is white first, green second in all three trend charts.
    for (const name of ["pearl-orb", "emerald-orb"]) {
      const model = (await new GLTFLoader().loadAsync(`/home/3dmodel/${name}.glb`)).scene;
      const bounds = new THREE.Box3().setFromObject(model);
      const size = bounds.getSize(new THREE.Vector3());
      model.position.sub(bounds.getCenter(new THREE.Vector3()));
      const pivot = new THREE.Group();
      pivot.add(model);
      pivot.userData.baseScale = 1 / Math.max(size.x, size.y, size.z);
      groups.push(pivot);
      scene.add(pivot);
    }
  } catch (error) { dispose(); throw error; }
  host.appendChild(renderer.domElement);
  renderer.domElement.setAttribute("aria-hidden", "true");
  renderer.domElement.style.display = "block";
  const lengths = paths.map(path => path.getTotalLength());
  let width = 0;
  let height = 0;
  let view = { x: 0, y: 0, width: 1, height: 1 };
  let curves: { pointAt: (length: number) => DOMPoint; samples: DOMPoint[] }[] = [];
  const render = () => {
    if (!width || !height) return;
    const progress = Math.max(0, Math.min(1, Number(mask.getAttribute("width")) / view.width));
    const revealX = view.x + progress * view.width;
    groups.forEach((group, index) => {
      const { pointAt, samples } = curves[index];
      const start = samples[0];
      const end = samples[256];
      group.visible = revealX >= start.x && revealX <= end.x && progress > 0 && progress < 1;
      // Find the intersection with the horizontal reveal edge on the SVG curve.
      // The first eight of the original 22 bisections use cached samples.
      // Finish on the actual curve, preserving the original precision/motion.
      let left = 0;
      let right = 256;
      while (right - left > 1) {
        const mid = (left + right) / 2;
        if (samples[mid].x < revealX) left = mid;
        else right = mid;
      }
      let lo = lengths[index] * left / 256;
      let hi = lengths[index] * right / 256;
      for (let step = 0; step < 14; step++) {
        const mid = (lo + hi) / 2;
        if (pointAt(mid).x < revealX) lo = mid;
        else hi = mid;
      }
      const point = pointAt((lo + hi) / 2);
      group.position.set((point.x - view.x) / view.width * width,
        height - (point.y - view.y) / view.height * height, 0);
      const responsiveScale = Math.max(0.55, Math.min(1, width / 720));
      group.scale.setScalar(group.userData.baseScale * (index === 0 ? 18 : 28) * responsiveScale);
      group.rotation.set(progress * Math.PI, progress * Math.PI * 3, progress * 0.5);
    });
    renderer.render(scene, camera);
  };
  const resize = () => {
    ({ width, height } = host.getBoundingClientRect());
    const box = svg.viewBox.baseVal;
    view = { x: box.x, y: box.y, width: box.width, height: box.height };
    const svgMatrix = svg.getCTM();
    const inverse = svgMatrix?.inverse();
    curves = paths.map((path, index) => {
      const pathMatrix = path.getCTM();
      const transform = inverse && pathMatrix ? inverse.multiply(pathMatrix) : undefined;
      const pointAt = (length: number) => {
        const point = path.getPointAtLength(length);
        return transform ? point.matrixTransform(transform) : point;
      };
      return {
        pointAt,
        samples: Array.from({ length: 257 }, (_, step) => pointAt(lengths[index] * step / 256)),
      };
    });
    renderer.setSize(width, height);
    camera.right = width;
    camera.top = height;
    camera.updateProjectionMatrix();
    render();
  };
  const mutation = new MutationObserver(render);
  mutation.observe(mask, { attributes: true, attributeFilter: ["width"] });
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();
  return () => { mutation.disconnect(); observer.disconnect(); dispose(); };
}
