"use client";

import Link from "@/components/ui/SiteLink";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { inquiryCategories } from "@/config/site";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Record<string, string>;

const inputClass =
  "mt-1.5 block w-full rounded-lg border border-ink-300 bg-white px-3.5 py-2.5 text-ink-900 placeholder:text-ink-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/40 aria-[invalid=true]:border-red-600";

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink-800">
        {label}
        {optional ? <span className="font-normal text-ink-500"> (optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("category");
  const initialCategory = inquiryCategories.some((c) => c.value === requested) ? requested! : "";

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");

  // Synchronous guard: state updates are async, so a fast double click could slip past `disabled`.
  const inFlight = useRef(false);
  const startedAt = useRef<number>(Date.now());
  const summaryRef = useRef<HTMLDivElement>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;

    const form = event.currentTarget;
    const fd = new FormData(form);
    const value = (name: string) => String(fd.get(name) ?? "");

    // Basic client-side validation (the server validates again and is the source of truth).
    const clientErrors: FieldErrors = {};
    if (value("fullName").trim().length < 2) clientErrors.fullName = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(value("email").trim())) clientErrors.email = "Please enter a valid email address.";
    if (!value("category")) clientErrors.category = "Please choose an inquiry category.";
    if (value("subject").trim().length < 3) clientErrors.subject = "Please enter a subject.";
    if (value("message").trim().length < 20)
      clientErrors.message = "Please describe your inquiry in at least 20 characters.";
    if (fd.get("privacyAccepted") !== "on") clientErrors.privacyAccepted = "Please acknowledge the privacy notice.";

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setStatus("idle");
      setMessage("Please correct the highlighted fields.");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    inFlight.current = true;
    setErrors({});
    setMessage("");
    setStatus("submitting");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: value("fullName"),
          email: value("email"),
          companyName: value("companyName"),
          category: value("category"),
          subject: value("subject"),
          message: value("message"),
          privacyAccepted: true,
          website: value("website"),
          startedAt: startedAt.current,
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
        errors?: FieldErrors;
      } | null;

      if (res.ok && data?.ok) {
        setStatus("success");
        setMessage(data.message ?? "Thank you. Your inquiry has been received.");
        form.reset();
      } else {
        setStatus("error");
        setErrors(data?.errors ?? {});
        setMessage(
          data?.message ??
            (res.status === 429
              ? "Too many requests. Please try again later."
              : "Something went wrong. Please try again."),
        );
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    } finally {
      inFlight.current = false;
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  if (status === "success") {
    return (
      <div
        ref={summaryRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-emerald-900"
      >
        <h2 className="text-2xl font-bold">Inquiry received</h2>
        <p className="mt-3 leading-relaxed">{message}</p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setMessage("");
            startedAt.current = Date.now();
          }}
          className="mt-5 text-sm font-semibold text-emerald-900 underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";
  const describedBy = (id: string) => (errors[id] ? `${id}-error` : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-busy={submitting}>
      <div ref={summaryRef} tabIndex={-1} aria-live="polite" className="focus:outline-none">
        {message && status !== "submitting" ? (
          <p
            role={status === "error" || Object.keys(errors).length > 0 ? "alert" : undefined}
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
          >
            {message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="fullName" label="Full name" error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            className={inputClass}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={describedBy("fullName")}
          />
        </Field>
        <Field id="email" label="Email address" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            className={inputClass}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="companyName" label="Company / Organization" optional error={errors.companyName}>
          <input
            id="companyName"
            name="companyName"
            type="text"
            autoComplete="organization"
            maxLength={120}
            className={inputClass}
            aria-invalid={Boolean(errors.companyName)}
            aria-describedby={describedBy("companyName")}
          />
        </Field>
        <Field id="category" label="Inquiry category" error={errors.category}>
          <select
            id="category"
            name="category"
            required
            defaultValue={initialCategory}
            className={inputClass}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={describedBy("category")}
          >
            <option value="" disabled>
              Select a category
            </option>
            {inquiryCategories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="subject" label="Subject" error={errors.subject}>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          maxLength={150}
          className={inputClass}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={describedBy("subject")}
        />
      </Field>

      <Field id="message" label="Project or inquiry description" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          maxLength={3000}
          className={inputClass}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive technology, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="privacyAccepted"
            name="privacyAccepted"
            type="checkbox"
            className="mt-1 h-5 w-5 rounded border-ink-300 text-brand-700"
            aria-invalid={Boolean(errors.privacyAccepted)}
            aria-describedby={describedBy("privacyAccepted")}
          />
          <label htmlFor="privacyAccepted" className="text-sm leading-relaxed text-ink-700">
            I have read the{" "}
            <Link href="/privacy-policy" className="font-semibold text-brand-700 underline">
              Privacy Policy
            </Link>{" "}
            and agree that TanimXploit may use my details to respond to this inquiry.
          </label>
        </div>
        {errors.privacyAccepted ? (
          <p id="privacyAccepted-error" className="mt-1.5 text-sm font-medium text-red-700">
            {errors.privacyAccepted}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center rounded-lg bg-brand-700 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Sending..." : "Send inquiry"}
      </button>
    </form>
  );
}
