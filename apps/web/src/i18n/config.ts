export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

/** Elige el idioma a partir de la cabecera Accept-Language. */
export function pickLocale(acceptLanguage: string | null): Locale {
  const wanted = (acceptLanguage ?? "")
    .split(",")
    .map((p) => p.trim().slice(0, 2).toLowerCase());
  return (wanted.find(isLocale) as Locale | undefined) ?? defaultLocale;
}
