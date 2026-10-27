import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { DemoRegistrationForm } from "@/components/demo-registration-form";
import { SectionHeading } from "@/components/section-heading";

const steps = [
  "Share your business details",
  "Receive a unique verification link by email",
  "Confirm entry when you are ready to begin",
];

export function DemoSection() {
  return (
    <section className="section-pad section-demo" id="demo">
      <div className="container">
        <SectionHeading
          eyebrow="Start with the risk-free step"
          title={<>See iAcquireOS working for <span className="gradient-text">your business.</span></>}
          description="Book a free demo. We’ll show you the acquisition system, how it could fit your workflow, and what would need to happen to deploy it. If you don’t like it, walk away for free."
        />
        <div className="demo-layout">
          <div className="demo-info-card">
            <div className="demo-info-heading"><span className="demo-icon"><CheckIcon /></span><div><span className="tiny-label">PERSONALIZED ACCESS</span><h3>Try it on your own terms.</h3></div></div>
            <div className="demo-steps">
              {steps.map((step, index) => <div className="demo-step" key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></div>)}
            </div>
            <div className="demo-facts">
              <div><b>24 hours</b><small>Begins after your first confirmed entry in iAcquireOS</small></div>
              <div><b>10 AI messages</b><small>Within the existing demo experience</small></div>
              <div><b>Free consultation</b><small>Talk through your workflow with Argel</small></div>
            </div>
            <p className="demo-timer-note"><span className="timer-dot" /> Opening an email link does not start the demo timer.</p>
            <a className="demo-consult-link" href="https://wa.me/639124742642?text=Hi%20Argel%2C%20I%E2%80%99d%20like%20to%20book%20a%20free%20iAcquireOS%20consultation." target="_blank" rel="noreferrer">Prefer to talk first? Book a free consultation <ArrowRightIcon /></a>
          </div>
          <div className="form-card"><DemoRegistrationForm /></div>
        </div>
        <p className="demo-platform-note">The iAcquireOS application at iacquire.online remains the authority for email verification, demo activation, access duration, and message limits.</p>
      </div>
    </section>
  );
}
