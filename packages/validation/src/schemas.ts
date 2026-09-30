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

/**
 * Media Library Validation & Security Constraints
 */
export const mediaTypeEnum = z.enum([
  "IMAGE",
  "VIDEO",
  "PDF",
  "PRESS_KIT",
  "DOCUMENT",
]);

export type MediaType = z.infer<typeof mediaTypeEnum>;

export const MEDIA_SIZE_LIMITS: Record<MediaType, number> = {
  IMAGE: 15 * 1024 * 1024, // 15 MB
  VIDEO: 250 * 1024 * 1024, // 250 MB
  PDF: 50 * 1024 * 1024, // 50 MB
  PRESS_KIT: 100 * 1024 * 1024, // 100 MB
  DOCUMENT: 50 * 1024 * 1024, // 50 MB
};

export const ALLOWED_MIME_TYPES: Record<MediaType, string[]> = {
  IMAGE: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/svg+xml",
    "image/avif",
  ],
  VIDEO: ["video/mp4", "video/webm", "video/quicktime"],
  PDF: ["application/pdf"],
  PRESS_KIT: [
    "application/zip",
    "application/x-zip-compressed",
    "application/pdf",
  ],
  DOCUMENT: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
};

export const mediaUploadMetadataSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Asset title must be at least 2 characters")
    .max(200, "Asset title cannot exceed 200 characters"),
  description: z.string().trim().max(2000).optional().nullable(),
  altText: z
    .string()
    .trim()
    .max(500, "Alt text cannot exceed 500 characters")
    .optional()
    .nullable(),
  mediaType: mediaTypeEnum,
  category: z.string().trim().max(80).optional().nullable(),
  tags: z.array(z.string().trim().min(1).max(50)).default([]),
  isPublic: z.boolean().default(true),
});

export type MediaUploadMetadataInput = z.infer<typeof mediaUploadMetadataSchema>;

/**
 * Validates file MIME type, size limit, and media category alignment.
 */
export function validateMediaFile(
  mimeType: string,
  sizeBytes: number,
  expectedType?: MediaType
): { valid: boolean; error?: string; detectedType?: MediaType } {
  // Infer or match media type
  let matchedType: MediaType | undefined = expectedType;

  if (!matchedType) {
    for (const [type, mimes] of Object.entries(ALLOWED_MIME_TYPES) as [
      MediaType,
      string[]
    ][]) {
      if (mimes.includes(mimeType)) {
        matchedType = type;
        break;
      }
    }
  }

  if (!matchedType) {
    return {
      valid: false,
      error: `Unsupported MIME type: "${mimeType}". File type is not permitted in the SAMVAD media library.`,
    };
  }

  const allowedMimes = ALLOWED_MIME_TYPES[matchedType];
  if (!allowedMimes.includes(mimeType)) {
    return {
      valid: false,
      error: `Invalid file format for ${matchedType}. Expected one of: ${allowedMimes.join(", ")}`,
      detectedType: matchedType,
    };
  }

  const limitBytes = MEDIA_SIZE_LIMITS[matchedType];
  if (sizeBytes > limitBytes) {
    const limitMb = Math.round(limitBytes / (1024 * 1024));
    const sizeMb = (sizeBytes / (1024 * 1024)).toFixed(2);
    return {
      valid: false,
      error: `File size (${sizeMb} MB) exceeds maximum permitted limit of ${limitMb} MB for ${matchedType} assets.`,
      detectedType: matchedType,
    };
  }

  return { valid: true, detectedType: matchedType };
}

/**
 * Leadership Experience Milestone Schema
 */
export const leadershipExperienceItemSchema = z.object({
  title: z.string().min(2, "Experience title must be at least 2 characters"),
  organization: z.string().min(2, "Organization must be at least 2 characters"),
  period: z.string().optional(),
  description: z.string().optional(),
});

export type LeadershipExperienceItem = z.infer<typeof leadershipExperienceItemSchema>;

/**
 * Leadership Practice Profile Schema
 * Strictly enforces non-fabrication transparency and CMS data integrity
 */
