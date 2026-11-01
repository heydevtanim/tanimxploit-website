import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/utils/seo";
import { PageHeader, Section } from "@/components/ui/Section";

export const metadata = buildMetadata({
  title: "Terms and Conditions",
  description: "Terms for using the TanimXploit website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms and Conditions" description="Terms for using this website." />
      <Section>
        <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Draft for legal review.</strong> These terms must be reviewed against TanimXploit&apos;s actual
          business practices and applicable requirements before publication. Remove this notice once approved.
        </div>

        <div className="max-w-3xl space-y-8 leading-relaxed text-ink-700">
          <div>
            <h2 className="text-2xl font-bold text-ink-900">Use of this website</h2>
            <p className="mt-3">
              This website is provided by {siteConfig.legalName} for general information about our company,
              divisions and services. By using it you agree to use it lawfully and not to misuse, disrupt or
              attempt unauthorized access to it.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink-900">Information and availability of services</h2>
            <p className="mt-3">
              We try to keep content accurate. Services and initiatives marked &quot;Planned&quot; are not yet
              operating. Information on this website is not a contract or a guarantee of any specific result.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink-900">Inquiries and engagements</h2>
            <p className="mt-3">
              Submitting an inquiry does not create a service agreement. Any project is subject to a separate
              written agreement confirming scope, timeline and fees.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink-900">Intellectual property</h2>
            <p className="mt-3">
              The content, brand name and design of this website belong to {siteConfig.legalName} or its
              licensors and may not be copied or reused without permission.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink-900">Limitation of liability</h2>
            <p className="mt-3">
              To the extent permitted by law, we are not liable for losses arising from the use of this website
              or reliance on its content. This clause must be confirmed by legal review.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink-900">Changes</h2>
            <p className="mt-3">We may update these terms from time to time by publishing a new version here.</p>
          </div>
          <p className="text-sm text-ink-500">Last updated: to be set at publication.</p>
        </div>
      </Section>
    </>
  );
}
