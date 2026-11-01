import { createHash } from "node:crypto";
import { getDb } from "@/lib/database/prisma";
import { createDuplicateGuard } from "@/lib/utils/rate-limit";
import type { InquiryInput } from "@/lib/validation/inquiry";

const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;
const memoryGuard = createDuplicateGuard(DUPLICATE_WINDOW_MS);

type CoreInquiry = Omit<InquiryInput, "privacyAccepted" | "website" | "startedAt">;

/** Fingerprint of the content, so the raw message is never used as a map key. */
export function fingerprint(data: CoreInquiry): string {
  return createHash("sha256")
    .update([data.email, data.category, data.subject, data.message].join("\u0000"))
    .digest("hex");
}

/**
 * Detects a repeated submission. Uses the database when persistence is on (works across instances),
 * and always falls back to the in-memory guard for the current instance.
 */
export async function isDuplicateInquiry(data: CoreInquiry): Promise<boolean> {
  if (memoryGuard.isDuplicate(fingerprint(data))) return true;

  const db = getDb();
  if (!db) return false;
  try {
    const since = new Date(Date.now() - DUPLICATE_WINDOW_MS);
    const existing = await db.inquiry.findFirst({
      where: { email: data.email, subject: data.subject, message: data.message, createdAt: { gte: since } },
      select: { id: true },
    });
    return Boolean(existing);
  } catch {
    return false;
  }
}

/** Stores the inquiry when PostgreSQL is configured. Returns its id, or null when not stored. */
export async function storeInquiry(data: CoreInquiry): Promise<string | null> {
  const db = getDb();
  if (!db) return null;
  try {
    const row = await db.inquiry.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        companyName: data.companyName ?? null,
        category: data.category,
        subject: data.subject,
        message: data.message,
      },
      select: { id: true },
    });
    return row.id;
  } catch {
    console.error("[inquiries] database write failed");
    return null;
  }
}
