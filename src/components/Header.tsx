"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, primaryCta, site } from "@/lib/site";
import { Close, Menu } from "./Icons";

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-forest-950">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20 12a8 8 0 01-13.6 5.7M4 12a8 8 0 0113.6-5.7" />
        </svg>
      </span>
      <span className={`text-sm font-bold leading-none tracking-tight ${light ? "text-white" : "text-ink"}`}>
        SOMYA <span className="font-medium opacity-80">Waste Facility</span>
      </span>
    </span>
  );
}

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-5 z-50 flex justify-center px-4">
      <div className="relative w-full max-w-[920px]">
        <nav aria-label="Main" className="flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-forest-950/60 py-2 pl-4 pr-2 text-white shadow-[0_10px_40px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <Link href="/" aria-label={`${site.name} home`}><Logo /></Link>
          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((n) => {
              const active = n.href === "/" ? path === "/" : path.startsWith(n.href);
              return (
                <li key={n.href}>
                  <Link href={n.href} aria-current={active ? "page" : undefined} className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-colors ${active ? "bg-white/20" : "text-white/80 hover:bg-white/10 hover:text-white"}`}>
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-2">
            <Link href="/contact" className="hidden rounded-lg bg-lime px-4 py-2.5 text-xs font-bold text-forest-950 transition-colors hover:bg-white sm:inline-block">
              {primaryCta}
            </Link>
            <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 md:hidden">
              {open ? <Close /> : <Menu />}
            </button>
          </div>
        </nav>
        {open && (
          <div className="mt-2 rounded-2xl border border-white/15 bg-forest-950/90 p-3 text-white backdrop-blur-xl md:hidden">
            <ul className="flex flex-col">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-base font-medium hover:bg-white/10">{n.label}</Link>
                </li>
              ))}
            </ul>
            <Link href="/contact" onClick={() => setOpen(false)} className="mt-2 block rounded-xl bg-lime px-4 py-3.5 text-center text-sm font-bold text-forest-950">
              {primaryCta}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
