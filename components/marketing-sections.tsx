import Image from "next/image";
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon, SparkIcon } from "@/components/icons";
import { HeroPreview } from "@/components/hero-preview";
import { SectionHeading } from "@/components/section-heading";

const problems = [
  {
    number: "01",
    label: "B2B SaaS founders",
    title: "The founder is still the sales team.",
    body: "A valuable offer can have a real pipeline before it is ready for a full sales organization.",
    detail: "Inbound reaches the founder, outbound is inconsistent, and slow follow-up can let interest cool.",
  },
  {
    number: "02",
    label: "High-ticket agencies",
    title: "Referrals create a feast-or-famine cycle.",
    body: "Good months can still be followed by gaps when referrals are the main source of new conversations.",
    detail: "A steady acquisition process makes the pipeline easier to see and work.",
  },
  {
    number: "03",
    label: "Both segments",
    title: "The tools exist. The system doesn’t.",
    body: "Spreadsheets, calendars, a separate CRM, and scattered automations can leave the handoffs disconnected.",
    detail: "The goal is clear ownership from first signal through the next customer step.",
  },
];

const journey = [
  { number: "01", title: "Find", detail: "Research relevant opportunities" },
  { number: "02", title: "Connect", detail: "Prepare a timely first response" },
  { number: "03", title: "Qualify", detail: "Collect fit and intent details" },
  { number: "04", title: "Book", detail: "Offer real available meeting times" },
  { number: "05", title: "Convert", detail: "Keep follow-up and CRM visible" },
];

const modules = [
  { number: "01", stage: "Find", title: "Data Hunt", body: "Research relevant businesses, check source evidence, score potential opportunities, remove duplicates, and prepare records for review.", foot: "Verified research · Lead qualification · Human review" },
  { number: "02", stage: "Book", title: "Appointment Setter", body: "Help answer common questions, collect key details, qualify interested prospects, and offer real available meeting times through a connected calendar.", foot: "Lead response · Qualification · Calendar booking" },
  { number: "03", stage: "Convert", title: "Sales + Follow-Up", body: "Keep opportunities organized in the CRM, collect requirements after discovery calls, support proposal preparation, and track appropriate follow-ups.", foot: "CRM pipeline · Requirements · Follow-up" },
  { number: "04", stage: "Retain", title: "Customer Retention", body: "Support onboarding, common service questions, check-ins, feedback, renewal reminders, and relevant upsell or referral opportunities.", foot: "Onboarding · Customer support · Renewals" },
];

const employees = [
  { name: "Lead Hunter", role: "Finds relevant opportunities and verifies research." },
  { name: "Zeng Operations Manager", role: "Coordinates tasks and reports progress." },
  { name: "Appointment Setter", role: "Supports scheduling, reminders, and changes." },
  { name: "Sales Assistant", role: "Prepares sales replies, follow-up drafts, and proposal support." },
  { name: "CRM Manager", role: "Organizes contacts, opportunities, tags, and pipeline data." },
  { name: "Performance Analyst", role: "Reviews activity, booked calls, trends, and bottlenecks." },
];

const tools = [
  { name: "Hermes Agent", detail: "AI profiles, task delegation, skills, and tools" },
  { name: "GoHighLevel", detail: "CRM records, pipeline, forms, calendars, and workflows" },
  { name: "Slack", detail: "Internal access, reviews, alerts, and reports" },
  { name: "Database + APIs", detail: "Lead staging, source evidence, and integrations" },
  { name: "Optional integrations", detail: "n8n, Make, and voice services when required" },
];

const processSteps = [
  { number: "01", title: "Build", body: "Define the target customer and the acquisition workflow." },
  { number: "02", title: "Use", body: "Put the agreed flow into practice in a controlled scope." },
  { number: "03", title: "Measure", body: "Track leads, qualification, appointments, and customer outcomes." },
  { number: "04", title: "Document", body: "Record the workflow, results, lessons, and open work." },
  { number: "05", title: "Deploy", body: "Move forward with the parts that are ready and verified." },
];

