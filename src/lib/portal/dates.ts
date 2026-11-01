/** Date helpers. The database stores UTC; the company works in Asia/Dhaka. */
export const PORTAL_TIMEZONE = "Asia/Dhaka";

/** "YYYY-MM-DD" for the given instant as seen in Dhaka. */
export function dhakaDateKey(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: PORTAL_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/** Value to use for Prisma `@db.Date` columns (midnight UTC of the Dhaka calendar day). */
export function dhakaWorkDate(date: Date = new Date()): Date {
  return new Date(`${dhakaDateKey(date)}T00:00:00.000Z`);
}

export function formatDhakaDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: PORTAL_TIMEZONE,
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function formatDateOnly(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", dateStyle: "medium" }).format(date);
}
