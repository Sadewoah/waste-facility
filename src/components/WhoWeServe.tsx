import { getT } from "@/lib/i18n/server";
import { clients } from "@/lib/content";
import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { SectionHead, wrap } from "./Section";

const PER_PAGE = 4;

export async function WhoWeServe() {
  const t = await getT();

  // pecah jadi halaman isi 4 (2x2) untuk mobile
  const pages = Array.from(
    { length: Math.ceil(clients.length / PER_PAGE) },
    (_, p) => clients.slice(p * PER_PAGE, p * PER_PAGE + PER_PAGE)
  );

  return (
    <section className={`${wrap} mt-28`}>
      <SectionHead className="text-center lg:text-left md:text-left"
        title={t("For businesses that generate organic waste.")}
        copy={t("Built for real operations, from a single café to a resort with a full kitchen brigade.")}
      />

      <div
        className="
          mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible lg:grid-cols-3
        "
      >
        {pages.map((page, p) => (
          <ul
            key={p}
            className="grid w-full shrink-0 snap-start grid-cols-2 gap-3 sm:contents"
          >
            {page.map((c, j) => {
              const i = p * PER_PAGE + j;
              return (
                <li key={c.name}>
                  <Reveal delay={(i % 3) * 80}>
                    <div className="group relative h-56 overflow-hidden rounded-2xl sm:h-72">
                      <Media
                        kind={c.kind}
                        seed={30 + i}
                        className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-5">
                        <h3 className="text-base font-semibold leading-tight tracking-[-0.02em] sm:text-lg">
                          {t(c.name)}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-xs leading-snug text-white/75 sm:mt-1.5 sm:text-sm sm:line-clamp-none">
                          {t(c.line)}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </section>
  );
}
