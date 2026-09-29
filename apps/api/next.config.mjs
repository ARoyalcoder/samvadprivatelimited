/** @type {import('next').NextConfig} */
const nextConfig = {
  output:
    process.env.STANDALONE === "true" || process.platform !== "win32"
      ? "standalone"
      : undefined,
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: [
    "@samvad/database",
    "@samvad/redis",
    "@samvad/validation",
    "@samvad/types",
    "@samvad/config",
    "@samvad/logger",
    "@samvad/auth",
    "@samvad/telemetry",
  ],
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: process.env.CORS_ALLOWED_ORIGINS || "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization, X-Correlation-ID" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