const questions = [
  {
    question: "When does the 24-hour demo window begin?",
    answer: "Only after you verify your email and explicitly confirm your first entry inside the iAcquireOS application. Submitting the form, opening the email, or refreshing a link does not start the window.",
  },
  {
    question: "What is included in the free demo?",
    answer: "The existing application demo includes a four-step guided experience, free exploration, and up to ten AI messages. The application controls the demo state and any return access.",
  },
  {
    question: "What if my verification link expires?",
    answer: "The application should provide a controlled resend flow. Verification-link expiry is separate from the 24-hour demo period, and requesting a new link does not start the demo timer.",
  },
  {
    question: "Do I need to buy anything to try it?",
    answer: "No. Try the demo first. A free consultation is the primary next step; purchase is optional.",
  },
  {
    question: "What does implementation cost?",
    answer: "Implementation starts at US$1,499 one time. Optional Managed Maintenance + Automation Studio is US$299 per month.",
  },
];

export function HeroSection() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> AI-powered client acquisition system</span>
          <h1>If you’re still manually handling leads, <span className="gradient-text">you don’t have a sales system.</span></h1>
          <p className="hero-description">iAcquireOS connects lead research, qualification, follow-up, booking, and conversion support into one clear acquisition flow for high-ticket B2B businesses.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#demo">Try Free Demo <ArrowRightIcon /></a>
            <a className="button button-outline" href="#system">Explore the system <ArrowUpRightIcon /></a>
          </div>
          <div className="hero-points" aria-label="Product highlights">
            <span><CheckIcon /> See the system before you decide</span>
            <span><CheckIcon /> Human review for sensitive actions</span>
          </div>
        </div>
        <div className="hero-visual"><HeroPreview /><HeroStatRow /></div>
      </div>
    </section>
  );
}

function HeroStatRow() {
  return (
    <div className="hero-stat-row" aria-label="iAcquireOS workflow facts">
      <div><b>5</b><span>connected stages</span></div>
      <div><b>4</b><span>operating modules</span></div>
      <div><b>6</b><span>specialized AI Employees</span></div>
    </div>
  );
}

