import { prisma, Prisma } from "@samvad/database";
import { hashClientIp } from "./rate-limiter";

export interface ContactAuditEntry {
  id: string;
  action:
    | "LEAD_SUBMISSION_RECEIVED"
    | "LEAD_RATE_LIMITED"
    | "LEAD_SPAM_BLOCKED"
    | "LEAD_VALIDATION_FAILED";
  entityType: "LEAD" | "SECURITY_GATEWAY";
  entityId: string;
  metadata: Record<string, unknown>;
  ipHash: string;
  userAgent?: string;
  timestamp: string;
}

const auditTrail: ContactAuditEntry[] = [];

/**
 * Records a contact/lead audit event into the immutable log and DB.
 */
export async function recordContactAudit(params: {
  action: ContactAuditEntry["action"];
  entityId: string;
  metadata: Record<string, unknown>;
  ip: string;
  userAgent?: string;
}): Promise<ContactAuditEntry> {
  const ipHash = hashClientIp(params.ip);
  const now = new Date().toISOString();
  const entryId = `audit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  const entry: ContactAuditEntry = {
    id: entryId,
    action: params.action,
    entityType: "LEAD",
    entityId: params.entityId,
    metadata: params.metadata,
    ipHash,
    userAgent: params.userAgent,
    timestamp: now,
  };

  auditTrail.unshift(entry);

  // Attempt DB persistence if Prisma is available
  try {
    if (process.env.DATABASE_URL) {
      await prisma.auditLog.create({
        data: {
          action: params.action,
          entityType: "LEAD",
          entityId: params.entityId,
          metadata: params.metadata as Prisma.InputJsonValue,
          ipAddress: ipHash,
          timestamp: new Date(),
        },
      });
    }
  } catch (error) {
    // If DB is offline during dev/test, fallback is already in auditTrail
    if (process.env.NODE_ENV !== "test") {
      console.warn(
        `[Audit Log DB Warning] Stored in memory fallback:`,
        (error as Error).message
      );
    }
  }

  return entry;
}

/**
 * Retrieve audit trail for testing / telemetry
 */
export function getContactAuditTrail(): ContactAuditEntry[] {
  return [...auditTrail];
}

/**
 * Clear audit trail (for testing)
 */
export function clearContactAuditTrail(): void {
  auditTrail.length = 0;
}
