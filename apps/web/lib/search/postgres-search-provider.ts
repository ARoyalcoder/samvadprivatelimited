import {
  SearchEngineProvider,
  SearchQueryOptions,
  SearchResultItem,
  SearchResultPayload,
  SearchDomain,
} from "./search-types";
import { PRIMARY_SERVICES } from "../services-data";
import { PRIMARY_INDUSTRIES } from "../industries-data";
import { CASE_STUDIES } from "../case-studies-data";
import { INSIGHTS_ARTICLES } from "../insights-data";
import { NEWSROOM_ITEMS } from "../newsroom-data";

interface SearchableDocument {
  id: string;
  domain: SearchDomain;
  domainLabel: string;
  title: string;
  description: string;
  url: string;
  badge?: string;
  tags: string[];
  body: string;
  publishedAt?: string;
  metadata?: Record<string, string | number | undefined>;
}

/**
 * Curated Top Advisory Queries when search box is empty
 */
const CURATED_SUGGESTIONS = [
  "Crisis Communications",
  "Sovereign Perception Index",
  "Algorithmic Asymmetry",
  "Hostile Takeover Defense",
  "Financial Services",
  "Public Relations",
  "Singapore Office Expansion",
  "Boardroom Crisis Playbook",
  "Technology Data Sovereignty",
  "Infrastructure Energy Transition",
];

/**
 * Escapes regex special characters
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Generates highlighted HTML snippet with <mark> tags around matching tokens
 */
function createHighlightedText(text: string, tokens: string[]): string {
  if (!text || tokens.length === 0) return text;

  // Build combined regex
  const pattern = new RegExp(
    `(${tokens.map(escapeRegex).join("|")})`,
    "gi"
  );

  return text.replace(
    pattern,
    '<mark class="bg-gold-500/25 text-gold-300 font-medium px-0.5 rounded-2xs">$1</mark>'
  );
}

/**
 * Extract a relevant window around the first match in long descriptions
 */
function createSnippetWithHighlight(
  text: string,
  tokens: string[],
  maxLength = 180
): string {
  if (!text) return "";
  if (tokens.length === 0 || text.length <= maxLength) {
    return createHighlightedText(text, tokens);
  }

  // Find lowest index of any token
  let firstIdx = -1;
  const lowerText = text.toLowerCase();
  for (const token of tokens) {
    const idx = lowerText.indexOf(token.toLowerCase());
    if (idx !== -1 && (firstIdx === -1 || idx < firstIdx)) {
      firstIdx = idx;
    }
  }

  if (firstIdx === -1) {
    const truncated = text.slice(0, maxLength) + "...";
    return createHighlightedText(truncated, tokens);
  }

  // Create window around first match
  const start = Math.max(0, firstIdx - 40);
  const end = Math.min(text.length, start + maxLength);
  const prefix = start > 0 ? "..." : "";
  const suffix = end < text.length ? "..." : "";
  const windowedText = prefix + text.slice(start, end).trim() + suffix;

  return createHighlightedText(windowedText, tokens);
}

/**
 * PostgreSQL-Compatible Search Engine Implementation.
 * Emulates weighted lexemes, ts_rank_cd scoring, and ILIKE substring matching.
 */
export class PostgresCompatibleSearchProvider implements SearchEngineProvider {
  readonly name = "PostgreSQL-Compatible Full-Text Search";

