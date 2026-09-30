export interface SpamCheckResult {
  isSpam: boolean;
  reason?: string;
  threatLevel: "NONE" | "LOW" | "HIGH";
}

const DISPOSABLE_DOMAINS = new Set([
  "tempmail.com",
  "mailinator.com",
  "10minutemail.com",
  "throwawaymail.com",
  "guerrillamail.com",
  "yopmail.com",
  "trashmail.com",
  "sharklasers.com",
  "dispostable.com",
  "getairmail.com",
  "maildrop.cc",
]);

const SPAM_PATTERNS = [
  /\b(casino|crypto pump|seo ranking|backlinks cheap|viagra|pills online|telegram @)\b/i,
  /(https?:\/\/[^\s]+){5,}/i, // 5 or more URLs in a single inquiry
];

/**
 * Multi-layer spam inspection engine for executive contact submissions.
 */
export function inspectSubmissionForSpam(params: {
  email: string;
  message: string;
  honeypot?: string;
  clientTimestamp?: number;
}): SpamCheckResult {
  const { email, message, honeypot, clientTimestamp } = params;

  // 1. Honeypot Check: Hidden input that only bots fill
  if (honeypot && honeypot.trim().length > 0) {
    return {
      isSpam: true,
      reason: "Honeypot trap triggered by automated submission agent.",
      threatLevel: "HIGH",
    };
  }

  // 2. Velocity Check: Forms completed in under 2000ms are almost certainly automated scripts
  if (clientTimestamp && typeof clientTimestamp === "number") {
    const elapsed = Date.now() - clientTimestamp;
    if (elapsed > 0 && elapsed < 2000) {
      return {
        isSpam: true,
        reason: `Submission velocity (${elapsed}ms) indicates automated bot interaction. Human interaction requires at least 2000ms.`,
        threatLevel: "HIGH",
      };
    }
  }

  // 3. Disposable Domain Inspection
  const domain = email.split("@")[1]?.toLowerCase().trim();
  if (domain && DISPOSABLE_DOMAINS.has(domain)) {
    return {
      isSpam: true,
      reason: "Disposable or ephemeral email provider detected.",
      threatLevel: "HIGH",
    };
  }

  // 4. Content / Link Overload Heuristics
  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(message)) {
      return {
        isSpam: true,
        reason: "Message content matches automated commercial spam or link injection signatures.",
        threatLevel: "HIGH",
      };
    }
  }

  return {
    isSpam: false,
    threatLevel: "NONE",
  };
}
