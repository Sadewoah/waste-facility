"use client";
import { useLocale, useT } from "@/lib/i18n/client";
import { useEffect, useRef, useState } from "react";
import { impact } from "@/lib/content";
import { wrap } from "./Section";

function Counter({ value, unit }: { value: number | null; unit: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const locale = useLocale();
  useEffect(() => {
    if (value === null || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - t0) / 1400, 1);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <span ref={ref} className="text-6xl font-semibold tracking-[-0.05em] md:text-7xl">
      {value === null ? "XX" : n.toLocaleString(locale === "id" ? "id-ID" : "en-US")}
      {unit && <span className="ml-1.5 text-2xl font-medium tracking-tight text-forest-800/60">{unit}</span>}
    </span>
  );
}

export function Impact() {
  const t = useT();
  return (
    <section className={`${wrap} mt-28`}>
      <h2 className="text-3xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">{t("Measure the difference.")}</h2>
      
      <dl className="no-scrollbar mt-12 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-4">
        {impact.map((m) => (
          <div 
            key={m.label} 
            className="snap-start flex min-h-[220px] w-[85vw] max-w-[280px] shrink-0 flex-col justify-between rounded-2xl bg-lime-soft p-7 md:w-auto"
          >
            <dd><Counter value={m.value} unit={m.unit} /></dd>
            <dt className="text-sm font-medium text-mute">{t(m.label)}</dt>
          </div>
        ))}
      </dl>
      
      <p className="mt-5 text-xs text-mute">{t("Impact figures should be connected to verified operational data before launch.")}</p>
    </section>
  );
}