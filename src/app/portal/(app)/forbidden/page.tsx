import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/portal/ui";

export const metadata: Metadata = { title: "Access denied" };

export default function ForbiddenPage() {
  return (
    <>
      <PageHeader title="Access denied" description="Your role does not include permission to open that page." />
      <Link href="/portal/dashboard" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
        Back to dashboard
      </Link>
    </>
  );
}
