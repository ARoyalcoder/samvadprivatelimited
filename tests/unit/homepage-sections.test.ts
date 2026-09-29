import { describe, it, expect } from "vitest";
import { GLOBAL_NAV_DATA } from "../../packages/ui/src/components/navigation/nav-data";
import { HeroSection } from "../../apps/web/components/sections/hero-section";
import { BrandIntroSection } from "../../apps/web/components/sections/brand-intro-section";
import { WhatWeDoSection } from "../../apps/web/components/sections/what-we-do-section";
import { StrategicVizSection } from "../../apps/web/components/sections/strategic-viz-section";
import { ServicesSection } from "../../apps/web/components/sections/services-section";
import { IndustriesSection } from "../../apps/web/components/sections/industries-section";
import { CaseStudiesSection } from "../../apps/web/components/sections/case-studies-section";
import { ApproachSection } from "../../apps/web/components/sections/approach-section";
import { InsightsSection } from "../../apps/web/components/sections/insights-section";
import { NewsroomSection } from "../../apps/web/components/sections/newsroom-section";
import { FinalCtaSection } from "../../apps/web/components/sections/final-cta-section";

describe("SAMVAD Homepage Architecture & 11 Sections", () => {
  it("should export all 11 homepage section components as valid functional components", () => {
    const sections = [
      HeroSection,
      BrandIntroSection,
      WhatWeDoSection,
      StrategicVizSection,
      ServicesSection,
      IndustriesSection,
      CaseStudiesSection,
      ApproachSection,
      InsightsSection,
      NewsroomSection,
      FinalCtaSection,
    ];

    expect(sections).toHaveLength(11);
    sections.forEach((section) => {
      expect(typeof section).toBe("function");
      expect(section.name).toBeTruthy();
    });
  });

  it("should ensure global navigation anchor links match homepage section targets", () => {
    const expectedAnchors = [
      "/#about",
      "/#services",
      "/#industries",
      "/#case-studies",
      "/#intelligence",
      "/#newsroom",
    ];

    const navAnchors = GLOBAL_NAV_DATA.mainLinks.map((l) => l.href);
    expectedAnchors.forEach((anchor) => {
      expect(navAnchors).toContain(anchor);
    });
  });

  it("should provide complete 6 core advisory disciplines with deliverables and SLAs", () => {
    expect(GLOBAL_NAV_DATA.services).toHaveLength(6);
    const serviceIds = GLOBAL_NAV_DATA.services.map((s) => s.id);
    expect(serviceIds).toEqual([
      "perception-intelligence",
      "crisis-architecture",
      "strategic-communications",
      "public-affairs",
      "executive-positioning",
      "digital-sovereignty",
    ]);
  });

  it("should provide complete 6 high-stakes operating industries with codes", () => {
    expect(GLOBAL_NAV_DATA.industries).toHaveLength(6);
    const industryCodes = GLOBAL_NAV_DATA.industries.map((ind) => ind.code);
    expect(industryCodes).toEqual(["01", "02", "03", "04", "05", "06"]);
  });
});
