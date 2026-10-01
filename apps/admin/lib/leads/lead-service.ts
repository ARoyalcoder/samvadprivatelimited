import crypto from "node:crypto";
import { prisma } from "@samvad/database";
import type {
  Lead,
  LeadStatus,
  LeadNote,
  LeadHistoryItem,
  CrmSyncInfo,
  CrmSyncStatus,
  LeadAssignee,
} from "@samvad/types";
import { adminAuthService } from "../auth/auth-service";

/**
 * Forward-Compatible CRM Adapter Abstraction
 */
export interface CrmLeadPayload {
  leadId: string;
  fullName: string;
  corporateEmail: string;
  companyName: string;
  jobTitle?: string | null;
  phoneNumber?: string | null;
  serviceRequired: string;
  industry: string;
  status: string;
  assignedTo?: string | null;
}

export interface CrmSyncResult {
  success: boolean;
  provider: string;
  externalId?: string;
  error?: string;
  timestamp: string;
}

export interface ICrmAdapter {
  providerName: string;
  syncLead(lead: CrmLeadPayload): Promise<CrmSyncResult>;
}

export class MockCrmAdapter implements ICrmAdapter {
  constructor(public providerName: string = "HUBSPOT") {}

  async syncLead(_lead: CrmLeadPayload): Promise<CrmSyncResult> {
    const timestamp = new Date().toISOString();
    // Simulate integration id generation
    const externalId = `${this.providerName.toLowerCase()}_crm_${crypto.randomBytes(6).toString("hex")}`;
    return {
      success: true,
      provider: this.providerName,
      externalId,
      timestamp,
    };
  }
}

export interface LeadFilterOptions {
  status?: string;
  search?: string;
  industry?: string;
  assignedTo?: string;
  page?: number;
  limit?: number;
}

export interface ActorContext {
  id: string;
  name: string;
  email?: string;
}

/**
 * Enterprise Lead Management Service
 * Full lifecycle, assignment, historical audit trails, notes, and CRM integration
 */
export class LeadService {
  private isDbAvailable = true;
  private crmAdapter: ICrmAdapter;

