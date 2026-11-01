import { categoryLabel, siteConfig } from "@/config/site";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strip anything that could be used for header injection. */
export function safeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, 200);
}

interface SendEmailArgs {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM && process.env.INQUIRY_NOTIFY_TO);
}

/** Sends one email through the Resend REST API. Returns true on success, never throws. */
async function sendEmail({ to, subject, html, text, replyTo }: SendEmailArgs): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) return false;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: safeHeaderValue(subject),
        html,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) {
      // Log only the status. Never log the body, keys or visitor data.
      console.error(`[email] provider responded with status ${res.status}`);
      return false;
    }
    return true;
  } catch {
    console.error("[email] request failed");
    return false;
  }
}

export interface InquiryEmailData {
  id?: string;
  fullName: string;
  email: string;
  companyName?: string;
  category: string;
  subject: string;
  message: string;
}

/** Notifies the authorized company contact. */
export async function sendInquiryNotification(data: InquiryEmailData): Promise<boolean> {
  const to = process.env.INQUIRY_NOTIFY_TO;
  if (!to) return false;

  const label = categoryLabel(data.category);
  const rows: [string, string][] = [
    ["Name", data.fullName],
    ["Email", data.email],
    ["Company", data.companyName ?? "-"],
    ["Category", label],
    ["Subject", data.subject],
  ];

  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#1b2340">
<h2 style="margin:0 0 12px">New website inquiry</h2>
<table cellpadding="6" style="border-collapse:collapse">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="font-weight:bold;vertical-align:top">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`,
  )
  .join("\n")}
</table>
<h3 style="margin:16px 0 6px">Message</h3>
<p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
${data.id ? `<p style="color:#52638a;font-size:12px">Reference: ${escapeHtml(data.id)}</p>` : ""}
</div>`;

  const text = [
    "New website inquiry",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    data.message,
    data.id ? `\nReference: ${data.id}` : "",
  ].join("\n");

  return sendEmail({
    to,
    subject: `[${siteConfig.name}] ${label}: ${data.subject}`,
    html,
    text,
    replyTo: data.email,
  });
}

/** Optional acknowledgment to the visitor. */
export async function sendVisitorAcknowledgment(data: InquiryEmailData): Promise<boolean> {
  if (process.env.SEND_VISITOR_ACKNOWLEDGMENT === "false") return false;
  const name = escapeHtml(data.fullName);
  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#1b2340">
<p>Hello ${name},</p>
<p>Thank you for contacting ${escapeHtml(siteConfig.legalName)}. We have received your inquiry about "${escapeHtml(
    data.subject,
  )}".</p>
<p>${escapeHtml(siteConfig.responseTime)}</p>
<p>Regards,<br/>${escapeHtml(siteConfig.name)}</p>
</div>`;
  const text = `Hello ${data.fullName},\n\nThank you for contacting ${siteConfig.legalName}. We have received your inquiry about "${data.subject}".\n\n${siteConfig.responseTime}\n\nRegards,\n${siteConfig.name}`;
  return sendEmail({
    to: data.email,
    subject: `We received your inquiry | ${siteConfig.name}`,
    html,
    text,
  });
}
