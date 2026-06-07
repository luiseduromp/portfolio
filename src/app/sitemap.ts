import { MetadataRoute } from "next";

const BASE_URL = "https://luiseduromp.com";

const routes = [
  { path: "", priority: 1.0 },
  { path: "/about", priority: 0.8 },
  { path: "/projects", priority: 0.8 },
  { path: "/contact", priority: 0.7 },
  { path: "/privacy", priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority } of routes) {
    const enPath = path === "" ? "/" : path;
    const esPath = path === "" ? "/es" : `/es${path}`;
    const alternates = {
      languages: {
        en: `${BASE_URL}${enPath}`,
        es: `${BASE_URL}${esPath}`,
      },
    };

    entries.push({
      url: `${BASE_URL}${enPath}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority,
      alternates,
    });

    entries.push({
      url: `${BASE_URL}${esPath}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority,
      alternates,
    });
  }

  return entries;
}
