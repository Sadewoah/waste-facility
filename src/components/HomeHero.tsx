import { Media } from "./Media";
import { ButtonLink } from "./Button";
import { Em } from "./PageHero";
import { HeroScene } from "./HeroScene";
import { primaryCta } from "@/lib/site";
import { getT } from "@/lib/i18n/server";

const d = (i: number) => ({ ["--i" as string]: i });

export async function HomeHero() {
  const t = await getT();
  const stats = [
    ["13", t("connected steps, bin to utilization")],
    [t("10,000 kg"), t("proposed daily capacity")],
    ["Q3–Q4 2026", t("proposed launch")],
  ];
  return (
    <section className="relative mx-3 mt-3 min-h-[100svh] overflow-hidden rounded-[28px] bg-forest-900 text-white">
    <img
      src="/images/bg/hero-bg.png"
      alt={t("Aerial view of a composting facility among forested Bali hills")}
      className="absolute inset-0 h-full w-full object-cover"
    />      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/50 to-forest-950/5" />
      <p aria-hidden className="pointer-events-none absolute inset-x-0 top-24 z-[5] select-none whitespace-nowrap text-center text-[min(24vw,26rem)] font-bold leading-none tracking-[-0.04em] text-forest-950/40 [mask-image:linear-gradient(to_bottom,black_25%,transparent_80%)]">SOMYA</p>

      {/* Mobile / tablet order: title -> paragraph -> 3D model -> buttons -> stats. Desktop: 3D model is an overlay behind the copy. */}
      <div className="relative z-[7] flex min-h-[100svh] flex-col justify-start px-6 pb-10 pt-28 md:px-12 md:pb-14 lg:justify-end lg:pt-40">
        <div className="grid items-end gap-10 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <p className="rise glass mb-6 inline-flex items-center gap-2 rounded-full py-1.5 pl-2 pr-4 text-xs font-medium" style={d(0)}>
              <span className="grid h-5 w-5 place-items-center rounded-full bg-lime"><span className="h-1.5 w-1.5 rounded-full bg-forest-950" /></span>
              Denpasar, Bali
            </p>
            <h1 className="rise mt-2 lg:text-left md:text-left text-[2rem] text-center font-semibold leading-[1] tracking-[-0.04em] sm:text-6xl md:text-[5rem]" style={d(1)}>
              {t("Turn organic waste")}</h1>
            <h1 className="rise text-[1.7rem] text-center lg:text-left md:text-leftfont-semibold leading-[1] tracking-[-0.04em] sm:text-6xl md:text-[5rem]" style={d(1)}>
              {t("into something")} <Em>{t("valuable.")}</Em>
            </h1>
            <p className="rise mt-4 text-center lg:text-left md:text-left max-w-lg text-sm leading-relaxed text-white/85 md:text-base" style={d(2)}>
              {t("SOMYA Waste Facility provides an integrated organic waste management service, from dedicated bins and collection to processing, traceability, curing, and compost return.")}
            </p>
            <HeroScene />
            <div className="rise flex flex-col gap-3 sm:flex-row lg:mt-8" style={d(3)}>
              <ButtonLink href="/contact">{t(primaryCta)}</ButtonLink>
              <ButtonLink href="/solution" variant="ghost">{t("Explore our solution")}</ButtonLink>
            </div>
          </div>

          <div className="rise" style={d(4)}>
            <div className="grid grid-cols-2 gap-3">
              <div className="glass rounded-2xl p-5">
                <p className="text-4xl font-semibold tracking-[-0.04em]">{t("≈ 8 hrs")}</p>
                <p className="mt-6 text-xs leading-snug text-white/80">{t("Rapid Digester processing time")}</p>
              </div>
              <div className="glass rounded-2xl p-5">
                <p className="text-4xl font-semibold tracking-[-0.04em]">{t("≈ 1 wk")}</p>
                <p className="mt-6 text-xs leading-snug text-white/80">{t("Curing, then another week of bio-activator treatment")}</p>
              </div>
            </div>
            <dl className="mt-6 grid grid-cols-3 gap-2 text-center">
              {stats.map(([v, l]) => (
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
