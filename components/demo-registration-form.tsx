"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { INDUSTRIES, validateDemoRegistration, type RegistrationData } from "@/lib/demo-validation.mjs";

type FormValues = Omit<RegistrationData, "consent"> & { consent: boolean };
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
  consent: false,
  marketingOptIn: false,
};

function createIdempotencyKey() {
  const webCrypto = globalThis.crypto as Crypto & { randomUUID?: () => string };
  if (typeof webCrypto.randomUUID === "function") return webCrypto.randomUUID().replaceAll("-", "");
  const bytes = new Uint8Array(16);
  webCrypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function DemoRegistrationForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>({ kind: "idle" });
  const [pending, setPending] = useState(false);
  const pendingAttempt = useRef<{ idempotencyKey: string; body: string } | null>(null);
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
    const companyWebsite =
      formRef.current?.querySelector<HTMLInputElement>('[name="company_website"]')?.value ?? "";
    const requestBody = JSON.stringify({ ...validation.data, company_website: companyWebsite });
    if (!pendingAttempt.current || pendingAttempt.current.body !== requestBody) {
      pendingAttempt.current = { idempotencyKey: createIdempotencyKey(), body: requestBody };
    }
    const attempt = pendingAttempt.current!;

    try {
      const response = await fetch("/api/demo/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": attempt.idempotencyKey,
        },
        body: attempt.body,
      });
      const result = await response.json().catch(() => null) as
        | { ok?: boolean; mode?: string; message?: string; fieldErrors?: Record<string, string> }
        | null;

      if (!response.ok) {
        if (result?.fieldErrors) setFieldErrors(result.fieldErrors);
        setStatus({
          kind: "error",
          message: result?.message || "Demo registration is temporarily unavailable. Please try again later or contact Argel.",
        });
        return;
      }

      if (result?.ok !== true) {
        setStatus({ kind: "error", message: "We could not confirm the request. Please try again." });
        return;
      }

      pendingAttempt.current = null;
      if (result.mode === "mock") {
        setStatus({ kind: "mock", message: result.message || "Local mock registration accepted. No email was sent." });
      } else {
        setStatus({
          kind: "success",
          message: result.message || "If your request can proceed, we’ll send a secure iAcquireOS demo link to your work email.",
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
          <h3>{isMock ? "Form path confirmed." : "Request received."}</h3>
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
            {INDUSTRIES.map((industry) => <option value={industry.value} key={industry.value}>{industry.label}</option>)}
          </select>
          {fieldErrors.industry ? <small id="industry-error" className="field-error">{fieldErrors.industry}</small> : null}
        </div>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company_website">Website</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <div className="privacy-acknowledgement">
        <label className="consent-row is-required" htmlFor="consent">
          <input id="consent" name="consent" type="checkbox" required checked={values.consent} aria-invalid={Boolean(fieldErrors.consent)} aria-describedby={fieldErrors.consent ? "consent-error" : "consent-details"} onChange={(event) => updateValue("consent", event.target.checked)} />
          <span>I have read and acknowledge the demo privacy notice. <span aria-hidden="true">*</span></span>
        </label>
        <p id="consent-details" className="consent-detail">This notice explains how your details are used to prepare demo access. <a href="/privacy">Read the privacy notice</a>.</p>
        {fieldErrors.consent ? <small id="consent-error" className="field-error">{fieldErrors.consent}</small> : null}
      </div>
      <label className="consent-row marketing-opt-in" htmlFor="marketingOptIn">
        <input id="marketingOptIn" name="marketingOptIn" type="checkbox" checked={values.marketingOptIn} onChange={(event) => updateValue("marketingOptIn", event.target.checked)} />
        <span>Email me occasional iAcquireOS product updates. This is optional and separate from my demo request.</span>
      </label>
      <button className="button button-primary submit-button" type="submit" disabled={pending}>
        {pending ? <><span className="loading-spinner" aria-hidden="true" /> Sending secure request…</> : <>Send me the demo link <ArrowRightIcon /></>}
      </button>
      <p className="privacy-disclosure">We use your details to process your demo request and send a transactional verification link. Promotional messages are sent only if you opt in above.</p>
    </form>
  );
}
