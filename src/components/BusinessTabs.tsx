"use client";
import { useState } from "react";
import { Media, type MediaKind } from "./Media";

const tabs: { t: string; d: string; kind: MediaKind }[] = [
  { t: "Hospitality", d: "Hotels, resorts, villas, and tourism properties with recurring organic waste generation.", kind: "pads" },
  { t: "Food & Beverage", d: "Restaurants, cafés, beach clubs, catering businesses, and food-service operators.", kind: "bins" },
  { t: "Events", d: "Event organizers and venues that need structured organic waste handling.", kind: "pile" },
  { t: "Landscaping", d: "Green waste and garden maintenance operations.", kind: "canopy" },
  { t: "Commercial", d: "Commercial properties and business facilities.", kind: "windrows" },
  { t: "Community / Public Sector", d: "Government, village, community, and CSR-related organic waste programs.", kind: "soil" },
];

export function BusinessTabs() {
  const [i, setI] = useState(0);
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-[320px_1fr]">
      <div role="tablist" aria-label="Business types" className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible no-scrollbar">
        {tabs.map((x, k) => (
          <button key={x.t} role="tab" id={`tab-${k}`} aria-selected={k === i} aria-controls="tab-panel" onClick={() => setI(k)} className={`shrink-0 rounded-xl px-5 py-4 text-left text-lg font-medium tracking-[-0.02em] transition-colors md:text-xl ${k === i ? "bg-lime" : "bg-lime-soft hover:bg-lime/50"}`}>
            {x.t}
          </button>
        ))}
      </div>
      <div id="tab-panel" role="tabpanel" aria-labelledby={`tab-${i}`} className="relative min-h-[360px] overflow-hidden rounded-2xl">
        <Media kind={tabs[i].kind} seed={40 + i} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 to-transparent" />
        <div className="relative flex h-full min-h-[360px] flex-col justify-end p-7 text-white md:p-10">
          <h3 className="text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{tabs[i].t}</h3>
          <p className="mt-3 max-w-md text-base leading-relaxed text-white/85">{tabs[i].d}</p>
        </div>
      </div>
    </div>
  );
}
