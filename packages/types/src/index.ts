/**
 * SAMVAD PERCEPTION ADVISORY - Core Domain Types
 */

export type ServiceType =
  | "STRATEGIC_COMMUNICATIONS"
  | "CRISIS_REPUTATION"
  | "PERCEPTION_INTELLIGENCE"
  | "NARRATIVE_ARCHITECTURE"
  | "PUBLIC_AFFAIRS"
  | "EXECUTIVE_PROFILING";

export type IndustryType =
  | "DEFENSE_AEROSPACE"
  | "FINTECH_BFSI"
  | "ENERGY_INFRASTRUCTURE"
  | "HEALTHCARE_PHARMA"
  | "ENTERPRISE_TECH"
  | "FAMILY_OFFICES_UHNW";

export type LeadStatus = "NEW" | "IN_REVIEW" | "QUALIFIED" | "CONTACTED" | "CONVERTED" | "ARCHIVED";

export type UserRole = "SUPER_ADMIN" | "COMMUNICATIONS_DIRECTOR" | "EDITOR" | "ANALYST";

export type InsightCategory =
  "THOUGHT_LEADERSHIP" | "MARKET_ANALYSIS" | "CRISIS_CASEBOOK" | "POLICY_BRIEF";

export type PublicationStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface Lead {
  id: string;
  fullName: string;
  corporateEmail: string;
  companyName: string;
  jobTitle?: string | null;
  phoneNumber?: string | null;
  serviceInterest: ServiceType;
  industry: IndustryType;
  estimatedBudgetRange?: string | null;
  message: string;
  status: LeadStatus;
  sourceIp?: string | null;
  userAgent?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  serviceType: ServiceType;
  description: string;
  capabilities: string[];
  deliverables: string[];
  isFeatured: boolean;
  orderIndex: number;
}

export interface IndustryItem {
  id: string;
  slug: string;
  title: string;
  industryType: IndustryType;
  summary: string;
  strategicChallenges: string[];
  advisorySolutions: string[];
  orderIndex: number;
}

export interface CaseStudyItem {
  id: string;
  slug: string;
  title: string;
  clientSector: IndustryType;
  anonymizedClientName: string;
  challenge: string;
  strategicIntervention: string;
  impactMetrics: { label: string; value: string }[];
  isFeatured: boolean;
  publishedAt: Date;
}

export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  category: InsightCategory;
  authorName: string;
  authorRole: string;
  readTimeMinutes: number;
  contentMarkdown: string;
  status: PublicationStatus;
  publishedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PressReleaseItem {
  id: string;
  slug: string;
  title: string;
  date: Date;
  summary: string;
  body: string;
  mediaContactName: string;
  mediaContactEmail: string;
  pdfAttachmentUrl?: string | null;
}

export interface AuditLogEntry {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown> | null;
  ipAddress?: string | null;
  timestamp: Date;
}

/** Standard Enterprise API Response Envelope */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    timestamp?: string;
  };
}
