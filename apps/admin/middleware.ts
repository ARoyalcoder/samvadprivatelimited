import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  SESSION_COOKIE_NAME,
  verifySessionToken,
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
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

const PUBLIC_PATHS = [
  "/login",
  "/api/auth/login",
  "/api/auth/mfa/verify",
  "/api/health",
];

const ADMIN_ALLOWED_ORIGINS = [
  "https://admin.samvadadvisory.com",
  "https://samvadadvisory.com",
  ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : []),
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isDev = process.env.NODE_ENV !== "production";
  const requestOrigin = req.headers.get("origin");
  const host = req.headers.get("host") || "";

  const effectiveAllowedOrigins = isDev
    ? [...ADMIN_ALLOWED_ORIGINS, "http://localhost:3000", "http://localhost:3001", `http://${host}`]
    : ADMIN_ALLOWED_ORIGINS;

  // 1. Enforce HTTPS in production
  const proto = req.headers.get("x-forwarded-proto");
  if (!isDev && proto && proto === "http") {
    const httpsUrl = req.nextUrl.clone();
    httpsUrl.protocol = "https:";
    return NextResponse.redirect(httpsUrl, 301);
  }

  // 2. Handle CORS Preflight for /api/*
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

    // 3. CSRF & Origin Defense on state-changing API endpoints
    if (["POST", "PATCH", "DELETE", "PUT"].includes(req.method)) {
      const referer = req.headers.get("referer");
      const isTrustedOrigin =
        verifyOriginOrReferer(requestOrigin, referer, host) ||
        (requestOrigin && isOriginAllowed(requestOrigin, effectiveAllowedOrigins));

      // Reject non-whitelisted cross-origin mutations
      if (!isTrustedOrigin && requestOrigin) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "CSRF_ORIGIN_REJECTED",
              message: "Cross-site request forgery prevention: Untrusted request origin for administrative mutation.",
            },
          },
          { status: 403 }
        );
      }
    }
  }

  // Helper to attach security headers to any outgoing response
  const attachHeaders = (res: NextResponse): NextResponse => {
    const secHeaders = getProductionSecurityHeaders({
      isDev,
      isAdmin: true,
    });
    for (const [key, value] of Object.entries(secHeaders)) {
      res.headers.set(key, value);
    }
    if (requestOrigin && pathname.startsWith("/api/")) {
      const corsHeaders = getCorsHeaders(requestOrigin, {
        allowedOrigins: effectiveAllowedOrigins,
        allowCredentials: true,
      });
      for (const [key, value] of Object.entries(corsHeaders)) {
        res.headers.set(key, value);
      }
    }
    return res;
  };

  // 4. Check Public Whitelist Routes
  const isPublic = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  if (isPublic) {
    if (pathname === "/login") {
      const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
      const secret =
        process.env.ADMIN_API_KEY ||
        process.env.SESSION_SECRET ||
        "super_secure_enterprise_advisory_secret_key_samvad_2026_rbac_guard";

      if (token && (await verifySessionToken(token, secret))) {
        return attachHeaders(NextResponse.redirect(new URL("/", req.url)));
      }
    }
    return attachHeaders(NextResponse.next());
  }

  // 5. Read and Verify Session Cookie
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const secret =
    process.env.ADMIN_API_KEY ||
    process.env.SESSION_SECRET ||
    "super_secure_enterprise_advisory_secret_key_samvad_2026_rbac_guard";

  let validSession: Awaited<ReturnType<typeof verifySessionToken>> = null;

  if (token) {
    try {
      validSession = await verifySessionToken(token, secret);
    } catch {
      validSession = null;
    }
  }

  // 6. Block Unauthorized Access
  if (!validSession) {
    if (pathname.startsWith("/api/")) {
      return attachHeaders(
        NextResponse.json(
          {
            success: false,
            error: {
              code: "UNAUTHORIZED",
              message: "Restricted administrative endpoint. Active session token required.",
            },
          },
          { status: 401 }
        )
      );
    }

    const loginUrl = new URL("/login", req.url);
    if (pathname !== "/" && !pathname.startsWith("/login")) {
      loginUrl.searchParams.set("redirect", pathname);
    }
    return attachHeaders(NextResponse.redirect(loginUrl));
  }

  // 7. Inject Authenticated Identity Headers for Route Handlers
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-user-id", validSession.userId);
  requestHeaders.set("x-user-email", validSession.email);
  requestHeaders.set("x-user-role", validSession.role);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return attachHeaders(response);
}
