import Image from "next/image";
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon, SparkIcon } from "@/components/icons";
import { HeroFounderPortrait } from "@/components/hero-founder-portrait";
import { SectionHeading } from "@/components/section-heading";

const problems = [
  {
    number: "01",
    label: "B2B SaaS founders",
    title: "The founder is still the sales team.",
    body: "With $2,000–$10,000+ average contract values, the business is valuable enough to need a real pipeline — but not always ready to justify a formal sales organization.",
  },
  {
    number: "02",
    label: "High-ticket agencies",
    title: "Referrals create a feast-or-famine cycle.",
    body: "Agencies charging $3,000–$10,000+/month often depend heavily on referrals instead of operating a predictable acquisition engine.",
  },
  {
    number: "03",
    label: "Both segments",
    title: "The tools exist. The system doesn’t.",
    body: "Spreadsheets, Calendly, a separate CRM and scattered automations create disconnected steps. Leads get delayed, duplicated, forgotten or lost.",
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
  { number: "01", title: "Deploy", body: "Deploy the acquisition system around the target ICP." },
  { number: "02", title: "Run", body: "Run the system on iAcquireOS before scaling the offer." },
  { number: "03", title: "Track", body: "Track leads, qualification, appointments and acquired clients." },
  { number: "04", title: "Capture", body: "Capture the workflow, results, lessons and proof." },
  { number: "05", title: "Bring", body: "Bring the proven operating model to qualified clients." },
];

const founderCapabilities = [
  "Client Communication",
  "Customer Experience",
  "Lead Generation",
  "Appointment Setting",
  "Sales Operations",
  "AI Automation",
  "GoHighLevel",
  "n8n",
  "Make",
  "CRM Workflows",
  "AI Agents",
  "Business Systems",
  "Project Coordination",
  "Personal Branding",
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
    <section className="reference-hero" id="home">
      <div className="container reference-hero-container">
        <div className="reference-hero-grid">
          <div className="reference-hero-copy">
            <span className="reference-hero-eyebrow">AI-Powered Client Acquisition System</span>
            <h1>If you&apos;re still manually handling leads, <span className="reference-hero-gradient">you don&apos;t have a sales system.</span></h1>
            <p>iAcquireOS is built for high-ticket B2B companies that have a valuable offer but no predictable sales engine — turning lead capture, qualification, follow-up, booking and conversion into one connected acquisition system.</p>
            <div className="reference-demo-hook">
              <b>See it working before you commit.</b>
              <span>Test the system for your own business. If you don&apos;t like it, walk away for free.</span>
            </div>
            <div className="reference-hero-actions">
              <a className="button button-primary" href="#demo">Test the Free Demo <span aria-hidden="true">→</span></a>
              <a className="button button-outline" href="#problem">See if you&apos;re a fit</a>
            </div>
            <div className="reference-hero-micro">
              <span>One-time implementation</span>
              <span>No monthly retainer</span>
              <span>Commission tied to acquired clients</span>
            </div>
          </div>
          <HeroFounderPortrait />
        </div>
        <HeroStatRow />
      </div>
    </section>
  );
}

function HeroStatRow() {
  return (
    <div className="reference-hero-statbar" aria-label="Business and system facts">
      <div className="reference-hero-stat"><b>$2K–$10K+</b><span>Target SaaS ACV</span></div>
      <div className="reference-hero-stat"><b>$3K–$10K+/mo</b><span>Target agency retainers</span></div>
      <div className="reference-hero-stat"><b>$120K+/yr</b><span>In-house sales team problem</span></div>
      <div className="reference-hero-stat"><b>1 system</b><span>Connected acquisition flow</span></div>
    </div>
  );
}