  /**
   * Builds the in-memory searchable corpus across all 5 CMS domains
   */
  private getCorpus(): SearchableDocument[] {
    const corpus: SearchableDocument[] = [];

    // 1. SERVICES
    PRIMARY_SERVICES.forEach((srv) => {
      corpus.push({
        id: `srv-${srv.slug}`,
        domain: "SERVICES",
        domainLabel: "Practice Service",
        title: srv.title,
        description: srv.shortDescription || srv.tagline,
        url: `/services/${srv.slug}`,
        badge: srv.eyebrow,
        tags: [...srv.capabilities, srv.title, "Advisory", "Service"],
        body: `${srv.tagline} ${srv.longOverview} ${srv.capabilities.join(" ")} ${srv.deliverables.join(" ")}`,
      });
    });

    // 2. INDUSTRIES
    PRIMARY_INDUSTRIES.forEach((ind) => {
      const challengeTexts = ind.challenges
        .map((c) => `${c.title} ${c.description} ${c.impact}`)
        .join(" ");
      corpus.push({
        id: `ind-${ind.slug}`,
        domain: "INDUSTRIES",
        domainLabel: "Industry Sector",
        title: ind.title,
        description: ind.shortSummary,
        url: `/industries/${ind.slug}`,
        badge: ind.eyebrow,
        tags: [ind.title, ind.categoryGroup, "Sector", "Industry"],
        body: `${ind.tagline} ${ind.longDescription} ${challengeTexts}`,
      });
    });

    // 3. CASE STUDIES
    CASE_STUDIES.forEach((cs) => {
      const execTexts = cs.execution.map((e) => `${e.phase} ${e.description}`).join(" ");
      corpus.push({
        id: `cs-${cs.slug}`,
        domain: "CASE_STUDIES",
        domainLabel: "Case Study",
        title: cs.title,
        description: cs.challenge.slice(0, 200) + "...",
        url: `/work/${cs.slug}`,
        badge: cs.industry,
        tags: [cs.industry, cs.timeframe, "Declassified Mandate"],
        body: `${cs.tagline} ${cs.challenge} ${cs.objective} ${cs.strategy} ${cs.outcome} ${execTexts}`,
      });
    });

    // 4. INSIGHTS
    INSIGHTS_ARTICLES.forEach((art) => {
      const sectionTexts = (art.sections || [])
        .map((s) => `${s.heading} ${s.subheading || ""} ${(s.paragraphs || []).join(" ")}`)
        .join(" ");
      corpus.push({
        id: `ins-${art.slug}`,
        domain: "INSIGHTS",
        domainLabel: "Insight Publication",
        title: art.title,
        description: art.excerpt,
        url: `/insights/${art.slug}`,
        badge: art.category,
        tags: [...art.tags, art.category, art.author.name],
        body: `${art.subtitle || ""} ${art.excerpt} ${sectionTexts}`,
        publishedAt: art.publishedAt,
      });
    });

    // 5. NEWSROOM
    NEWSROOM_ITEMS.forEach((news) => {
      corpus.push({
        id: `news-${news.slug}`,
        domain: "NEWSROOM",
        domainLabel: "Newsroom Dispatch",
        title: news.title,
        description: news.summary,
        url: `/newsroom/${news.slug}`,
        badge: news.type.replace("-", " ").toUpperCase(),
        tags: [...news.tags, news.dateline, news.quarter],
        body: `${news.summary} ${news.bodyParagraphs.join(" ")} ${news.dateline}`,
        publishedAt: news.publishedAt,
      });
    });

    return corpus;
  }

