import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Mounts a real-time dumbbell built from primitives into `host`.
 * Returns a cleanup function. Throws if WebGL is unavailable.
 */
export function mountHero3D(host: HTMLElement, trigger: HTMLElement): () => void {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  // Soft studio lighting
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(4, 5, 6);
  const rim = new THREE.DirectionalLight(0xd8ff7a, 1.4);
  rim.position.set(-5, 2, -4);
  scene.add(key, rim, new THREE.AmbientLight(0xffffff, 0.25));

  // Dumbbell from primitives
  const iron = new THREE.MeshStandardMaterial({ color: 0x1c1c1c, metalness: 0.6, roughness: 0.38 });
  const steel = new THREE.MeshStandardMaterial({ color: 0xbfbfbf, metalness: 1, roughness: 0.22 });
  const lime = new THREE.MeshStandardMaterial({ color: 0xc6f432, metalness: 0.2, roughness: 0.4 });

  const bell = new THREE.Group();
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 2.4, 40), steel);
  handle.rotation.z = Math.PI / 2;
  bell.add(handle);
  // Knurl rings for grip detail
  for (let i = -4; i <= 4; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.175, 0.012, 8, 40), steel);
    ring.rotation.y = Math.PI / 2;
    ring.position.x = i * 0.11;
    bell.add(ring);
  }
  for (const side of [-1, 1]) {
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.16, 40), lime);
    collar.rotation.z = Math.PI / 2;
    collar.position.x = side * 0.95;
    const plates = [
      { r: 0.95, w: 0.32, x: 1.2 },
      { r: 0.8, w: 0.26, x: 1.49 },
      { r: 0.62, w: 0.2, x: 1.72 },
    ];
    bell.add(collar);
    for (const p of plates) {
      const plate = new THREE.Mesh(new THREE.CylinderGeometry(p.r, p.r, p.w, 6), iron);
      plate.rotation.z = Math.PI / 2;
      plate.position.x = side * p.x;
      bell.add(plate);
    }
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.1, 32), steel);
    cap.rotation.z = Math.PI / 2;
    cap.position.x = side * 1.87;
    bell.add(cap);
  }
  bell.rotation.set(0.35, -0.5, 0.2);

  const rig = new THREE.Group(); // scroll-driven position/scale
  rig.add(bell);
  scene.add(rig);

  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const s = w < 640 ? 0.48 : w < 1024 ? 0.78 : 1;
    bell.scale.setScalar(s);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(host);

  // Pointer tilt + parallax
  const pointer = { x: 0, y: 0 };
  const onMove = (e: PointerEvent) => {
    pointer.x = e.clientX / window.innerWidth - 0.5;
    pointer.y = e.clientY / window.innerHeight - 0.5;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  // Scroll: ease object right, smaller and further back
  gsap.registerPlugin(ScrollTrigger);
  const tween = gsap.to(rig.position, {
    x: 2.2, y: -0.6, z: -2,
    ease: "none",
    scrollTrigger: { trigger, start: "top top", end: "bottom top", scrub: 0.8 },
  });

  let visible = true;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
  io.observe(host);

  const clock = new THREE.Clock();
  let raf = 0;
  const loop = () => {
    raf = requestAnimationFrame(loop);
    if (!visible) return; // pause rendering off-screen
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    bell.rotation.y += dt * 0.35;
    bell.position.y = Math.sin(t * 1.1) * 0.12;
    rig.rotation.x += (pointer.y * 0.5 - rig.rotation.x) * 0.06;
    rig.rotation.z += (-pointer.x * 0.25 - rig.rotation.z) * 0.06;
    camera.position.x += (pointer.x * 0.8 - camera.position.x) * 0.05;
    camera.position.y += (-pointer.y * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  };

  if (reduced) renderer.render(scene, camera); // static fallback
  else loop();
  host.dataset.sceneReady = "true";

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("pointermove", onMove);
    ro.disconnect();
    io.disconnect();
    tween.scrollTrigger?.kill();
    tween.kill();
    scene.traverse((o) => { if (o instanceof THREE.Mesh) o.geometry.dispose(); });
    [iron, steel, lime].forEach((m) => m.dispose());
    pmrem.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
