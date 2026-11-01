import { z } from "zod";

export const INQUIRY_CATEGORIES = [
  "GENERAL",
  "WEBSITE_DEVELOPMENT",
  "SOFTWARE_DEVELOPMENT",
  "BRANDING_DESIGN",
  "DIGITAL_MARKETING",
  "TECHNICAL_SUPPORT",
  "EDUCATION_LEARNING",
  "PARTNERSHIP",
  "OTHER",
] as const;

/** Remove control characters (keeps \n and \t) and normalize surrounding whitespace. */
export function cleanText(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\r\n?/g, "\n")
    .trim();
}

/** Single-line variant: also collapses newlines and repeated spaces. */
export function cleanLine(value: string): string {
  return cleanText(value).replace(/\s+/g, " ");
}

const line = (min: number, max: number, label: string) =>
  z
    .string({ required_error: `${label} is required.`, invalid_type_error: `${label} is invalid.` })
    .transform(cleanLine)
    .pipe(
      z
        .string()
        .min(min, `${label} must be at least ${min} characters.`)
        .max(max, `${label} must be at most ${max} characters.`),
    );

export const inquirySchema = z.object({
  fullName: line(2, 100, "Full name"),
  email: z
    .string({ required_error: "Email address is required." })
    .transform((v) => cleanLine(v).toLowerCase())
    .pipe(z.string().email("Please enter a valid email address.").max(254, "Email address is too long.")),
  companyName: z
    .string()
    .transform(cleanLine)
    .pipe(z.string().max(120, "Company name must be at most 120 characters."))
    .optional()
    .transform((v) => (v ? v : undefined)),
  category: z.enum(INQUIRY_CATEGORIES, { errorMap: () => ({ message: "Please choose an inquiry category." }) }),
  subject: line(3, 150, "Subject"),
  message: z
    .string({ required_error: "Message is required." })
    .transform(cleanText)
    .pipe(
      z
        .string()
        .min(20, "Please describe your inquiry in at least 20 characters.")
        .max(3000, "Message must be at most 3000 characters."),
    ),
  privacyAccepted: z.literal(true, {
    errorMap: () => ({ message: "Please acknowledge the privacy notice." }),
  }),
  /** Honeypot: real visitors never see or fill this field. */
  website: z.string().max(200).optional(),
  /** Client timestamp (ms) of when the form was first shown. Used for a minimum fill-time check. */
  startedAt: z.number().int().optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export function flattenErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
