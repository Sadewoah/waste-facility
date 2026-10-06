import { clients } from "@/lib/content";
import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { SectionHead, wrap } from "./Section";

export function WhoWeServe() {
  return (
    <section className={`${wrap} mt-28`}>
      <SectionHead title="For businesses that generate organic waste." copy="Built for real operations, from a single café to a resort with a full kitchen brigade." />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((c, i) => (
          <li key={c.name}>
            <Reveal delay={(i % 3) * 80}>
              <div className="group relative h-72 overflow-hidden rounded-2xl">
                <Media kind={c.kind} seed={30 + i} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="text-lg font-semibold leading-tight tracking-[-0.02em]">{c.name}</h3>
                  <p className="mt-1.5 text-sm leading-snug text-white/75">{c.line}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
