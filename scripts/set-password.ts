/**
 * Admin password reset. The portal has no "forgot password" screen yet (see docs/PORTAL.md, Phase 2),
 * so this is the supported way to set a new password for an existing account.
 *
 * 1. Put these two lines in .env (and remove them again afterwards):
 *      RESET_EMAIL=person@company.com
 *      RESET_PASSWORD=a-new-long-password
 * 2. Run:  npm run portal:set-password
 *
 * The password policy is applied, the lockout is cleared, every open session of that user is revoked
 * and the action is written to the audit log (without the password).
 */
import { PrismaClient } from "@prisma/client";
import { hashPassword, passwordPolicyProblems } from "../src/lib/portal/password";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.RESET_EMAIL?.trim().toLowerCase();
  const password = process.env.RESET_PASSWORD;
  if (!email || !password) throw new Error("Set RESET_EMAIL and RESET_PASSWORD in .env first.");

  const problems = passwordPolicyProblems(password, { email });
  if (problems.length > 0) throw new Error(`Password rejected: ${problems.join(" ")}`);

  const organization = await prisma.organization.findUnique({
    where: { slug: process.env.PORTAL_ORG_SLUG ?? "tanimxploit" },
  });
  if (!organization) throw new Error("Organization not found. Run `npm run db:seed` first.");

  const user = await prisma.user.findUnique({
    where: { organizationId_email: { organizationId: organization.id, email } },
  });
  if (!user) throw new Error(`No portal user with email ${email}.`);

  const passwordHash = await hashPassword(password);
  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { passwordHash, failedLoginCount: 0, lockedUntil: null, mustChangePassword: false },
    }),
    prisma.session.updateMany({
      where: { userId: user.id, revokedAt: null },
      data: { revokedAt: new Date() },
    }),
    prisma.activityLog.create({
      data: {
        organizationId: organization.id,
        actorUserId: null,
        action: "auth.password_reset_cli",
        entityType: "User",
        entityId: user.id,
      },
    }),
  ]);

  console.log(`Password updated for ${email}. All previous sessions were signed out.`);
  console.log("Now remove RESET_EMAIL and RESET_PASSWORD from .env.");
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
