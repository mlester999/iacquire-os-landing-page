import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo registration privacy notice",
  description: "How iAcquireOS uses information submitted with a demo request.",
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="page-shell privacy-page">
      <div className="container narrow-container">
        <p className="eyebrow">Privacy notice</p>
        <h1>What happens to your demo request</h1>
        <p className="privacy-lede">
          This summary applies to information submitted through the iAcquireOS marketing site demo form.
          It is a plain-language notice, not a substitute for the application’s full privacy policy.
        </p>

        <section className="privacy-block">
          <h2>Information and purpose</h2>
          <p>
            The form asks for your name, work email, business name, industry, and optional marketing
            preference. Those details are used to process a personalized demo request and, when
            registration is configured, send a transactional verification email through the existing
            iAcquireOS application.
          </p>
        </section>
        <section className="privacy-block">
          <h2>Marketing messages are optional</h2>
          <p>
            The marketing checkbox is optional and unchecked by default. A demo request does not by
            itself opt you into promotional messages.
          </p>
        </section>
        <section className="privacy-block">
          <h2>Demo access</h2>
          <p>
            The existing iAcquireOS application controls demo verification and access. The 24-hour
            period begins only after you confirm entry for the first time inside the application.
            Opening or refreshing an email link does not start that period.
          </p>
        </section>
        <section className="privacy-block">
          <h2>Questions</h2>
          <p>
            For questions about a demo request, contact Argel at{" "}
            <a href="mailto:argelplaton.ai@gmail.com">argelplaton.ai@gmail.com</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
