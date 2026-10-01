import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getProductionSecurityHeaders,
  getCorsHeaders,
  isOriginAllowed,
  verifyOriginOrReferer,
} from "@samvad/auth/edge";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt / sitemap.xml
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};

const ALLOWED_ORIGINS = [
  "https://samvadadvisory.com",
  "https://www.samvadadvisory.com",
  "https://admin.samvadadvisory.com",
  ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : []),
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isDev = process.env.NODE_ENV !== "production";
  const requestOrigin = req.headers.get("origin");
  const host = req.headers.get("host") || "";

  // In local dev, allow localhost
  const effectiveAllowedOrigins = isDev
    ? [...ALLOWED_ORIGINS, "http://localhost:3000", "http://localhost:3001", `http://${host}`]
    : ALLOWED_ORIGINS;

  // 1. Enforce HTTPS in production
  const proto = req.headers.get("x-forwarded-proto");
  if (!isDev && proto && proto === "http") {
    const httpsUrl = req.nextUrl.clone();
    httpsUrl.protocol = "https:";
    return NextResponse.redirect(httpsUrl, 301);
  }

  // 2. Handle CORS Preflight for /api/* routes
  if (pathname.startsWith("/api/")) {
    if (req.method === "OPTIONS") {
      const corsHeaders = getCorsHeaders(requestOrigin, {
        allowedOrigins: effectiveAllowedOrigins,
        allowCredentials: true,
      });

      return new NextResponse(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // 3. CSRF & Origin Defense on state-changing API endpoints (POST, PATCH, DELETE, PUT)
    if (["POST", "PATCH", "DELETE", "PUT"].includes(req.method)) {
      const referer = req.headers.get("referer");

      // Verify Origin / Referer matches host or allowed CORS origin
      const isTrustedOrigin =
        verifyOriginOrReferer(requestOrigin, referer, host) ||
        (requestOrigin && isOriginAllowed(requestOrigin, effectiveAllowedOrigins));

      // If client sends explicit cross-site request to internal API without authorized origin, block
      if (!isTrustedOrigin && requestOrigin) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "CSRF_ORIGIN_REJECTED",
              message: "Cross-site request forgery prevention: Untrusted request origin.",
            },
          },
          { status: 403 }
        );
      }
    }
  }

  // 4. Generate downstream response
  const response = NextResponse.next();

  // 5. Attach Comprehensive Security Headers
  const secHeaders = getProductionSecurityHeaders({
    isDev,
    isAdmin: false,
  });

  for (const [key, value] of Object.entries(secHeaders)) {
    response.headers.set(key, value);
  }

  // 6. Attach CORS Headers if origin is present and permitted
  if (requestOrigin && pathname.startsWith("/api/")) {
    const corsHeaders = getCorsHeaders(requestOrigin, {
      allowedOrigins: effectiveAllowedOrigins,
      allowCredentials: true,
    });
    for (const [key, value] of Object.entries(corsHeaders)) {
      response.headers.set(key, value);
    }
  }

  return response;
}
