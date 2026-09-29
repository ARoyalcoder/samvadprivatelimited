export default function ApiDiscoveryPage() {
  return (
    <main
      style={{ fontFamily: "monospace", padding: "2rem", background: "#0c0e12", color: "#e2e4e8" }}
    >
      <h2>SAMVAD PERCEPTION ADVISORY — Core API Gateway</h2>
      <p>Status: OPERATIONAL</p>
      <ul>
        <li>GET /api/health — System Health & Component Status</li>
        <li>GET /api/metrics — OpenTelemetry / Prometheus Metrics</li>
        <li>GET /api/v1/services — Strategic Services Catalog</li>
        <li>GET /api/v1/industries — Operating Sectors</li>
        <li>GET /api/v1/insights — Perception Intelligence Articles</li>
        <li>POST /api/v1/leads — Confidential Strategic Ingestion</li>
      </ul>
    </main>
  );
}
