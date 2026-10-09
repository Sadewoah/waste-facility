"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setLocale } from "@/app/actions";
import { useLocale, useT } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n";

const options: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "id", label: "Bahasa Indonesia" },
];

export function LangSwitch() {
  const locale = useLocale();
  const t = useT();
  const router = useRouter();
  const [pending, start] = useTransition();
  const pick = (code: Locale) => {
    if (code === locale) return;
    start(async () => {
      await setLocale(code);
      router.refresh();
    });
  };
  return (
    <div role="group" aria-label={t("Language")} className={`flex rounded-lg bg-white/10 p-0.5 text-[11px] font-bold transition-opacity ${pending ? "opacity-60" : ""}`}>
      {options.map((o) => (
        <button key={o.code} type="button" lang={o.code} onClick={() => pick(o.code)} aria-pressed={o.code === locale} aria-label={o.label} title={o.label}
          className={`rounded-md px-2.5 py-2 leading-none transition-colors ${o.code === locale ? "bg-lime text-forest-950" : "text-white/75 hover:text-white"}`}>
          {o.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