  /**
   * Execute full-text search with ranking, filtering, highlights, and pagination
   */
  async search(options: SearchQueryOptions): Promise<SearchResultPayload> {
    const startTime = performance.now();
    const query = options.query?.trim() || "";
    const domainFilter = options.domain || "ALL";
    const page = Math.max(1, options.page || 1);
    const limit = Math.max(1, Math.min(50, options.limit || 10));

    const corpus = this.getCorpus();

    // If query is empty, return latest/featured items across domains
    if (query === "") {
      const filtered =
        domainFilter === "ALL"
          ? corpus
          : corpus.filter((doc) => doc.domain === domainFilter);

      const totalResults = filtered.length;
      const totalPages = Math.ceil(totalResults / limit);
      const startIdx = (page - 1) * limit;
      const paged = filtered.slice(startIdx, startIdx + limit);

      const countsByDomain: Record<SearchDomain | "ALL", number> = {
        ALL: corpus.length,
        SERVICES: corpus.filter((d) => d.domain === "SERVICES").length,
        INDUSTRIES: corpus.filter((d) => d.domain === "INDUSTRIES").length,
        CASE_STUDIES: corpus.filter((d) => d.domain === "CASE_STUDIES").length,
        INSIGHTS: corpus.filter((d) => d.domain === "INSIGHTS").length,
        NEWSROOM: corpus.filter((d) => d.domain === "NEWSROOM").length,
      };

      const results: SearchResultItem[] = paged.map((doc) => ({
        id: doc.id,
        domain: doc.domain,
        domainLabel: doc.domainLabel,
        title: doc.title,
        description: doc.description,
        url: doc.url,
        badge: doc.badge,
        tags: doc.tags,
        relevanceScore: 1.0,
        publishedAt: doc.publishedAt,
      }));

      const executionTimeMs = parseFloat((performance.now() - startTime).toFixed(2));

      return {
        query: "",
        totalResults,
        page,
        limit,
        totalPages,
        executionTimeMs,
        results,
        countsByDomain,
        suggestions: CURATED_SUGGESTIONS.slice(0, 6),
      };
    }

    // Tokenize search query (alphanumeric tokens)
    const tokens = query
      .toLowerCase()
      .split(/\s+/)
      .map((t) => t.replace(/[^\w-]/g, ""))
      .filter((t) => t.length > 0);

    const lowerQuery = query.toLowerCase();

    // Score and filter each document
    const scoredDocs: Array<{ doc: SearchableDocument; score: number }> = [];

    for (const doc of corpus) {
      // Domain filter check
      if (domainFilter !== "ALL" && doc.domain !== domainFilter) {
        continue;
      }

      let score = 0;
      const docTitleLower = doc.title.toLowerCase();
      const docDescLower = doc.description.toLowerCase();
      const docBodyLower = doc.body.toLowerCase();
      const docTagsLower = doc.tags.map((t) => t.toLowerCase()).join(" ");

      // 1. Exact phrase match bonus
      if (docTitleLower.includes(lowerQuery)) {
        score += 15.0;
      } else if (docDescLower.includes(lowerQuery)) {
        score += 8.0;
      } else if (docBodyLower.includes(lowerQuery)) {
        score += 4.0;
      }

      // 2. Token-level matching (PostgreSQL ts_rank_cd emulation)
      let matchedTokenCount = 0;
      for (const token of tokens) {
        let tokenMatched = false;

        // Title matches (Rank A - 5.0 points)
        if (docTitleLower.includes(token)) {
          score += 5.0;
          tokenMatched = true;
        }

        // Tags / Metadata matches (Rank B - 3.0 points)
        if (docTagsLower.includes(token)) {
          score += 3.0;
          tokenMatched = true;
        }

        // Description matches (Rank C - 2.0 points)
        if (docDescLower.includes(token)) {
          score += 2.0;
          tokenMatched = true;
        }

        // Body matches (Rank D - 1.0 points)
        if (docBodyLower.includes(token)) {
          score += 1.0;
          tokenMatched = true;
        }

        if (tokenMatched) {
          matchedTokenCount++;
        }
      }

      // Must match at least one token to qualify
      if (score > 0 && matchedTokenCount > 0) {
        // Boost documents matching all search tokens
        if (matchedTokenCount === tokens.length) {
          score *= 1.5;
        }
        scoredDocs.push({ doc, score });
      }
    }

    // Sort by relevance score descending
    scoredDocs.sort((a, b) => b.score - a.score);

    // Compute domain breakdown for all matches
    const countsByDomain: Record<SearchDomain | "ALL", number> = {
      ALL: scoredDocs.length,
      SERVICES: 0,
      INDUSTRIES: 0,
      CASE_STUDIES: 0,
      INSIGHTS: 0,
      NEWSROOM: 0,
    };

    scoredDocs.forEach(({ doc }) => {
      countsByDomain[doc.domain] = (countsByDomain[doc.domain] || 0) + 1;
    });

    const totalResults = scoredDocs.length;
    const totalPages = Math.ceil(totalResults / limit);
    const startIdx = (page - 1) * limit;
    const paged = scoredDocs.slice(startIdx, startIdx + limit);

    // Transform into highlighted result items
    const results: SearchResultItem[] = paged.map(({ doc, score }) => ({
      id: doc.id,
      domain: doc.domain,
      domainLabel: doc.domainLabel,
      title: doc.title,
      description: doc.description,
      url: doc.url,
      badge: doc.badge,
      tags: doc.tags,
      relevanceScore: parseFloat(score.toFixed(2)),
      highlightedTitle: createHighlightedText(doc.title, tokens),
      highlightedDescription: createSnippetWithSnippet(doc, tokens),
      publishedAt: doc.publishedAt,
    }));

    // Dynamic autocomplete suggestions
    const suggestions = await this.getSuggestions(query);

    const executionTimeMs = parseFloat((performance.now() - startTime).toFixed(2));

    return {
      query,
      totalResults,
      page,
      limit,
      totalPages,
      executionTimeMs,
      results,
      countsByDomain,
      suggestions,
    };
  }

  /**
   * Search suggestions generator for auto-complete
   */
  async getSuggestions(query?: string): Promise<string[]> {
    if (!query || query.trim() === "") {
      return CURATED_SUGGESTIONS.slice(0, 6);
    }

    const q = query.toLowerCase().trim();
    const corpus = this.getCorpus();
    const matches = new Set<string>();

    // 1. Check title beginnings and terms
    for (const doc of corpus) {
      if (doc.title.toLowerCase().includes(q)) {
        matches.add(doc.title);
      }
      for (const tag of doc.tags) {
        if (tag.toLowerCase().includes(q)) {
          matches.add(tag);
        }
      }
      if (matches.size >= 8) break;
    }

    // 2. Also check curated suggestions
    CURATED_SUGGESTIONS.forEach((sug) => {
      if (sug.toLowerCase().includes(q)) {
        matches.add(sug);
      }
    });

    return Array.from(matches).slice(0, 6);
  }
}

/**
 * Creates an intelligent highlighted snippet for description
 */
function createSnippetWithSnippet(
  doc: SearchableDocument,
  tokens: string[]
): string {
  // If description matches, highlight it
  const lowerDesc = doc.description.toLowerCase();
  const descHasMatch = tokens.some((t) => lowerDesc.includes(t.toLowerCase()));

  if (descHasMatch) {
    return createSnippetWithHighlight(doc.description, tokens, 160);
  }

  // If body has match instead, excerpt from body
  const lowerBody = doc.body.toLowerCase();
  const bodyHasMatch = tokens.some((t) => lowerBody.includes(t.toLowerCase()));
  if (bodyHasMatch) {
    return createSnippetWithHighlight(doc.body, tokens, 160);
  }

  return createSnippetWithHighlight(doc.description, tokens, 160);
}
