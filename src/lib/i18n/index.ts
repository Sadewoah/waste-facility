import { id } from "./id";

export type Locale = "en" | "id";
export const LOCALE_COOKIE = "lang";
export const isLocale = (v: unknown): v is Locale => v === "en" || v === "id";

/**
 * Translation helper. English source text is the key; missing Indonesian entries
 * fall back to English. Use {name} placeholders for dynamic values.
 */
export function makeT(locale: Locale) {
  return (key: string, vars?: Record<string, string | number>) => {
    let s = locale === "id" ? (id[key] ?? key) : key;
    if (vars) for (const k in vars) s = s.split(`{${k}}`).join(String(vars[k]));
    return s;
  };
}
export type T = ReturnType<typeof makeT>;
