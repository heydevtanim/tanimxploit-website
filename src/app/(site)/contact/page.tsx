import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/utils/seo";
import { ContactForm } from "@/components/forms/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader, Section } from "@/components/ui/Section";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Send an inquiry to TanimXploit about web development, design, digital marketing, technical support, learning or partnerships.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact" },
        ])}
      />
      <PageHeader
        eyebrow="Contact"
        title="Contact us"
        description="Tell us about your project, question or idea. We will review your inquiry and reply as soon as we can."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-6 text-2xl font-bold text-ink-900">Send an inquiry</h2>
            <Suspense fallback={<p className="text-ink-600">Loading form...</p>}>
              <ContactForm />
            </Suspense>
          </div>

          <aside className="space-y-8" aria-label="Contact information">
            <div>
              <h2 className="text-lg font-semibold text-ink-900">Business inquiries</h2>
              <p className="mt-2 leading-relaxed text-ink-600">
                Use the form for project, partnership, support and learning inquiries so your request reaches
                the right place.
              </p>
            </div>
            {siteConfig.contactEmail ? (
              <div className="flex items-start gap-3">
                <Icon name="mail" className="mt-0.5 h-5 w-5 text-brand-700" />
                <div>
                  <h2 className="text-lg font-semibold text-ink-900">Email</h2>
                  <a
                    className="font-medium text-brand-700 hover:text-brand-900"
                    href={`mailto:${siteConfig.contactEmail}`}
                  >
                    {siteConfig.contactEmail}
                  </a>
                </div>
              </div>
            ) : null}
            <div>
              <h2 className="text-lg font-semibold text-ink-900">Expected response</h2>
              <p className="mt-2 leading-relaxed text-ink-600">{siteConfig.responseTime}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-ink-900">Your data</h2>
              <p className="mt-2 leading-relaxed text-ink-600">
                We only ask for what we need to respond. Please do not include passwords or sensitive personal
                information in your message.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
