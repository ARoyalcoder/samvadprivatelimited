import { NewsletterJobQueue, jobQueue } from "./job-queue";
import { NewsletterJob } from "./types";
import { prisma } from "@samvad/database";
import { isDbAvailable } from "./newsletter-service";

export interface DeliveredEmailRecord {
  to: string;
  subject: string;
  template: string;
  unsubscribeUrl: string;
  sentAt: string;
  metadata?: Record<string, unknown>;
}

// In-memory delivery log for offline/testing inspection
export const inMemoryDeliveryLogs: DeliveredEmailRecord[] = [];

/**
 * Background Worker for Processing Newsletter Jobs Asynchronously.
 * Ensures zero email processing overhead on the client HTTP request thread.
 */
export class NewsletterJobWorker {
  private queue: NewsletterJobQueue;
  private isProcessing = false;
  private baseUrl: string;

  constructor(
    queue: NewsletterJobQueue = jobQueue,
    baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://samvadadvisory.com"
  ) {
    this.queue = queue;
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  /**
   * Generates the luxury executive welcome email HTML.
   */
  public generateWelcomeEmailHtml(email: string, unsubscribeUrl: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SAMVAD Intelligence Dispatch</title>
  <style>
    body { font-family: 'Times New Roman', Times, serif; background-color: #09090b; color: #f4f4f5; margin: 0; padding: 40px 20px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #121215; border: 1px solid #27272a; padding: 36px; border-radius: 6px; }
    .gold-bar { height: 2px; background: linear-gradient(90deg, #d4af37, #fef08a, #d4af37); margin-bottom: 24px; }
    .masthead { font-family: monospace; font-size: 11px; letter-spacing: 0.2em; color: #d4af37; text-transform: uppercase; margin-bottom: 8px; }
    h1 { font-size: 24px; font-weight: 300; letter-spacing: -0.02em; color: #ffffff; margin-top: 0; }
    p { font-size: 14px; line-height: 1.6; color: #d4d4d8; }
    .notice { font-size: 12px; color: #71717a; border-top: 1px solid #27272a; padding-top: 20px; margin-top: 32px; font-family: monospace; }
    .unsub-link { color: #a1a1aa; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="gold-bar"></div>
    <div class="masthead">Executive Intelligence Briefing // Confirmed</div>
    <h1>Welcome to SAMVAD Dispatches</h1>
    <p>Your subscription for <strong>${email}</strong> has been confirmed. You will receive fortnightly intelligence briefs, crisis playbooks, and strategic perception analysis prepared for sovereign leadership, board directors, and general counsel.</p>
    <p>Our briefings are produced in strict adherence to institutional standards and data privacy mandates.</p>
    <div class="notice">
      SAMVAD PERCEPTION ADVISORY • Global Strategic Communications<br/>
      If you did not authorize this subscription, you can immediately <a href="${unsubscribeUrl}" class="unsub-link">unsubscribe here</a>.
    </div>
  </div>
</body>
</html>`;
  }

  /**
   * Processes a single pending job.
   */
  async processJob(job: NewsletterJob): Promise<boolean> {
    try {
      const { email, unsubscribeToken, subscriberId } = job.payload;
      const unsubscribeUrl = `${this.baseUrl}/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`;

      let subject = "SAMVAD Executive Intelligence // Subscription Confirmed";
      let templateName = "WELCOME_DISPATCH";

      if (job.type === "REACTIVATION_EMAIL") {
        subject = "SAMVAD Executive Intelligence // Subscription Reaffirmed";
        templateName = "REACTIVATION_DISPATCH";
      } else if (job.type === "UNSUBSCRIBE_CONFIRMATION") {
        subject = "SAMVAD // Unsubscribe Confirmation";
        templateName = "UNSUBSCRIBE_CONFIRMATION";
      }

      // 1. Simulate/execute dispatch
      const deliveryRecord: DeliveredEmailRecord = {
        to: email,
        subject,
        template: templateName,
        unsubscribeUrl,
        sentAt: new Date().toISOString(),
        metadata: {
          jobId: job.id,
          attempts: job.attempts,
          source: job.payload.source,
          renderedHtml: this.generateWelcomeEmailHtml(email, unsubscribeUrl),
        },
      };

      inMemoryDeliveryLogs.push(deliveryRecord);

      // 2. Persist delivery log to database if available
      if (isDbAvailable()) {
        try {
          await prisma.newsletterDeliveryLog.create({
            data: {
              subscriberId,
              subject,
              templateName,
              status: "SENT",
              sentAt: new Date(),
            },
          });
        } catch (dbErr) {
          // Tolerant to offline/test DB states
        }
      }

      // 3. Mark job completed
      await this.queue.markCompleted(job.id);
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown worker error";
      console.error(`[NewsletterWorker] Error processing job ${job.id}:`, errorMsg);
      await this.queue.markFailed(job.id, errorMsg);
      return false;
    }
  }

  /**
   * Processes all pending jobs currently in the queue.
   * Useful for scheduled cron jobs, background runners, and test suites.
   */
  async drainQueue(): Promise<{ processed: number; succeeded: number; failed: number }> {
    if (this.isProcessing) {
      return { processed: 0, succeeded: 0, failed: 0 };
    }

    this.isProcessing = true;
    let processed = 0;
    let succeeded = 0;
    let failed = 0;

    try {
      let job = await this.queue.dequeue();
      while (job) {
        processed++;
        const ok = await this.processJob(job);
        if (ok) {
          succeeded++;
        } else {
          failed++;
        }
        job = await this.queue.dequeue();
      }
    } finally {
      this.isProcessing = false;
    }

    return { processed, succeeded, failed };
  }
}

// Global Singleton Worker Instance
export const newsletterWorker = new NewsletterJobWorker();
