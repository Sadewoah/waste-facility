import { getT } from "@/lib/i18n/server";
import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { SectionHead, wrap } from "./Section";

const panels = [
  { kind: "pile" as const, name: "challenge-problem", seed: 11, tag: "Stored, mixed, sent to landfill", alt: "Mixed organic waste and overflowing bins" },
  { kind: "bins" as const, name: "challenge-bins", seed: 12, tag: "Source-separated in SOMYA Bins", alt: "Clean SOMYA Bins viewed from above" },
  { kind: "soil" as const, name: "challenge-compost", seed: 13, tag: "Returned as compost", alt: "Compost and soil with new growth" },
];

export async function Challenge() {
  const t = await getT();
  return (
    <section className={`${wrap} mt-16 md:mt-28`}>
      <SectionHead 
        className="text-center md:text-left"
        title={t("Organic waste should have a better next step.")}
        copy={
          // Hapus pemaksaan warna (text-black dll) agar mewarisi warna default dari SectionHead, 
          // tapi tetap batasi lebarnya (md:max-w-2xl) untuk versi desktop.
          <div className="text-sm leading-relaxed md:max-w-2xl md:text-base">
            <p>{t("Organic waste can create operational problems when it is stored, mixed, or sent directly to landfill.")}</p>
            <p className="mt-3 md:mt-4">
              {t("SOMYA Waste Facility creates a structured path for source-separated organic waste, helping businesses manage collection, processing, traceability, and recovery through one integrated system.")}
            </p>
          </div>
        }
      />
      
      <div className="mt-8 flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:mt-12 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
        {panels.map((p, i) => (
          <div key={p.name} className="min-w-[85vw] shrink-0 snap-start md:min-w-0 md:shrink">
            <Reveal delay={i * 90}>
              <div className="relative h-[300px] overflow-hidden rounded-2xl sm:h-[340px] md:h-[440px]">
                <Media kind={p.kind} seed={p.seed} name={p.name} alt={t(p.alt)} className="h-full w-full object-cover" />
                
                {/* PERBAIKAN: Menambahkan 'z-10' di sini agar teks dipaksa selalu berada di atas gambar */}
                <span className="absolute bottom-4 left-4 z-10 inline-block max-w-[calc(100%-2rem)] rounded-full border border-white/25 bg-forest-950/60 px-10 py-1.5 text-xs font-medium leading-snug text-white backdrop-blur-md">
                  {t(p.tag)}
                </span>
                
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}