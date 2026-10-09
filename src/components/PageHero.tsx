import { Media, type MediaKind } from "./Media";
import { ButtonLink } from "./Button";

export function PageHero({ ghost, title, copy, kind = "hills", seed = 3, name, cta, href = "/contact" }: { ghost: string; title: React.ReactNode; copy: string; kind?: MediaKind; seed?: number; name?: string; cta?: string; href?: string }) {
  return (
    <section className="relative mx-3 mt-3 min-h-[85svh] overflow-hidden rounded-[28px] bg-forest-900 text-white">
      <Media kind={kind} seed={seed} name={name} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/25 to-forest-950/10" />
      <div className="relative flex min-h-[78svh] flex-col justify-end px-6 pb-12 pt-40 md:px-12 md:pb-16">
        <h1 className="rise max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl md:text-7xl" style={{ ["--i" as string]: 0 }}>{title}</h1>
        <p className="rise mt-6 max-w-xl text-base leading-relaxed text-white/85" style={{ ["--i" as string]: 1 }}>{copy}</p>
        {cta && <div className="rise mt-8" style={{ ["--i" as string]: 2 }}><ButtonLink href={href} className="w-full sm:w-auto">{cta}</ButtonLink></div>}
      </div>
    </section>
  );
}

export const Em = ({ children }: { children: React.ReactNode }) => <em className="font-light italic tracking-[-0.03em]">{children}</em>;
