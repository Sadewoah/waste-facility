import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { SectionHead, wrap } from "./Section";

const panels = [
  { kind: "pile" as const, name: "challenge-problem", seed: 11, tag: "Stored, mixed, sent to landfill", alt: "Mixed organic waste and overflowing bins" },
  { kind: "bins" as const, name: "challenge-bins", seed: 12, tag: "Source-separated in SOMYA Bins", alt: "Clean SOMYA Bins viewed from above" },
  { kind: "soil" as const, name: "challenge-compost", seed: 13, tag: "Returned as compost", alt: "Compost and soil with new growth" },
];

export function Challenge() {
  return (
    <section className={`${wrap} mt-28`}>
      <SectionHead
        title={<>Organic waste should have a better next step.</>}
        copy={<><p>Organic waste can create operational problems when it is stored, mixed, or sent directly to landfill.</p><p className="mt-3">SOMYA Waste Facility creates a structured path for source-separated organic waste, helping businesses manage collection, processing, traceability, and recovery through one integrated system.</p></>}
      />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {panels.map((p, i) => (
          <Reveal key={p.name} delay={i * 90}>
            <div className="relative h-[380px] overflow-hidden rounded-2xl md:h-[440px]">
              <Media kind={p.kind} seed={p.seed} name={p.name} alt={p.alt} className="h-full w-full" />
              <span className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-forest-950/60 px-3.5 py-1.5 backdrop-blur-md text-xs font-medium text-white">{p.tag}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
