"use client";
import { useEffect, useState } from "react";
import { loop } from "@/lib/content";
import { wrap } from "./Section";

export function LoopRing() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((a) => (a + 1) % loop.length), 2200);
    return () => clearInterval(t);
  }, [paused]);

  const C = 250, R = 190;
  const pos = (i: number) => {
    const a = ((-90 + (360 / loop.length) * i) * Math.PI) / 180;
    return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
  };
  return (
    <section className={`${wrap} mt-28`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="grid items-center gap-12 rounded-[28px] bg-lime-soft p-6 md:grid-cols-2 md:p-14">
        <div className="relative mx-auto aspect-square w-full max-w-[460px]">
          <svg viewBox="0 0 500 500" className="h-full w-full" role="img" aria-label="Circular loop from business to compost and back into the system">
            <g className="origin-center animate-spin-slow" style={{ transformOrigin: "250px 250px" }}>
              <circle cx={C} cy={C} r={R} fill="none" stroke="#124632" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" />
            </g>
            {loop.map((_, i) => {
              const p = pos(i);
              const on = i === active;
              return (
                <g key={i} onClick={() => setActive(i)} className="cursor-pointer">
                  <circle cx={p.x} cy={p.y} r={on ? 26 : 19} fill={on ? "#c9f245" : "#fff"} stroke="#124632" strokeWidth={on ? 2.5 : 1.5} className="transition-all duration-500" />
                  <text x={p.x} y={p.y + 4.5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#06231a">{i + 1}</text>
                </g>
              );
            })}
          </svg>
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="max-w-[190px] text-center">
              <p className="text-xs text-mute">Step {active + 1} of {loop.length}</p>
              <p className="mt-1 text-xl font-semibold leading-tight tracking-[-0.03em]">{loop[active]}</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">Waste doesn&apos;t end here.</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-mute">The journey loops back into the system, so organic waste returns as a resource instead of ending at disposal.</p>
          <ol className="mt-8 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
            {loop.map((l, i) => (
              <li key={l}>
                <button onClick={() => setActive(i)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${i === active ? "bg-lime font-semibold" : "hover:bg-white"}`}>
                  <span className="w-5 text-xs text-forest-800/70">{i + 1}</span>{l}
                </button>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-xs font-medium text-forest-800">Then back into the system.</p>
        </div>
      </div>
    </section>
  );
}
