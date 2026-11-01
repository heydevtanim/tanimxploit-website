import { siteConfig } from "@/config/site";

/** Company structured data, rendered by every public shell (main site and division sites). */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteConfig.legalName,
      alternateName: siteConfig.name,
      url: siteConfig.url,
      slogan: siteConfig.tagline,
      description: siteConfig.description,
      ...(siteConfig.contactEmail ? { email: siteConfig.contactEmail } : {}),
    },
    {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
};
