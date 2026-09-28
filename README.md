# SAMVAD PERCEPTION ADVISORY

> **Enterprise PR, Strategic Communications, Reputation Management, and Perception Intelligence Platform**

---

## 1. Overview

**SAMVAD PERCEPTION ADVISORY** is an institutional-grade platform architected for a tier-1 public relations, strategic communications, and perception advisory firm. The platform represents sovereign leaders, defense conglomerates, critical infrastructure providers, and high-consequence leadership navigating complex public affairs, crisis arbitration, and cross-border transactions.

---

## 2. Monorepo Structure

The project is structured as a **Modular Monolith** using `pnpm` workspaces:

```
samvad-perception-advisory/
├── apps/
│   └── web/                   # Next.js 15 App Router presentation & API routes
├── packages/
│   ├── ui/                    # shadcn/ui primitives & bespoke luxury design tokens
│   ├── database/              # PostgreSQL schema, Prisma ORM, migrations, seed script
│   ├── redis/                 # Redis connection singleton, cache-aside, sliding rate limiter
│   ├── validation/            # Zod validation schemas (contracts, env vars, lead forms)
│   ├── types/                 # TypeScript domain interfaces, enums, API envelopes
│   └── config/                # Centralized TypeScript, Tailwind, and ESLint presets
├── docs/
│   ├── architecture/          # C4 system diagrams, data models, motion & security specs
│   └── adr/                   # Architectural Decision Records (ADRs)
├── infrastructure/
│   ├── Dockerfile             # Multi-stage production container build (standalone Next.js)
│   ├── docker-compose.yml     # Local/Staging stack (Postgres 16, Redis 7, Web)
│   ├── docker-compose.prod.yml# Production stack with PgBouncer connection pooling
│   └── nginx/                 # Edge reverse proxy, load balancer, and rate limiter
├── tests/                     # Vitest test suite for validation & security rules
└── .github/workflows/         # GitHub Actions CI validation pipeline
```

---

## 3. Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React Server Components)
- **Frontend Core**: [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/) (Strict settings)
- **Styling & UI**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Motion & 3D**: [Lenis](https://lenis.darkroom.engineering/) (Smooth Scroll), [GSAP](https://greensock.com/), [Framer Motion](https://www.framer.com/motion/), [Three.js](https://threejs.org/) / [React Three Fiber](https://r3f.docs.pmnd.rs/)
- **Data & Caching**: [PostgreSQL 16](https://www.postgresql.org/), [Prisma ORM](https://www.prisma.io/), [Redis 7](https://redis.io/), [PgBouncer](https://www.pgbouncer.org/)
- **Validation**: [Zod](https://zod.dev/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Containerization**: [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/)
- **Package Manager**: [pnpm](https://pnpm.io/) (v11)

---

## 4. Getting Started

### Prerequisites

- **Node.js**: >= 20.0.0 (Node 22 or 24 recommended)
- **pnpm**: >= 9.0.0
- **Docker & Docker Compose** (for PostgreSQL and Redis containers)

### 1. Environment Configuration

Copy the environment template:

```bash
cp .env.example .env
```

Ensure database connection string and Redis URL are configured.

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Spin Up Infrastructure (PostgreSQL & Redis)

```bash
docker compose -f infrastructure/docker-compose.yml up -d postgres redis
```

### 4. Initialize Database

Generate Prisma client and apply schema:

```bash
pnpm db:generate
pnpm db:push
pnpm db:seed
```

### 5. Launch Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 5. Available Scripts

| Command             | Description                                                                 |
| :------------------ | :-------------------------------------------------------------------------- |
| `pnpm dev`          | Starts the Next.js development server with hot-module reloading             |
| `pnpm build`        | Generates Prisma client, builds packages, and produces production build     |
| `pnpm lint`         | Runs ESLint checks across all apps and packages                             |
| `pnpm typecheck`    | Runs strict TypeScript compiler check (`tsc --noEmit`) across the workspace |
| `pnpm test`         | Runs the Vitest test suite                                                  |
| `pnpm format`       | Formats codebase using Prettier                                             |
| `pnpm format:check` | Checks code formatting without modifying files                              |
| `pnpm db:generate`  | Generates Prisma Client from `schema.prisma`                                |
| `pnpm db:push`      | Synchronizes database schema with PostgreSQL                                |
| `pnpm db:seed`      | Populates database with initial services, sectors, and case records         |

---

## 6. Architecture & Scalability Highlights

- **1,000+ Concurrent User Support**: Backed by PgBouncer transaction-mode pooling, Redis caching, and stateless horizontally scalable Next.js standalone containers.
- **DDoS & Spam Defense**: Dual-layer rate limiting at Nginx reverse proxy and Redis sliding-window application level.
- **Enterprise Lead Pipeline**: Fully typed and validated through strict Zod schemas with disposable-domain blocking and corporate email validation.
- **Interactive Narrative Canvas**: Three.js/R3F perception intelligence globe communicating global discourse monitoring capabilities.

For detailed documentation, consult:

- [System Architecture Overview](./docs/architecture/system-overview.md)
- [Data Model & ERD](./docs/architecture/data-model.md)
- [Frontend Motion Pipeline](./docs/architecture/frontend-motion-architecture.md)
- [Security & Compliance Specification](./docs/architecture/security-compliance.md)
- [Deployment & Scalability Guide](./docs/architecture/deployment-scalability.md)
- [Architectural Decision Records (ADRs)](./docs/adr/README.md)
