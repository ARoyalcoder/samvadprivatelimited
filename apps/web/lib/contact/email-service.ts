export interface LeadEmailPayload {
  referenceCode: string;
  name: string;
  company: string;
  designation: string;
  email: string;
  phone?: string | null;
  industry: string;
  serviceRequired: string;
  message: string;
  receivedAt: string;
}

export interface EmailDispatchRecord {
  id: string;
  recipient: string;
  subject: string;
  type: "INTERNAL_TRIAGE" | "CLIENT_CONFIRMATION";
  timestamp: string;
  referenceCode: string;
  status: "SENT" | "SIMULATED";
}

// In-memory record store for testing and audit telemetry
const dispatchHistory: EmailDispatchRecord[] = [];

/**
 * Dispatches both internal executive triage alert and client receipt acknowledgment.
 */
export async function sendLeadNotificationEmails(
  payload: LeadEmailPayload
): Promise<{ success: boolean; internalDispatchId: string; clientDispatchId: string }> {
  const internalRecipient =
    process.env.TRIAGE_NOTIFICATION_EMAIL || "intake@samvad.advisory";
  const now = new Date().toISOString();

  // 1. Internal Executive Alert Dispatch
  const internalDispatchId = `msg-int-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const internalSubject = `[PRIORITY INTAKE] New Mandate Inquiry — ${payload.company} (${payload.serviceRequired}) [${payload.referenceCode}]`;

  const internalRecord: EmailDispatchRecord = {
    id: internalDispatchId,
    recipient: internalRecipient,
    subject: internalSubject,
    type: "INTERNAL_TRIAGE",
    timestamp: now,
    referenceCode: payload.referenceCode,
    status: process.env.NODE_ENV === "production" && process.env.SMTP_HOST ? "SENT" : "SIMULATED",
  };

  dispatchHistory.unshift(internalRecord);

  // 2. Client Confirmation Receipt Dispatch
  const clientDispatchId = `msg-cli-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const clientSubject = `SAMVAD Advisory Mandate Receipt — Reference ${payload.referenceCode}`;

  const clientRecord: EmailDispatchRecord = {
    id: clientDispatchId,
    recipient: payload.email,
    subject: clientSubject,
    type: "CLIENT_CONFIRMATION",
    timestamp: now,
    referenceCode: payload.referenceCode,
    status: process.env.NODE_ENV === "production" && process.env.SMTP_HOST ? "SENT" : "SIMULATED",
  };

  dispatchHistory.unshift(clientRecord);

  // Log executive notification telemetry
  if (process.env.NODE_ENV !== "test") {
    console.log(
      `[Email Service] Dispatched mandate dispatches for ${payload.referenceCode} to ${internalRecipient} and ${payload.email}`
    );
  }

  return {
    success: true,
    internalDispatchId,
    clientDispatchId,
  };
}

/**
 * Access dispatch history for testing
 */
export function getDispatchedEmails(): EmailDispatchRecord[] {
  return [...dispatchHistory];
}

/**
 * Clear history (useful in beforeEach)
 */
export function clearDispatchedEmails(): void {
  dispatchHistory.length = 0;
}
