const BASE_URL = "https://luiseduromp.com";

/**
 * Returns canonical + hreflang alternates for a given page path and locale.
 * path: "" for home, "/about", "/projects", "/contact" for inner pages.
 */
export function getPageAlternates(path: string, locale: string) {
  const enPath = path === "" ? "/" : path;
  const esPath = path === "" ? "/es" : `/es${path}`;
  return {
    canonical: locale === "es" ? esPath : enPath,
    languages: {
      en: enPath,
      es: esPath,
      "x-default": enPath,
    },
  };
}

export { BASE_URL };