export function ProblemSection() {
  return (
    <section className="section-pad section-problem" id="problem">
      <div className="container">
        <SectionHeading
          eyebrow="The revenue gap"
          title={<>Build around a <span className="gradient-text">repeatable system,</span> not manual effort.</>}
          description="You do not necessarily need a large sales department. You need the speed, follow-up, qualification, and visibility a sales process is meant to provide."
        />
        <div className="problem-grid">
          {problems.map((problem) => (
            <article className="problem-card" key={problem.number}>
              <div className="problem-top"><span>{problem.number}</span><small>{problem.label}</small></div>
              <h3>{problem.title}</h3>
              <p>{problem.body}</p>
              <div className="problem-detail"><b>Typical situation</b><span>{problem.detail}</span></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SystemSection() {
  return (
    <section className="section-pad section-system" id="system">
      <div className="container">
        <SectionHeading
          eyebrow="The iAcquireOS approach"
          title={<>One connected acquisition <span className="gradient-text">operating system.</span></>}
          description="Instead of adding another isolated tool, iAcquireOS is designed to connect the critical handoffs between finding a prospect and supporting a customer."
        />
        <div className="journey-card">
          <div className="journey-head"><div><span className="tiny-label">THE PIPELINE FLOW</span><h3>From first signal to next step.</h3></div><span className="journey-status"><i /> One connected journey</span></div>
          <div className="journey-flow">
            {journey.map((step, index) => (
              <div className="journey-step" key={step.number}>
                <span className="journey-num">{step.number}</span>
                <b>{step.title}</b>
                <small>{step.detail}</small>
                {index < journey.length - 1 ? <span className="journey-arrow" aria-hidden="true">→</span> : null}
              </div>
            ))}
          </div>
          <div className="journey-foot"><span><SparkIcon /> People review sensitive actions and customer commitments.</span><a href="#system-overview">See how each stage works <ArrowRightIcon /></a></div>
        </div>
        <div className="value-strip">
          <div><span className="value-icon"><CheckIcon /></span><p><b>Speed-to-lead</b><small>Respond and route opportunities promptly.</small></p></div>
          <div><span className="value-icon"><CheckIcon /></span><p><b>Qualification before the calendar</b><small>Collect fit details before a sales conversation.</small></p></div>
          <div><span className="value-icon"><CheckIcon /></span><p><b>One source of truth</b><small>Keep status, ownership, communication, and meetings connected.</small></p></div>
        </div>
      </div>
    </section>
  );
}

export function SystemOverviewSection() {
  return (
    <section className="section-pad section-overview" id="system-overview">
      <div className="container">
        <SectionHeading
          eyebrow="Inside the system"
          title={<>Four operating modules. <span className="gradient-text">One journey.</span></>}
          description="The workflow is designed to support the customer path—from finding relevant opportunities to helping customers after a sale."
        />
        <div className="module-grid">
          {modules.map((module) => (
            <article className="module-card" key={module.number}>
              <div className="module-meta"><span>{module.number}</span><small>{module.stage}</small></div>
              <h3>{module.title}</h3>
              <p>{module.body}</p>
              <div className="module-foot">{module.foot}</div>
            </article>
          ))}
        </div>

        <div className="workforce-card">
          <div className="workforce-copy">
            <span className="eyebrow">The AI workforce</span>
            <h3>Six specialized AI Employees.</h3>
            <p>Hermes Agent coordinates the profiles. Each role has a defined responsibility, while people retain approval over sensitive decisions and customer commitments.</p>
            <div className="workforce-note"><SparkIcon /> Human review stays part of the workflow.</div>
          </div>
          <div className="employee-grid">
            {employees.map((employee, index) => (
              <div className="employee-card" key={employee.name}>
                <span className={`employee-index employee-index-${index % 3}`}>{String(index + 1).padStart(2, "0")}</span>
                <div><b>{employee.name}</b><small>{employee.role}</small></div>
              </div>
            ))}
          </div>
        </div>

        <div className="stack-card">
          <div className="stack-intro"><span className="eyebrow">Connected tools</span><h3>Technology chosen for the workflow.</h3><p>Tools depend on the implementation. Some integrations still need activation and end-to-end testing before they can be described as live.</p></div>
          <div className="stack-list">
            {tools.map((tool) => <div className="stack-row" key={tool.name}><span className="stack-bullet"><CheckIcon /></span><span><b>{tool.name}</b><small>{tool.detail}</small></span></div>)}
          </div>
        </div>
        <p className="status-caveat"><span className="status-caveat-dot" /> Built in stages. Integrations and workflows are tested before they are promised as live.</p>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="section-pad section-process" id="process">
      <div className="container">
        <SectionHeading
          eyebrow="How implementation works"
          title={<>A practical path from plan <span className="gradient-text">to deployment.</span></>}
          description="Keep the scope visible, verify the handoffs, and move forward with what is ready for the business."
        />
        <div className="process-track">
          {processSteps.map((step) => (
            <article className="process-step" key={step.number}>
              <small>{step.number}</small><span className="process-line" aria-hidden="true" /><b>{step.title}</b><p>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OfferSection() {
  return (
    <section className="section-pad section-offer" id="pricing">
      <div className="container">
        <SectionHeading
          eyebrow="The investment"
          title={<>Start with implementation. <span className="gradient-text">Add support if you need it.</span></>}
          description="Try the existing demo first. A consultation helps determine the workflow and scope before any purchase decision."
        />
        <div className="offer-grid">
          <article className="offer-card offer-card-primary">
            <span className="offer-kicker"><span className="eyebrow-dot" /> Starting implementation</span>
            <p className="offer-price"><span>US$</span>1,499<small>one time · starting fee</small></p>
            <p className="offer-description">Implementation, configuration, and launch of the agreed acquisition workflow.</p>
            <ul className="offer-list">
              <li><CheckIcon /> Scope defined around your business</li>
              <li><CheckIcon /> Connected acquisition workflow</li>
              <li><CheckIcon /> Review and handoff before launch</li>
            </ul>
            <a className="button button-primary" href="#demo">Try the free demo <ArrowRightIcon /></a>
          </article>
          <article className="offer-card offer-card-secondary">
            <span className="offer-kicker offer-kicker-muted">Optional ongoing support</span>
            <p className="offer-price"><span>US$</span>299<small>per month · optional</small></p>
            <h3>Managed Maintenance + Automation Studio</h3>
            <p className="offer-description">An optional monthly service for managed maintenance and Automation Studio support.</p>
            <div className="offer-note"><SparkIcon /> Choose this only if ongoing support fits your needs.</div>
            <a className="button button-outline" href="#contact">Ask about a consultation <ArrowUpRightIcon /></a>
          </article>
        </div>
        <p className="offer-footnote">The consultation is the main sales-conversion step after the demo. Direct purchase is optional.</p>
      </div>
    </section>
  );
}

export function FounderSection() {
  return (
    <section className="section-pad section-founder" id="founder">
      <div className="container">
        <SectionHeading
          eyebrow="Founder accountability"
          title={<>One relationship. <span className="gradient-text">One accountable person.</span></>}
          description="Personal branding is not decoration here. It makes it clear who owns the relationship and who is responsible for the work."
        />
        <div className="founder-layout">
          <article className="founder-card">
            <div className="founder-photo-wrap">
              <Image src="/images/argel-platon-in-car.jpg" width={768} height={1369} alt="Argel Platon, founder of iAcquireOS, seated in a car" sizes="(max-width: 800px) 100vw, 390px" />
              <span className="portrait-location"><i /> Based in the Philippines</span>
            </div>
            <div className="founder-card-copy"><span className="eyebrow">Founder · GTM</span><h3>Argel Platon</h3><p>Building the positioning, acquisition strategy, client journey, and team-backed operation behind iAcquireOS.</p><div className="founder-links"><a href="https://www.linkedin.com/in/argelplaton/" target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRightIcon /></a><a href="mailto:argelplaton.ai@gmail.com">Send an email <ArrowUpRightIcon /></a></div></div>
          </article>
          <div className="accountability-column">
            <div className="accountability-quote"><span className="quote-mark">“</span><p>You message one person, get handed to a sales rep, then account management, then someone you have never met—and nobody feels like the person who truly owns the outcome.</p><b>iAcquireOS keeps that relationship close to the founder.</b></div>
            <div className="accountability-grid">
              <div><b>The person you meet</b><p>Stays connected to the client relationship.</p></div>
              <div><b>The person accountable</b><p>Has a direct reason to care when communication breaks.</p></div>
              <div><b>A team-backed operation</b><p>Specialized AI, development, and operations work supports delivery.</p></div>
              <div><b>Experience in service</b><p>Customer communication across phone, chat, and email.</p></div>
            </div>
          </div>
        </div>
        <div className="experience-row">
          <div><small>2024–2026</small><b>T-Mobile · Customer Service</b><span>Phone-based support, communication, and high-volume customer interactions.</span></div>
          <div><small>2023–2024</small><b>Booking.com · Customer Service</b><span>Chat, email, and call support focused on issue resolution and customer experience.</span></div>
          <div><small>Current</small><b>iAcquireOS · Founder / GTM</b><span>Positioning, acquisition strategy, client journey, personal brand, and team-backed operations.</span></div>
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="section-pad section-faq" id="faq">
      <div className="container faq-layout">
        <div className="faq-heading"><span className="eyebrow">A few useful details</span><h2>Questions before you <span className="gradient-text">step inside?</span></h2><p>The existing iAcquireOS application controls verification, demo access, and the demo timer.</p><a className="text-link" href="#demo">Try the free demo <ArrowRightIcon /></a></div>
        <div className="faq-list">
          {questions.map((item, index) => (
            <details className="faq-item" key={item.question} open={index === 0}>
              <summary><span>{item.question}</span><span className="faq-plus" aria-hidden="true">+</span></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  const whatsapp = "https://wa.me/639124742642?text=Hi%20Argel%2C%20I%E2%80%99d%20like%20to%20book%20a%20free%20iAcquireOS%20consultation.";
  return (
    <section className="section-pad section-final-cta" id="contact">
      <div className="container">
        <div className="final-cta-card">
          <div className="cta-decoration" aria-hidden="true"><span /><span /><span /></div>
          <span className="eyebrow">Start with a real conversation</span>
          <h2>See if iAcquireOS fits <span className="gradient-text">your business.</span></h2>
          <p>Try the personalized demo first. Then talk with Argel about your goals, the workflow, and what implementation would involve.</p>
          <div className="final-cta-actions">
            <a className="button button-primary" href="#demo">Try Free Demo <ArrowRightIcon /></a>
            <a className="button button-outline" href={whatsapp} target="_blank" rel="noreferrer">Book Free Consultation <ArrowUpRightIcon /></a>
          </div>
          <small>No purchase required to try the demo.</small>
        </div>
      </div>
    </section>
  );
}
