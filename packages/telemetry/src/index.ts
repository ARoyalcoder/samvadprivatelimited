import { logger } from "@samvad/logger";

/**
 * OpenTelemetry compatible Tracing & Metrics instrumentation
 */

export interface SpanContext {
  traceId: string;
  spanId: string;
  parentSpanId?: string;
}

export interface Span {
  name: string;
  context: SpanContext;
  startTime: number;
  attributes: Record<string, string | number | boolean>;
  status: "UNSET" | "OK" | "ERROR";
  error?: Error;
  end: () => void;
  setAttribute: (key: string, value: string | number | boolean) => void;
  recordException: (err: Error) => void;
}

function generateRandomHex(bytes: number): string {
  let hex = "";
  for (let i = 0; i < bytes; i++) {
    const val = Math.floor(Math.random() * 256);
    hex += val.toString(16).padStart(2, "0");
  }
  return hex;
}

export class TelemetryTracer {
  private serviceName: string;

  constructor(serviceName = "samvad-platform") {
    this.serviceName = serviceName;
  }

  public startSpan(name: string, parentContext?: SpanContext): Span {
    const startTime = Date.now();
    const traceId = parentContext?.traceId || generateRandomHex(16);
    const spanId = generateRandomHex(8);
    const attributes: Record<string, string | number | boolean> = {
      "service.name": this.serviceName,
    };

    let status: "UNSET" | "OK" | "ERROR" = "UNSET";
    let recordedError: Error | undefined = undefined;

    const span: Span = {
      name,
      context: {
        traceId,
        spanId,
        parentSpanId: parentContext?.spanId,
      },
      startTime,
      attributes,
      status,
      error: recordedError,
      setAttribute: (key: string, value: string | number | boolean) => {
        attributes[key] = value;
      },
      recordException: (err: Error) => {
        status = "ERROR";
        recordedError = err;
        attributes["error"] = true;
        attributes["error.message"] = err.message;
      },
      end: () => {
        const durationMs = Date.now() - startTime;
        if (status === "UNSET") {
          status = "OK";
        }
        if (status === "ERROR") {
          logger.error(`[Trace Span Error] ${name} (${durationMs}ms)`, recordedError, {
            traceId,
            spanId,
            ...attributes,
            durationMs,
          });
        } else {
          logger.debug(`[Trace Span OK] ${name} (${durationMs}ms)`, {
            traceId,
            spanId,
            ...attributes,
            durationMs,
          });
        }
      },
    };

    return span;
  }

  public async withSpan<T>(
    name: string,
    fn: (span: Span) => Promise<T>,
    parentContext?: SpanContext
  ): Promise<T> {
    const span = this.startSpan(name, parentContext);
    try {
      const result = await fn(span);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        span.recordException(error);
      }
      throw error;
    } finally {
      span.end();
    }
  }
}

/**
 * Metric collector & Prometheus exporter format helper
 */
export class MetricsRegistry {
  private counters: Map<string, number> = new Map();
  private histograms: Map<string, number[]> = new Map();

  public increment(metric: string, value = 1): void {
    const current = this.counters.get(metric) || 0;
    this.counters.set(metric, current + value);
  }

  public observe(metric: string, value: number): void {
    const values = this.histograms.get(metric) || [];
    values.push(value);
    if (values.length > 1000) {
      values.shift();
    }
    this.histograms.set(metric, values);
  }

  public getCounter(metric: string): number {
    return this.counters.get(metric) || 0;
  }

  public exportPrometheusFormat(): string {
    const lines: string[] = [];
    for (const [metric, value] of this.counters.entries()) {
      const sanitized = metric.replace(/[^a-zA-Z0-9_]/g, "_");
      lines.push(`# TYPE ${sanitized} counter`);
      lines.push(`${sanitized} ${value}`);
    }
    for (const [metric, values] of this.histograms.entries()) {
      const sanitized = metric.replace(/[^a-zA-Z0-9_]/g, "_");
      const sum = values.reduce((a, b) => a + b, 0);
      const count = values.length;
      lines.push(`# TYPE ${sanitized} summary`);
      lines.push(`${sanitized}_sum ${sum}`);
      lines.push(`${sanitized}_count ${count}`);
    }
    return lines.join("\n");
  }
}

export const tracer = new TelemetryTracer("samvad-core");
export const metrics = new MetricsRegistry();
