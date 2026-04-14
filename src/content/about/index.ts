import en from "./en.json";
import es from "./es.json";

export type AboutLocale = "en" | "es";

type AboutContent = typeof en;

const aboutByLocale: Record<AboutLocale, AboutContent> = {
  en,
  es,
};

export function resolveAboutLocale(value?: string): AboutLocale {
  return value === "es" ? "es" : "en";
}

export function getAboutContent(locale?: string): AboutContent {
  const resolvedLocale = resolveAboutLocale(locale);
  return aboutByLocale[resolvedLocale] ?? aboutByLocale.en;
}
