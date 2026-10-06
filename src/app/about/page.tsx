import type { Metadata } from "next";
import { PageHero, Em } from "@/components/PageHero";
import { SectionHead, wrap } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = { title: "About Us" };

const beliefs = [
  { t: "Circularity", d: "Turn organic waste into a resource that can return to productive use." },
  { t: "Transparency", d: "Create visibility from collection to processing and output." },
  { t: "Responsibility", d: "Build better waste-handling practices through source separation and operational discipline." },
  { t: "Local impact", d: "Support local employment, agriculture, landscaping, community programs, and Bali's environmental goals." },
];
const approach = ["Collection infrastructure", "Bin management", "Transportation", "Processing", "Traceability", "Curing and finishing", "Compost utilization", "Client support", "Data / reporting potential"];
const facility = ["Receiving", "Weighing / Identification", "Sorting & Contamination Removal", "Shredding / Mixing", "Processing", "Curing", "Finishing / Packaging", "Storage / Distribution"];

export default function AboutPage() {
  return (
    <>
      <PageHero ghost="BALI" kind="canopy" seed={31} name="page-about" title={<>Building a more <Em>circular</Em> Bali.</>} copy="SOMYA Waste Facility is built around a simple idea: organic waste should be managed as a resource, not treated as something that simply disappears." />

      <section className={`${wrap} mt-28`}>
        <SectionHead
          title="The journey doesn't end when waste is collected."
          copy={<><p>Collection is only one part of waste management.</p><p className="mt-3">SOMYA Waste Facility connects collection, transportation, processing, traceability, curing, finishing, and utilization into one integrated organic waste recovery system.</p><p className="mt-3">The goal is to create a practical and transparent pathway for source-separated organic waste while reducing dependence on landfill and unmanaged disposal.</p></>}
        />
      </section>

      <section className="mx-3 mt-28 rounded-[28px] bg-forest-900 px-6 py-20 text-white md:px-12 md:py-28">
        <div className="mx-auto max-w-[1000px]">
          <p className="text-sm text-lime">Our vision</p>
          <blockquote className="mt-6 text-2xl font-medium leading-[1.2] tracking-[-0.03em] sm:text-4xl md:text-5xl">
            To establish a scalable, transparent, and locally integrated organic waste recovery facility that supports Bali&apos;s transition away from landfill dependency and toward a circular organic waste system.
          </blockquote>
        </div>
      </section>

      <section className={`${wrap} mt-28`}>
        <SectionHead title="What we believe." />
        <ul className="mt-12 grid gap-3 sm:grid-cols-2">
          {beliefs.map((b, k) => (
            <li key={b.t}>
              <Reveal delay={(k % 2) * 80} className="h-full">
                <div className="flex h-full min-h-[240px] flex-col justify-between rounded-2xl bg-lime-soft p-8">
                  <h3 className="text-3xl font-medium tracking-[-0.03em]">{b.t}</h3>
                  <p className="max-w-sm text-sm leading-relaxed text-mute">{b.d}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${wrap} mt-28`}>
        <SectionHead title="A system designed for real-world operations." copy="The Waste Facility combines these parts into one service." />
        <ul className="mt-12 flex flex-wrap gap-3">
          {approach.map((a) => <li key={a} className="rounded-full bg-lime-soft px-5 py-3 text-sm font-medium">{a}</li>)}
        </ul>
      </section>

      <section className={`${wrap} mt-28`}>
        <SectionHead title="From receiving to resource recovery." copy="The facility journey, step by step." />
        <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {facility.map((f, k) => (
            <li key={f} className="flex min-h-[150px] flex-col justify-between rounded-2xl bg-lime-soft p-6">
              <span className="text-3xl font-light tracking-tighter text-forest-700">{String(k + 1).padStart(2, "0")}</span>
              <p className="text-lg font-semibold leading-tight tracking-[-0.02em]">{f}</p>
            </li>
          ))}
        </ol>
        <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-lime p-6 sm:flex-row sm:items-center">
          <span className="w-fit shrink-0 rounded-full bg-forest-950 px-3 py-1 text-xs font-bold text-lime">Proposed</span>
          <p className="text-sm leading-relaxed text-forest-950">The facility planning material describes a proposed 10,000 kg/day composting facility on a 3,000 sqm site in Bali, with a proposed launch in Q3–Q4 2026.</p>
        </div>
      </section>

      <section className={`${wrap} mt-28`}>
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <h2 className="text-3xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">Starting in Bali. Built to scale.</h2>
          <div className="space-y-4 text-sm leading-relaxed text-mute">
            <p>Develop a scalable organic waste recovery model that can be replicated in other regions across Indonesia.</p>
            <p>The long-term vision is not only to process more waste, but to build a more connected circular system between businesses, communities, agriculture, and environmental initiatives.</p>
          </div>
        </div>
      </section>

      <CTA headline="Let's build a better waste system together." label="Talk to our team" />
    </>
  );
}
