import type { MetadataRoute } from "next";
import { profile } from "@/data/resume";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!profile.siteUrl) return [];
  const now = new Date();
  return [
    {
      url: `${profile.siteUrl}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
