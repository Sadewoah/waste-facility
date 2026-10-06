import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { CTA } from "@/components/CTA";
import { wrap } from "@/components/Section";
import { site } from "@/lib/site";
import { Pin } from "@/components/Icons";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const rows = [["WhatsApp", site.whatsapp], ["Email", site.email], ["Instagram", site.instagram]];
  return (
    <>
      <PageHero ghost="HELLO" kind="soil" seed={41} name="page-contact" title="Let's start with your waste." copy="Tell us about your business, your organic waste volume, and your operational needs. We can start by understanding your current waste flow and finding the right service approach." />

      <section className={`${wrap} mt-24 grid gap-14 lg:grid-cols-[1.5fr_1fr]`}>
        <ContactForm />
        <aside className="h-fit rounded-2xl bg-forest-900 p-8 text-white lg:sticky lg:top-28">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">{site.name}</h2>
          <p className="mt-1 text-sm text-white/60">{site.company}</p>
          <div className="mt-8 flex gap-3 text-sm leading-relaxed text-white/85">
            <Pin className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
            <address className="not-italic">{site.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address>
          </div>
          <dl className="mt-8 space-y-4 border-t border-white/15 pt-6 text-sm">
            {rows.map(([k, v]) => (
              <div key={k}><dt className="text-xs text-white/50">{k}</dt><dd className="mt-1 text-white/90">{v}</dd></div>
            ))}
          </dl>
        </aside>
      </section>

      <section className={`${wrap} mt-28`}>
        <h2 className="text-3xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">Find us in Bali.</h2>
        <div className="mt-10 overflow-hidden rounded-2xl">
          <iframe title={`Map of ${site.name}`} src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`} className="h-[420px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>

      <CTA headline="Your waste has a next step." copy="Let's create a better system for collecting, processing, and recovering organic waste." />
    </>
  );
}
