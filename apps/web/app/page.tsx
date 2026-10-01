import * as React from "react";
import { HeroSection } from "@/components/sections/hero-section";
import { BrandIntroSection } from "@/components/sections/brand-intro-section";
import { WhatWeDoSection } from "@/components/sections/what-we-do-section";
import { StrategicVizSection } from "@/components/sections/strategic-viz-section";
import { ServicesSection } from "@/components/sections/services-section";
import { IndustriesSection } from "@/components/sections/industries-section";
import { CaseStudiesSection } from "@/components/sections/case-studies-section";
import { ApproachSection } from "@/components/sections/approach-section";
import { InsightsSection } from "@/components/sections/insights-section";
import { NewsroomSection } from "@/components/sections/newsroom-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";

export const revalidate = 3600;

export default function HomePage() {
  return (
    <div className="flex w-full flex-col overflow-hidden bg-obsidian-950 text-sand-100">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Brand Introduction (Doctrine of Samvāda) */}
      <BrandIntroSection />

      {/* 3. What We Do (4 Pillars of Strategic Influence) */}
      <WhatWeDoSection />

      {/* 4. Strategic Communication Visualization (Discourse vs. Alignment Perception Matrix) */}
      <StrategicVizSection />

      {/* 5. Advisory Services (6 Core Practices) */}
      <ServicesSection />

      {/* 6. High-Stakes Industries & Operating Arenas */}
      <IndustriesSection />

      {/* 7. Featured Case Studies & Declassified Dossiers */}
      <CaseStudiesSection />

      {/* 8. Our Approach (Four-Phase Operational Protocol) */}
      <ApproachSection />

      {/* 9. Insights & Executive Thought Leadership */}
      <InsightsSection />

      {/* 10. Newsroom & Verified Disclosures */}
      <NewsroomSection />

      {/* 11. Final CTA & Confidential Strategic Consultation */}
      <FinalCtaSection />
    </div>
  );
}
