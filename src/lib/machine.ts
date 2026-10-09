"use client";
import type { Group } from "three";

/**
 * Single source of truth for /models/somya.glb.
 *
 * - The file is fetched and decoded ONCE per page load (module-level promise).
 * - Every consumer (preloader, hero, page heroes, sections) calls `cloneMachine()`
 *   to get its own Group. Geometry is shared, so GPU/CPU memory is not duplicated.
 * - Progress is real (bytes from GLTFLoader's XHR), `status` reflects actual state.
 */

export const MACHINE_URL = "/models/somya.glb";

export type MachineStatus = "idle" | "loading" | "ready" | "failed";
export type MachineState = { status: MachineStatus; progress: number | null };

let state: MachineState = { status: "idle", progress: null };
let promise: Promise<Group | null> | null = null;
let template: Group | null = null;
const listeners = new Set<() => void>();

const set = (next: Partial<MachineState>) => {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
};

export const getMachineState = () => state;
export const subscribeMachine = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export function webglAvailable(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Start (or join) the single download. Resolves to null on any failure. */
export function loadMachine(): Promise<Group | null> {
  if (promise) return promise;
  if (typeof window === "undefined") return Promise.resolve(null);
  if (!webglAvailable()) {
    set({ status: "failed" });
    return (promise = Promise.resolve(null));
  }
  set({ status: "loading", progress: 0 });
  promise = (async () => {
    try {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");
      const gltf = await new GLTFLoader().loadAsync(MACHINE_URL, (e) => {
        // lengthComputable is false when the server omits Content-Length / uses gzip.
        // In that case stay indeterminate (null) instead of inventing a percentage.
        if (e.lengthComputable && e.total > 0) set({ progress: Math.min(1, e.loaded / e.total) });
      });

      // Normalise once: centre on origin, longest side = 3.3 units (same framing as before).
      const m = gltf.scene;
      const bb = new THREE.Box3().setFromObject(m);
      const sz = bb.getSize(new THREE.Vector3());
      m.position.sub(bb.getCenter(new THREE.Vector3()));
      const holder = new THREE.Group();
      holder.add(m);
      holder.scale.setScalar(3.3 / Math.max(sz.x, sz.y, sz.z));
      template = holder;
      set({ status: "ready", progress: 1 });
      return holder;
    } catch (err) {
      console.error("somya.glb", err);
      set({ status: "failed" });
      return null;
    }
  })();
  return promise;
}

/**
 * A new Group that shares geometry with the template. Materials are NOT shared:
 * each view owns its material so variants (solid / blueprint) never fight each other,
 * and disposing a view's material never breaks another view.
 */
export function cloneMachine(THREE: typeof import("three")): Group | null {
  if (!template) return null;
  const g = template.clone(true);
  g.traverse((o) => {
    const mesh = o as import("three").Mesh;
    if (mesh.isMesh) {
      mesh.material = new THREE.MeshStandardMaterial({
        color: 0xe4e6e8,
        metalness: 1,
        roughness: 0.26,
        side: THREE.DoubleSide,
        flatShading: true, // the model ships without normals (see README)
      });
    }
  });
  return g;
}
