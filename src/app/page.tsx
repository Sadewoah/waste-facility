import { getT } from "@/lib/i18n/server";
import { HomeHero } from "@/components/HomeHero";
import { Marquee } from "@/components/Marquee";
import { Challenge } from "@/components/Challenge";
import { ServiceRows } from "@/components/ServiceRows";
import { ProcessScroller } from "@/components/ProcessScroller";
import { WhoWeServe } from "@/components/WhoWeServe";
import { Why } from "@/components/Why";
import { LoopRing } from "@/components/LoopRing";
import { Impact } from "@/components/Impact";
import { CTA } from "@/components/CTA";

export default async function Home() {
  const t = await getT();
  return (
    <>
      <HomeHero />
      <Marquee />
      <Challenge />
      <ServiceRows />
      <ProcessScroller />
      <WhoWeServe />
      <Why />
      <LoopRing />
      <Impact />
      <CTA headline={t("Ready to change the way your business handles organic waste?")} copy={t("Let's build a cleaner, more traceable, and more circular waste journey for your business.")} />
    </>
  );
}
