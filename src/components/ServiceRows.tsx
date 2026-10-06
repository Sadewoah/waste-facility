"use client";
import { useState } from "react";
import { services } from "@/lib/content";
import { Media } from "./Media";
import { ArrowDownRight, Bin, Cog, Loop, Tag, Truck } from "./Icons";
import { SectionHead, wrap } from "./Section";

const icons = { bin: Bin, truck: Truck, cog: Cog, tag: Tag, loop: Loop };

export function ServiceRows() {
  const [active, setActive] = useState(0);
  return (
    <section className={`${wrap} mt-28`}>
      <SectionHead title="A complete organic waste journey." copy="Five connected services, from the bin at your door to compost that goes back to work." />
      <ul className="mt-12 space-y-3">
        {services.map((s, i) => {
          const Icon = icons[s.icon as keyof typeof icons];
          const on = i === active;
          return (
            <li key={s.title} onMouseEnter={() => setActive(i)} className={`relative rounded-2xl transition-colors duration-500 ${on ? "bg-lime" : "bg-lime-soft"}`}>
              <button onClick={() => setActive(i)} onFocus={() => setActive(i)} aria-expanded={on} className="grid w-full grid-cols-[auto_1fr] items-center gap-x-5 gap-y-3 px-5 py-5 text-left md:grid-cols-[auto_minmax(0,1.1fr)_minmax(0,1fr)] md:px-6">
                <span className="flex items-center gap-2">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-forest-900"><Icon className="h-[18px] w-[18px]" /></span>
                  <span className={`hidden h-9 w-9 place-items-center rounded-full sm:grid ${on ? "bg-white/50" : ""}`}><ArrowDownRight className="h-4 w-4" /></span>
                </span>
                <span>
                  <span className="block text-2xl font-medium tracking-[-0.03em] md:text-3xl">{s.title}</span>
                  <span className={`grid transition-all duration-500 ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <span className="overflow-hidden"><span className="mt-2 block max-w-[300px] text-sm leading-relaxed text-forest-900/80">{s.text}</span></span>
                  </span>
                </span>
                <ul className="col-span-2 space-y-1 text-xs leading-relaxed text-forest-900/75 md:col-span-1 md:pl-24">
                  {s.bullets.map((b) => <li key={b} className="flex gap-2"><span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-current" />{b}</li>)}
                </ul>
              </button>
              <div aria-hidden className={`pointer-events-none absolute right-[37%] top-1/2 hidden h-36 w-28 -translate-y-1/2 -rotate-6 overflow-hidden rounded-2xl border-4 border-white/70 shadow-xl transition-all duration-500 md:block ${on ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}>
                <Media kind={s.kind} seed={20 + i} className="h-full w-full" />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
