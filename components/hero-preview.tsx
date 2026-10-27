import Image from "next/image";
import { CheckIcon } from "@/components/icons";

const modules = [
  { number: "01", name: "Data Hunt", action: "Find + verify" },
  { number: "02", name: "Appointment Setter", action: "Qualify + book" },
  { number: "03", name: "Sales + Follow-Up", action: "Move opportunities" },
  { number: "04", name: "Customer Retention", action: "Support + renew" },
];

const specialists = [
  "Lead Hunter",
  "Operations Manager",
  "Appointment Setter",
  "Sales Assistant",
  "CRM Manager",
  "Performance Analyst",
];

export function HeroPreview() {
  return (
    <div className="hero-art" role="group" aria-label="Founder portrait and iAcquireOS system map">
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      <figure className="hero-founder-portrait">
        <Image
          src="/images/argel-platon-portrait.jpg"
          width={913}
          height={1200}
          alt="Argel Platon, founder of iAcquireOS, seated outdoors in the Philippines"
          sizes="(max-width: 700px) calc(100vw - 32px), (max-width: 920px) 680px, (max-width: 1440px) 46vw, 560px"
          loading="eager"
        />
        <figcaption className="hero-portrait-caption">
          <span>Founder-led</span>
          <b>Argel Platon</b>
          <small>Based in the Philippines</small>
        </figcaption>
      </figure>
      <div className="hero-system-card">
        <div className="hero-system-topline">
          <span className="hero-system-kicker"><i /> iAcquireOS system map</span>
          <span className="hero-system-count">4 modules</span>
        </div>
        <b className="hero-system-title">One connected client journey</b>
        <ol className="hero-module-grid" aria-label="Four iAcquireOS operating modules">
          {modules.map((module) => (
            <li key={module.number}>
              <small>{module.number}</small>
              <b>{module.name}</b>
              <span>{module.action}</span>
            </li>
          ))}
        </ol>
        <div className="hero-specialists">
          <span>Six specialist roles</span>
          <ul aria-label="iAcquireOS specialist roles">
            {specialists.map((specialist) => <li key={specialist}>{specialist}</li>)}
          </ul>
        </div>
        <p><CheckIcon /> People review sensitive actions and customer commitments.</p>
      </div>
    </div>
  );
}
