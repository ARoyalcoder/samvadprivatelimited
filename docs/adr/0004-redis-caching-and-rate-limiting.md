# ADR-0004: Redis for Cache-Aside & Sliding-Window Rate Limiting

## Status

Accepted

## Context

High-traffic concurrent loads (1,000+ users) and public exposure to lead generation forms expose the database to exhaustion and DDoS attacks without an intermediary caching and throttling tier.

## Decision

We utilize **Redis 7** via `ioredis` in `@samvad/redis` for:

1. **Cache-Aside Pattern**: Frequently accessed public content (services, insights, case studies) is cached with configurable TTLs (5–15 minutes).
2. **Atomic Sliding Window Rate Limiting**: Atomic pipeline increments (`INCR` + `EXPIRE`) calculate request limits per IP to protect public ingestion endpoints against brute force and automated spam.
3. **Resilience & Fallback**: Redis connection failures do not crash the application; helper functions fall back gracefully to direct queries while logging diagnostic warnings.

## Consequences

### Positive

- Sub-5ms response times on cached endpoints.
- Database is shielded from traffic surges.
- Robust DDoS defense at the application boundary.

### Negative / Trade-offs

- Introduces an operational dependency on a running Redis instance or Redis cluster.
