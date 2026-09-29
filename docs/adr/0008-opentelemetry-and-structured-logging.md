# ADR-0008: OpenTelemetry Observability and Structured Logging

## Status

Accepted

## Context

High-consequence advisory platforms demand real-time auditability, deterministic latency tracking, and zero data leakage. Traditional `console.log` statements output unstructured text, risk leaking PII/credentials, and fail to correlate requests across distributed boundaries.

## Decision

We standardize on:

1. **`@samvad/logger`**: Structured JSON logging emitting ISO timestamps, severity levels, correlation IDs, and automatic multi-depth redaction of sensitive credentials (`password`, `token`, `secret`, `apiKey`).
2. **`@samvad/telemetry`**: OpenTelemetry-compatible tracing (`tracer.withSpan`) capturing execution durations, error events, and span tags, coupled with Prometheus-formatted metrics generation (`/api/metrics`).

## Consequences

### Positive

- Strict redaction ensures zero accidental leaks of secrets into log aggregators (Datadog, Grafana Loki, CloudWatch).
- Standardized W3C TraceContext propagation across HTTP boundaries.
- Prometheus `/api/metrics` endpoint enables immediate integration with enterprise APM monitors.

### Negative / Trade-offs

- Developers must use `logger.info()` rather than plain `console.log`.
