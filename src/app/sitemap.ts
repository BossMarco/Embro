import type { MetadataRoute } from "next";
import { serviceAreas, services, site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap { const updated=new Date();return ["", "/service-areas", ...services.map(s=>`/services/${s.slug}`), ...serviceAreas.map(a=>`/service-areas/${a.slug}`)].map(path=>({url:`${site.url}${path}`,lastModified:updated,changeFrequency:"monthly" as const,priority:path===""?1:path==="/service-areas"?0.8:0.7})); }
