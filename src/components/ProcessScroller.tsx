"use client";
import { useT } from "@/lib/i18n/client";
import { useRef } from "react";
import { steps } from "@/lib/content";
import { ArrowRight } from "./Icons";

export function ProcessScroller() {
  const ref = useRef<HTMLOListElement>(null);
  const t = useT();
  const go = (dir: number) => ref.current?.scrollBy({ left: dir * 300, behavior: "smooth" });

  return (
    <section className="mx-3 mt-28 overflow-hidden rounded-[28px] bg-forest-900 py-16 text-white md:py-24">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm text-lime">{t("From waste to resource")}</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">{t("One system. Every step connected.")}</h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <button onClick={() => go(-1)} aria-label={t("Previous steps")} className="grid h-12 w-12 rotate-180 place-items-center rounded-full border border-white/25 hover:bg-white/10"><ArrowRight /></button>
            <button onClick={() => go(1)} aria-label={t("Next steps")} className="grid h-12 w-12 place-items-center rounded-full bg-lime text-forest-950 hover:bg-white"><ArrowRight /></button>
          </div>
        </div>
        
        <ol 
          ref={ref} 
          className="no-scrollbar relative mt-14 flex flex-col gap-3 max-h-[460px] overflow-y-auto snap-y snap-mandatory md:max-h-none md:flex-row md:overflow-y-visible md:overflow-x-auto md:snap-x md:gap-4 md:pb-2"
        >
          {steps.map((s, i) => (
            <li 
              key={s.t} 
              className="snap-start shrink-0 flex min-h-[210px] flex-col justify-between rounded-2xl border border-white/12 bg-white/[0.06] p-6 md:w-[270px]"
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl font-light tracking-tighter text-lime">{String(i + 1).padStart(2, "0")}</span>
                {s.time && <span className="rounded-full bg-lime px-3 py-1 text-xs font-bold text-forest-950">{t(s.time)}</span>}
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold tracking-[-0.02em]">{t(s.t)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{t(s.d)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}