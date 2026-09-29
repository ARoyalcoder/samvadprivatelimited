/**
 * Cloudflare Edge Worker for Enterprise Security Headers & WAF Ingress
 */
export default {
  async fetch(request, env, ctx) {
    const response = await fetch(request);
    const newHeaders = new Headers(response.headers);

    // Enforce Sovereign Security Posture
    newHeaders.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
    newHeaders.set("X-Frame-Options", "DENY");
    newHeaders.set("X-Content-Type-Options", "nosniff");
    newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
    newHeaders.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    newHeaders.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https:;"
    );

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};
