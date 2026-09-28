# ADR-0003: PostgreSQL & Prisma for Core Data Modeling

## Status

Accepted

## Context

SAMVAD requires strongly-typed, ACID-compliant relational data modeling for confidential enterprise inquiries, advisory service catalogs, case records, and compliance audit logs.

## Decision

We standardize on **PostgreSQL 16** managed via **Prisma ORM**:

- Strict relational constraints and foreign keys enforce data integrity.
- Prisma provides end-to-end type safety from schema definition to API handlers.
- Connection pooling is optimized via PgBouncer for handling 1,000+ concurrent user spikes.
- Encapsulated in `@samvad/database` with a shared singleton client preventing connection exhaustion during development HMR.

## Consequences

### Positive

- Compile-time type verification prevents runtime SQL errors.
- Declarative schema migrations with deterministic replay.
- Broad enterprise support across cloud providers (AWS RDS, Supabase, self-hosted Docker).

### Negative / Trade-offs

- Prisma introduces a lightweight runtime query engine binary that must be accounted for in container builds.
