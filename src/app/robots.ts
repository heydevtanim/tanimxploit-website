import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Only the real production deployment is indexable (NEXT_PUBLIC_ALLOW_INDEXING=true).
  if (!siteConfig.allowIndexing) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/portal/"] },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
