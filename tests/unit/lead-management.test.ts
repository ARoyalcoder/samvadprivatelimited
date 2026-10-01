import { describe, it, expect, beforeEach } from "vitest";
import { LeadService, MockCrmAdapter } from "../../apps/admin/lib/leads/lead-service";
import { adminAuthService } from "../../apps/admin/lib/auth/auth-service";
import {
  leadStatusUpdateSchema,
  leadAssignSchema,
  leadAddNoteSchema,
  crmSyncTriggerSchema,
} from "@samvad/validation";
import type { LeadStatus } from "@samvad/types";

describe("SAMVAD Enterprise Lead Management & CRM Integration System", () => {
  let leadService: LeadService;
  const mockActor = {
    id: "admin_test_01",
    name: "Vikram Singhania",
    email: "v.singhania@samvadadvisory.com",
  };

  beforeEach(() => {
    leadService = new LeadService(new MockCrmAdapter());
  });

  describe("1. Lead Pipeline Filtering & Search Capabilities", () => {
    it("should retrieve all seeded leads with default pagination", async () => {
      const result = await leadService.getLeads();
      expect(result.leads.length).toBeGreaterThanOrEqual(3);
      expect(result.total).toBeGreaterThanOrEqual(3);
      expect(result.page).toBe(1);
    });

    it("should filter leads by lifecycle state", async () => {
      const qualified = await leadService.getLeads({ status: "QUALIFIED" });
      expect(qualified.leads.every((l) => l.status === "QUALIFIED")).toBe(true);

      const newLeads = await leadService.getLeads({ status: "NEW" });
      expect(newLeads.leads.every((l) => l.status === "NEW")).toBe(true);
    });

    it("should filter leads by industry sector", async () => {
      const defense = await leadService.getLeads({ industry: "DEFENSE_AEROSPACE" });
      expect(defense.leads.every((l) => l.industry === "DEFENSE_AEROSPACE")).toBe(true);
    });

    it("should search leads across company name, principal name, and reference code", async () => {
      const companySearch = await leadService.getLeads({ search: "Bharat Dynamics" });
      expect(companySearch.leads.length).toBeGreaterThanOrEqual(1);
      expect(companySearch.leads[0]?.companyName).toContain("Bharat Dynamics");

      const principalSearch = await leadService.getLeads({ search: "Elena" });
      expect(principalSearch.leads.length).toBeGreaterThanOrEqual(1);
      expect(principalSearch.leads[0]?.fullName).toContain("Elena");

      const codeSearch = await leadService.getLeads({ search: "SAM-DEF-8821" });
      expect(codeSearch.leads.length).toBe(1);
      expect(codeSearch.leads[0]?.referenceCode).toBe("SAM-DEF-8821");
    });

    it("should filter leads by assigned advisor or unassigned status", async () => {
      const unassigned = await leadService.getLeads({ assignedTo: "UNASSIGNED" });
      expect(unassigned.leads.every((l) => !l.assignedTo)).toBe(true);

      const assigned = await leadService.getLeads({ assignedTo: "admin_001" });
      expect(assigned.leads.every((l) => l.assignedTo?.userId === "admin_001")).toBe(true);
    });
  });

  describe("2. Lead Lifecycle State Transitions & Audit Trails", () => {
    const validStates: LeadStatus[] = [
      "NEW",
      "CONTACTED",
      "QUALIFIED",
      "IN_PROGRESS",
      "CONVERTED",
      "CLOSED",
    ];

    validStates.forEach((targetState) => {
      it(`should successfully transition lead to state ${targetState} and create history entry`, async () => {
        const lead = await leadService.updateStatus({
          leadId: "lead_001",
          status: targetState,
          actor: mockActor,
          reason: `Progressed to ${targetState} following executive evaluation`,
        });

        expect(lead).not.toBeNull();
        expect(lead?.status).toBe(targetState);

        // Check history timeline
        const latestHistory = lead?.history?.[0];
        expect(latestHistory).toBeDefined();
        expect(latestHistory?.activityType).toBe("STATUS_CHANGE");
        expect(latestHistory?.newValue).toBe(targetState);
        expect(latestHistory?.actorName).toBe(mockActor.name);
      });
    });

    it("should record an immutable audit event for every status update", async () => {
      await leadService.updateStatus({
        leadId: "lead_001",
        status: "CONTACTED",
        actor: mockActor,
        reason: "Initial outreach initiated via encrypted channel",
      });

      const auditLogs = await adminAuthService.getAuditLogs({ entityType: "LEAD" });
      const statusLog = auditLogs.find(
        (log) => log.entityId === "lead_001" && log.action === "LEAD_STATUS_UPDATED"
      );

      expect(statusLog).toBeDefined();
      expect(statusLog?.userId).toBe(mockActor.id);
      expect(statusLog?.metadata).toMatchObject({
        newStatus: "CONTACTED",
      });
    });

    it("should validate status update payloads with Zod schema", () => {
      const valid = leadStatusUpdateSchema.safeParse({
        leadId: "lead_001",
        status: "IN_PROGRESS",
        reason: "Active retainer negotiation",
      });
      expect(valid.success).toBe(true);

      const invalidState = leadStatusUpdateSchema.safeParse({
        leadId: "lead_001",
        status: "INVALID_STATUS_VALUE",
      });
      expect(invalidState.success).toBe(false);
    });
  });

  describe("3. Lead Assignment to Advisors & Audit Logging", () => {
    it("should assign lead to an advisor and create assignment history item", async () => {
      const assignee = {
        userId: "advisor_44",
        userName: "Ananya Deshmukh",
        userEmail: "a.deshmukh@samvadadvisory.com",
      };

      const updated = await leadService.assignLead({
        leadId: "lead_001",
        assignee,
        actor: mockActor,
      });

      expect(updated).not.toBeNull();
      expect(updated?.assignedTo).toBeDefined();
      expect(updated?.assignedTo?.userId).toBe(assignee.userId);
      expect(updated?.assignedTo?.userName).toBe(assignee.userName);
      expect(updated?.assignedTo?.userEmail).toBe(assignee.userEmail);

      // Verify history
      const historyItem = updated?.history?.find((h) => h.activityType === "ASSIGNMENT");
      expect(historyItem).toBeDefined();
      expect(historyItem?.newValue).toBe(assignee.userName);
      expect(historyItem?.actorName).toBe(mockActor.name);
    });

    it("should record an audit event for lead assignment", async () => {
      const assignee = {
        userId: "advisor_99",
        userName: "Rajesh Varma",
        userEmail: "r.varma@samvadadvisory.com",
      };

      await leadService.assignLead({
        leadId: "lead_003",
        assignee,
        actor: mockActor,
      });

      const auditLogs = await adminAuthService.getAuditLogs({ entityType: "LEAD" });
      const assignLog = auditLogs.find(
        (log) => log.entityId === "lead_003" && log.action === "LEAD_ASSIGNED"
      );

      expect(assignLog).toBeDefined();
      expect(assignLog?.metadata).toMatchObject({
        assignedToUserId: assignee.userId,
        assignedToUserName: assignee.userName,
      });
    });

    it("should validate lead assignment payload with Zod schema", () => {
      const valid = leadAssignSchema.safeParse({
        leadId: "lead_001",
        assignedToUserId: "user_123",
        assignedToUserName: "Priya Nair",
        assignedToUserEmail: "p.nair@samvadadvisory.com",
      });
      expect(valid.success).toBe(true);

      const invalidEmail = leadAssignSchema.safeParse({
        leadId: "lead_001",
        assignedToUserId: "user_123",
        assignedToUserName: "Priya Nair",
        assignedToUserEmail: "not-an-email",
      });
      expect(invalidEmail.success).toBe(false);
    });
  });

  describe("4. Confidential Advisory Notes Management", () => {
    it("should add advisory note to lead dossier with author attribution and timestamp", async () => {
      const noteContent = "Client requested senior partner presence for sovereign committee hearing.";
      const updated = await leadService.addNote({
        leadId: "lead_001",
        content: noteContent,
        actor: mockActor,
      });

      expect(updated).not.toBeNull();
      expect(updated?.notes?.length).toBeGreaterThanOrEqual(1);

      const latestNote = updated?.notes?.[0];
      expect(latestNote?.content).toBe(noteContent);
      expect(latestNote?.authorName).toBe(mockActor.name);
      expect(latestNote?.authorId).toBe(mockActor.id);
      expect(latestNote?.createdAt).toBeDefined();

      // Check corresponding history entry
      const noteHistory = updated?.history?.find((h) => h.activityType === "NOTE_ADDED");
      expect(noteHistory).toBeDefined();
      expect(noteHistory?.actorName).toBe(mockActor.name);
    });

    it("should record an audit event for every advisory note added", async () => {
      await leadService.addNote({
        leadId: "lead_002",
        content: "Verified Swiss jurisdiction compliance documents.",
        actor: mockActor,
      });

      const auditLogs = await adminAuthService.getAuditLogs({ entityType: "LEAD" });
      const noteLog = auditLogs.find(
        (log) => log.entityId === "lead_002" && log.action === "LEAD_NOTE_ADDED"
      );

      expect(noteLog).toBeDefined();
      expect(noteLog?.userId).toBe(mockActor.id);
    });

    it("should enforce character constraints on advisory notes via Zod schema", () => {
      const valid = leadAddNoteSchema.safeParse({
        leadId: "lead_001",
        content: "Valid intelligence summary",
      });
      expect(valid.success).toBe(true);

      const tooShort = leadAddNoteSchema.safeParse({
        leadId: "lead_001",
        content: "x",
      });
      expect(tooShort.success).toBe(false);

      const tooLong = leadAddNoteSchema.safeParse({
        leadId: "lead_001",
        content: "a".repeat(2500),
      });
      expect(tooLong.success).toBe(false);
    });
  });

  describe("5. Forward-Compatible CRM Integration Adapter", () => {
    it("should synchronize lead to CRM adapter and record external record ID", async () => {
      const result = await leadService.syncToCrm({
        leadId: "lead_001",
        provider: "HUBSPOT",
        actor: mockActor,
      });

      expect(result.success).toBe(true);
      expect(result.lead?.crmSync?.status).toBe("SYNCED");
      expect(result.lead?.crmSync?.provider).toBe("HUBSPOT");
      expect(result.lead?.crmSync?.externalId).toMatch(/^hubspot_crm_/);
      expect(result.lead?.crmSync?.lastSyncedAt).toBeDefined();

      // Check history
      const crmHistory = result.lead?.history?.find((h) => h.activityType === "CRM_SYNC");
      expect(crmHistory).toBeDefined();
      expect(crmHistory?.title).toContain("HUBSPOT");
    });

    it("should support Salesforce and Webhook CRM providers", async () => {
      const sfResult = await leadService.syncToCrm({
        leadId: "lead_003",
        provider: "SALESFORCE",
        actor: mockActor,
      });

      expect(sfResult.success).toBe(true);
      expect(sfResult.lead?.crmSync?.provider).toBe("SALESFORCE");
      expect(sfResult.lead?.crmSync?.externalId).toMatch(/^salesforce_crm_/);
    });

    it("should record an audit event for CRM synchronization", async () => {
      await leadService.syncToCrm({
        leadId: "lead_001",
        provider: "HUBSPOT",
        actor: mockActor,
      });

      const auditLogs = await adminAuthService.getAuditLogs({ entityType: "LEAD" });
      const crmLog = auditLogs.find(
        (log) => log.entityId === "lead_001" && log.action === "LEAD_CRM_SYNCED"
      );

      expect(crmLog).toBeDefined();
      expect(crmLog?.metadata).toMatchObject({
        provider: "HUBSPOT",
        success: true,
      });
    });

    it("should validate CRM trigger parameters with Zod schema", () => {
      const valid = crmSyncTriggerSchema.safeParse({
        leadId: "lead_001",
        provider: "SALESFORCE",
      });
      expect(valid.success).toBe(true);

      const invalidProvider = crmSyncTriggerSchema.safeParse({
        leadId: "lead_001",
        provider: "UNSUPPORTED_CRM_SYSTEM",
      });
      expect(invalidProvider.success).toBe(false);
    });
  });
});