  // In-memory mock store for test and offline environments
  private mockLeads: Lead[] = [
    {
      id: "lead_001",
      fullName: "Vikram Malhotra",
      corporateEmail: "v.malhotra@bharatdynamics.co.in",
      companyName: "Bharat Dynamics & Aerospace",
      jobTitle: "Chief Strategy Officer",
      phoneNumber: "+91 22 4910 8821",
      serviceRequired: "Strategic Communications",
      industry: "DEFENSE_AEROSPACE",
      estimatedBudgetRange: "250K_500K",
      message:
        "Urgent defense acquisition offset narrative and sovereign perception architecture required for parliamentary committee review.",
      status: "NEW",
      referenceCode: "SAM-DEF-8821",
      assignedTo: null,
      notes: [],
      history: [
        {
          id: "hist_001",
          leadId: "lead_001",
          actorId: "system",
          actorName: "Inquiry Ingestion Gateway",
          activityType: "INQUIRY_CREATED",
          title: "Inquiry received via corporate portal",
          details: { referenceCode: "SAM-DEF-8821" },
          timestamp: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
        },
      ],
      crmSync: {
        status: "NOT_CONFIGURED",
      },
      createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    },
    {
      id: "lead_002",
      fullName: "Elena Rostova",
      corporateEmail: "e.rostova@genevawealth.ch",
      companyName: "Geneva Wealth & Sovereign Partners",
      jobTitle: "Managing Principal",
      phoneNumber: "+41 22 819 9200",
      serviceRequired: "Crisis Communications",
      industry: "FINTECH_BFSI",
      estimatedBudgetRange: "500K_1M",
      message:
        "Cross-border regulatory inquiry regarding offshore family office structuring and multi-jurisdictional press containment.",
      status: "QUALIFIED",
      referenceCode: "SAM-GEN-9200",
      assignedTo: {
        userId: "admin_001",
        userName: "Managing Principal",
        userEmail: "principal@samvadadvisory.com",
        assignedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
      },
      notes: [
        {
          id: "note_001",
          leadId: "lead_002",
          authorId: "admin_001",
          authorName: "Managing Principal",
          authorEmail: "principal@samvadadvisory.com",
          content: "Initial KYC cleared. Recommended NDA before scheduled briefing.",
          createdAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
        },
      ],
      history: [
        {
          id: "hist_002_0",
          leadId: "lead_002",
          actorId: "system",
          actorName: "Inquiry Ingestion Gateway",
          activityType: "INQUIRY_CREATED",
          title: "Inquiry received via corporate portal",
          timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        },
        {
          id: "hist_002_1",
          leadId: "lead_002",
          actorId: "admin_001",
          actorName: "Managing Principal",
          activityType: "STATUS_CHANGE",
          title: "Status changed to QUALIFIED",
          previousValue: "NEW",
          newValue: "QUALIFIED",
          timestamp: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
        },
      ],
      crmSync: {
        status: "SYNCED",
        provider: "HUBSPOT",
        externalId: "hubspot_crm_88921a",
        lastSyncedAt: new Date(Date.now() - 11 * 3600 * 1000).toISOString(),
      },
      createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 11 * 3600 * 1000).toISOString(),
    },
    {
      id: "lead_003",
      fullName: "Dr. K. S. Somnath",
      corporateEmail: "somnath@apexquantum.tech",
      companyName: "Apex Quantum Technologies",
      jobTitle: "Founder & Chief Executive",
      phoneNumber: "+91 80 6711 3400",
      serviceRequired: "Perception Intelligence",
      industry: "ENTERPRISE_TECH",
      estimatedBudgetRange: "100K_250K",
      message:
        "Pre-IPO institutional investor sentiment audit and technology valuation positioning.",
      status: "CONTACTED",
      referenceCode: "SAM-APX-3400",
      assignedTo: null,
      notes: [],
      history: [
        {
          id: "hist_003_0",
          leadId: "lead_003",
          actorId: "system",
          actorName: "Inquiry Ingestion Gateway",
          activityType: "INQUIRY_CREATED",
          title: "Inquiry received via corporate portal",
          timestamp: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
        },
      ],
      crmSync: {
        status: "NOT_CONFIGURED",
      },
      createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    },
  ];

  constructor(crmAdapter?: ICrmAdapter) {
    this.crmAdapter = crmAdapter || new MockCrmAdapter();
  }

  public setCrmAdapter(adapter: ICrmAdapter) {
    this.crmAdapter = adapter;
  }

  /**
   * Query leads pipeline with filtering, searching, and pagination
   */
  public async getLeads(filters: LeadFilterOptions = {}): Promise<{
    leads: Lead[];
    total: number;
    page: number;
    limit: number;
  }> {
    const {
      status = "ALL",
      search = "",
      industry = "ALL",
      assignedTo = "ALL",
      page = 1,
      limit = 20,
    } = filters;

    try {
      if (
        this.isDbAvailable &&
        process.env.DATABASE_URL &&
        !process.env.DATABASE_URL.startsWith("mock://")
      ) {
        const where: Record<string, unknown> = {};
        if (status !== "ALL") where.status = status;
        if (industry !== "ALL") where.industry = industry;
        if (assignedTo !== "ALL") {
          if (assignedTo === "UNASSIGNED") {
            where.assignedToUserId = null;
          } else {
            where.assignedToUserId = assignedTo;
          }
        }

        if (search.trim()) {
          where.OR = [
            { fullName: { contains: search, mode: "insensitive" } },
            { companyName: { contains: search, mode: "insensitive" } },
            { corporateEmail: { contains: search, mode: "insensitive" } },
            { referenceCode: { contains: search, mode: "insensitive" } },
          ];
        }

        const [records, count] = await Promise.all([
          prisma.lead.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * limit,
            take: limit,
          }),
          prisma.lead.count({ where }),
        ]);

        if (count > 0 || records.length > 0) {
          const transformed = records.map((r: any) => this.mapDbLead(r));
          return { leads: transformed, total: count, page, limit };
        }
      }
    } catch {
      this.isDbAvailable = false;
    }

    // In-memory fallback
    let filtered = [...this.mockLeads];
    if (status !== "ALL") {
      filtered = filtered.filter((l) => l.status === status);
    }
    if (industry !== "ALL") {
      filtered = filtered.filter((l) => l.industry === industry);
    }
    if (assignedTo !== "ALL") {
      if (assignedTo === "UNASSIGNED") {
        filtered = filtered.filter((l) => !l.assignedTo);
      } else {
        filtered = filtered.filter((l) => l.assignedTo?.userId === assignedTo);
      }
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (l) =>
          l.fullName.toLowerCase().includes(q) ||
          l.companyName.toLowerCase().includes(q) ||
          l.corporateEmail.toLowerCase().includes(q) ||
          (l.referenceCode && l.referenceCode.toLowerCase().includes(q))
      );
    }

    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * limit, page * limit);
    return { leads: paginated, total, page, limit };
  }

  /**
   * Get single lead by ID
   */
  public async getLeadById(id: string): Promise<Lead | null> {
    try {
      if (
        this.isDbAvailable &&
        process.env.DATABASE_URL &&
        !process.env.DATABASE_URL.startsWith("mock://")
      ) {
        const record = await prisma.lead.findUnique({
          where: { id },
        });
        if (record) {
          return this.mapDbLead(record);
        }
      }
    } catch {
      this.isDbAvailable = false;
    }

    const found = this.mockLeads.find((l) => l.id === id);
    return found ? { ...found } : null;
  }

  /**
   * Change status of lead with audit and history entry
   */
  public async updateStatus(params: {
    leadId: string;
    status: LeadStatus;
    actor: ActorContext;
    reason?: string;
  }): Promise<Lead | null> {
    const { leadId, status, actor, reason } = params;

    const existing = await this.getLeadById(leadId);
    if (!existing) return null;

    const oldStatus = existing.status;
    const historyItem: LeadHistoryItem = {
      id: `hist_${crypto.randomBytes(6).toString("hex")}`,
      leadId,
      actorId: actor.id,
      actorName: actor.name,
      activityType: "STATUS_CHANGE",
      title: `Lead status updated to ${status}`,
      details: reason ? { reason } : undefined,
      previousValue: oldStatus,
      newValue: status,
      timestamp: new Date().toISOString(),
    };

    try {
      if (
        this.isDbAvailable &&
        process.env.DATABASE_URL &&
        !process.env.DATABASE_URL.startsWith("mock://")
      ) {
        const currentDb = await prisma.lead.findUnique({ where: { id: leadId } });
        const existingHistory = Array.isArray(currentDb?.history)
          ? (currentDb?.history as any[])
          : [];

        const updated = await prisma.lead.update({
          where: { id: leadId },
          data: {
            status,
            history: [historyItem, ...existingHistory],
          },
        });

        await adminAuthService.recordAuditLog({
          userId: actor.id,
          action: "LEAD_STATUS_UPDATED",
          entityType: "LEAD",
          entityId: leadId,
          metadata: { previousStatus: oldStatus, newStatus: status, reason },
        });

        return this.mapDbLead(updated);
      }
    } catch {
      this.isDbAvailable = false;
    }

    const index = this.mockLeads.findIndex((l) => l.id === leadId);
    if (index !== -1) {
      this.mockLeads[index]!.status = status;
      this.mockLeads[index]!.history = [historyItem, ...(this.mockLeads[index]!.history || [])];

      await adminAuthService.recordAuditLog({
        userId: actor.id,
        action: "LEAD_STATUS_UPDATED",
        entityType: "LEAD",
        entityId: leadId,
        metadata: { previousStatus: oldStatus, newStatus: status, reason },
      });

      return { ...this.mockLeads[index]! };
    }

    return null;
  }

  /**
   * Assign lead to an advisor/partner
   */
  public async assignLead(params: {
    leadId: string;
    assignee: { userId: string; userName: string; userEmail: string };
    actor: ActorContext;
  }): Promise<Lead | null> {
    const { leadId, assignee, actor } = params;
    const existing = await this.getLeadById(leadId);
    if (!existing) return null;

    const assignedAt = new Date().toISOString();
    const newAssigneeData: LeadAssignee = {
      userId: assignee.userId,
      userName: assignee.userName,
      userEmail: assignee.userEmail,
      assignedAt,
    };

    const historyItem: LeadHistoryItem = {
      id: `hist_${crypto.randomBytes(6).toString("hex")}`,
      leadId,
      actorId: actor.id,
      actorName: actor.name,
      activityType: "ASSIGNMENT",
      title: `Lead assigned to ${assignee.userName}`,
      details: { assigneeEmail: assignee.userEmail },
      previousValue: existing.assignedTo?.userName || "Unassigned",
      newValue: assignee.userName,
      timestamp: assignedAt,
    };

    try {
      if (
        this.isDbAvailable &&
        process.env.DATABASE_URL &&
        !process.env.DATABASE_URL.startsWith("mock://")
      ) {
        const currentDb = await prisma.lead.findUnique({ where: { id: leadId } });
        const existingHistory = Array.isArray(currentDb?.history)
          ? (currentDb?.history as any[])
          : [];

        const updated = await prisma.lead.update({
          where: { id: leadId },
          data: {
            assignedToUserId: assignee.userId,
            assignedToUserName: assignee.userName,
            assignedToUserEmail: assignee.userEmail,
            assignedAt: new Date(assignedAt),
            history: [historyItem, ...existingHistory],
          },
        });

        await adminAuthService.recordAuditLog({
          userId: actor.id,
          action: "LEAD_ASSIGNED",
          entityType: "LEAD",
          entityId: leadId,
          metadata: {
            assignedToUserId: assignee.userId,
            assignedToUserName: assignee.userName,
          },
        });

        return this.mapDbLead(updated);
      }
    } catch {
      this.isDbAvailable = false;
    }

    const index = this.mockLeads.findIndex((l) => l.id === leadId);
    if (index !== -1) {
      this.mockLeads[index]!.assignedTo = newAssigneeData;
      this.mockLeads[index]!.history = [historyItem, ...(this.mockLeads[index]!.history || [])];

      await adminAuthService.recordAuditLog({
        userId: actor.id,
        action: "LEAD_ASSIGNED",
        entityType: "LEAD",
        entityId: leadId,
        metadata: {
          assignedToUserId: assignee.userId,
          assignedToUserName: assignee.userName,
        },
      });

      return { ...this.mockLeads[index]! };
    }

    return null;
  }

  /**
   * Add advisory note to lead dossier
   */
  public async addNote(params: {
    leadId: string;
    content: string;
    actor: ActorContext;
  }): Promise<Lead | null> {
    const { leadId, content, actor } = params;
    const existing = await this.getLeadById(leadId);
    if (!existing) return null;

    const createdAt = new Date().toISOString();
    const newNote: LeadNote = {
      id: `note_${crypto.randomBytes(6).toString("hex")}`,
      leadId,
      authorId: actor.id,
      authorName: actor.name,
      authorEmail: actor.email || "",
      content,
      createdAt,
    };

    const historyItem: LeadHistoryItem = {
      id: `hist_${crypto.randomBytes(6).toString("hex")}`,
      leadId,
      actorId: actor.id,
      actorName: actor.name,
      activityType: "NOTE_ADDED",
      title: "Confidential briefing note added",
      details: { snippet: content.slice(0, 80) },
      timestamp: createdAt,
    };

    try {
      if (
        this.isDbAvailable &&
        process.env.DATABASE_URL &&
        !process.env.DATABASE_URL.startsWith("mock://")
      ) {
        const currentDb = await prisma.lead.findUnique({ where: { id: leadId } });
        const existingNotes = Array.isArray(currentDb?.notes) ? (currentDb?.notes as any[]) : [];
        const existingHistory = Array.isArray(currentDb?.history)
          ? (currentDb?.history as any[])
          : [];

        const updated = await prisma.lead.update({
          where: { id: leadId },
          data: {
            notes: [newNote, ...existingNotes],
            history: [historyItem, ...existingHistory],
          },
        });

        await adminAuthService.recordAuditLog({
          userId: actor.id,
          action: "LEAD_NOTE_ADDED",
          entityType: "LEAD",
          entityId: leadId,
          metadata: { noteId: newNote.id },
        });

        return this.mapDbLead(updated);
      }
    } catch {
      this.isDbAvailable = false;
    }

    const index = this.mockLeads.findIndex((l) => l.id === leadId);
    if (index !== -1) {
      this.mockLeads[index]!.notes = [newNote, ...(this.mockLeads[index]!.notes || [])];
      this.mockLeads[index]!.history = [historyItem, ...(this.mockLeads[index]!.history || [])];

      await adminAuthService.recordAuditLog({
        userId: actor.id,
        action: "LEAD_NOTE_ADDED",
        entityType: "LEAD",
        entityId: leadId,
        metadata: { noteId: newNote.id },
      });

      return { ...this.mockLeads[index]! };
    }

    return null;
  }

  /**
   * Forward-Compatible CRM Sync Trigger
   */
  public async syncToCrm(params: {
    leadId: string;
    provider?: string;
    actor: ActorContext;
  }): Promise<{ success: boolean; lead: Lead | null; result: CrmSyncResult }> {
    const { leadId, provider = "HUBSPOT", actor } = params;
    const existing = await this.getLeadById(leadId);
    if (!existing) {
      return {
        success: false,
        lead: null,
        result: {
          success: false,
          provider,
          error: "Lead not found",
          timestamp: new Date().toISOString(),
        },
      };
    }

    // Set provider if adapter allows
    if (this.crmAdapter instanceof MockCrmAdapter) {
      this.crmAdapter.providerName = provider;
    }

    const syncResult = await this.crmAdapter.syncLead({
      leadId: existing.id,
      fullName: existing.fullName,
      corporateEmail: existing.corporateEmail,
      companyName: existing.companyName,
      jobTitle: existing.jobTitle,
      phoneNumber: existing.phoneNumber,
      serviceRequired: existing.serviceRequired || "",
      industry: existing.industry || "",
      status: existing.status,
      assignedTo: existing.assignedTo?.userName,
    });

    const crmStatus: CrmSyncStatus = syncResult.success ? "SYNCED" : "FAILED";
    const historyItem: LeadHistoryItem = {
      id: `hist_${crypto.randomBytes(6).toString("hex")}`,
      leadId,
      actorId: actor.id,
      actorName: actor.name,
      activityType: "CRM_SYNC",
      title: syncResult.success
        ? `Lead synchronized to ${syncResult.provider}`
        : `CRM synchronization failed for ${syncResult.provider}`,
      details: {
        provider: syncResult.provider,
        externalId: syncResult.externalId,
        error: syncResult.error,
      },
      timestamp: syncResult.timestamp,
    };

    const crmSyncInfo: CrmSyncInfo = {
      status: crmStatus,
      provider: syncResult.provider,
      externalId: syncResult.externalId,
      lastSyncedAt: syncResult.timestamp,
      errorMessage: syncResult.error,
    };

    try {
      if (
        this.isDbAvailable &&
        process.env.DATABASE_URL &&
        !process.env.DATABASE_URL.startsWith("mock://")
      ) {
        const currentDb = await prisma.lead.findUnique({ where: { id: leadId } });
        const existingHistory = Array.isArray(currentDb?.history)
          ? (currentDb?.history as any[])
          : [];

        const updated = await prisma.lead.update({
          where: { id: leadId },
          data: {
            crmSyncStatus: crmStatus,
            crmProvider: syncResult.provider,
            crmExternalId: syncResult.externalId,
            crmSyncedAt: new Date(syncResult.timestamp),
            crmSyncError: syncResult.error,
            history: [historyItem, ...existingHistory],
          },
        });

        await adminAuthService.recordAuditLog({
          userId: actor.id,
          action: "LEAD_CRM_SYNCED",
          entityType: "LEAD",
          entityId: leadId,
          metadata: {
            provider: syncResult.provider,
            externalId: syncResult.externalId,
            success: syncResult.success,
          },
        });

        return {
          success: syncResult.success,
          lead: this.mapDbLead(updated),
          result: syncResult,
        };
      }
    } catch {
      this.isDbAvailable = false;
    }

    const index = this.mockLeads.findIndex((l) => l.id === leadId);
    if (index !== -1) {
      this.mockLeads[index]!.crmSync = crmSyncInfo;
      this.mockLeads[index]!.history = [historyItem, ...(this.mockLeads[index]!.history || [])];

      await adminAuthService.recordAuditLog({
        userId: actor.id,
        action: "LEAD_CRM_SYNCED",
        entityType: "LEAD",
        entityId: leadId,
        metadata: {
          provider: syncResult.provider,
          externalId: syncResult.externalId,
          success: syncResult.success,
        },
      });

      return {
        success: syncResult.success,
        lead: { ...this.mockLeads[index]! },
        result: syncResult,
      };
    }

    return {
      success: false,
      lead: null,
      result: syncResult,
    };
  }

  /**
   * Helper to map DB record into typed domain Lead
   */
  private mapDbLead(r: any): Lead {
    return {
      id: r.id,
      fullName: r.fullName,
      corporateEmail: r.corporateEmail,
      companyName: r.companyName,
      jobTitle: r.jobTitle,
      phoneNumber: r.phoneNumber,
      serviceRequired: r.serviceRequired,
      industry: r.industry,
      estimatedBudgetRange: r.estimatedBudgetRange,
      message: r.message,
      status: r.status as LeadStatus,
      referenceCode: r.referenceCode,
      assignedTo: r.assignedToUserId
        ? {
            userId: r.assignedToUserId,
            userName: r.assignedToUserName || "Advisor",
            userEmail: r.assignedToUserEmail || "",
            assignedAt: r.assignedAt ? r.assignedAt.toISOString() : "",
          }
        : null,
      notes: Array.isArray(r.notes) ? r.notes : [],
      history: Array.isArray(r.history) ? r.history : [],
      crmSync: {
        status: (r.crmSyncStatus as CrmSyncStatus) || "NOT_CONFIGURED",
        provider: r.crmProvider,
        externalId: r.crmExternalId,
        lastSyncedAt: r.crmSyncedAt ? r.crmSyncedAt.toISOString() : null,
        errorMessage: r.crmSyncError,
      },
      createdAt: r.createdAt ? r.createdAt.toISOString() : new Date().toISOString(),
      updatedAt: r.updatedAt ? r.updatedAt.toISOString() : new Date().toISOString(),
    };
  }
}

export const leadService = new LeadService();
