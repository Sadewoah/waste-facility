"use client";
import { useT } from "@/lib/i18n/client";
import { useEffect, useRef, useState } from "react";
import { Check } from "./Icons";

const chain = [
  { t: "Client", d: "The journey is tied to your business." },
  { t: "Bin / Collection", d: "Filled bins are collected on schedule." },
  { t: "Facility", d: "Waste arrives at the Denpasar facility." },
  { t: "Processing", d: "Rapid Digester, approximately 8 hours." },
  { t: "Client Labeling", d: "Pre-Compost is labeled by client." },
  { t: "Curing", d: "Approximately 1 week." },
  { t: "Finishing", d: "Bio-activator treatment, then packaging." },
  { t: "Compost Output", d: "Ready for delivery or handover." },
];

export function TraceChain() {
  const t = useT();
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const last = chain.length - 1;
  const progress = active / last;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-advance; hold on the last step a bit longer, then restart
  useEffect(() => {
    if (!inView || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setActive((a) => (a === last ? 0 : a + 1)), active === last ? 2800 : 1600);
    return () => clearTimeout(t);
  }, [active, inView, paused, last]);

  return (
    <section
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="mx-3 mt-28 overflow-hidden rounded-[28px] bg-forest-900 px-6 py-16 text-white md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <h2 className="max-w-2xl text-3xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">{t("Know where your waste goes.")}</h2>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/70">{t("Each client journey is identifiable from collection through processing and output.")}</p>

        <ol className="relative mt-14 grid gap-7 lg:grid-cols-8 lg:gap-2 lg:pt-14">
          {/* Horizontal track (desktop) */}
          <span aria-hidden className="absolute left-[6.25%] right-[6.25%] top-[calc(3.5rem+1.25rem)] hidden h-px bg-white/15 lg:block" />
          <span aria-hidden className="absolute left-[6.25%] top-[calc(3.5rem+1.25rem)] hidden h-px bg-lime transition-[width] duration-700 ease-out lg:block" style={{ width: `${progress * 87.5}%` }} />
          {/* Vertical track (mobile) */}
          <span aria-hidden className="absolute bottom-5 left-5 top-5 w-px bg-white/15 lg:hidden" />
          <span aria-hidden className="absolute left-5 top-5 w-px bg-lime transition-[height] duration-700 ease-out lg:hidden" style={{ height: `calc((100% - 2.5rem) * ${progress})` }} />

          {/* Traveling label (desktop) */}
          <span aria-hidden className="absolute top-3 hidden -translate-x-1/2 transition-[left] duration-700 ease-out lg:block" style={{ left: `${6.25 + progress * 87.5}%` }}>
            <span className="relative block whitespace-nowrap rounded-full bg-lime px-3 py-1.5 text-xs font-bold text-forest-950">
              {t("Your batch")}
              <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-lime" />
            </span>
          </span>

          {chain.map((c, k) => {
            const done = k < active;
            const on = k === active;
            const reached = k <= active;
            return (
              <li key={c.t} aria-current={on ? "step" : undefined} className="relative flex items-start gap-4 lg:flex-col lg:items-center lg:gap-5 lg:text-center">
                <button onClick={() => setActive(k)} aria-label={t("Show {name}", { name: t(c.t) })} className="relative z-10 shrink-0 rounded-full">
                  {on && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-lime/50 motion-reduce:hidden" />}
                  <span className={`relative grid h-10 w-10 place-items-center rounded-full border text-sm font-bold transition-all duration-500 ${reached ? "border-lime bg-lime text-forest-950" : "border-white/25 bg-forest-900 text-white/60"} ${on ? "scale-110" : ""}`}>
                    {done ? <Check className="h-4 w-4" /> : k + 1}
                  </span>
                </button>
                <div className={`pt-1.5 transition-opacity duration-500 lg:pt-0 ${reached ? "opacity-100" : "opacity-45"}`}>
                  <p className="text-lg font-semibold leading-tight tracking-[-0.02em]">{t(c.t)}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/65">{t(c.d)}</p>
                  {on && <span className="mt-3 inline-block rounded-full bg-lime px-2.5 py-1 text-[11px] font-bold text-forest-950 lg:hidden">{t("Your batch is here")}</span>}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}