/** @type {import('next').NextConfig} */
const nextConfig = {
  output:
    process.env.STANDALONE === "true" || process.platform !== "win32"
      ? "standalone"
      : undefined,
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: [
    "@samvad/ui",
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
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "same-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
