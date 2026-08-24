import type { MetadataRoute } from "next";
import { profile } from "@/data/resume";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(profile.siteUrl ? { sitemap: `${profile.siteUrl}/sitemap.xml` } : {}),
  };
}
