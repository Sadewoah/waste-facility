import { getT } from "@/lib/i18n/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionHead, wrap } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Media } from "@/components/Media";
import { BusinessTabs } from "@/components/BusinessTabs";
import { CTA } from "@/components/CTA";
import { WhatYouGet } from "@/components/WhatYouGet";
import { TraceChain } from "@/components/TraceChain";
import { ArrowDownRight, Bin, Cog, Loop, Tag, Truck } from "@/components/Icons";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getT())("Solution") };
}

const provide = [
  { i: Bin, m: "group-hover:-rotate-12 group-hover:scale-110", t: "SOMYA Bin System", d: "Dedicated bins provided according to the client's organic waste generation and operational requirements." },
  { i: Truck, m: "group-hover:translate-x-1.5", t: "Organic Waste Collection", d: "Filled bins are collected according to the agreed schedule." },
  { i: Bin, m: "group-hover:-rotate-12 group-hover:scale-110", t: "Clean Bin Replacement", d: "Collected bins are exchanged with clean SOMYA Bins." },
  { i: Truck, m: "group-hover:translate-x-1.5", t: "Transportation", d: "Organic waste is transported to the SOMYA Waste Facility." },
  { i: Cog, m: "group-hover:rotate-180", t: "Organic Waste Processing", d: "Organic waste goes through Rapid Digester processing and downstream treatment." },
  { i: Loop, m: "group-hover:rotate-180", t: "Compost Return", d: "Finished compost can be prepared for delivery or handover to the client according to the agreed arrangement." },
];

const accept = [
  { t: "Food Waste", kind: "bins" as const },
  { t: "Yard / Green Waste", kind: "canopy" as const },
  { t: "Animal Waste", kind: "windrows" as const },
  { t: "Certified Compostable Tableware", kind: "pads" as const },
];

const journey = [
  { t: "Provision of SOMYA Bins", d: "Bins are provided based on client waste generation and operational requirements." },
  { t: "Daily Collection & Replacement", d: "Filled bins are collected using SOMYA Pickup and replaced with clean bins." },
  { t: "Transportation", d: "Collected organic waste is transported to the SOMYA Waste Facility in Denpasar." },
  { t: "Rapid Digester", d: "Organic waste is processed using the Rapid Digester in approximately 8 hours." },
  { t: "Pre-Compost", d: "The Rapid Digester output is classified as Pre-Compost." },
  { t: "Client Labeling", d: "The material is identified with the relevant client identification for traceability." },
  { t: "Curing", d: "Pre-Compost undergoes a curing process for approximately 1 week." },
  { t: "Bio-Activator Treatment", d: "The compost material receives bio-activator treatment for approximately 1 week as part of the finishing process." },
  { t: "Packaging", d: "Completed compost is packaged according to the agreed specification." },
  { t: "Ready for Client", d: "Finished compost is prepared for delivery or handover." },
  { t: "Utilization", d: "Possible utilization includes client gardens and landscaping, farmers (subject to applicable arrangements and regulations), government programs, and CSR programs." },
];

const chain = ["Client", "Bin / Collection", "Facility", "Processing", "Client Labeling", "Curing", "Finishing", "Compost Output"];

const get = ["Dedicated SOMYA Bins", "Agreed collection schedule", "Clean-bin replacement", "SOMYA Pickup transportation", "Organic waste processing", "Client traceability", "Curing & finishing", "Packaging", "Compost return / handover", "Operational support", "Potential reporting / data visibility"];

const faq = [
  ["What type of organic waste can I send?", "Use only approved and source-separated materials that meet SOMYA Waste Facility requirements."],
  ["How often is waste collected?", "The collection schedule is mutually agreed with each client."],
  ["How many SOMYA Bins will we receive?", "The number of bins depends on actual organic waste generation and operational requirements."],
  ["What happens after collection?", "The waste is transported to the facility for sorting / processing and then continues through the Rapid Digester and downstream process."],
  ["How long does the Rapid Digester process take?", "Approximately 8 hours under standard operating conditions."],
  ["What is Pre-Compost?", "Pre-Compost is the output of the Rapid Digester before the downstream curing and finishing stages."],
  ["Can we get the compost back?", "Finished compost can be prepared for delivery or handover according to the applicable service agreement."],
  ["Can the compost be used for landscaping?", "Yes, utilization may include client gardens and landscaping, subject to the agreed arrangement and applicable requirements."],
  ["Can the system support data reporting?", "The project is designed to support transparent data reporting for clients, partners, and stakeholders."],
];

