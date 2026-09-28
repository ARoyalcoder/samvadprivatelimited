import { z } from "zod";

export const serviceTypeEnum = z.enum([
  "STRATEGIC_COMMUNICATIONS",
  "CRISIS_REPUTATION",
  "PERCEPTION_INTELLIGENCE",
  "NARRATIVE_ARCHITECTURE",
  "PUBLIC_AFFAIRS",
  "EXECUTIVE_PROFILING",
]);

export const industryTypeEnum = z.enum([
  "DEFENSE_AEROSPACE",
  "FINTECH_BFSI",
  "ENERGY_INFRASTRUCTURE",
  "HEALTHCARE_PHARMA",
  "ENTERPRISE_TECH",
  "FAMILY_OFFICES_UHNW",
]);

export const leadStatusEnum = z.enum([
  "NEW",
  "IN_REVIEW",
  "QUALIFIED",
  "CONTACTED",
  "CONVERTED",
  "ARCHIVED",
]);

export const insightCategoryEnum = z.enum([
  "THOUGHT_LEADERSHIP",
  "MARKET_ANALYSIS",
  "CRISIS_CASEBOOK",
  "POLICY_BRIEF",
]);

/**
 * Enterprise Lead / Strategic Inquiry Validation
 */
export const leadSubmissionSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),
  corporateEmail: z
    .string()
    .trim()
    .email("A valid corporate email is required")
    .max(150, "Email cannot exceed 150 characters")
    .refine(
      (email) => {
        // Enforce corporate or non-throwaway domain basic hygiene
        const freeDomains = [
          "tempmail.com",
          "mailinator.com",
          "10minutemail.com",
          "throwawaymail.com",
        ];
        const domain = email.split("@")[1]?.toLowerCase();
        return !domain || !freeDomains.includes(domain);
      },
      { message: "Temporary or disposable emails are not permitted" }
    ),
  companyName: z
    .string()
    .trim()
    .min(2, "Company / Organization name must be at least 2 characters")
    .max(120, "Company name cannot exceed 120 characters"),
  jobTitle: z
    .string()
    .trim()
    .max(80, "Job title cannot exceed 80 characters")
    .optional()
    .nullable(),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^[+0-9\s\-()]{7,25}$/, "Invalid phone number format")
    .optional()
    .nullable()
    .or(z.literal("")),
  serviceInterest: serviceTypeEnum,
  industry: industryTypeEnum,
  estimatedBudgetRange: z
    .enum(["BELOW_50K", "50K_100K", "100K_250K", "250K_500K", "500K_PLUS", "RETAINER_CONFIDENTIAL"])
    .optional()
    .nullable(),
  message: z
    .string()
    .trim()
    .min(15, "Inquiry scope must be at least 15 characters")
    .max(3000, "Inquiry scope cannot exceed 3000 characters"),
});

export type LeadSubmissionInput = z.infer<typeof leadSubmissionSchema>;

/**
 * Service Definition Schema
 */
export const serviceSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(3).max(120),
  tagline: z.string().min(5).max(200),
  serviceType: serviceTypeEnum,
  description: z.string().min(20),
  capabilities: z.array(z.string().min(2)),
  deliverables: z.array(z.string().min(2)),
  isFeatured: z.boolean().default(false),
  orderIndex: z.number().int().default(0),
});

/**
 * Case Study Schema
 */
export const caseStudySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(5).max(180),
  clientSector: industryTypeEnum,
  anonymizedClientName: z.string().min(2).max(100),
  challenge: z.string().min(30),
  strategicIntervention: z.string().min(30),
  impactMetrics: z.array(
    z.object({
      label: z.string().min(2),
      value: z.string().min(1),
    })
  ),
  isFeatured: z.boolean().default(false),
});

/**
 * Insight Article Schema
 */
export const insightArticleSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(5).max(200),
  subtitle: z.string().max(300).optional().nullable(),
  category: insightCategoryEnum,
  authorName: z.string().min(2).max(100),
  authorRole: z.string().min(2).max(100),
  readTimeMinutes: z.number().int().positive().default(5),
  contentMarkdown: z.string().min(50),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
});
