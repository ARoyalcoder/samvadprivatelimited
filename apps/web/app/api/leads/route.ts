import { NextRequest, NextResponse } from "next/server";
import { prisma, ServiceType, IndustryType } from "@samvad/database";
import { checkRateLimit } from "@samvad/redis";
import { leadSubmissionSchema } from "@samvad/validation";
import type { ApiResponse } from "@samvad/types";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 1. Client IP Extraction
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0]?.trim() : "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || undefined;

    // 2. Sliding Window Rate Limiting (max 10 submissions per 5 minutes per IP)
    const rateLimit = await checkRateLimit(`lead-submit:${ip}`, 10, 300);
    if (!rateLimit.allowed) {
      const throttledResponse: ApiResponse = {
        success: false,
        error: {
          code: "RATE_LIMITED",
          message: `Too many submissions. Please retry after ${rateLimit.resetSeconds} seconds.`,
        },
      };
      return NextResponse.json(throttledResponse, {
        status: 429,
        headers: {
          "Retry-After": rateLimit.resetSeconds.toString(),
        },
      });
    }

    // 3. Request Payload Extraction & Validation
    const json = await req.json();
    const parseResult = leadSubmissionSchema.safeParse(json);

    if (!parseResult.success) {
      const errorResponse: ApiResponse = {
        success: false,
        error: {
          code: "VALIDATION_FAILED",
          message: "Submitted data failed enterprise validation criteria.",
          details: parseResult.error.flatten(),
        },
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const validData = parseResult.data;

    // 4. Persistence into PostgreSQL via Prisma
    const lead = await prisma.lead.create({
      data: {
        fullName: validData.fullName,
        corporateEmail: validData.corporateEmail,
        companyName: validData.companyName,
        jobTitle: validData.jobTitle,
        phoneNumber: validData.phoneNumber,
        serviceInterest: validData.serviceInterest as ServiceType,
        industry: validData.industry as IndustryType,
        estimatedBudgetRange: validData.estimatedBudgetRange,
        message: validData.message,
        sourceIp: ip,
        userAgent,
      },
    });

    const successResponse: ApiResponse<{ referenceId: string; status: string }> = {
      success: true,
      data: {
        referenceId: lead.id,
        status: "RECEIVED_CONFIDENTIAL",
      },
    };

    return NextResponse.json(successResponse, { status: 201 });
  } catch (error) {
    console.error("[Leads API Error]:", error);
    const errorResponse: ApiResponse = {
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "An internal error occurred while processing confidential submission.",
      },
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