export function ProblemSection() {
  return (
    <section className="section-pad section-problem" id="problem">
      <div className="container">
        <SectionHeading
          eyebrow="The revenue gap"
          title="When client acquisition depends on manual work, you’re building a business around effort instead of a system."
          description="You don’t necessarily need a huge sales department. You need the speed, follow-up, qualification and visibility that a sales department is supposed to provide."
        />
        <div className="problem-grid">
          {problems.map((problem) => (
            <article className="problem-card" key={problem.number}>
              <div className="problem-top"><span>{problem.number}</span><small>{problem.label}</small></div>
              <h3>{problem.title}</h3>
              <p>{problem.body}</p>
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
          description="Instead of adding another isolated tool, iAcquireOS connects the critical stages between finding a prospect and creating a customer."
        />
        <div className="journey-card">
          <div className="journey-head"><div><span className="tiny-label">THE PIPELINE FLOW</span><h3>The machine behind the pipeline.</h3><p>Lead data, AI outreach, qualification, appointment booking, CRM movement and conversion support are designed to work as one flow.</p></div><span className="journey-status"><i /> One connected journey</span></div>
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
          <div><span className="value-icon"><CheckIcon /></span><p><b>Speed-to-lead</b><small>Respond and route opportunities quickly instead of waiting for a founder to notice an inbox notification.</small></p></div>
          <div><span className="value-icon"><CheckIcon /></span><p><b>Lead qualification</b><small>Collect the information needed to determine whether a prospect is worth a sales conversation.</small></p></div>
          <div><span className="value-icon"><CheckIcon /></span><p><b>Connected pipeline</b><small>Keep lead status, ownership, communication and appointments connected instead of scattered across tools.</small></p></div>
          <div><span className="value-icon"><CheckIcon /></span><p><b>Customer economics</b><small>Designed around businesses where one additional customer can materially change the economics of the system.</small></p></div>
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
          title={<>Four stages. <span className="gradient-text">One connected journey.</span></>}
          description="A closer look at how iAcquireOS is designed to support the customer journey—from finding relevant opportunities to supporting customers after the sale."
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
          <div className="stack-intro"><span className="eyebrow">Connected tools</span><h3>The technology behind the workflow.</h3><p>Tools are connected according to the functions needed for the implementation.</p></div>
          <div className="stack-list">
            {tools.map((tool) => <div className="stack-row" key={tool.name}><span className="stack-bullet"><CheckIcon /></span><span><b>{tool.name}</b><small>{tool.detail}</small></span></div>)}
          </div>
        </div>
        <p className="status-caveat"><span className="status-caveat-dot" /> The system overview describes the intended architecture and the current build at different stages of completion. Some integrations and workflows still require testing, activation, and end-to-end quality assurance before they can be presented as fully operational.</p>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="section-pad section-process" id="process">
      <div className="container">
        <SectionHeading
          eyebrow="The proof in the process"
          title="You’re experiencing the point."
          description="From the moment you land here, you’re experiencing the same acquisition process we’re building for our clients. If you explore, qualify, and book a demo, you’ve just become a lead generated through the system. If this system can move you from visitor → prospect → qualified lead → booked conversation, you’re seeing what it was built to do."
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
          title="One-time implementation. No monthly retainer."
          description="The offer is designed around implementation and performance alignment rather than locking the client into another perpetual service bill."
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
        <p className="offer-footnote">That means building it, putting it to work, measuring what happens, and using the evidence to improve the next deployment. The consultation is the main sales-conversion step after the demo; direct purchase is optional.</p>
      </div>
    </section>
  );
}

export function FounderSection() {
  return (
    <section className="section-pad section-founder" id="founder">
      <div className="container">
        <SectionHeading
          eyebrow="One relationship. One accountable person."
          title={<>One relationship. <span className="gradient-text">One accountable person.</span></>}
          description="Personal branding is not decoration here. It changes who owns the relationship when something goes wrong."
        />
        <div className="founder-layout">
          <article className="founder-card">
            <div className="founder-photo-wrap">
              <Image src="/images/argel-platon-portrait.jpg" width={913} height={1200} alt="Argel Platon, founder of iAcquireOS, seated outdoors in the Philippines" sizes="(max-width: 800px) 100vw, 390px" />
              <span className="portrait-location"><i /> Based in the Philippines</span>
            </div>
            <div className="founder-card-copy"><span className="eyebrow">Founder · GTM</span><h3>Argel Platon</h3><p>Founder-led positioning, client acquisition, customer experience and business development — supported by a specialized AI development and operations team.</p><div className="founder-links"><a href="https://www.linkedin.com/in/argelplaton/" target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRightIcon /></a><a href="mailto:argelplaton.ai@gmail.com">Send an email <ArrowUpRightIcon /></a></div></div>
          </article>
          <div className="accountability-column">
            <div className="accountability-quote"><span className="quote-mark">“</span><p>You message one person, get handed to a sales rep, then account management, then a VA you’ve never met — and nobody feels like the person who truly owns the outcome.</p><b>iAcquireOS collapses that chain.</b></div>
            <div className="accountability-grid">
              <div><b>The person you meet</b><p>The person you meet is the founder. The person you can hold accountable is the founder. The reputation attached to the outcome is the founder’s.</p></div>
              <div><b>Connected after the sale</b><p>The founder stays connected to the relationship instead of disappearing after the sale.</p></div>
              <div><b>Founder accountability</b><p>The founder has a direct reason to care when the system underperforms or communication breaks.</p></div>
              <div><b>Visible accountability</b><p>Personal brand creates a visible accountability layer that faceless delivery models don’t provide.</p></div>
              <div><b>Specialized team</b><p>The founder is not pretending to do every technical task. Specialized AI, development and operations work is handled by a team.</p></div>
            </div>
          </div>
        </div>
        <div className="experience-row">
          <div><small>2024–2026</small><b>T-Mobile — Customer Service</b><span>Fast-paced phone-based customer support, communication, problem solving and high-volume customer interactions.</span></div>
          <div><small>2023–2024</small><b>Booking.com — Customer Service</b><span>Customer support through chat, email and calls, with a focus on communication, issue resolution and customer experience.</span></div>
          <div><small>Current</small><b>iAcquireOS — Founder / GTM</b><span>Building the positioning, acquisition strategy, client journey, personal brand and team-backed operation.</span></div>
        </div>
        <div className="founder-capabilities">
          <span className="eyebrow">Core capabilities</span>
          <div className="founder-capability-list">{founderCapabilities.map((capability) => <span key={capability}>{capability}</span>)}</div>
          <p>Upwork and Fiverr profile links will be added soon.</p>
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
          <span className="eyebrow">Get started</span>
          <h2>Try the demo. <span className="gradient-text">Then let’s talk.</span></h2>
          <p>Experience the iAcquireOS client acquisition system for free, then book an appointment with Argel to discuss whether it fits your business.</p>
          <div className="final-cta-actions">
            <a className="button button-primary" href="#demo">Try Free Demo <ArrowRightIcon /></a>
            <a className="button button-outline" href={whatsapp} target="_blank" rel="noreferrer">Book Free Consultation <ArrowUpRightIcon /></a>
          </div>
          <small>One-time implementation · No monthly retainer · Commission tied to acquired clients</small>
        </div>
      </div>
    </section>
  );
}
