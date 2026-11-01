import type { InquiryCategoryKey } from "@/types";

export const siteConfig = {
  name: "TanimXploit",
  legalName: "TanimXploit Technology Services",
  tagline: "Building Skills. Creating Opportunities. Delivering Technology.",
  description:
    "TanimXploit Technology Services brings together technology, creative services, digital growth, technical support and learning to help businesses and individuals move forward in a digital world.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  /** Official contact email. Leave the env var empty to hide it on the site. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
  responseTime: "We aim to reply to business inquiries within 2 working days.",
} as const;

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/divisions", label: "Divisions" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerLegalNav = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms and Conditions" },
] as const;

export const inquiryCategories: { value: InquiryCategoryKey; label: string }[] = [
  { value: "GENERAL", label: "General Inquiry" },
  { value: "WEBSITE_DEVELOPMENT", label: "Website Development" },
  { value: "SOFTWARE_DEVELOPMENT", label: "Software Development" },
  { value: "BRANDING_DESIGN", label: "Branding and Design" },
  { value: "DIGITAL_MARKETING", label: "Digital Marketing" },
  { value: "TECHNICAL_SUPPORT", label: "Technical Support" },
  { value: "EDUCATION_LEARNING", label: "Education / Learning" },
  { value: "PARTNERSHIP", label: "Partnership" },
  { value: "OTHER", label: "Other" },
];

export function categoryLabel(value: string): string {
  return inquiryCategories.find((c) => c.value === value)?.label ?? "Other";
}
