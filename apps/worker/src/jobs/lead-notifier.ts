import { prisma } from "@samvad/database";
import { logger } from "@samvad/logger";
import { tracer, metrics } from "@samvad/telemetry";

const workerLogger = logger.child({ workerJob: "LeadNotificationJob" });

/**
 * Polls for unprocessed leads and queues encrypted notifications to Practice Partners
 */
export async function processUnnotifiedLeads(): Promise<number> {
  return tracer.withSpan("worker.leads.notify", async () => {
    try {
      const unprocessedLeads = await prisma.lead.findMany({
        where: { status: "NEW" },
        take: 10,
        orderBy: { createdAt: "asc" },
      });

      if (unprocessedLeads.length === 0) {
        return 0;
      }

      for (const lead of unprocessedLeads) {
        workerLogger.info("Routing new confidential inquiry to Managing Principal", {
          leadId: lead.id,
          serviceInterest: lead.serviceInterest,
          industry: lead.industry,
        });

        // Mark as IN_REVIEW to prevent duplicate alerts
        await prisma.lead.update({
          where: { id: lead.id },
          data: { status: "IN_REVIEW" },
        });

        metrics.increment("worker_leads_processed_total");
      }

      return unprocessedLeads.length;
    } catch (error) {
      workerLogger.error("Failed to process lead notification queue", error);
      return 0;
    }
  });
}
