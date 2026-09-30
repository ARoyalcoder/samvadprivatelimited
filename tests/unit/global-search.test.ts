import { describe, it, expect, beforeEach } from "vitest";
import { PostgresCompatibleSearchProvider } from "../../apps/web/lib/search/postgres-search-provider";
import { SearchEngineProvider, SearchResultPayload } from "../../apps/web/lib/search/search-types";
import { searchQuerySchema, searchCategoryEnum } from "@samvad/validation";

describe("Global Website Search Architecture", () => {
  let searchEngine: SearchEngineProvider;

  beforeEach(() => {
    searchEngine = new PostgresCompatibleSearchProvider();
  });

  describe("1. Pluggable Search Provider Interface", () => {
    it("should conform to SearchEngineProvider contract", () => {
      expect(searchEngine.name).toBe("PostgreSQL-Compatible Full-Text Search");
      expect(typeof searchEngine.search).toBe("function");
      expect(typeof searchEngine.getSuggestions).toBe("function");
    });
  });

  describe("2. Corpus Indexing Across All 5 Domains", () => {
    it("should search and locate records in the Services practice domain", async () => {
      const res = await searchEngine.search({
        query: "Crisis Communications",
        domain: "SERVICES",
      });

      expect(res.results.length).toBeGreaterThan(0);
      const topHit = res.results[0];
      expect(topHit.domain).toBe("SERVICES");
      expect(topHit.domainLabel).toBe("Practice Service");
      expect(topHit.url).toMatch(/^\/services\//);
      expect(topHit.title.toLowerCase()).toContain("crisis communications");
    });

    it("should search and locate records in the Industries sector domain", async () => {
      const res = await searchEngine.search({
        query: "Financial Services",
        domain: "INDUSTRIES",
      });

      expect(res.results.length).toBeGreaterThan(0);
      const topHit = res.results[0];
      expect(topHit.domain).toBe("INDUSTRIES");
      expect(topHit.domainLabel).toBe("Industry Sector");
      expect(topHit.url).toMatch(/^\/industries\//);
      expect(topHit.title.toLowerCase()).toContain("financial");
    });

    it("should search and locate records in the Case Studies domain", async () => {
      const res = await searchEngine.search({
        query: "Sovereign Perception",
        domain: "CASE_STUDIES",
      });

      expect(res.results.length).toBeGreaterThan(0);
      const hit = res.results[0];
      expect(hit.domain).toBe("CASE_STUDIES");
      expect(hit.domainLabel).toBe("Case Study");
      expect(hit.url).toMatch(/^\/work\//);
    });

    it("should search and locate records in the Insights editorial domain", async () => {
      const res = await searchEngine.search({
        query: "Algorithmic Asymmetry",
        domain: "INSIGHTS",
      });

      expect(res.results.length).toBeGreaterThan(0);
      const hit = res.results[0];
      expect(hit.domain).toBe("INSIGHTS");
      expect(hit.domainLabel).toBe("Insight Publication");
      expect(hit.url).toMatch(/^\/insights\//);
      expect(hit.title.toLowerCase()).toContain("algorithmic asymmetry");
    });

    it("should search and locate records in the Newsroom dispatch domain", async () => {
      const res = await searchEngine.search({
        query: "Singapore",
        domain: "NEWSROOM",
      });

      expect(res.results.length).toBeGreaterThan(0);
      const hit = res.results[0];
      expect(hit.domain).toBe("NEWSROOM");
      expect(hit.domainLabel).toBe("Newsroom Dispatch");
      expect(hit.url).toMatch(/^\/newsroom\//);
    });
  });

  describe("3. Weighted Relevance Ranking & Scoring", () => {
    it("should prioritize exact title matches over body matches", async () => {
      const res = await searchEngine.search({
        query: "Strategic Communications",
        domain: "ALL",
      });

      expect(res.results.length).toBeGreaterThan(1);
      // Top result should be the Strategic Communications service whose exact title matches
      const first = res.results[0];
      expect(first.title).toBe("Strategic Communications");
      expect(first.relevanceScore).toBeGreaterThan(10);

      // Verify descending order of relevance score
      for (let i = 0; i < res.results.length - 1; i++) {
        expect(res.results[i].relevanceScore).toBeGreaterThanOrEqual(
          res.results[i + 1].relevanceScore
        );
      }
    });

    it("should assign higher scores for exact phrase matches", async () => {
      const res = await searchEngine.search({
        query: "Reputation Management",
      });

      expect(res.results.length).toBeGreaterThan(0);
      expect(res.results[0].title).toBe("Reputation Management");
      expect(res.results[0].relevanceScore).toBeGreaterThan(20);
    });
  });

  describe("4. Dynamic Text Highlighting & Snippet Extraction", () => {
    it("should wrap matching tokens in HTML <mark> tags", async () => {
      const res = await searchEngine.search({
        query: "Reputation",
        domain: "SERVICES",
      });

      expect(res.results.length).toBeGreaterThan(0);
      const item = res.results[0];
      expect(item.highlightedTitle).toBeDefined();
      expect(item.highlightedTitle).toContain("<mark");
      expect(item.highlightedTitle).toContain("Reputation</mark>");
    });

    it("should generate contextual snippet highlights for description matches", async () => {
      const res = await searchEngine.search({
        query: "advisory",
      });

      expect(res.results.length).toBeGreaterThan(0);
      const matchWithSnippet = res.results.find(
        (r) => r.highlightedDescription && r.highlightedDescription.includes("<mark")
      );
      expect(matchWithSnippet).toBeDefined();
    });
  });

  describe("5. Multi-Domain Filtering & Aggregated Breakdown", () => {
    it("should return domain hit counts accurately in countsByDomain", async () => {
      const res = await searchEngine.search({
        query: "defense",
        domain: "ALL",
      });

      expect(res.countsByDomain).toBeDefined();
      expect(res.countsByDomain.ALL).toBe(res.totalResults);
      const sumOfDomains =
        res.countsByDomain.SERVICES +
        res.countsByDomain.INDUSTRIES +
        res.countsByDomain.CASE_STUDIES +
        res.countsByDomain.INSIGHTS +
        res.countsByDomain.NEWSROOM;
      expect(res.countsByDomain.ALL).toBe(sumOfDomains);
    });

    it("should strictly constrain results when filtered to a single domain", async () => {
      const res = await searchEngine.search({
        query: "risk",
        domain: "SERVICES",
      });

      for (const item of res.results) {
        expect(item.domain).toBe("SERVICES");
      }
    });
  });

  describe("6. Autocomplete and Curated Suggestions", () => {
    it("should return curated suggestions when query is empty", async () => {
      const suggestions = await searchEngine.getSuggestions("");
      expect(suggestions.length).toBeGreaterThan(0);
      expect(suggestions).toContain("Crisis Communications");
      expect(suggestions).toContain("Hostile Takeover Defense");
    });

    it("should return dynamic matching suggestions for partial query", async () => {
      const suggestions = await searchEngine.getSuggestions("cris");
      expect(suggestions.length).toBeGreaterThan(0);
      expect(
        suggestions.some((s) => s.toLowerCase().includes("cris"))
      ).toBe(true);
    });
  });

  describe("7. Pagination & Boundary Handling", () => {
    it("should respect limit and calculate totalPages correctly", async () => {
      const res = await searchEngine.search({
        query: "", // all docs
        domain: "ALL",
        limit: 5,
        page: 1,
      });

      expect(res.results.length).toBeLessThanOrEqual(5);
      expect(res.page).toBe(1);
      expect(res.limit).toBe(5);
      expect(res.totalPages).toBe(Math.ceil(res.totalResults / 5));
    });

    it("should fetch page 2 with non-overlapping results", async () => {
      const page1 = await searchEngine.search({
        query: "",
        domain: "ALL",
        limit: 3,
        page: 1,
      });

      const page2 = await searchEngine.search({
        query: "",
        domain: "ALL",
        limit: 3,
        page: 2,
      });

      expect(page1.results.length).toBe(3);
      expect(page2.results.length).toBeGreaterThan(0);

      const page1Ids = page1.results.map((r) => r.id);
      const page2Ids = page2.results.map((r) => r.id);

      // Verify no overlap between page 1 and page 2
      for (const id of page2Ids) {
        expect(page1Ids).not.toContain(id);
      }
    });

    it("should handle empty results gracefully for non-existent keywords", async () => {
      const res = await searchEngine.search({
        query: "xyznonexistentgibberish987654321",
        domain: "ALL",
      });

      expect(res.totalResults).toBe(0);
      expect(res.results.length).toBe(0);
      expect(res.totalPages).toBe(0);
    });
  });

  describe("8. Validation Schema Tests", () => {
    it("should accept valid search query parameters", () => {
      const parsed = searchQuerySchema.safeParse({
        q: "crisis advisory",
        type: "SERVICES",
        page: "2",
        limit: "15",
      });

      expect(parsed.success).toBe(true);
      if (parsed.success) {
        expect(parsed.data.q).toBe("crisis advisory");
        expect(parsed.data.type).toBe("SERVICES");
        expect(parsed.data.page).toBe(2);
        expect(parsed.data.limit).toBe(15);
      }
    });

    it("should apply default values when optional parameters are omitted", () => {
      const parsed = searchQuerySchema.safeParse({});
      expect(parsed.success).toBe(true);
      if (parsed.success) {
        expect(parsed.data.q).toBe("");
        expect(parsed.data.type).toBe("ALL");
        expect(parsed.data.page).toBe(1);
        expect(parsed.data.limit).toBe(10);
      }
    });

    it("should reject invalid domain type", () => {
      const parsed = searchQuerySchema.safeParse({
        type: "INVALID_DOMAIN_TYPE",
      });
      expect(parsed.success).toBe(false);
    });

    it("should enforce limit bounds", () => {
      const parsed = searchQuerySchema.safeParse({
        limit: 100, // exceeds max 50
      });
      expect(parsed.success).toBe(false);
    });
  });
});