export const leadershipProfileSchema = z.object({
  id: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  designation: z.string().min(3, "Designation must be at least 3 characters"),
  roleCategory: z
    .enum(["Executive Leadership", "Practice Leadership", "Senior Advisory Council"])
    .default("Practice Leadership"),
  statusBadge: z.string().optional(),
  photoUrl: z.string(),
  photoAlt: z.string().min(10, "Alt text must be at least 10 characters for accessibility"),
  quote: z.string().optional(),
  biography: z.string().min(30, "Biography must be at least 30 characters"),
  expertise: z.array(z.string().min(2)).min(1, "At least one expertise domain is required"),
  experience: z.array(leadershipExperienceItemSchema).min(1, "At least one experience record is required"),
  areasOfFocus: z.array(z.string().min(2)).min(1, "At least one area of focus is required"),
  orderIndex: z.number().int().default(0),
  isFeatured: z.boolean().default(true),
  isPlaceholder: z.boolean().default(true),
  advisoryPractice: z.string(),
  primaryOffice: z.string().default("New Delhi"),
  contactProtocol: z.string().default("Direct Consultation via Office of the Managing Principal"),
  relatedMonographs: z
    .array(
      z.object({
        title: z.string(),
        slug: z.string(),
        date: z.string().optional(),
      })
    )
    .optional(),
  relatedServices: z
    .array(
      z.object({
        title: z.string(),
        slug: z.string(),
      })
    )
    .optional(),
});

export type LeadershipProfile = z.infer<typeof leadershipProfileSchema>;

/**
 * Contact System: Required Services Selection
 */
export const contactServiceEnum = z.enum([
  "PR",
  "Strategic Communications",
  "Reputation Management",
  "Digital Communications",
  "Crisis Communications",
  "Advisory",
  "Other",
]);

export type ContactService = z.infer<typeof contactServiceEnum>;

/**
 * Contact System: Target Industry Sectors
 */
export const contactIndustryEnum = z.enum([
  "Technology",
  "Financial Services",
  "Healthcare",
  "Infrastructure",
  "Real Estate",
  "Consumer",
  "Startups",
  "Institutions",
  "Other",
]);

export type ContactIndustry = z.infer<typeof contactIndustryEnum>;

/**
 * Master Contact & Lead-Generation Ingestion Schema
 * Includes honeypot, velocity timer, and disposable email rejection
 */
export const contactSubmissionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),
  company: z
    .string()
    .trim()
    .min(2, "Company or organization name must be at least 2 characters")
    .max(120, "Company name cannot exceed 120 characters"),
  designation: z
    .string()
    .trim()
    .min(2, "Designation / Title must be at least 2 characters")
    .max(100, "Designation cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("A valid business or institutional email is required")
    .max(150, "Email cannot exceed 150 characters")
    .refine(
      (email) => {
        const disposable = [
          "tempmail.com",
          "mailinator.com",
          "10minutemail.com",
          "throwawaymail.com",
          "guerrillamail.com",
          "yopmail.com",
          "trashmail.com",
          "sharklasers.com",
        ];
        const domain = email.split("@")[1]?.toLowerCase();
        return !domain || !disposable.includes(domain);
      },
      {
        message:
          "Disposable or temporary email addresses are not accepted for executive inquiries.",
      }
    ),
  phone: z
    .string()
    .trim()
    .regex(
      /^[+0-9\s\-()]{7,25}$/,
      "Please provide a valid phone number (at least 7 digits)"
    )
    .optional()
    .nullable()
    .or(z.literal("")),
  industry: contactIndustryEnum,
  serviceRequired: contactServiceEnum,
  message: z
    .string()
    .trim()
    .min(15, "Inquiry brief must be at least 15 characters")
    .max(4000, "Inquiry brief cannot exceed 4000 characters"),
  honeypot: z
    .string()
    .max(0, "Automated spam detected")
    .optional()
    .default(""),
  clientTimestamp: z.number().optional(),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;

/**
 * Global Search Category Filter Enum
 */
export const searchCategoryEnum = z.enum([
  "ALL",
  "SERVICES",
  "INDUSTRIES",
  "CASE_STUDIES",
  "INSIGHTS",
  "NEWSROOM",
]);

export type SearchCategory = z.infer<typeof searchCategoryEnum>;

/**
 * Global Search Query Parameters Schema
 */
export const searchQuerySchema = z.object({
  q: z.string().trim().max(200, "Query cannot exceed 200 characters").default(""),
  type: searchCategoryEnum.default("ALL"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

export type SearchQueryInput = z.infer<typeof searchQuerySchema>;

