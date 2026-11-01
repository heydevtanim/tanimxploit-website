import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cleanLine, flattenErrors, inquirySchema } from "../src/lib/validation/inquiry";
import { createDuplicateGuard, createRateLimiter } from "../src/lib/utils/rate-limit";
import { escapeHtml, safeHeaderValue } from "../src/lib/email/send";

const valid = {
  fullName: "  Rahim   Uddin ",
  email: "Rahim@Example.COM",
  companyName: "",
  category: "WEBSITE_DEVELOPMENT",
  subject: "Company website",
  message: "We would like a corporate website for our business.",
  privacyAccepted: true,
};

describe("inquiry validation", () => {
  it("accepts and normalizes valid input", () => {
    const r = inquirySchema.safeParse(valid);
    assert.equal(r.success, true);
    if (r.success) {
      assert.equal(r.data.fullName, "Rahim Uddin");
      assert.equal(r.data.email, "rahim@example.com");
      assert.equal(r.data.companyName, undefined);
    }
  });

  it("rejects invalid email, short message, bad category and missing consent", () => {
    const r = inquirySchema.safeParse({
      ...valid,
      email: "nope",
      message: "short",
      category: "HACK",
      privacyAccepted: false,
    });
    assert.equal(r.success, false);
    if (!r.success) {
      const errors = flattenErrors(r.error);
      assert.ok(errors.email);
      assert.ok(errors.message);
      assert.ok(errors.category);
      assert.ok(errors.privacyAccepted);
    }
  });

  it("strips control characters", () => {
    assert.equal(cleanLine("a\u0000b\u0007c"), "abc");
  });

  it("rejects oversized fields", () => {
    const r = inquirySchema.safeParse({ ...valid, message: "x".repeat(3001) });
    assert.equal(r.success, false);
  });
});

describe("abuse protection", () => {
  it("rate limits after max requests and recovers after the window", () => {
    const limiter = createRateLimiter({ max: 2, windowMs: 1000 });
    assert.equal(limiter.check("ip", 0).allowed, true);
    assert.equal(limiter.check("ip", 10).allowed, true);
    assert.equal(limiter.check("ip", 20).allowed, false);
    assert.equal(limiter.check("other", 20).allowed, true);
    assert.equal(limiter.check("ip", 1500).allowed, true);
  });

  it("detects duplicates inside the window only", () => {
    const guard = createDuplicateGuard(1000);
    assert.equal(guard.isDuplicate("a", 0), false);
    assert.equal(guard.isDuplicate("a", 500), true);
    assert.equal(guard.isDuplicate("a", 2000), false);
  });
});

describe("email safety helpers", () => {
  it("escapes HTML", () => {
    assert.equal(escapeHtml(`<script>"x"&'y'</script>`), "&lt;script&gt;&quot;x&quot;&amp;&#39;y&#39;&lt;/script&gt;");
  });

  it("removes header injection characters", () => {
    assert.equal(safeHeaderValue("Hello\r\nBcc: evil@example.com"), "Hello Bcc: evil@example.com");
  });
});
