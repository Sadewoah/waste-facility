import { Media } from "./Media";
import { ButtonLink } from "./Button";
import { Em } from "./PageHero";
import { primaryCta } from "@/lib/site";

const d = (i: number) => ({ ["--i" as string]: i });

export function HomeHero() {
  return (
    <section className="relative mx-3 mt-3 min-h-[100svh] overflow-hidden rounded-[28px] bg-forest-900 text-white">
      <Media kind="hills" seed={5} name="hero" alt="Aerial view of a composting facility among forested Bali hills" className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/50 to-forest-950/5" />
      <p aria-hidden className="pointer-events-none absolute inset-x-0 top-24 select-none whitespace-nowrap text-center text-[26vw] font-extrabold leading-none tracking-tighter text-white/40 [mask-image:linear-gradient(to_bottom,black_25%,transparent_80%)] md:text-[19vw]">CIRCULAR</p>

      <div className="relative flex min-h-[100svh] flex-col justify-end px-6 pb-10 pt-40 md:px-12 md:pb-14">
        <div className="grid items-end gap-10 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <p className="rise glass mb-6 inline-flex items-center gap-2 rounded-full py-1.5 pl-2 pr-4 text-xs font-medium" style={d(0)}>
              <span className="grid h-5 w-5 place-items-center rounded-full bg-lime"><span className="h-1.5 w-1.5 rounded-full bg-forest-950" /></span>
              Denpasar, Bali
            </p>
            <h1 className="rise text-[2.6rem] font-semibold leading-[1] tracking-[-0.04em] sm:text-6xl md:text-[5.2rem]" style={d(1)}>
              Turn organic waste into something <Em>valuable.</Em>
            </h1>
            <p className="rise mt-6 max-w-lg text-sm leading-relaxed text-white/85 md:text-base" style={d(2)}>
              SOMYA Waste Facility provides an integrated organic waste management service, from dedicated bins and collection to processing, traceability, curing, and compost return.
            </p>
            <div className="rise mt-8 flex flex-col gap-3 sm:flex-row" style={d(3)}>
              <ButtonLink href="/contact">{primaryCta}</ButtonLink>
              <ButtonLink href="/solution" variant="ghost">Explore our solution</ButtonLink>
            </div>
          </div>

          <div className="rise" style={d(4)}>
            <div className="grid grid-cols-2 gap-3">
              <div className="glass rounded-2xl p-5">
                <p className="text-4xl font-semibold tracking-[-0.04em]">≈ 8 hrs</p>
                <p className="mt-6 text-xs leading-snug text-white/80">Rapid Digester processing time</p>
              </div>
              <div className="glass rounded-2xl p-5">
                <p className="text-4xl font-semibold tracking-[-0.04em]">≈ 1 wk</p>
                <p className="mt-6 text-xs leading-snug text-white/80">Curing, then another week of bio-activator treatment</p>
              </div>
            </div>
            <dl className="mt-6 grid grid-cols-3 gap-2 text-center">
              {[["13", "connected steps, bin to utilization"], ["10,000 kg", "proposed daily capacity"], ["Q3–Q4 2026", "proposed launch"]].map(([v, l]) => (
                <div key={l} className="border-l border-white/20 first:border-0">
                  <dt className="text-lg font-semibold tracking-tight md:text-xl">{v}</dt>
                  <dd className="mt-1 text-[11px] leading-tight text-white/65">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
