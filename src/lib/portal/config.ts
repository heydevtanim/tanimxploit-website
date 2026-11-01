export const portalConfig = {
  /** The portal is OFF unless PORTAL_ENABLED=true, so the public website can deploy safely on its own. */
  enabled: process.env.PORTAL_ENABLED === "true",
  organizationSlug: process.env.PORTAL_ORG_SLUG ?? "tanimxploit",
  name: "TanimXploit Workforce",
} as const;
