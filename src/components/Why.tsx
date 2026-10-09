import { getT } from "@/lib/i18n/server";
import { benefits } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionHead, wrap } from "./Section";
import { ArrowDownRight, Chart, Cog, Eye, Loop, Truck, Users } from "./Icons";

const icons = { truck: Truck, users: Users, eye: Eye, cog: Cog, loop: Loop, chart: Chart };

// Setiap ikon punya gerakan hover sendiri
const iconMotion: Record<string, string> = {
  truck: "group-hover:translate-x-1.5",
  users: "group-hover:scale-110",
  eye: "group-hover:scale-y-50",
  cog: "group-hover:rotate-180",
  loop: "group-hover:rotate-180",
  chart: "group-hover:-translate-y-1",
};

export async function Why() {
  const t = await getT();
  return (
    <section className={`${wrap} mt-28`}>
      <SectionHead title={t("More than collection. It's a complete system.")} />
      <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b, i) => {
          const Icon = icons[b.icon as keyof typeof icons];
          return (
            <li key={b.t}>
              <Reveal delay={(i % 3) * 80} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-2xl bg-lime p-7 transition-transform duration-500 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  {/* Lingkaran yang membesar dari ikon */}
                  <span
                    aria-hidden
                    className="absolute left-[3.125rem] top-[3.125rem] h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest-900 transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[20] motion-reduce:transition-none"
                  />

                  <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-forest-900">
                    <span className={`block transition-transform duration-700 ease-out motion-reduce:transition-none ${iconMotion[b.icon]}`}>
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                  </span>

                  <span
                    aria-hidden
                    className="absolute right-6 top-6 z-10 grid h-9 w-9 place-items-center rounded-full border border-forest-900/20 text-forest-900 transition-all duration-500 group-hover:-rotate-90 group-hover:border-lime group-hover:bg-lime group-hover:text-forest-950 motion-reduce:transition-none"
                  >
                    <ArrowDownRight className="h-4 w-4" />
                  </span>

                  <div className="relative z-10">
                    <h3 className="mt-12 text-2xl font-medium tracking-[-0.03em] transition-colors duration-500 group-hover:text-white">{t(b.t)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-forest-900/75 transition-colors duration-500 group-hover:text-white/75">{t(b.d)}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
