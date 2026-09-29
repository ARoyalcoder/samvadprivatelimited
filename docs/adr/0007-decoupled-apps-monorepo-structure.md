# ADR-0007: Decoupled Applications in Monorepo Structure

## Status

Accepted

## Context

SAMVAD requires clear separation between public-facing web presentation, sensitive internal admin CMS operations, external API integrations, and background event processing. Coupling all functionality into a single monolithic bundle exposes admin surfaces to public DDoS vectors and prevents independent scaling of background workers.

## Decision

We decouple the platform into four specialized applications within the `apps/` directory of the monorepo:

1. `apps/web`: High-performance, SEO-optimized public portal with rich 3D / motion presentation.
2. `apps/admin`: Restricted-access CMS and confidential inquiry review portal guarded by RBAC.
3. `apps/api`: Centralized, versioned API gateway serving internal and sovereign external integrations.
4. `apps/worker`: Continuous background daemon executing asynchronous email dispatch, perception metrics calculation, and S3 audit archival.

## Consequences

### Positive

- Distinct security perimeters (e.g. admin can be placed behind VPN / IP whitelisting in Cloudflare WAF).
- Independent container scaling and resource allocation (e.g. scale `api` and `web` replicas under traffic spikes while `worker` runs as a singleton or worker pool).
- Clear organizational boundaries with zero code duplication through shared `@samvad/*` packages.

### Negative / Trade-offs

- Multiple application ports in local development (`3000`, `3001`, `3002`).
