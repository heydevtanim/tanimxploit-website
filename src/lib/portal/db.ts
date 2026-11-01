import type { PrismaClient } from "@prisma/client";
import { getDb } from "@/lib/database/prisma";

/** The portal requires PostgreSQL (the public website treats it as optional). */
export function getPortalDb(): PrismaClient {
  const db = getDb();
  if (!db) {
    throw new Error("The staff portal needs DATABASE_URL (PostgreSQL). See docs/PORTAL.md.");
  }
  return db;
}
