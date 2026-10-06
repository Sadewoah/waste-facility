import { Media } from "./Media";
import { ButtonLink } from "./Button";
import { primaryCta } from "@/lib/site";

export function CTA({ headline, copy, label = primaryCta, href = "/contact" }: { headline: string; copy?: string; label?: string; href?: string }) {
  return (
    <section className="mx-3 mt-24">
      <div className="relative overflow-hidden rounded-[28px] bg-forest-900 text-white">
        <Media kind="canopy" seed={7} name="cta" className="absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-forest-950/55" />
        <div className="relative mx-auto flex max-w-[900px] flex-col items-center px-6 py-20 text-center md:py-28">
          <h2 className="text-3xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">{headline}</h2>
          {copy && <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">{copy}</p>}
          <ButtonLink href={href} className="mt-9 w-full sm:w-auto">{label}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
