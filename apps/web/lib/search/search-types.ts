import { SearchCategory } from "@samvad/validation";

export type SearchDomain =
  | "SERVICES"
  | "INDUSTRIES"
  | "CASE_STUDIES"
  | "INSIGHTS"
  | "NEWSROOM";

export interface SearchResultItem {
  id: string;
  domain: SearchDomain;
  domainLabel: string;
  title: string;
  description: string;
  url: string;
  badge?: string;
  tags?: string[];
  relevanceScore: number;
  highlightedTitle?: string;
  highlightedDescription?: string;
  publishedAt?: string;
  metadata?: Record<string, string | number | undefined>;
}

export interface SearchQueryOptions {
  query: string;
  domain?: SearchCategory;
  page?: number;
  limit?: number;
}

export interface SearchResultPayload {
  query: string;
  totalResults: number;
  page: number;
  limit: number;
  totalPages: number;
  executionTimeMs: number;
  results: SearchResultItem[];
  countsByDomain: Record<SearchDomain | "ALL", number>;
  suggestions: string[];
}

/**
 * Replaceable Search Engine Provider Interface.
 * Allows seamless hot-swapping between PostgreSQL Full-Text Search, Meilisearch, Algolia, pgvector, or Elasticsearch.
 */
export interface SearchEngineProvider {
  readonly name: string;
  search(options: SearchQueryOptions): Promise<SearchResultPayload>;
  getSuggestions(query?: string): Promise<string[]>;
}
