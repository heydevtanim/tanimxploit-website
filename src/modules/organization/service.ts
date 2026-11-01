import "server-only";
import { getPortalDb } from "@/lib/portal/db";
import type { PortalUser } from "@/modules/auth/types";

export async function getOrganizationOverview(user: PortalUser) {
  const db = getPortalDb();
  const [departments, designations] = await Promise.all([
    db.department.findMany({
      where: { organizationId: user.organizationId, isActive: true },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        _count: { select: { employees: true } },
        teams: {
          orderBy: { name: "asc" },
          select: {
            id: true,
            name: true,
            leader: { select: { firstName: true, lastName: true } },
            _count: { select: { members: true } },
          },
        },
      },
    }),
    db.designation.findMany({
      where: { organizationId: user.organizationId },
      orderBy: { title: "asc" },
      select: { id: true, title: true },
    }),
  ]);
  return { departments, designations };
}
