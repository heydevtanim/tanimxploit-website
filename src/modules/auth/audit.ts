import "server-only";
import type { Prisma } from "@prisma/client";
import { getPortalDb } from "@/lib/portal/db";

export interface AuditEntry {
  organizationId: string;
  actorUserId?: string | null;
  action: string;
  entityType?: string;
  entityId?: string;
  metadata?: Prisma.InputJsonValue;
  ipAddress?: string | null;
  userAgent?: string | null;
}

/**
 * Append-only audit trail (logins, sensitive reads, payroll changes).
 * Never put passwords, tokens or salary figures in `metadata`.
 */
export async function writeAudit(entry: AuditEntry): Promise<void> {
  try {
    await getPortalDb().activityLog.create({
      data: {
        organizationId: entry.organizationId,
        actorUserId: entry.actorUserId ?? null,
        action: entry.action,
        entityType: entry.entityType,
        entityId: entry.entityId,
        metadata: entry.metadata,
        ipAddress: entry.ipAddress ?? null,
        userAgent: entry.userAgent?.slice(0, 255) ?? null,
      },
    });
  } catch (error) {
    // A failed audit write must be visible to operators, but must not take the portal down.
    console.error("[portal] audit log write failed", error);
  }
}
