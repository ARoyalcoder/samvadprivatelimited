import { logger } from "@samvad/logger";
import { processUnnotifiedLeads } from "./jobs/lead-notifier.js";
import { aggregatePerceptionMetrics } from "./jobs/metrics-aggregator.js";
import { archiveHistoricalAuditLogs } from "./jobs/audit-archiver.js";

const workerLogger = logger.child({ service: "samvad-worker-daemon" });

let isRunning = true;

async function executeLoop() {
  workerLogger.info("Starting SAMVAD Background Worker Daemon");

  while (isRunning) {
    try {
      await processUnnotifiedLeads();
      await aggregatePerceptionMetrics();
      await archiveHistoricalAuditLogs();
    } catch (err) {
      workerLogger.error("Error executing background worker cycle", err);
    }

    // Sleep for 15 seconds before next polling cycle
    await new Promise((resolve) => setTimeout(resolve, 15000));
  }

  workerLogger.info("Worker daemon terminated cleanly");
}

function handleShutdown(signal: string) {
  workerLogger.info(`Received ${signal}. Shutting down worker process gracefully...`);
  isRunning = false;
  setTimeout(() => {
    process.exit(0);
  }, 2000);
}

process.on("SIGINT", () => handleShutdown("SIGINT"));
process.on("SIGTERM", () => handleShutdown("SIGTERM"));

executeLoop().catch((err) => {
  workerLogger.fatal("Worker fatal execution failure", err);
  process.exit(1);
});
