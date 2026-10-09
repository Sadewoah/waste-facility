"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { useT } from "@/lib/i18n/client";
import { PRELOAD_KEY } from "@/lib/preload";
import { cloneMachine, getMachineState, loadMachine, subscribeMachine, type MachineState } from "@/lib/machine";

/** Hard ceiling: never hold the visitor longer than this, whatever is still loading. */
const MAX_WAIT_MS = 9000;

const serverState: MachineState = { status: "idle", progress: null };
const LIME = 0xc9f245;

/**
 * "Machine Awakening" preloader.
 *
 * Readiness is real:  page = window `load` + fonts ready,  model = shared somya.glb loader.
 * The overlay is server-rendered; <html data-preloading> (set by an inline script in layout.tsx
 * only on a visitor's first load in this tab) is what makes it visible, so repeat navigations
 * and refreshes in the same session never flash it.
 */
export function SomyaPreloader() {
  const t = useT();
  const root = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [forced, setForced] = useState(false);
  const skipRef = useRef<() => void>(() => {});
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const m = useSyncExternalStore(subscribeMachine, getMachineState, () => serverState);

  const modelSettled = m.status === "ready" || m.status === "failed";
  const ready = forced || (pageReady && modelSettled);
  const label = ready ? t("System ready") : m.status === "ready" ? t("Initializing") : t("Loading");
  const pct = m.progress !== null && m.status === "loading" ? Math.round(m.progress * 100) : null;

  // ── page readiness (load event + fonts) ──
  useEffect(() => {
    if (!document.documentElement.hasAttribute("data-preloading")) { setGone(true); return; }
    let live = true;
    const check = () => { Promise.resolve(document.fonts?.ready).then(() => live && setPageReady(true)); };
    if (document.readyState === "complete") check(); else addEventListener("load", check, { once: true });
    const cap = setTimeout(() => live && setPageReady(true), MAX_WAIT_MS);
    loadMachine(); // starts (or joins) the one and only GLB download
    return () => { live = false; removeEventListener("load", check); clearTimeout(cap); };
  }, []);

  // ── real progress → bar (indeterminate CSS animation is used while progress is unknown) ──
  useEffect(() => {
    if (barRef.current && m.progress !== null) gsap.to(barRef.current, { scaleX: m.progress, duration: 0.35, ease: "power2.out", overwrite: true });
  }, [m.progress]);

  // ── 3D scene + intro timeline (one GSAP context, reverted on unmount) ──
  useEffect(() => {
    const el = root.current;
    if (gone || !el || !document.documentElement.hasAttribute("data-preloading")) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false, raf = 0;
    let cleanup = () => {};
    const power = { rim: 0, env: 0.12 }; // animated by the timeline, read by the render loop
    // Two-act camera move. Act 1: close, large top-down view of the machine (slow push-in).
    // Act 2: the camera pulls back and eases down to the hero angle while orbiting a full 360°, so every side is revealed.
    const REST = { yaw: -0.7, pitch: 0.14 };
    const TOP = { pitch: 1.18, zoom: 1.4 };   // top-down close-up
    const pose = { yaw: REST.yaw, pitch: REST.pitch, zoom: 1, settled: reduce };
    const SPIN_START = reduce ? 0 : 0.35;     // begins as the stage fades in
    const HOLD = 2;                            // act 1: top close-up
    const ORBIT = 5.5;                         // act 2: pull back + 360° orbit
    const SPIN_DUR = HOLD + ORBIT;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => setIntroDone(true) });
      skipRef.current = () => { tl.progress(1); setForced(true); setIntroDone(true); };
      // Stage 1 – dark opening (0 – 0.4s): logo
      tl.fromTo("[data-pl=logo]", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: reduce ? 0.2 : 0.4, ease: "power2.out" }, 0);
      // Stage 2 – machine awakening (0.4 – 1.1s)
      tl.fromTo("[data-pl=stage]", { opacity: 0, scale: reduce ? 1 : 0.88 }, { opacity: 1, scale: 1, duration: reduce ? 0.2 : 0.7, ease: "power3.out" }, reduce ? 0.1 : 0.4);
      // Stage 3 – power activation (1.1 – 1.8s): lime rim light + environment come up
      tl.to(power, { rim: 2.4, env: 1.1, duration: reduce ? 0.2 : 0.7, ease: "power2.inOut" }, reduce ? 0.2 : 1.1);
      // Stage 4 – status UI (1.8 – 2.5s)
      tl.fromTo("[data-pl=ui]", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: reduce ? 0.2 : 0.5, ease: "power2.out" }, reduce ? 0.2 : 1.1);
      tl.fromTo("[data-pl=tag]", { opacity: 0 }, { opacity: 1, duration: 0.5 }, reduce ? 0.3 : 1.6);
      // Ends exactly on REST, so the idle drift continues seamlessly. Reduced motion: stays at REST, no zoom/orbit.
      if (!reduce) {
        const Y0 = REST.yaw - Math.PI * 2 - 0.5;
        Object.assign(pose, { yaw: Y0, pitch: TOP.pitch, zoom: TOP.zoom });
        // Act 1 – slow push-in on the top, with a faint turn so it never looks frozen
        tl.to(pose, { zoom: TOP.zoom + 0.18, yaw: Y0 + 0.5, duration: HOLD, ease: "power1.inOut" }, SPIN_START);
        // Act 2 – pull back, tilt down and orbit 360° (all three ease together, starting from the end of act 1)
        const t2 = SPIN_START + HOLD;
        tl.to(pose, { yaw: REST.yaw, duration: ORBIT, ease: "power2.inOut" }, t2);
        tl.to(pose, { zoom: 1, duration: ORBIT, ease: "power3.inOut" }, t2);
        tl.to(pose, { keyframes: [
          { pitch: -0.08, duration: ORBIT * 0.7, ease: "power2.inOut" }, // sweeps past the sides down to a low angle
          { pitch: REST.pitch, duration: ORBIT * 0.3, ease: "power2.out" },
        ] }, t2);
        tl.call(() => { pose.settled = true; }, undefined, SPIN_START + SPIN_DUR);
      }
      tlRef.current = tl;
    }, el);

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/addons/environments/RoomEnvironment.js");
      const root3d = await loadMachine();
      const canvas = canvasRef.current;
      if (disposed || !root3d || !canvas) return; // model/WebGL failed → logo + status only, site still opens
      const machine = cloneMachine(THREE);
      if (!machine) return;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(0, 0.3, 8.5);
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(3, 5, 6); scene.add(key);
      const rim = new THREE.DirectionalLight(LIME, 0); rim.position.set(-4, 2, -3); scene.add(rim);
      const rim2 = new THREE.DirectionalLight(LIME, 0); rim2.position.set(4, 1, -4); scene.add(rim2);
      const obj = new THREE.Group(); scene.add(obj);
      obj.add(machine);

      // Bounding-sphere radius: the machine fits inside this sphere at ANY rotation, so no angle can ever poke out of the canvas.
      const R = new THREE.Box3().setFromObject(machine).getSize(new THREE.Vector3()).length() / 2;
      const PEAK_ZOOM = TOP.zoom + 0.18; // biggest zoom the choreography reaches (end of the top close-up)
      let baseScale = 1;
      const layout = () => {
        const w = canvas.clientWidth, h = canvas.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h; camera.updateProjectionMatrix();
        const visH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
        const visW = visH * camera.aspect;
        // The canvas covers the whole screen, so nothing is cropped by an inner box. Size it so the sphere at PEAK zoom
        // still sits fully inside the viewport (with margin for perspective), on any aspect ratio.
        baseScale = (0.4 * Math.min(visH, visW)) / R / PEAK_ZOOM;
        obj.scale.setScalar(baseScale * pose.zoom);
      };
      const ro = new ResizeObserver(layout); ro.observe(canvas); layout();

      const t0 = performance.now();
      let last = t0, idle = 0;
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        const s = reduce ? 0 : 1, t = now - t0, dt = now - last; last = now;
        // After the choreography lands, keep a slow drift + tiny bob so a long load never looks frozen.
        if (pose.settled) idle += dt * 0.00025 * s; // drift only after the choreography has landed
        machine.rotation.y = pose.yaw + idle;
        obj.rotation.x = pose.pitch + Math.sin(t * 0.0011) * 0.015 * s;
        obj.scale.setScalar(baseScale * pose.zoom);
        // faster, wider lighting sweep so every face catches the lime rim light as it spins past
        const sweep = Math.sin(t * 0.0016 * s) * 2.4;
        rim.intensity = power.rim; rim.position.x = -4 + sweep; rim.position.y = 2 + Math.cos(t * 0.0012 * s) * 1.2;
        rim2.intensity = power.rim * 0.55; rim2.position.x = 4 - sweep * 0.7;
        scene.environmentIntensity = power.env;
        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(loop);

      cleanup = () => {
        cancelAnimationFrame(raf); ro.disconnect();
        // Geometry is shared with the hero/other views: dispose only what this scene owns.
        machine.traverse((o) => { const mm = (o as import("three").Mesh).material as import("three").Material | undefined; mm?.dispose(); });
        envTex.dispose(); pmrem.dispose(); renderer.dispose();
      };
    })();

    // Also runs when `gone` flips: the component stays mounted (returns null), so the WebGL scene must be torn down here.
    return () => { disposed = true; cancelAnimationFrame(raf); cleanup(); ctx.revert(); };
  }, [gone]);

  // If the page is already ready, don't make the visitor wait for the long version of the intro.
  useEffect(() => { if (ready) tlRef.current?.timeScale(1); }, [ready]);

  // ── exit: only when the intro has played AND everything is actually ready ──
  useEffect(() => {
    if (!(introDone && ready) || gone) return;
    const el = root.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const done = () => {
      try { sessionStorage.setItem(PRELOAD_KEY, "1"); } catch {}
      document.documentElement.removeAttribute("data-preloading"); // releases scroll lock + starts hero .rise animations
      setGone(true);
    };
    const tl = gsap.timeline({ onComplete: done });
    tl.to("[data-pl=bar]", { opacity: 0, duration: 0.2 }, 0.35) // let "SYSTEM READY" be read
      .to(el, { opacity: 0, duration: reduce ? 0.25 : 0.7, ease: "power2.inOut" }, 0.45)
      .to("[data-pl=stage]", { scale: reduce ? 1 : 1.06, duration: 0.7, ease: "power2.in" }, 0.45);
    return () => { tl.kill(); };
  }, [introDone, ready, gone]);

  // ── keyboard: Escape skips; scroll lock lives in CSS (html[data-preloading]) ──
  useEffect(() => {
    if (gone) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") skipRef.current(); };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [gone]);

  if (gone) return null;
  return (
    <div id="somya-preloader" ref={root} role="status" aria-live="polite" aria-busy={!ready} aria-label={t("Loading SOMYA Waste Facility")} className="fixed inset-0 z-[100] overflow-hidden bg-[#14251F] text-white">
      {/* haze + vignette (no particles) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_52%,rgba(201,242,69,0.10),transparent_70%),radial-gradient(ellipse_at_center,transparent_40%,rgba(3,12,9,0.75)_100%)]" />

      {/* full-screen 3D layer (behind the text) so the machine is never cropped by an inner box */}
      <div data-pl="stage" aria-hidden className="pointer-events-none absolute inset-0 opacity-0">
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>

      <button type="button" onClick={() => skipRef.current()} className="absolute right-5 top-5 z-10 rounded-lg border border-white/20 px-3.5 py-2 text-[11px] font-semibold tracking-wide text-white/70 transition-colors hover:bg-white/10 hover:text-white">
        {t("Skip intro")}
      </button>

      <div className="relative flex h-full flex-col items-center px-6 pb-10 pt-12 sm:pt-16">
        <div data-pl="logo" className="flex flex-col items-center gap-3 opacity-0 drop-shadow-[0_2px_12px_rgba(3,12,9,0.75)]">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-lime text-forest-950">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 12a8 8 0 01-13.6 5.7M4 12a8 8 0 0113.6-5.7" /></svg>
          </span>
          <p className="text-center leading-none">
            <span className="block text-3xl font-bold tracking-[-0.03em] sm:text-4xl">SOMYA</span>
            <span className="mt-2 block text-[10px] font-medium tracking-[0.38em] text-white/70 sm:text-xs">WASTE FACILITY</span>
          </p>
        </div>

        <div aria-hidden className="my-2 min-h-0 w-full flex-1" />

        <div data-pl="ui" className="flex w-full max-w-[320px] flex-col items-center gap-3 opacity-0 drop-shadow-[0_2px_12px_rgba(3,12,9,0.75)]">
          <div data-pl="bar" className="h-[2px] w-full overflow-hidden rounded-full bg-white/15">
            {m.progress !== null && m.status !== "failed"
              ? <span ref={barRef} className="block h-full w-full origin-left scale-x-0 rounded-full bg-lime" />
              : ready ? <span className="block h-full w-full rounded-full bg-lime" /> : <span className="preloader-indeterminate block h-full w-1/3 rounded-full bg-lime" />}
          </div>
          <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] text-lime">
            <span aria-hidden className={`h-1.5 w-1.5 rounded-full bg-lime ${ready ? "" : "animate-pulse"}`} />
            {label.toUpperCase()}
            {pct !== null && !ready && <span className="font-medium tabular-nums text-white/60">{pct}%</span>}
          </p>
        </div>

        <p data-pl="tag" className="mt-5 max-w-[16rem] text-center text-[10px] font-medium leading-relaxed tracking-[0.22em] text-white/55 opacity-0 sm:max-w-none">
          {t("Turning organic waste into something valuable").toUpperCase()}
        </p>
      </div>
    </div>
  );
}