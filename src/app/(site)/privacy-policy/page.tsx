import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/utils/seo";
import { PageHeader, Section } from "@/components/ui/Section";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How TanimXploit collects, uses and protects information submitted through this website.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" description="How we handle information submitted through this website." />
      <Section>
        <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Draft for legal review.</strong> This policy must be reviewed against TanimXploit&apos;s actual
          data practices and applicable requirements before publication. Remove this notice once approved.
        </div>

        <div className="max-w-3xl space-y-8 leading-relaxed text-ink-700">
          <div>
            <h2 className="text-2xl font-bold text-ink-900">Who we are</h2>
            <p className="mt-3">
              This website is operated by {siteConfig.legalName} (&quot;TanimXploit&quot;, &quot;we&quot;).
              {siteConfig.contactEmail ? ` You can contact us at ${siteConfig.contactEmail}.` : ""}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink-900">Information we collect</h2>
            <p className="mt-3">
              When you submit the contact form we collect your full name, email address, optional company or
              organization, inquiry category, subject and message. We do not ask for sensitive personal
              information and ask that you do not include it in your message.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink-900">How we use it</h2>
            <p className="mt-3">
              We use this information only to review and respond to your inquiry and to manage our business
              relationship with you. We may send you a confirmation that your inquiry was received.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink-900">Storage, email and service providers</h2>
            <p className="mt-3">
              Inquiries may be stored in a protected database and are delivered to an authorized company contact
              through a transactional email provider. Access is limited to authorized personnel. To limit abuse,
              the server may temporarily process your IP address for rate limiting; we do not store it with your
              inquiry.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink-900">Retention and deletion</h2>
            <p className="mt-3">
              We keep inquiries only as long as needed to respond and for legitimate business records. You may
              ask us to delete your inquiry by contacting us.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink-900">Analytics and cookies</h2>
            <p className="mt-3">
              This version of the website does not set advertising cookies. If a privacy-conscious analytics tool
              is added, this section will be updated to describe it.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink-900">Your choices</h2>
            <p className="mt-3">
              You may request access to, correction of or deletion of the information you sent us by contacting
              us.
            </p>
          </div>
          <p className="text-sm text-ink-500">Last updated: to be set at publication.</p>
        </div>
      </Section>
    </>
  );
}
