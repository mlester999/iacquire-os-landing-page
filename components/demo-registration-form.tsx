"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { INDUSTRIES, validateDemoRegistration, type RegistrationData } from "@/lib/demo-validation.mjs";

type FormValues = RegistrationData;
type FormStatus =
  | { kind: "idle" }
  | { kind: "error"; message: string }
  | { kind: "success"; message: string }
  | { kind: "mock"; message: string };

const initialValues: FormValues = {
  fullName: "",
  email: "",
  businessName: "",
  industry: "" as FormValues["industry"],
  marketingConsent: false,
};

function createIdempotencyKey() {
  const webCrypto = globalThis.crypto as Crypto & { randomUUID?: () => string };
  if (typeof webCrypto.randomUUID === "function") return webCrypto.randomUUID();
  const bytes = new Uint8Array(16);
  webCrypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function DemoRegistrationForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>({ kind: "idle" });
  const [pending, setPending] = useState(false);
  const idempotencyKey = useRef<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function updateValue<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
    if (status.kind === "error") {
      setStatus({ kind: "idle" });
      idempotencyKey.current = null;
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const validation = validateDemoRegistration(values);
    if (!validation.success) {
      setFieldErrors(validation.fieldErrors);
      setStatus({ kind: "error", message: "Check the highlighted fields and try again." });
      window.setTimeout(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 0);
      return;
    }

    setFieldErrors({});
    setStatus({ kind: "idle" });
    setPending(true);
    idempotencyKey.current ??= createIdempotencyKey();

    try {
      const response = await fetch("/api/demo/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey.current,
        },
        body: JSON.stringify({ ...validation.data, website: "" }),
      });
      const result = await response.json().catch(() => null) as
        | { status?: string; mode?: string; message?: string; fieldErrors?: Record<string, string> }
        | null;

      if (!response.ok) {
        if (result?.fieldErrors) setFieldErrors(result.fieldErrors);
        setStatus({
          kind: "error",
          message: result?.message || "Demo registration is temporarily unavailable. Please try again later or contact Argel.",
        });
        return;
      }

      if (result?.status !== "accepted") {
        setStatus({ kind: "error", message: "We could not confirm the request. Please try again." });
        return;
      }

      idempotencyKey.current = null;
      if (result.mode === "mock") {
        setStatus({ kind: "mock", message: result.message || "Local mock registration accepted. No email was sent." });
      } else {
        setStatus({
          kind: "success",
          message: result.message || "Check your email. We’ve sent you a secure link to access your personalized iAcquireOS demo.",
        });
      }
    } catch {
      setStatus({
        kind: "error",
        message: "Demo registration is temporarily unavailable. Please try again later or contact Argel.",
      });
    } finally {
      setPending(false);
    }
  }

  if (status.kind === "success" || status.kind === "mock") {
    const isMock = status.kind === "mock";
    return (
      <div className={`registration-success${isMock ? " is-mock" : ""}`} role="status" aria-live="polite">
        <span className="success-icon"><CheckIcon /></span>
        <div>
          <span className="eyebrow">{isMock ? "Local test mode" : "Next step"}</span>
          <h3>{isMock ? "Form path confirmed." : "Check your inbox."}</h3>
          <p>{status.message}</p>
          {!isMock ? <small>Your 24-hour demo window begins only after you confirm your first entry in iAcquireOS.</small> : null}
        </div>
      </div>
    );
  }

  return (
    <form className="demo-form" ref={formRef} onSubmit={handleSubmit} noValidate>
      <div className="form-heading"><span className="form-step">01</span><div><b>Request your secure demo link</b><small>Four quick details. No purchase required.</small></div></div>
      {status.kind === "error" ? <p className="form-status-error" role="alert">{status.message}</p> : null}
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="fullName">Full name <span aria-hidden="true">*</span></label>
          <input id="fullName" name="fullName" type="text" autoComplete="name" maxLength={120} required value={values.fullName} aria-invalid={Boolean(fieldErrors.fullName)} aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined} onChange={(event: ChangeEvent<HTMLInputElement>) => updateValue("fullName", event.target.value)} />
          {fieldErrors.fullName ? <small id="fullName-error" className="field-error">{fieldErrors.fullName}</small> : null}
        </div>
        <div className="form-field">
          <label htmlFor="email">Work email <span aria-hidden="true">*</span></label>
          <input id="email" name="email" type="email" autoComplete="email" maxLength={254} required value={values.email} aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "email-error" : undefined} onChange={(event: ChangeEvent<HTMLInputElement>) => updateValue("email", event.target.value)} />
          {fieldErrors.email ? <small id="email-error" className="field-error">{fieldErrors.email}</small> : null}
        </div>
        <div className="form-field">
          <label htmlFor="businessName">Business name <span aria-hidden="true">*</span></label>
          <input id="businessName" name="businessName" type="text" autoComplete="organization" maxLength={160} required value={values.businessName} aria-invalid={Boolean(fieldErrors.businessName)} aria-describedby={fieldErrors.businessName ? "businessName-error" : undefined} onChange={(event: ChangeEvent<HTMLInputElement>) => updateValue("businessName", event.target.value)} />
          {fieldErrors.businessName ? <small id="businessName-error" className="field-error">{fieldErrors.businessName}</small> : null}
        </div>
        <div className="form-field">
          <label htmlFor="industry">Industry <span aria-hidden="true">*</span></label>
          <select id="industry" name="industry" required value={values.industry} aria-invalid={Boolean(fieldErrors.industry)} aria-describedby={fieldErrors.industry ? "industry-error" : undefined} onChange={(event: ChangeEvent<HTMLSelectElement>) => updateValue("industry", event.target.value as FormValues["industry"])}>
            <option value="" disabled>Select your industry</option>
            {INDUSTRIES.map((industry) => <option value={industry} key={industry}>{industry}</option>)}
          </select>
          {fieldErrors.industry ? <small id="industry-error" className="field-error">{fieldErrors.industry}</small> : null}
        </div>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value="" readOnly />
      </div>
      <label className="consent-row" htmlFor="marketingConsent">
        <input id="marketingConsent" name="marketingConsent" type="checkbox" checked={values.marketingConsent} onChange={(event) => updateValue("marketingConsent", event.target.checked)} />
        <span>Send me occasional iAcquireOS product updates. This is optional and separate from my demo link.</span>
      </label>
      {fieldErrors.marketingConsent ? <small className="field-error">{fieldErrors.marketingConsent}</small> : null}
      <button className="button button-primary submit-button" type="submit" disabled={pending}>
        {pending ? <><span className="loading-spinner" aria-hidden="true" /> Sending secure request…</> : <>Send me the demo link <ArrowRightIcon /></>}
      </button>
      <p className="privacy-disclosure">By submitting, you ask iAcquireOS to use these details to prepare demo access and send a transactional verification link. Marketing messages are sent only if you opt in. <a href="/privacy">Read the privacy notice</a>.</p>
    </form>
  );
}
