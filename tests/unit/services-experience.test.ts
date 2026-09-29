import { describe, it, expect } from "vitest";
import {
  PRIMARY_SERVICES,
  getServiceBySlug,
  getAllServiceSlugs,
  ServiceRecordSchema,
} from "../../apps/web/lib/services-data";
import { ServiceExplorer } from "../../apps/web/components/services/service-explorer";

describe("SAMVAD Primary Services Experience Architecture", () => {
  const expectedSlugs = [
    "public-relations",
    "strategic-communications",
    "reputation-management",
    "digital-communications",
    "crisis-communications",
    "strategic-advisory",
  ];

  it("should contain all 6 primary services specified in requirements", () => {
    expect(PRIMARY_SERVICES).toHaveLength(6);
    const slugs = PRIMARY_SERVICES.map((s) => s.slug);
    expect(slugs).toEqual(expectedSlugs);
  });

  it("should validate all 6 services against the CMS-ready ServiceRecordSchema", () => {
    PRIMARY_SERVICES.forEach((service) => {
      const result = ServiceRecordSchema.safeParse(service);
      expect(result.success).toBe(true);
    });
  });

  it("should guarantee every service includes data for all 9 required sections", () => {
    PRIMARY_SERVICES.forEach((service) => {
      // 1. Hero
      expect(service.title).toBeTruthy();
      expect(service.tagline).toBeTruthy();
      expect(service.heroAssetId).toBeTruthy();

      // 2. Overview
      expect(service.longOverview.length).toBeGreaterThan(100);
      expect(service.shortDescription.length).toBeGreaterThan(30);

      // 3. Capabilities
      expect(service.capabilities.length).toBeGreaterThanOrEqual(5);

      // 4. Process
      expect(service.process).toHaveLength(4);
      service.process.forEach((p) => {
        expect(p.phase).toBeTruthy();
        expect(p.title).toBeTruthy();
        expect(p.timeframe).toBeTruthy();
        expect(p.deliverables.length).toBeGreaterThanOrEqual(1);
      });

      // 5. Deliverables
      expect(service.deliverables.length).toBeGreaterThanOrEqual(4);

      // 6. Relevant Industries
      expect(service.relevantIndustries.length).toBeGreaterThanOrEqual(2);

      // 7. Related Case Studies
      expect(service.relatedCaseStudies.length).toBeGreaterThanOrEqual(1);

      // 8. Related Insights
      expect(service.relatedInsights.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("should provide lookup helper getServiceBySlug correctly", () => {
    const pr = getServiceBySlug("public-relations");
    expect(pr).toBeDefined();
    expect(pr?.title).toBe("Public Relations");

    const nonExistent = getServiceBySlug("unknown-service");
    expect(nonExistent).toBeUndefined();
  });

  it("should provide static slugs list for generateStaticParams", () => {
    const staticParams = getAllServiceSlugs();
    expect(staticParams).toHaveLength(6);
    expect(staticParams.map((p) => p.slug)).toEqual(expectedSlugs);
  });

  it("should export ServiceExplorer as a callable functional component", () => {
    expect(typeof ServiceExplorer).toBe("function");
  });
});
