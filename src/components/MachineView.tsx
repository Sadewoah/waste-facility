"use client";
import { useEffect, useRef, type MutableRefObject } from "react";
import gsap from "gsap";
import { cloneMachine, loadMachine } from "@/lib/machine";

/**
 * Reusable SOMYA machine canvas. Uses the shared, once-loaded somya.glb.
 *
 * pose
 *  - "turntable"  slow auto-rotation
 *  - "pointer"    follows the cursor a little
 *  - "controlled" eases toward `yawTarget` (front/back buttons), with a light pointer sway
 *  - "progress"   rotation, height and zoom are driven by `progress` (0–1, written by a parent on scroll)
 */
export type MachinePose = "turntable" | "pointer" | "controlled" | "progress";

type Props = {
  pose?: MachinePose;
  /** Fraction of the canvas height the machine should fill (0–1). */
  fill?: number;
  /** Horizontal offset in units of canvas width (-0.5 … 0.5). */
  offsetX?: number;
  /** Start rotation in radians. */
  yaw?: number;
  /** "controlled": target rotation in radians. Read every frame, changing it never rebuilds the scene. */
  yawTarget?: number;
  /** "progress": 0–1 value the parent updates (e.g. on scroll). */
  progress?: MutableRefObject<number>;
  /** Rim light colour. */
  rim?: number;
  className?: string;
};

export function MachineView({ pose = "turntable", fill = 0.8, offsetX = 0, yaw = -0.6, yawTarget = -0.6, progress, rim = 0xc9f245, className = "" }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const targetRef = useRef(yawTarget);
  targetRef.current = yawTarget;

  useEffect(() => {
    const canvas = ref.current!;
    let disposed = false, raf = 0;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/addons/environments/RoomEnvironment.js");
      const root = await loadMachine(); // joins the single download; null on failure
      if (disposed || !root) return; // failure → canvas stays empty, page still works
      const machineObj = cloneMachine(THREE);
      if (!machineObj) return;

      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;
      scene.environmentIntensity = 1.1;
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.z = 8.5;
      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(3, 5, 6); scene.add(key);
      // Lime rim from behind-left, plus a softer one from behind-right so the back view is lit too.
      const rimLight = new THREE.DirectionalLight(rim, 2.4); rimLight.position.set(-4, 2, -3); scene.add(rimLight);
      const rimLight2 = new THREE.DirectionalLight(rim, 1.2); rimLight2.position.set(4, 1.5, -4); scene.add(rimLight2);
      const fillBack = new THREE.DirectionalLight(0xffffff, 0.9); fillBack.position.set(-2, 3, -6); scene.add(fillBack);

      const obj = new THREE.Group(); scene.add(obj);
      const machine = new THREE.Group(); obj.add(machine);
      machine.add(machineObj);

      const meshes: import("three").Mesh[] = [];
      machineObj.traverse((o) => { if ((o as import("three").Mesh).isMesh) meshes.push(o as import("three").Mesh); });

      const intro = gsap.from(machineObj.scale, { x: 0, y: 0, z: 0, duration: reduce ? 0 : 1.1, ease: "back.out(1.3)", paused: true });

      let visH = 1, visW = 1, baseScale = 1;
      const layout = () => {
        const w = canvas.clientWidth, h = canvas.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h; camera.updateProjectionMatrix();
        visH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
        visW = visH * camera.aspect;
        baseScale = Math.min((fill * visH) / 3.3, (0.92 * visW) / 3.3);
        obj.scale.setScalar(baseScale);
      };
      const ro = new ResizeObserver(layout); ro.observe(canvas); layout();

      const mouse = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => { mouse.x = e.clientX / innerWidth - 0.5; mouse.y = e.clientY / innerHeight - 0.5; };
      if (pose === "pointer" || pose === "controlled") addEventListener("pointermove", onMove);

      let visible = false;
      const io = new IntersectionObserver(([en]) => {
        const was = visible; visible = en.isIntersecting;
        if (visible && !was) intro.play();
      }, { rootMargin: "80px" });
      io.observe(canvas);

      let cur = yaw, sp = progress?.current ?? 0;
      const t0 = performance.now();
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        if (!visible || document.hidden) return;
        const t = now - t0;
        const s = reduce ? 0 : 1;
        let py = 0, zoom = 1;

        if (pose === "progress") {
          sp += ((progress?.current ?? 0) - sp) * (reduce ? 1 : 0.08); // inertia
          cur = yaw + sp * Math.PI * 2.4;
          py = Math.sin(sp * Math.PI * 2) * 0.1 * visH; // gentle rise and fall
          zoom = 0.92 + 0.16 * Math.sin(sp * Math.PI);  // push in toward the middle of the scroll
        } else if (pose === "controlled") {
          cur += (targetRef.current - cur) * (reduce ? 1 : 0.07);
        } else {
          cur = yaw + t * 0.00028 * s * (pose === "turntable" ? 1 : 0);
          if (pose === "pointer") cur = yaw + Math.sin(t * 0.0007) * 0.3 * s;
        }
        // Same sway as the home hero (HeroScene): ±0.4 rad around the base angle. In "controlled" the base is the front/back target.
        machine.rotation.y = cur + (pose === "controlled" ? Math.sin(t * 0.0007) * 0.4 * s : 0);

        if (pose === "pointer" || pose === "controlled") {
          obj.rotation.y += (mouse.x * 0.6 * s - obj.rotation.y) * 0.05; // same factors as HeroScene
          obj.rotation.x += (mouse.y * 0.35 * s - obj.rotation.x) * 0.05;
        }

        obj.scale.setScalar(baseScale * zoom);
        obj.position.set(offsetX * visW, py, 0);
        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(loop);

      cleanup = () => {
        cancelAnimationFrame(raf); intro.kill(); ro.disconnect(); io.disconnect();
        removeEventListener("pointermove", onMove);
        // Geometry is shared with the other views → never dispose it here. Only what this view created.
        meshes.forEach((m) => (m.material as import("three").Material).dispose());
        envTex.dispose(); pmrem.dispose(); renderer.dispose();
      };
    })();

    return () => { disposed = true; cancelAnimationFrame(raf); cleanup(); };
  }, [pose, fill, offsetX, yaw, rim, progress]);

  return <canvas ref={ref} aria-hidden className={`block h-full w-full ${className}`} />;
}