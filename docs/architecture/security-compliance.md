# SAMVAD PERCEPTION ADVISORY — Security & Compliance Architecture

## 1. Threat Model & Security Posture

Given SAMVAD's advisory remit across defense, sovereign capital, and crisis communications, the platform adheres to an enterprise-grade defense-in-depth posture:

```
[Inbound Traffic]
       │
       ▼
[Edge Firewall / Cloudflare] ─── TLS 1.3 Strict, DDoS Mitigation, WAF
       │
       ▼
[Nginx Reverse Proxy]        ─── Rate Limiting Zones, Security Headers, IP Filtering
       │
       ▼
[Next.js Application Layer]  ─── Zod Schema Enforcement, Strict Sanitization, CSRF Defense
       │
       ▼
[Redis Tier]                 ─── Atomic Sliding Window Counter, Transient Session Store
       │
       ▼
[Postgres Storage Tier]      ─── Parameterized Queries (Prisma), Network Isolation, Audit Logs
```

---

## 2. Implemented Defense Controls

### A. Input Sanitization & Strict Zod Validation

- All inbound API payloads (e.g. Lead Submissions) are validated through strict Zod schemas.
- Disposable email provider blocking prevents bot spam and ensures authentic institutional communication.
- Disallowed characters, script injection tags, and prototype pollution patterns are rejected before database queries.

### B. Enterprise Rate Limiting

- Dual-tier rate limiting:
  1. **Nginx Level**: 10 req/sec on `/api/` with burst tolerance of 20.
  2. **Application Level (Redis)**: Sliding-window counter per IP address enforcing a max of 10 lead submissions per 5-minute interval.

### C. Security Headers

The following HTTP response headers are enforced across all responses:

- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Frame-Options: DENY` (Anti-Clickjacking)
- `X-Content-Type-Options: nosniff` (MIME sniffing defense)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### D. Audit Logging

Every CMS modification, authentication event, or content state transition is permanently recorded in the `AuditLog` table with:

- User ID
- Entity Type & Record ID
- Action taken
- Timestamp
- Client IP address and metadata
