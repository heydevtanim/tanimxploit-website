import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/** True when PostgreSQL persistence is enabled (DATABASE_URL is set). */
export function isDatabaseEnabled(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/**
 * Returns a shared Prisma client, or null when no database is configured.
 * Persistence is optional in Version 1: without DATABASE_URL the site still works (email only).
 */
export function getDb(): PrismaClient | null {
  if (!isDatabaseEnabled()) return null;
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({ log: ["error"] });
  }
  return globalForPrisma.prisma;
}
