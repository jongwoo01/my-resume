import type { MetadataRoute } from "next";
import { profile } from "@/data/resume";
import { tools } from "@/data/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${profile.siteUrl}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...tools.map((t) => ({
      url: `${profile.siteUrl}/tools/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
