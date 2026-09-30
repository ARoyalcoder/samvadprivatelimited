import { describe, it, expect } from "vitest";
import {
  INSIGHTS_ARTICLES,
  getAllArticles,
  getFeaturedArticle,
  getArticleBySlug,
  getAllArticleSlugs,
  getRelatedArticles,
  getAllCategories,
  getAllTags,
  InsightArticleSchema,
} from "../../apps/web/lib/insights-data";
import { SAMVAD_IMAGE_REGISTRY } from "../../packages/ui/src/components/media/image-registry";

describe("SAMVAD Insights Publication Architecture", () => {
  it("should contain at least 5 in-depth thought leadership monographs", () => {
    expect(INSIGHTS_ARTICLES.length).toBeGreaterThanOrEqual(5);
  });

  it("should validate all articles against the CMS-ready InsightArticleSchema", () => {
    INSIGHTS_ARTICLES.forEach((article) => {
      const result = InsightArticleSchema.safeParse(article);
      expect(result.success).toBe(true);
    });
  });

  it("should guarantee every article includes author, reading time, publication date, and SEO metadata", () => {
    INSIGHTS_ARTICLES.forEach((article) => {
      // Author
      expect(article.author.name).toBeTruthy();
      expect(article.author.role).toBeTruthy();
      expect(article.author.bio).toBeTruthy();

      // Reading time & publication date
      expect(article.readingTimeMinutes).toBeGreaterThan(0);
      expect(article.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(article.publishedDisplay).toBeTruthy();

      // SEO
      expect(article.seo.metaTitle).toBeTruthy();
      expect(article.seo.metaDescription).toBeTruthy();
      expect(article.seo.keywords.length).toBeGreaterThanOrEqual(3);

      // Editorial sections & drop cap structure
      expect(article.sections.length).toBeGreaterThanOrEqual(2);
      article.sections.forEach((sec) => {
        expect(sec.heading).toBeTruthy();
        expect(sec.paragraphs.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  it("should ensure all cover asset IDs resolve in SAMVAD_IMAGE_REGISTRY", () => {
    INSIGHTS_ARTICLES.forEach((article) => {
      expect(SAMVAD_IMAGE_REGISTRY[article.coverAssetId]).toBeDefined();
    });
  });

  it("should correctly identify a featured flagship monograph", () => {
    const featured = getFeaturedArticle();
    expect(featured).toBeDefined();
    expect(featured.isFeatured).toBe(true);
  });

  it("should provide lookup helper getArticleBySlug correctly", () => {
    const firstSlug = INSIGHTS_ARTICLES[0]!.slug;
    const found = getArticleBySlug(firstSlug);
    expect(found).toBeDefined();
    expect(found?.slug).toBe(firstSlug);

    const nonExistent = getArticleBySlug("non-existent-slug");
    expect(nonExistent).toBeUndefined();
  });

  it("should return related articles matching tags, category, or explicit slugs", () => {
    const firstSlug = INSIGHTS_ARTICLES[0]!.slug;
    const related = getRelatedArticles(firstSlug, 3);
    expect(related.length).toBeGreaterThanOrEqual(1);
    expect(related.length).toBeLessThanOrEqual(3);
    // Ensure the current article is not included in its own related list
    related.forEach((r) => {
      expect(r.slug).not.toBe(firstSlug);
    });
  });

  it("should return all categories with counts and all unique tags", () => {
    const categories = getAllCategories();
    expect(categories.length).toBeGreaterThanOrEqual(3);
    categories.forEach((cat) => {
      expect(cat.count).toBeGreaterThanOrEqual(1);
      expect(cat.label).toBeTruthy();
      expect(cat.slug).toBeTruthy();
    });

    const tags = getAllTags();
    expect(tags.length).toBeGreaterThanOrEqual(5);
  });

  it("should provide getAllArticleSlugs for Next.js static site generation", () => {
    const slugs = getAllArticleSlugs();
    expect(slugs).toHaveLength(INSIGHTS_ARTICLES.length);
    expect(slugs[0]).toHaveProperty("slug");
  });
});
