import { describe, it, expect } from "vitest";
import {
  NEWSROOM_ITEMS,
  getAllNewsroomItems,
  getNewsroomItemBySlug,
  getAllNewsroomSlugs,
  getNewsroomItemsByType,
  getRelatedNewsroomItems,
  getNewsroomTypesWithCounts,
  getNewsroomYears,
  NewsroomItemSchema,
  NewsroomContentType,
} from "../../apps/web/lib/newsroom-data";
import { SAMVAD_IMAGE_REGISTRY } from "../../packages/ui/src/components/media/image-registry";

describe("SAMVAD Newsroom & Official Dispatches Architecture", () => {
  const expectedContentTypes: NewsroomContentType[] = [
    "press-releases",
    "company-news",
    "media-coverage",
    "events",
    "announcements",
  ];

  it("should contain items for all 5 required content types", () => {
    expect(NEWSROOM_ITEMS.length).toBeGreaterThanOrEqual(5);

    const typesInCatalog = new Set(NEWSROOM_ITEMS.map((item) => item.type));
    expectedContentTypes.forEach((type) => {
      expect(typesInCatalog.has(type)).toBe(true);
    });
  });

  it("should strictly validate all newsroom records against NewsroomItemSchema", () => {
    NEWSROOM_ITEMS.forEach((item) => {
      const result = NewsroomItemSchema.safeParse(item);
      expect(result.success).toBe(true);
    });
  });

  it("should guarantee every newsroom record has administrative and media contact metadata", () => {
    NEWSROOM_ITEMS.forEach((item) => {
      expect(item.refCode).toBeTruthy();
      expect(item.classification).toBeTruthy();
      expect(item.dateline).toBeTruthy();
      expect(item.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(item.publishedDisplay).toBeTruthy();
      expect(item.year).toBeGreaterThanOrEqual(2025);
      expect(item.bodyParagraphs.length).toBeGreaterThanOrEqual(2);

      // Press Contact
      expect(item.pressContact.name).toBeTruthy();
      expect(item.pressContact.email).toContain("@samvad.advisory");
      expect(item.pressContact.phone).toBeTruthy();
      expect(item.pressContact.officeLocation).toBeTruthy();
    });
  });

  it("should enforce non-fabrication constraints on media coverage items", () => {
    const coverageItems = NEWSROOM_ITEMS.filter(
      (item) => item.type === "media-coverage"
    );
    expect(coverageItems.length).toBeGreaterThanOrEqual(1);

    coverageItems.forEach((item) => {
      expect(item.coverageSource).toBeDefined();
      expect(item.coverageSource?.isNonAttributable).toBe(true);
      expect(item.coverageSource?.verifiedNote).toContain("Chatham House");
    });
  });

  it("should validate event details for event-type dispatches", () => {
    const eventItems = NEWSROOM_ITEMS.filter((item) => item.type === "events");
    expect(eventItems.length).toBeGreaterThanOrEqual(1);

    eventItems.forEach((item) => {
      expect(item.eventDetails).toBeDefined();
      expect(item.eventDetails?.date).toBeTruthy();
      expect(item.eventDetails?.location).toBeTruthy();
      expect(item.eventDetails?.format).toBeTruthy();
      expect(item.eventDetails?.registrationStatus).toBeTruthy();
    });
  });

  it("should ensure all cover asset IDs resolve in SAMVAD_IMAGE_REGISTRY", () => {
    NEWSROOM_ITEMS.forEach((item) => {
      expect(SAMVAD_IMAGE_REGISTRY[item.coverAssetId]).toBeDefined();
    });
  });

  it("should provide lookup helper getNewsroomItemBySlug correctly", () => {
    const firstSlug = NEWSROOM_ITEMS[0]!.slug;
    const found = getNewsroomItemBySlug(firstSlug);
    expect(found).toBeDefined();
    expect(found?.slug).toBe(firstSlug);

    const nonExistent = getNewsroomItemBySlug("non-existent-dispatch");
    expect(nonExistent).toBeUndefined();
  });

  it("should return related items without including the active dispatch", () => {
    const firstSlug = NEWSROOM_ITEMS[0]!.slug;
    const related = getRelatedNewsroomItems(firstSlug, 3);
    expect(related.length).toBeGreaterThanOrEqual(1);
    expect(related.length).toBeLessThanOrEqual(3);

    related.forEach((r) => {
      expect(r.slug).not.toBe(firstSlug);
    });
  });

  it("should filter items by content type accurately", () => {
    const pressReleases = getNewsroomItemsByType("press-releases");
    expect(pressReleases.length).toBeGreaterThanOrEqual(1);
    pressReleases.forEach((pr) => {
      expect(pr.type).toBe("press-releases");
    });
  });

  it("should provide type count distribution for all 5 content types", () => {
    const typesWithCounts = getNewsroomTypesWithCounts();
    expect(typesWithCounts).toHaveLength(5);
    typesWithCounts.forEach((tc) => {
      expect(tc.count).toBeGreaterThanOrEqual(1);
      expect(tc.label).toBeTruthy();
    });
  });

  it("should return sorted archive years", () => {
    const years = getNewsroomYears();
    expect(years.length).toBeGreaterThanOrEqual(1);
    expect(years).toContain(2026);
  });

  it("should provide getAllNewsroomSlugs for Next.js static site generation", () => {
    const slugs = getAllNewsroomSlugs();
    expect(slugs).toHaveLength(NEWSROOM_ITEMS.length);
    expect(slugs[0]).toHaveProperty("slug");
  });
});
