"use client";
import { createContext, useContext, useMemo } from "react";
import { makeT, type Locale, type T } from "./index";

const Ctx = createContext<Locale>("en");

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <Ctx.Provider value={locale}>{children}</Ctx.Provider>;
}
export const useLocale = () => useContext(Ctx);
export function useT(): T {
  const locale = useContext(Ctx);
  return useMemo(() => makeT(locale), [locale]);
}
