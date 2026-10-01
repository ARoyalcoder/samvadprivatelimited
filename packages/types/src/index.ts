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

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "IN_PROGRESS"
  | "CONVERTED"
  | "CLOSED"
  | "IN_REVIEW"
  | "ARCHIVED";

export interface LeadNote {
  id: string;
  leadId: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: string;
}

export type LeadActivityType =
  | "STATUS_CHANGE"
  | "ASSIGNMENT"
  | "NOTE_ADDED"
  | "CRM_SYNC"
  | "FIELD_UPDATE"
  | "INQUIRY_CREATED";

export interface LeadHistoryItem {
  id: string;
  leadId: string;
  actorId: string;
  actorName: string;
  activityType: LeadActivityType;
  title: string;
  details?: Record<string, unknown> | null;
  previousValue?: string | null;
  newValue?: string | null;
  timestamp: string;
}

export type CrmSyncStatus = "NOT_CONFIGURED" | "PENDING" | "SYNCED" | "FAILED";

export interface CrmSyncInfo {
  status: CrmSyncStatus;
  provider?: string | null;
  externalId?: string | null;
  lastSyncedAt?: string | null;
  errorMessage?: string | null;
}

export interface LeadAssignee {
  userId: string;
  userName: string;
  userEmail: string;
  assignedAt: string;
}

export interface Lead {
  id: string;
  fullName: string;
  corporateEmail: string;
  companyName: string;
  jobTitle?: string | null;
  phoneNumber?: string | null;
  serviceInterest?: ServiceType | null;
  serviceRequired?: string;
  industry?: IndustryType | string;
  industryType?: IndustryType | null;
  estimatedBudgetRange?: string | null;
  message: string;
  status: LeadStatus;
  referenceCode?: string | null;
  assignedTo?: LeadAssignee | null;
  notes?: LeadNote[];
  history?: LeadHistoryItem[];
  crmSync?: CrmSyncInfo;
  sourceIp?: string | null;
  userAgent?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface DetailedLead extends Lead {
  assignedTo: LeadAssignee | null;
  notes: LeadNote[];
  history: LeadHistoryItem[];
  crmSync: CrmSyncInfo;
}

export type UserRole =
  | "SUPER_ADMIN"
  | "CONTENT_ADMIN"
  | "EDITOR"
  | "AUTHOR"
  | "ANALYST"
  | "COMMUNICATIONS_DIRECTOR";

export type InsightCategory =
  "THOUGHT_LEADERSHIP" | "MARKET_ANALYSIS" | "CRISIS_CASEBOOK" | "POLICY_BRIEF";

export type PublicationStatus = "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED";

export type CmsEntityType =
  | "PAGES"
  | "SERVICES"
  | "INDUSTRIES"
  | "CASE_STUDIES"
  | "INSIGHTS"
  | "NEWSROOM"
  | "LEADERSHIP"
  | "MEDIA";

export type CmsLifecycleStatus = "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED";

export interface CmsEntity {
  id: string;
  entityType: CmsEntityType;
  title: string;
  slug: string;
  status: CmsLifecycleStatus;
  author: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  featuredImage?: string | null;
  metadata?: Record<string, unknown> | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  publishedAt?: string | Date | null;
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
