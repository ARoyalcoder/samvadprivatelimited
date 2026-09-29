import { describe, it, expect, vi } from "vitest";
import { Logger } from "@samvad/logger";

describe("Structured Enterprise Logger", () => {
  it("should redact sensitive fields automatically from output", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const customLogger = new Logger("test-service", {}, "info");

    customLogger.info("Executive auth test", {
      password: "SuperSecretPassword123!",
      apiKey: "secret_api_key_448822",
      safePublicField: "PublicInstitutionName",
    });

    expect(consoleSpy).toHaveBeenCalled();
    const loggedOutput = consoleSpy.mock.calls[0]?.[0];
    expect(loggedOutput).toBeDefined();

    const parsed = JSON.parse(loggedOutput as string);
    expect(parsed.context.password).toBe("[REDACTED]");
    expect(parsed.context.apiKey).toBe("[REDACTED]");
    expect(parsed.context.safePublicField).toBe("PublicInstitutionName");

    consoleSpy.mockRestore();
  });

  it("should create child loggers with contextual metadata", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const parentLogger = new Logger("parent-service");
    const childLogger = parentLogger.child({ correlationId: "corr-xyz-789" });

    childLogger.info("Operation in progress");
    expect(consoleSpy).toHaveBeenCalled();

    const loggedOutput = consoleSpy.mock.calls[0]?.[0];
    const parsed = JSON.parse(loggedOutput as string);
    expect(parsed.context.correlationId).toBe("corr-xyz-789");

    consoleSpy.mockRestore();
  });
});
