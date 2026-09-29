import { NextRequest, NextResponse } from "next/server";
import { prisma, ServiceType, IndustryType } from "@samvad/database";
import { checkRateLimit } from "@samvad/redis";
import { leadSubmissionSchema } from "@samvad/validation";
import { logger } from "@samvad/logger";
import { tracer, metrics } from "@samvad/telemetry";
import type { ApiResponse } from "@samvad/types";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  metrics.increment("leads_submitted_total");
  const apiLogger = logger.child({ service: "samvad-api", route: "/api/v1/leads" });

  return tracer.withSpan("api.v1.leads.create", async (span) => {
    try {
      const forwardedFor = req.headers.get("x-forwarded-for");
      const ip = (forwardedFor ? forwardedFor.split(",")[0]?.trim() : null) || "127.0.0.1";
      span.setAttribute("client.ip", ip);

      // Sliding window rate limit
      const rateLimit = await checkRateLimit(`api-leads:${ip}`, 10, 300);
      if (!rateLimit.allowed) {
        apiLogger.warn("Lead submission rate limited", { ip });
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "RATE_LIMITED",
              message: `Too many submissions. Please retry after ${rateLimit.resetSeconds} seconds.`,
            },
          },
          { status: 429 }
        );
      }

      const body = await req.json();
      const parseResult = leadSubmissionSchema.safeParse(body);

      if (!parseResult.success) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "VALIDATION_ERROR",
              message: "Submitted inquiry does not conform to enterprise requirements.",
              details: parseResult.error.flatten(),
            },
          },
          { status: 400 }
        );
      }

      const valid = parseResult.data;
      const lead = await prisma.lead.create({
        data: {
          fullName: valid.fullName,
          corporateEmail: valid.corporateEmail,
          companyName: valid.companyName,
          jobTitle: valid.jobTitle,
          phoneNumber: valid.phoneNumber,
          serviceInterest: valid.serviceInterest as ServiceType,
          industry: valid.industry as IndustryType,
          estimatedBudgetRange: valid.estimatedBudgetRange,
          message: valid.message,
          sourceIp: ip,
        },
      });

      apiLogger.info("Confidential lead intake received successfully", {
        leadId: lead.id,
        serviceInterest: lead.serviceInterest,
        industry: lead.industry,
      });

      metrics.increment("leads_created_success_total");

      const successResponse: ApiResponse<{ referenceId: string; status: string }> = {
        success: true,
        data: {
          referenceId: lead.id,
          status: "RECEIVED_CONFIDENTIAL",
        },
      };

      return NextResponse.json(successResponse, { status: 201 });
    } catch (error) {
      apiLogger.error("Failed to process confidential lead ingestion", error);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INTERNAL_ERROR",
            message: "Internal server error occurred while processing inquiry.",
          },
        },
        { status: 500 }
      );
    }
  });
}
