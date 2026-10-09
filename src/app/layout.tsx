import type { Metadata } from "next";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/plus-jakarta-sans/wght-italic.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SomyaPreloader } from "@/components/SomyaPreloader";
import { PRELOAD_KEY } from "@/lib/preload";
import { LocaleProvider } from "@/lib/i18n/client";
import { getLocale, getT } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: { default: t("SOMYA Waste Facility | Integrated Organic Waste Management"), template: "%s | SOMYA Waste Facility" },
    description: t("Managed organic waste collection, processing, traceability, curing, finishing, and compost return in Denpasar, Bali."),
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Runs before first paint: show the preloader only on a visitor's first load in this tab. */}
        <script dangerouslySetInnerHTML={{ __html: `try{if(!sessionStorage.getItem("${PRELOAD_KEY}"))document.documentElement.setAttribute("data-preloading","")}catch(e){}` }} />
      </head>
      <body>
        <LocaleProvider locale={locale}>
          <SomyaPreloader />
          <Header />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
