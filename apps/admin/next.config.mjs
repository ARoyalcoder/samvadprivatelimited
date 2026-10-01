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
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet" },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https://images.unsplash.com https://cdn.samvadadvisory.com; connect-src 'self' https://* wss://*; media-src 'self' blob: https://*; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests; block-all-mixed-content;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
