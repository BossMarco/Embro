import type { MetadataRoute } from "next";
import { serviceAreas, services, site } from "@/lib/site";
const siteUpdated = new Date("2026-09-21T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/service-areas",
    ...services.map((s) => `/services/${s.slug}`),
    ...serviceAreas.map((a) => `/service-areas/${a.slug}`),
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: siteUpdated,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path === "/service-areas" ? 0.8 : 0.7,
  }));
}
