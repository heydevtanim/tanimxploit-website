import { NextResponse, type NextRequest } from "next/server";
import { flattenErrors, inquirySchema } from "@/lib/validation/inquiry";
import { createRateLimiter } from "@/lib/utils/rate-limit";
import { isDatabaseEnabled } from "@/lib/database/prisma";
import {
  isEmailConfigured,
  sendInquiryNotification,
  sendVisitorAcknowledgment,
} from "@/lib/email/send";
import { isDuplicateInquiry, storeInquiry } from "@/features/inquiries/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 20 * 1024;
const MIN_FILL_TIME_MS = 2500;

const limiter = createRateLimiter({
  max: Number(process.env.RATE_LIMIT_MAX ?? 5),
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_SECONDS ?? 600) * 1000,
});

const SUCCESS_MESSAGE = "Thank you. Your inquiry has been received and we will get back to you soon.";

function json(body: Record<string, unknown>, status: number, headers?: Record<string, string>) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/** Reject cross-site browser requests (basic CSRF protection for a JSON endpoint). */
function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // non-browser clients; still subject to every other check
  try {
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isSameOrigin(req)) {
      return json({ ok: false, message: "Request not allowed." }, 403);
    }

    const contentType = req.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return json({ ok: false, message: "Unsupported request." }, 415);
    }

    const rate = limiter.check(clientIp(req));
    if (!rate.allowed) {
      return json(
        { ok: false, message: "Too many requests. Please try again later." },
        429,
        { "Retry-After": String(rate.retryAfterSeconds) },
      );
    }

    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) {
      return json({ ok: false, message: "Your message is too large." }, 413);
    }

    let payload: unknown;
    try {
      payload = JSON.parse(raw);
    } catch {
      return json({ ok: false, message: "Invalid request." }, 400);
    }

    const parsed = inquirySchema.safeParse(payload);
    if (!parsed.success) {
      return json(
        { ok: false, message: "Please check the highlighted fields.", errors: flattenErrors(parsed.error) },
        422,
      );
    }

    const { website, startedAt, privacyAccepted: _accepted, ...data } = parsed.data;

    // Spam signals: answer with a normal-looking success so bots get no feedback.
    const tooFast = typeof startedAt === "number" && Date.now() - startedAt < MIN_FILL_TIME_MS;
    if (website || tooFast) {
      return json({ ok: true, message: SUCCESS_MESSAGE }, 200);
    }

    // Repeated identical submission: treat as success without sending or storing again.
    if (await isDuplicateInquiry(data)) {
      return json({ ok: true, message: SUCCESS_MESSAGE }, 200);
    }

    const persistenceOn = isDatabaseEnabled();
    const emailOn = isEmailConfigured();

    // Local development with nothing configured: accept, but do not log personal data.
    if (!persistenceOn && !emailOn && process.env.NODE_ENV !== "production") {
      console.info(`[inquiries] dev mode: accepted a "${data.category}" inquiry (no storage or email configured)`);
      return json({ ok: true, message: SUCCESS_MESSAGE }, 200);
    }

    const id = await storeInquiry(data);
    const stored = id !== null;

    let notified = false;
    if (emailOn) {
      notified = await sendInquiryNotification({ ...data, id: id ?? undefined });
      if (notified) {
        // Acknowledgment failure must not fail the inquiry.
        await sendVisitorAcknowledgment({ ...data, id: id ?? undefined });
      }
    }

    // The inquiry counts as received if at least one durable channel worked.
    if (!stored && !notified) {
      return json(
        { ok: false, message: "We could not send your inquiry right now. Please try again later." },
        503,
      );
    }

    return json({ ok: true, message: SUCCESS_MESSAGE }, 200);
  } catch {
    // Never expose internal error details.
    return json({ ok: false, message: "Something went wrong. Please try again later." }, 500);
  }
}

// No public retrieval endpoint exists. Other methods are rejected.
export async function GET() {
  return json({ ok: false, message: "Method not allowed." }, 405, { Allow: "POST" });
}
