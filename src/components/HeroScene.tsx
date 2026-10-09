"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cloneMachine, loadMachine } from "@/lib/machine";

/** Hero 3D object: /public/models/somya.glb + two orbit rings (three.js). */
export function HeroScene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    let disposed = false, raf = 0;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/addons/environments/RoomEnvironment.js");
      if (disposed) return;
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environmentIntensity = 1.1;
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.z = 8.5;
      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(3, 5, 6); scene.add(key);
      const rim = new THREE.DirectionalLight(0xc9f245, 2.4); rim.position.set(-4, 2, -3); scene.add(rim);

      const obj = new THREE.Group(); scene.add(obj);
      const machine = new THREE.Group(); obj.add(machine);

      // Shared, once-loaded model (the preloader already started this download).
      let holder: import("three").Group | null = null;
      loadMachine().then(() => {
        if (disposed) return;
        holder = cloneMachine(THREE);
        if (!holder) return; // WebGL/model failure: hero copy still renders, canvas stays empty
        machine.add(holder);
        if (!reduce) gsap.from(holder.scale, { x: 0, y: 0, z: 0, duration: 1.3, ease: "back.out(1.3)" });
      });

      // Layout: machine sits upper-right on desktop, centred above the copy on mobile.
      let cx = 0, cy = 0, visH = 1, overlay = true;
      const layout = () => {
        const w = canvas.clientWidth, h = canvas.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h; camera.updateProjectionMatrix();
        visH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
        const visW = visH * camera.aspect;
        overlay = matchMedia("(min-width: 1024px)").matches;
        if (overlay) {
          // Desktop: centered, larger object that sits behind the copy
          obj.scale.setScalar(1.5 * Math.min((0.38 * visW) / 3.3, (0.6 * visH) / 4.3));
          cx = 0.25 * visW;
          cy = -0.1 * visH;
        } else {
          // Mobile / tablet: the canvas is an in-flow block between the paragraph and the buttons
          obj.scale.setScalar(Math.min((0.92 * visW) / 3.3, (0.8 * visH) / 2.2));
          cx = 0;
          cy = 0;
        }
      };
      const ro = new ResizeObserver(layout); ro.observe(canvas); layout();

      const m = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => { m.x = e.clientX / innerWidth - 0.5; m.y = e.clientY / innerHeight - 0.5; };
      addEventListener("pointermove", onMove);
      let visible = true;
      const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }); io.observe(canvas);

      const loop = (t: number) => {
        raf = requestAnimationFrame(loop);
        if (!visible || document.hidden) return;
        const s = reduce ? 0 : 1, prog = Math.min(1, scrollY / (innerHeight * 0.9));
        machine.rotation.y = -0.6 + Math.sin(t * 0.0007) * 0.4 * s + prog * 1.1;
        obj.rotation.y += (m.x * 0.6 * s - obj.rotation.y) * 0.05;
        obj.rotation.x += (m.y * 0.35 * s - obj.rotation.x) * 0.05;
        obj.position.set(cx, cy + (overlay ? prog * visH * 0.3 : 0), 0);
        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(loop);

      cleanup = () => {
        cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); removeEventListener("pointermove", onMove);
        // Geometry is shared with other views, so only this scene's materials are disposed.
        scene.traverse((o) => {
          const mesh = o as import("three").Mesh;
          [mesh.material].flat().forEach((x) => (x as import("three").Material | undefined)?.dispose());
        });
        pmrem.dispose(); renderer.dispose();
      };
    })();

    return () => { disposed = true; cancelAnimationFrame(raf); cleanup(); };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none relative -mx-6 my-4 h-[300px] sm:h-[380px] md:-mx-12 lg:absolute lg:inset-x-0 lg:top-0 lg:-z-10 lg:m-0 lg:h-[100svh]">
      <canvas ref={ref} className="block h-full w-full" />
    </div>
  );
}
