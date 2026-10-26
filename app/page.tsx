import { DemoSection } from "@/components/demo-section";
import { ProjectPortfolio } from "@/components/project-portfolio";
import {
  FaqSection,
  FinalCtaSection,
  FounderSection,
  HeroSection,
  OfferSection,
  ProblemSection,
  ProcessSection,
  SystemOverviewSection,
  SystemSection,
} from "@/components/marketing-sections";

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <ProblemSection />
      <SystemSection />
      <SystemOverviewSection />
      <ProjectPortfolio />
      <ProcessSection />
      <OfferSection />
      <FounderSection />
      <DemoSection />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
}
