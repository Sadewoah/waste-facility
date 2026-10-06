import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Logo } from "./Header";
import { ArrowDownRight } from "./Icons";

export function Footer() {
  return (
    <footer className="relative mx-3 mb-3 mt-24 overflow-hidden rounded-[28px] bg-forest-950 text-white">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 pb-40 pt-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-10">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{site.tagline}</p>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-white/50">Navigation</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((n) => <li key={n.href}><Link href={n.href} className="text-white/85 hover:text-lime">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-white/50">Ecosystem</h3>
          <p className="mt-4 text-sm font-semibold">SOMYA Technology</p>
          <a href={site.techUrl} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-lime">
            Explore SOMYA Rapid Digester <ArrowDownRight className="h-3.5 w-3.5 -rotate-90" />
          </a>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-white/50">Contact</h3>
          <p className="mt-4 text-sm text-white/85">Denpasar, Bali, Indonesia</p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>Instagram</li><li>WhatsApp</li><li>Email</li>
          </ul>
        </div>
      </div>
      <p aria-hidden className="pointer-events-none absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[26vw] font-extrabold leading-none tracking-tighter text-white/[0.06] md:text-[19vw]">SOMYA</p>
      <p className="absolute bottom-5 left-6 text-xs text-white/40 md:left-10">© {new Date().getFullYear()} {site.company}</p>
    </footer>
  );
}
