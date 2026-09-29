import { describe, it, expect } from "vitest";
import { metrics } from "@samvad/telemetry";

describe("System Health & Metrics Integration", () => {
  it("should record and export metrics in Prometheus compatible format", () => {
    metrics.increment("integration_test_requests_total", 5);
    metrics.observe("integration_test_latency_ms", 12.5);
    metrics.observe("integration_test_latency_ms", 18.2);

    const prometheusOutput = metrics.exportPrometheusFormat();

    expect(prometheusOutput).toContain("# TYPE integration_test_requests_total counter");
    expect(prometheusOutput).toContain("integration_test_requests_total 5");
    expect(prometheusOutput).toContain("# TYPE integration_test_latency_ms summary");
    expect(prometheusOutput).toContain("integration_test_latency_ms_count 2");
  });
});
