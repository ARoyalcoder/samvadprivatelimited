# ADR-0001: Adoption of Modular Monolith Architecture

## Status

Accepted

## Context

SAMVAD requires enterprise reliability, high developer velocity, clear domain separation, and a clean pathway toward future service extraction. Introducing distributed microservices at inception adds operational overhead (network latency, distributed transactions, deployment complexity, dual-write challenges) without tangible benefit for initial traffic profiles.

## Decision

We adopt a **Modular Monolith** pattern organized in a `pnpm` workspace monorepo:

- `apps/web`: Next.js frontend, API endpoints, and server presentation.
- `packages/database`: Encapsulated database schema, migrations, and Prisma client.
- `packages/redis`: Caching layer, sliding window rate limiters.
- `packages/ui`: Centralized design system (shadcn/ui primitives).
- `packages/validation`: Zod schemas for contracts and environment validation.
- `packages/types`: Shared domain interfaces.
- `packages/config`: Centralized TypeScript, Tailwind, and ESLint configs.

## Consequences

### Positive

- Single atomic repository and streamlined CI/CD.
- Zero network hops for inter-module calls.
- Enforced modular boundaries allow effortless future extraction into microservices if scaling requirements demand.

### Negative / Trade-offs

- Build pipeline requires careful caching to prevent recompiling unaffected packages.