export default async function SolutionPage() {
  const t = await getT();
  return (
    <>
      <PageHero ghost={t("SOLUTION")} kind="windrows" seed={21} name="page-solution" title={t("Your waste. Our process. A shared impact.")} copy={t("From collection to processing and compost return, SOMYA Waste Facility provides an integrated system for managing source-separated organic waste.")} cta={t("Talk to our team")} />


      <section className={`${wrap} mt-28 text-center lg:text-left`}>
        <SectionHead title={t("What we provide.")} copy={t("Six services that work as one, from the first bin to the compost handover.")} />
        <ul className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pt-2 scrollbar-none md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0">
          {provide.map((p, k) => (
            <li 
              key={p.t}
              className="w-[85vw] min-w-[300px] flex-shrink-0 snap-center md:w-auto md:min-w-0 md:flex-shrink"
            >
              <Reveal delay={(k % 3) * 80} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-2xl bg-lime p-7 transition-transform duration-500 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  {/* Lingkaran yang membesar dari ikon */}
                  <span
                    aria-hidden
                    className="absolute left-[3.125rem] top-[3.125rem] h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest-900 transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[20] motion-reduce:transition-none"
                  />

                  <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-forest-900">
                    <span className={`block transition-transform duration-700 ease-out motion-reduce:transition-none ${p.m}`}>
                      <p.i className="h-[18px] w-[18px]" />
                    </span>
                  </span>

                  <span
                    aria-hidden
                    className="absolute right-6 top-6 z-10 grid h-9 w-9 place-items-center rounded-full border border-forest-900/20 text-forest-900 transition-all duration-500 group-hover:-rotate-90 group-hover:border-lime group-hover:bg-lime group-hover:text-forest-950 motion-reduce:transition-none"
                  >
                    <ArrowDownRight className="h-4 w-4" />
                  </span>

                  <div className="relative z-10">
                    <h3 className="mt-12 text-2xl font-medium tracking-[-0.03em] transition-colors duration-500 group-hover:text-white">{t(p.t)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-forest-900/75 transition-colors duration-500 group-hover:text-white/75">{t(p.d)}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 2: Built around source-separated organic waste (Scroll X di Mobile) */}
      <section className={`${wrap} mt-28`}>
        <SectionHead title={t("Built around source-separated organic waste.")} copy={t("The waste streams below come from the facility planning material.")} />
        <ul className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pt-2 scrollbar-none sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0">
          {accept.map((a, k) => (
            <li 
              key={a.t} 
              className="relative h-64 w-[80vw] min-w-[260px] flex-shrink-0 snap-center overflow-hidden rounded-2xl sm:w-auto sm:min-w-0 sm:flex-shrink"
            >
              <Media kind={a.kind} seed={50 + k} className="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 to-transparent" />
              <h3 className="absolute inset-x-0 bottom-0 p-5 text-xl font-semibold leading-tight tracking-[-0.02em] text-white">{t(a.t)}</h3>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs text-mute">{t("Accepted materials are subject to SOMYA Waste Facility waste acceptance requirements and operational conditions.")}</p>
      </section>

<section className={`${wrap} mt-28`}>
  <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
    <div className="md:sticky md:top-28 md:self-start">
      <h2 className="text-3xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">{t("Our process, step by step.")}</h2>
      <p className="mt-5 max-w-sm text-sm leading-relaxed text-mute">{t("Processing durations are standard operational targets and may be adjusted based on material condition, operational circumstances, and quality-control requirements.")}</p>
    </div>

    <div className="min-w-0">
      {/* Wrapper scroll:
          - Mobile  : scroll-x (swipe), tidak memanjang ke bawah
          - Desktop : tinggi dibatasi (~3-4 step terlihat), scroll-y + fade di bawah */}
      <div
        className="
          -mx-5 overflow-x-auto px-5 scrollbar-none
          md:mx-0 md:max-h-[440px] md:snap-y md:overflow-y-auto md:overflow-x-hidden md:px-0 md:pr-3
          md:[scrollbar-width:thin]
          md:[mask-image:linear-gradient(to_bottom,black_88%,transparent)]
        "
        tabIndex={0}
        aria-label={t("Our process, step by step.")}
      >
        <ol
          className="
            relative flex snap-x snap-mandatory gap-4 pb-4
            md:block md:snap-none md:space-y-3 md:pb-12
            before:hidden md:before:block md:before:absolute md:before:bottom-6 md:before:left-[27px] md:before:top-6 md:before:w-px md:before:bg-forest-800/15
          "
        >
          {journey.map((s, k) => (
            <li
              key={s.t}
              className="w-[78vw] min-w-[270px] shrink-0 snap-center md:w-auto md:min-w-0 md:shrink md:snap-start"
            >
              <div className="relative flex h-full gap-5 rounded-2xl bg-lime-soft p-5">
                <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lime text-sm font-bold text-forest-950">
                  {k + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.02em]">{t(s.t)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mute">{t(s.d)}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Hint hanya di mobile */}
      <p className="mt-2 text-xs text-mute md:hidden">
        {t("Swipe to see all steps")} →
      </p>
    </div>
  </div>
</section>

      <TraceChain />

      <section className={`${wrap} mt-28`}>
        <SectionHead title={t("Solutions by business type.")} />
        <BusinessTabs />
      </section>

      <WhatYouGet title={t("What you get.")} items={get.map((g) => t(g))} />

      <section className={`${wrap} mt-28`}>
        <SectionHead title={t("Frequently asked questions.")} />
        <div className="mt-12 space-y-2">
          {faq.map(([q, a]) => (
            <details key={q} className="group rounded-2xl bg-lime-soft px-6 py-5 open:bg-lime">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium tracking-[-0.02em] [&::-webkit-details-marker]:hidden">
                {t(q)}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white transition-transform duration-300 group-open:rotate-45">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-forest-900/80">{t(a)}</p>
            </details>
          ))}
        </div>
      </section>

      <CTA headline={t("Let's start with your waste.")} copy={t("Tell us about your business and organic waste volume, and we'll find the right service approach.")} />
    </>
  );
}
