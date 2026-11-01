/**
 * Idempotent seed for the staff portal. Safe to run repeatedly:
 *   npx prisma db seed
 *
 * Creates/updates: organization, permissions, system roles (permissions are re-synced from
 * src/lib/portal/permissions.ts), divisions, example teams, designations, leave TYPES and the founder
 * account (only if it does not exist yet; an existing password is never overwritten).
 *
 * Leave days, salary rules and attendance policy are company decisions and are NOT seeded.
 *
 * Required env for the founder account:
 *   SEED_FOUNDER_EMAIL, SEED_FOUNDER_PASSWORD (12+ chars), optional SEED_FOUNDER_NAME
 */
import { PrismaClient } from "@prisma/client";
import { hashPassword, passwordPolicyProblems } from "../src/lib/portal/password";
import {
  ALL_PERMISSION_KEYS,
  PERMISSIONS,
  ROLE_DEFINITIONS,
  ROLE_KEYS,
} from "../src/lib/portal/permissions";
import { dhakaWorkDate } from "../src/lib/portal/dates";

const prisma = new PrismaClient();

const ORG_SLUG = process.env.PORTAL_ORG_SLUG ?? "tanimxploit";

const DIVISIONS: { slug: string; name: string; teams: string[] }[] = [
  { slug: "development", name: "TanimXploit Development", teams: ["Frontend Team", "Backend Team", "QA Team"] },
  { slug: "creative-studio", name: "TanimXploit Creative Studio", teams: ["Branding Team", "Graphic Design Team"] },
  { slug: "digital", name: "TanimXploit Digital", teams: ["SEO Team", "Social Media Team"] },
  { slug: "technology-support", name: "TanimXploit Technology Support", teams: [] },
  { slug: "code-academy", name: "TanimXploit Code Academy", teams: [] },
  { slug: "learning", name: "TanimXploit Learning", teams: [] },
];

const DESIGNATIONS = ["Founder & CEO", "Manager", "Team Leader", "Senior Engineer", "Engineer", "Designer", "Executive", "Intern"];

const LEAVE_TYPES: { key: string; name: string; isPaid: boolean }[] = [
  { key: "CASUAL", name: "Casual Leave", isPaid: true },
  { key: "SICK", name: "Sick Leave", isPaid: true },
  { key: "ANNUAL", name: "Annual Leave", isPaid: true },
  { key: "EMERGENCY", name: "Emergency Leave", isPaid: true },
  { key: "UNPAID", name: "Unpaid Leave", isPaid: false },
];

async function main() {
  const organization = await prisma.organization.upsert({
    where: { slug: ORG_SLUG },
    update: {},
    create: { slug: ORG_SLUG, name: "TanimXploit Technology Services" },
  });

  // Permissions
  for (const key of ALL_PERMISSION_KEYS) {
    await prisma.permission.upsert({
      where: { key },
      update: { description: PERMISSIONS[key] },
      create: { key, description: PERMISSIONS[key] },
    });
  }
  const permissionRows = await prisma.permission.findMany();
  const permissionId = new Map(permissionRows.map((p) => [p.key, p.id]));

  // Roles (system roles are re-synced from code on every seed)
  for (const key of ROLE_KEYS) {
    const def = ROLE_DEFINITIONS[key];
    const role = await prisma.role.upsert({
      where: { key },
      update: { name: def.name, description: def.description },
      create: { key, name: def.name, description: def.description, isSystem: true },
    });
    await prisma.rolePermission.deleteMany({ where: { roleId: role.id } });
    await prisma.rolePermission.createMany({
      data: def.permissions.map((p) => ({ roleId: role.id, permissionId: permissionId.get(p) as string })),
      skipDuplicates: true,
    });
  }

  // Divisions and teams
  for (const d of DIVISIONS) {
    const department = await prisma.department.upsert({
      where: { organizationId_slug: { organizationId: organization.id, slug: d.slug } },
      update: { name: d.name },
      create: { organizationId: organization.id, slug: d.slug, name: d.name },
    });
    for (const teamName of d.teams) {
      await prisma.team.upsert({
        where: { departmentId_name: { departmentId: department.id, name: teamName } },
        update: {},
        create: { organizationId: organization.id, departmentId: department.id, name: teamName },
      });
    }
  }

  for (const title of DESIGNATIONS) {
    await prisma.designation.upsert({
      where: { organizationId_title: { organizationId: organization.id, title } },
      update: {},
      create: { organizationId: organization.id, title },
    });
  }

  for (const t of LEAVE_TYPES) {
    await prisma.leaveType.upsert({
      where: { organizationId_key: { organizationId: organization.id, key: t.key } },
      update: { name: t.name, isPaid: t.isPaid },
      create: { organizationId: organization.id, ...t },
    });
  }

  // Founder account
  const email = process.env.SEED_FOUNDER_EMAIL?.trim().toLowerCase();
  const password = process.env.SEED_FOUNDER_PASSWORD;
  if (!email || !password) {
    console.log("Seeded roles and organization. Set SEED_FOUNDER_EMAIL and SEED_FOUNDER_PASSWORD to create the founder account.");
    return;
  }
  const problems = passwordPolicyProblems(password, { email });
  if (problems.length > 0) throw new Error(`SEED_FOUNDER_PASSWORD rejected: ${problems.join(" ")}`);

  const existing = await prisma.user.findUnique({
    where: { organizationId_email: { organizationId: organization.id, email } },
  });
  if (existing) {
    console.log(`Founder account ${email} already exists; password left unchanged.`);
    return;
  }

  const [firstName, ...rest] = (process.env.SEED_FOUNDER_NAME ?? "Founder Admin").trim().split(/\s+/);
  const superAdmin = await prisma.role.findUniqueOrThrow({ where: { key: "SUPER_ADMIN" } });
  const development = await prisma.department.findUnique({
    where: { organizationId_slug: { organizationId: organization.id, slug: "development" } },
  });
  const designation = await prisma.designation.findUnique({
    where: { organizationId_title: { organizationId: organization.id, title: "Founder & CEO" } },
  });

  const user = await prisma.user.create({
    data: {
      organizationId: organization.id,
      email,
      passwordHash: await hashPassword(password),
      emailVerified: new Date(),
      userRoles: { create: [{ roleId: superAdmin.id }] },
    },
  });
  await prisma.employee.create({
    data: {
      organizationId: organization.id,
      userId: user.id,
      employeeCode: "EMP-0001",
      firstName,
      lastName: rest.join(" ") || "-",
      departmentId: development?.id,
      designationId: designation?.id,
      joiningDate: dhakaWorkDate(),
      employmentType: "FULL_TIME",
      workMode: "HYBRID",
      status: "ACTIVE",
    },
  });
  console.log(`Created founder account ${email} (Super Admin). Sign in, then rotate the seed password.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
