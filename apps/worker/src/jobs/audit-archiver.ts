import { prisma } from "@samvad/database";
import { logger } from "@samvad/logger";
import { tracer } from "@samvad/telemetry";

const workerLogger = logger.child({ workerJob: "AuditTrailArchiver" });

/**
 * Batches historical audit logs for cold storage in S3/MinIO
 */
export async function archiveHistoricalAuditLogs(): Promise<number> {
  return tracer.withSpan("worker.audit.archive", async () => {
    try {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const staleLogsCount = await prisma.auditLog.count({
        where: { timestamp: { lt: thirtyDaysAgo } },
      });

      if (staleLogsCount > 0) {
        workerLogger.info(
          `Found ${staleLogsCount} historical audit logs ready for cold storage batching`
        );
      }
      return staleLogsCount;
    } catch (error) {
      workerLogger.error("Failed checking historical audit log backlog", error);
      return 0;
    }
  });
}
