import { describe, it, expect, beforeEach } from "vitest";
import {
  SAMVAD_IMAGE_CATEGORIES,
  SAMVAD_IMAGE_REGISTRY,
  getImageAsset,
  getImagesByCategory,
  getAllImageAssets,
  getAllImageCategories,
  registerImageOverride,
  createShimmerBlurDataURL,
  type SamvadImageCategory,
} from "../../packages/ui/src/components/media/image-registry";

describe("SAMVAD AI Image Asset System", () => {
  const EXPECTED_CATEGORIES: SamvadImageCategory[] = [
    "corporate-communication",
    "leadership",
    "business-meetings",
    "media-interaction",
    "technology",
    "infrastructure",
    "healthcare",
    "finance",
    "startup-ecosystem",
    "reputation",
    "communication",
    "abstract-perception",
    "editorial-backgrounds",
    "case-study-placeholders",
  ];

  it("should have exactly all 14 required categories defined in the taxonomy", () => {
    const definedCategories = Object.keys(SAMVAD_IMAGE_CATEGORIES);
    expect(definedCategories).toHaveLength(14);
    EXPECTED_CATEGORIES.forEach((cat) => {
      expect(SAMVAD_IMAGE_CATEGORIES[cat]).toBeDefined();
      expect(SAMVAD_IMAGE_CATEGORIES[cat].label).toBeTruthy();
      expect(SAMVAD_IMAGE_CATEGORIES[cat].description).toBeTruthy();
    });
  });

  it("should ensure every registered asset has valid metadata and negative constraint compliance", () => {
    const assets = getAllImageAssets();
    expect(assets.length).toBeGreaterThanOrEqual(14);

    assets.forEach((asset) => {
      // Must have valid replacement key starting with SAMVAD_
      expect(asset.replacementKey).toMatch(/^SAMVAD_[A-Z0-9_]+$/);

      // Must have descriptive accessibility alt text (WCAG 2.1 AA)
      expect(asset.alt.length).toBeGreaterThan(15);
      expect(asset.alt.toLowerCase()).not.toContain("stock photo");

      // Must be marked personnel compliant (no fake staff/clients)
      expect(asset.personnelRuleCompliant).toBe(true);

      // Must have valid 16:9 widescreen dimensions
      expect(asset.width).toBe(1376);
      expect(asset.height).toBe(768);
      expect(asset.aspectRatio).toBe("16:9");

      // Must have real photo slot instructions
      expect(asset.realPhotoSlot.artDirection.length).toBeGreaterThan(20);
      expect(asset.realPhotoSlot.recommendedDimensions).toBeTruthy();
    });
  });

  it("should guarantee that every single category has at least one asset in the registry", () => {
    EXPECTED_CATEGORIES.forEach((cat) => {
      const categoryAssets = getImagesByCategory(cat);
      expect(categoryAssets.length).toBeGreaterThanOrEqual(1);
      expect(categoryAssets[0]?.category).toBe(cat);
    });
  });

  it("should retrieve assets by either internal ID or public replacement key", () => {
    const byId = getImageAsset("corp-comm-press-podium");
    expect(byId).toBeDefined();
    expect(byId?.id).toBe("corp-comm-press-podium");

    const byKey = getImageAsset("SAMVAD_CORP_COMM_PODIUM_01");
    expect(byKey).toBeDefined();
    expect(byKey?.replacementKey).toBe("SAMVAD_CORP_COMM_PODIUM_01");
    expect(byKey?.id).toBe(byId?.id);
  });

  it("should dynamically allow photographic override replacement with zero template changes", () => {
    const testSlot = "SAMVAD_LEADERSHIP_SILHOUETTE_01";
    const realPhotoUrl = "https://cdn.samvadadvisory.com/shoots/2026/partner-dusk.jpg";

    registerImageOverride(testSlot, {
      src: realPhotoUrl,
      isAiGenerated: false,
      realPhotoSlot: {
        recommendedDimensions: "2560x1440",
        artDirection: "Actual verified partner shoot.",
        recommendedAspect: "16:9",
        status: "real-asset-ready",
      },
    });

    const updated = getImageAsset(testSlot);
    expect(updated?.src).toBe(realPhotoUrl);
    expect(updated?.isAiGenerated).toBe(false);
    expect(updated?.realPhotoSlot.status).toBe("real-asset-ready");
  });

  it("should generate a valid shimmer blur data URL", () => {
    const blurData = createShimmerBlurDataURL(400, 225);
    expect(blurData).toMatch(/^data:image\/svg\+xml;base64,/);
  });

  it("should return category summaries with count metrics", () => {
    const categoriesWithStats = getAllImageCategories();
    expect(categoriesWithStats).toHaveLength(14);
    categoriesWithStats.forEach((cat) => {
      expect(cat.count).toBeGreaterThanOrEqual(1);
      expect(cat.sampleAsset).toBeDefined();
    });
  });
});
