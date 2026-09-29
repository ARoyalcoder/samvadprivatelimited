/**
 * SAMVAD PERCEPTION ADVISORY - Structured Enterprise Logger
 * Standardized JSON logs, PII/secret redaction, correlation IDs, OpenTelemetry integration.
 */

export type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";

export const LOG_LEVEL_SEVERITY: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  fatal: 50,
};

const SENSITIVE_KEYS = new Set([
  "password",
  "passwordhash",
  "token",
  "secret",
  "apikey",
  "authorization",
  "cookie",
  "sessionid",
  "creditcard",
]);

export interface LogContext {
  service?: string;
  correlationId?: string;
  traceId?: string;
  spanId?: string;
  userId?: string;
  path?: string;
  method?: string;
  [key: string]: unknown;
}

export interface StructuredLogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  service: string;
  environment: string;
  context?: Record<string, unknown>;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

function redact(obj: unknown, depth = 0): unknown {
  if (depth > 6 || obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => redact(item, depth + 1));
  }

  const redactedObj: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      redactedObj[key] = "[REDACTED]";
    } else if (typeof value === "object" && value !== null) {
      redactedObj[key] = redact(value, depth + 1);
    } else {
      redactedObj[key] = value;
    }
  }
  return redactedObj;
}

export class Logger {
  private service: string;
  private environment: string;
  private minLevelSeverity: number;
  private defaultContext: LogContext;

  constructor(
    service = "samvad-platform",
    defaultContext: LogContext = {},
    minLevel: LogLevel = (typeof process !== "undefined" &&
      (process.env["LOG_LEVEL"] as LogLevel)) ||
      "info"
  ) {
    this.service = service;
    this.environment = (typeof process !== "undefined" && process.env["NODE_ENV"]) || "development";
    this.minLevelSeverity = LOG_LEVEL_SEVERITY[minLevel] ?? 20;
    this.defaultContext = defaultContext;
  }

  public child(context: LogContext): Logger {
    return new Logger(
      context.service || this.service,
      { ...this.defaultContext, ...context },
      (typeof process !== "undefined" && (process.env["LOG_LEVEL"] as LogLevel)) || "info"
    );
  }

  private write(
    level: LogLevel,
    message: string,
    meta?: Record<string, unknown>,
    err?: Error
  ): void {
    if (LOG_LEVEL_SEVERITY[level] < this.minLevelSeverity) {
      return;
    }

    const mergedContext = { ...this.defaultContext, ...meta };
    const safeContext = redact(mergedContext) as Record<string, unknown>;

    const entry: StructuredLogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      service: this.service,
      environment: this.environment,
      context: Object.keys(safeContext).length > 0 ? safeContext : undefined,
    };

    if (err instanceof Error) {
      entry.error = {
        name: err.name,
        message: err.message,
        stack: err.stack,
      };
    }

    const output = JSON.stringify(entry);
    if (level === "error" || level === "fatal") {
      console.error(output);
    } else if (level === "warn") {
      console.warn(output);
    } else {
      console.log(output);
    }
  }

  public debug(message: string, meta?: Record<string, unknown>): void {
    this.write("debug", message, meta);
  }

  public info(message: string, meta?: Record<string, unknown>): void {
    this.write("info", message, meta);
  }

  public warn(message: string, meta?: Record<string, unknown>): void {
    this.write("warn", message, meta);
  }

  public error(message: string, err?: Error | unknown, meta?: Record<string, unknown>): void {
    const errorObj =
      err instanceof Error ? err : typeof err === "string" ? new Error(err) : undefined;
    const additionalMeta =
      errorObj === undefined && typeof err === "object" && err !== null
        ? { ...meta, ...(err as Record<string, unknown>) }
        : meta;
    this.write("error", message, additionalMeta, errorObj);
  }

  public fatal(message: string, err?: Error | unknown, meta?: Record<string, unknown>): void {
    const errorObj =
      err instanceof Error ? err : typeof err === "string" ? new Error(err) : undefined;
    this.write("fatal", message, meta, errorObj);
  }
}

export const logger = new Logger("samvad-core");
export default logger;
