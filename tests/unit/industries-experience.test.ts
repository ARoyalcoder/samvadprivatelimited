import { describe, it, expect } from "vitest";
import {
  PRIMARY_INDUSTRIES,
  getIndustryBySlug,
  getAllIndustrySlugs,
  IndustryRecordSchema,
} from "../../apps/web/lib/industries-data";

describe("SAMVAD Industries Experience & CMS Architecture", () => {
  const expectedSlugs = [
    "technology",
    "financial-services",
    "healthcare",
    "infrastructure",
    "real-estate",
    "consumer",
    "startups",
    "institutions",
  ];

  it("should contain all 8 configurable CMS industry categories specified in requirements", () => {
    expect(PRIMARY_INDUSTRIES).toHaveLength(8);
    const slugs = PRIMARY_INDUSTRIES.map((ind) => ind.slug);
    expect(slugs).toEqual(expectedSlugs);
  });

  it("should validate all 8 industries against the CMS-ready IndustryRecordSchema", () => {
    PRIMARY_INDUSTRIES.forEach((industry) => {
      const result = IndustryRecordSchema.safeParse(industry);
      expect(result.success).toBe(true);
    });
  });

  it("should guarantee every industry page includes data for all 7 required sections", () => {
    PRIMARY_INDUSTRIES.forEach((industry) => {
      // 1. Hero
      expect(industry.title).toBeTruthy();
      expect(industry.tagline).toBeTruthy();
      expect(industry.imageAssetId).toBeTruthy();
      expect(industry.code).toMatch(/^0[1-8]$/);

      // 2. Industry Challenges
      expect(industry.challenges.length).toBeGreaterThanOrEqual(3);
      industry.challenges.forEach((ch) => {
        expect(ch.title).toBeTruthy();
        expect(ch.description.length).toBeGreaterThan(20);
        expect(ch.impact.length).toBeGreaterThan(10);
      });

      // 3. Communication Needs
      expect(industry.communicationNeeds.length).toBeGreaterThanOrEqual(3);
      industry.communicationNeeds.forEach((cn) => {
        expect(cn.need).toBeTruthy();
        expect(cn.rationale.length).toBeGreaterThan(15);
        expect(cn.urgency).toBeTruthy();
      });

      // 4. Relevant Services
      expect(industry.relevantServices.length).toBeGreaterThanOrEqual(2);
      industry.relevantServices.forEach((srv) => {
        expect(srv.slug).toBeTruthy();
        expect(srv.title).toBeTruthy();
        expect(srv.rationale).toBeTruthy();
      });

      // 5. Case Studies
      expect(industry.caseStudies.length).toBeGreaterThanOrEqual(1);

      // 6. Insights
      expect(industry.insights.length).toBeGreaterThanOrEqual(1);

      // 7. Governance Notice
      expect(industry.cmsStatus).toBe("CONFIGURED_FRAMEWORK");
      expect(industry.cmsApprovalNotice.length).toBeGreaterThan(30);
    });
  });

  it("should provide lookup helper getIndustryBySlug correctly", () => {
    const tech = getIndustryBySlug("technology");
    expect(tech).toBeDefined();
    expect(tech?.title).toBe("Technology");

    const nonExistent = getIndustryBySlug("unknown-sector");
    expect(nonExistent).toBeUndefined();
  });

  it("should provide static slugs list for generateStaticParams", () => {
    const staticParams = getAllIndustrySlugs();
    expect(staticParams).toHaveLength(8);
    expect(staticParams.map((p) => p.slug)).toEqual(expectedSlugs);
  });
});
