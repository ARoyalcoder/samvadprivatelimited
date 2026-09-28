import { z } from "zod";

declare const process: {
  env: Record<string, string | undefined>;
};

/**
 * Server-side environment schema
 * Enforces mandatory secrets, database URIs, Redis endpoints, and runtime policies.
 */
export const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid PostgreSQL connection string"),
  DIRECT_URL: z.string().url().optional(),
  REDIS_URL: z.string().url("REDIS_URL must be a valid Redis connection string"),
  ADMIN_API_KEY: z.string().min(16, "ADMIN_API_KEY must be at least 16 characters for security"),
  CORS_ALLOWED_ORIGINS: z.string().default("http://localhost:3000"),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().positive().default(60),
  RATE_LIMIT_WINDOW_SECONDS: z.coerce.number().positive().default(60),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
});

/**
 * Client-side environment schema
 * Only values prefixed with NEXT_PUBLIC_ exposed to the browser.
 */
export const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SITE_NAME: z.string().default("SAMVAD Perception Advisory"),
  NEXT_PUBLIC_ENABLE_ANALYTICS: z
    .enum(["true", "false"])
    .default("false")
    .transform((v) => v === "true"),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type ClientEnv = z.infer<typeof clientEnvSchema>;

/**
 * Validates runtime environment with clear enterprise error messages
 */
export function validateEnv(env: Record<string, unknown> = process.env): {
  server: ServerEnv;
  client: ClientEnv;
} {
  const isServer = typeof window === "undefined";

  const clientResult = clientEnvSchema.safeParse(env);
  if (!clientResult.success) {
    console.error("❌ Invalid client environment variables:", clientResult.error.format());
    throw new Error("Invalid client environment variables");
  }

  let serverParsed: ServerEnv;
  if (isServer) {
    const serverResult = serverEnvSchema.safeParse(env);
    if (!serverResult.success) {
      console.error("❌ Invalid server environment variables:", serverResult.error.format());
      throw new Error("Invalid server environment variables");
    }
    serverParsed = serverResult.data;
  } else {
    serverParsed = {} as ServerEnv;
  }

  return {
    server: serverParsed,
    client: clientResult.data,
  };
}
