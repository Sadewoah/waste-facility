"use client";
import { useEffect, useRef, useState } from "react";
import { MachineView } from "./MachineView";
import { SectionHead, wrap } from "./Section";
import { Check } from "./Icons";

/**
 * "What you get": a tall section with a sticky stage. While you scroll through it the SOMYA machine
 * turns, rises and pushes in (parallax), and each benefit appears at its own point around the machine.
 * Words are always in the DOM (screen readers get the full list); scroll only drives opacity/position.
 * With prefers-reduced-motion the section falls back to the plain list.
 */

// Desktop zig-zag slots. Even items sit on the left, odd on the right (staggered half a row lower).
// `off` is the distance in % from that side of the stage; rows alternate close to / far from the machine.
const slot = (i: number) => {
  const row = Math.floor(i / 2), left = i % 2 === 0;
  return { top: 31 + row * 11 + (left ? 0 : 5.5), off: row % 2 === 0 ? 14 : 3, left };
};

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export function WhatYouGet({ title, items }: { title: string; items: string[] }) {
  const n = items.length;
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const nodes = useRef<(HTMLLIElement | null)[]>([]);
  const bar = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => { setReduce(matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);

  useEffect(() => {
    if (reduce) return;
    const el = section.current!;
    const start = (i: number) => 0.06 + (i * 0.86) / n; // scroll point at which item i appears
    let raf = 0, last = -1;

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = clamp(-r.top / Math.max(1, r.height - innerHeight));
      progress.current = p;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      let a = 0;
      for (let i = 0; i < n; i++) {
        if (p >= start(i)) a = i;
        const node = nodes.current[i];
        if (!node) continue;
        const shown = clamp((p - start(i)) / 0.035);
        const depth = 0.7 + ((i * 37) % 7) / 10;               // per-item parallax speed (0.7 – 1.3)
        const drift = (start(i) - p) * depth * 260;            // enters from below, then drifts up faster than the page
        node.style.opacity = String(shown * (i === a ? 1 : 0.62));
        node.style.transform = `translate3d(0, ${24 * (1 - shown) + drift * 0.25}px, 0)`;
      }
      if (a !== last) { last = a; setActive(a); }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [n, reduce]);

  if (reduce) {
    return (
      <section className={`${wrap} mt-28`}>
        <SectionHead title={title} />
        <ul className="mt-12 grid gap-x-8 gap-y-3 md:grid-cols-2">
          {items.map((g) => (
            <li key={g} className="flex items-center gap-4 rounded-xl bg-lime-soft px-5 py-4 text-base font-medium">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-lime text-forest-950"><Check className="h-3.5 w-3.5" /></span>{g}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    // overflow-clip (not hidden) keeps the rounded corners without breaking position: sticky
    <section ref={section} className="relative mx-3 mt-28 overflow-clip rounded-[28px] bg-forest-900 text-white" style={{ height: `${100 + n * 34}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-clip">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_55%,rgba(201,242,69,0.10),transparent_70%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 pt-16 lg:pt-10">
          <MachineView pose="progress" progress={progress} yaw={-0.5} fill={0.56} />
        </div>

        <div className="relative px-6 pt-28 md:px-12 lg:pt-32">
          <h2 className="max-w-md text-3xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">{title}</h2>
        </div>

        {/* Desktop: words appear at points around the machine */}
        <ul className="absolute inset-0 hidden lg:block">
          {items.map((g, i) => {
            const s = slot(i);
            return (
              <li
                key={g}
                ref={(el) => { nodes.current[i] = el; }}
                className="absolute opacity-0 will-change-transform"
                style={{ top: `${s.top}%`, [s.left ? "left" : "right"]: `${s.off}%` }}
              >
                <span className={`flex items-center gap-3 rounded-full border px-4 py-2.5 text-base font-medium backdrop-blur-md transition-colors duration-500 ${i === active ? "border-lime bg-lime text-forest-950" : "border-white/15 bg-white/[0.07] text-white"}`}>
                  <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${i === active ? "bg-forest-950 text-lime" : "bg-lime text-forest-950"}`}><Check className="h-3 w-3" /></span>
                  {g}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Mobile / tablet: one word at a time, below the machine. The full list stays readable by screen readers. */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-10 lg:hidden">
          <p className="text-xs font-semibold tabular-nums tracking-widest text-lime">{String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</p>
          <p key={active} aria-hidden className="mt-2 min-h-[2.4em] text-2xl font-semibold leading-tight tracking-[-0.03em] [animation:rise_0.5s_cubic-bezier(0.2,0.7,0.2,1)_both]">{items[active]}</p>
          <ul className="sr-only">{items.map((g) => <li key={g}>{g}</li>)}</ul>
        </div>

        <div aria-hidden className="absolute inset-x-6 bottom-4 hidden h-[2px] overflow-hidden rounded-full bg-white/15 md:inset-x-12 lg:block">
          <span ref={bar} className="block h-full w-full origin-left scale-x-0 bg-lime" />
        </div>
      </div>
    </section>
  );
}
