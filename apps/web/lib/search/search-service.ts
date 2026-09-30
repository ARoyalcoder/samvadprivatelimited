import { SearchEngineProvider } from "./search-types";
import { PostgresCompatibleSearchProvider } from "./postgres-search-provider";

/**
 * Global Search Engine Provider Instance.
 * Adheres to the decoupled SearchEngineProvider interface.
 * Easily switch to Algolia, Meilisearch, or Elasticsearch by swapping this instance.
 */
export const searchEngine: SearchEngineProvider = new PostgresCompatibleSearchProvider();
