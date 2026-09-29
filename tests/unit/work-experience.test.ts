import { describe, it, expect } from "vitest";
import {
  CASE_STUDIES,
  getCaseStudyBySlug,
  getAllCaseStudySlugs,
  CaseStudyRecordSchema,
} from "../../apps/web/lib/case-studies-data";
import { SAMVAD_IMAGE_REGISTRY } from "../../packages/ui/src/components/media/image-registry";
import { PRIMARY_SERVICES } from "../../apps/web/lib/services-data";

describe("SAMVAD Work / Case Studies System Architecture", () => {
  it("should contain at least 4 documented declassified case study dossiers", () => {
    expect(CASE_STUDIES.length).toBeGreaterThanOrEqual(4);
  });

  it("should strictly validate all case study records against CaseStudyRecordSchema", () => {
    CASE_STUDIES.forEach((study) => {
      const result = CaseStudyRecordSchema.safeParse(study);
      expect(result.success).toBe(true);
    });
  });

  it("should guarantee every case study contains data for all 11 mandatory fields/sections", () => {
    CASE_STUDIES.forEach((study) => {
      // 1. Client
      expect(study.clientPlaceholder).toBeTruthy();
      expect(study.clientContextNotice).toBeTruthy();

      // 2. Industry
      expect(study.industry).toBeTruthy();
      expect(study.industrySlug).toBeTruthy();

      // 3. Challenge
      expect(study.challenge.length).toBeGreaterThan(50);

      // 4. Objective
      expect(study.objective.length).toBeGreaterThan(30);

      // 5. Strategy
      expect(study.strategy.length).toBeGreaterThan(50);

      // 6. Execution
      expect(study.execution.length).toBeGreaterThanOrEqual(3);
      study.execution.forEach((p) => {
        expect(p.phase).toBeTruthy();
        expect(p.title).toBeTruthy();
        expect(p.description).toBeTruthy();
      });

      // 7. Channels
      expect(study.channels.length).toBeGreaterThanOrEqual(3);

      // 8. Outcome
      expect(study.outcome.length).toBeGreaterThan(40);

      // 9. Metrics
      expect(study.metrics.length).toBeGreaterThanOrEqual(3);
      study.metrics.forEach((m) => {
        expect(m.label).toBeTruthy();
        expect(m.value).toBeTruthy();
        expect(m.subtext).toBeTruthy();
      });

      // 10. Gallery
      expect(study.gallery.length).toBeGreaterThanOrEqual(2);
      study.gallery.forEach((g) => {
        expect(g.assetId).toBeTruthy();
        expect(g.caption).toBeTruthy();
        expect(g.aspectRatio).toBeTruthy();
      });

      // 11. Related Services
      expect(study.relatedServices.length).toBeGreaterThanOrEqual(2);
      study.relatedServices.forEach((s) => {
        expect(s.slug).toBeTruthy();
        expect(s.title).toBeTruthy();
        expect(s.role).toBeTruthy();
      });
    });
  });

  it("should enforce strict non-fabrication constraints on client identities", () => {
    CASE_STUDIES.forEach((study) => {
      // Must use explicit confidentiality or anonymized placeholder tags
      expect(study.clientPlaceholder).toMatch(/\[CONFIDENTIAL.*\]/i);
      expect(study.classification).toContain("DECLASSIFIED");
      expect(study.clientContextNotice).toContain("non-disclosure");
    });
  });

  it("should ensure all gallery and hero image asset IDs resolve in the image registry", () => {
    CASE_STUDIES.forEach((study) => {
      expect(SAMVAD_IMAGE_REGISTRY[study.heroAssetId]).toBeDefined();
      study.gallery.forEach((g) => {
        expect(SAMVAD_IMAGE_REGISTRY[g.assetId]).toBeDefined();
      });
    });
  });

  it("should ensure all relatedServices reference valid primary services", () => {
    const validServiceSlugs = new Set(PRIMARY_SERVICES.map((s) => s.slug));
    CASE_STUDIES.forEach((study) => {
      study.relatedServices.forEach((s) => {
        expect(validServiceSlugs.has(s.slug)).toBe(true);
      });
    });
  });

  it("should provide lookup helper getCaseStudyBySlug correctly", () => {
    const firstSlug = CASE_STUDIES[0]!.slug;
    const found = getCaseStudyBySlug(firstSlug);
    expect(found).toBeDefined();
    expect(found?.slug).toBe(firstSlug);

    const nonExistent = getCaseStudyBySlug("non-existent-case-study");
    expect(nonExistent).toBeUndefined();
  });

  it("should provide getAllCaseStudySlugs for static site generation", () => {
    const slugs = getAllCaseStudySlugs();
    expect(slugs).toHaveLength(CASE_STUDIES.length);
    expect(slugs[0]).toHaveProperty("slug");
  });
});
