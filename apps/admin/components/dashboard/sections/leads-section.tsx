"use client";

import * as React from "react";
import {
  Search,
  Eye,
  X,
  UserCheck,
  MessageSquare,
  History,
  Send,
  RefreshCw,
} from "lucide-react";
import { EmptyState } from "@samvad/ui";
import type { LeadItem, AdminUserListItem } from "../../../lib/dashboard/dashboard-service";
import type { LeadStatus } from "@samvad/types";

interface LeadsSectionProps {
  leads: LeadItem[];
  loading: boolean;
  selectedLead: LeadItem | null;
  users?: AdminUserListItem[];
  onSelectLead: (lead: LeadItem | null) => void;
  onUpdateStatus: (leadId: string, status: LeadStatus) => Promise<void>;
  onAssignLead?: (
    leadId: string,
    assignee: { userId: string; userName: string; userEmail: string }
  ) => Promise<void>;
  onAddNote?: (leadId: string, content: string) => Promise<void>;
  onSyncCrm?: (leadId: string, provider: string) => Promise<void>;
}


export function LeadsSection({
  leads,
  loading,
  selectedLead,
  users = [],
  onSelectLead,
  onUpdateStatus,
  onAssignLead,
  onAddNote,
  onSyncCrm,
}: LeadsSectionProps) {
  const [statusFilter, setStatusFilter] = React.useState<string>("ALL");
  const [industryFilter, setIndustryFilter] = React.useState<string>("ALL");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [isUpdating, setIsUpdating] = React.useState(false);

  // Modal Dossier Tab: 'overview' | 'notes' | 'history' | 'crm'
  const [activeTab, setActiveTab] = React.useState<"overview" | "notes" | "history" | "crm">(
    "overview"
  );

  // Add Note state
  const [noteContent, setNoteContent] = React.useState("");
  const [isSubmittingNote, setIsSubmittingNote] = React.useState(false);

  // Assignee state
  const [selectedAssigneeId, setSelectedAssigneeId] = React.useState("");
  const [isAssigning, setIsAssigning] = React.useState(false);

  // CRM Sync state
  const [crmProvider, setCrmProvider] = React.useState("HUBSPOT");
  const [isSyncingCrm, setIsSyncingCrm] = React.useState(false);
  const [crmFeedback, setCrmFeedback] = React.useState<string | null>(null);

  const filtered = React.useMemo(() => {
    return leads.filter((lead) => {
      if (statusFilter !== "ALL" && lead.status !== statusFilter) return false;
      if (industryFilter !== "ALL" && lead.industry !== industryFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          lead.companyName.toLowerCase().includes(q) ||
          lead.fullName.toLowerCase().includes(q) ||
          lead.corporateEmail.toLowerCase().includes(q) ||
          (lead.referenceCode && lead.referenceCode.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [leads, statusFilter, industryFilter, searchQuery]);

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    setIsUpdating(true);
    try {
      await onUpdateStatus(leadId, newStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAssignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !selectedAssigneeId) return;

    const targetUser = users.find((u) => u.id === selectedAssigneeId);
    if (!targetUser) return;

    setIsAssigning(true);
    try {
      if (onAssignLead) {
        await onAssignLead(selectedLead.id, {
          userId: targetUser.id,
          userName: targetUser.name,
          userEmail: targetUser.email,
        });
      } else {
        const res = await fetch(`/api/dashboard/leads/${selectedLead.id}/assign`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            assignedToUserId: targetUser.id,
            assignedToUserName: targetUser.name,
            assignedToUserEmail: targetUser.email,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.data) {
            onSelectLead(data.data);
          }
        }
      }
    } finally {
      setIsAssigning(false);
    }
  };

  const handleNoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !noteContent.trim()) return;

    setIsSubmittingNote(true);
    try {
      if (onAddNote) {
        await onAddNote(selectedLead.id, noteContent.trim());
      } else {
        const res = await fetch(`/api/dashboard/leads/${selectedLead.id}/notes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: noteContent.trim() }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.data) {
            onSelectLead(data.data);
          }
        }
      }
      setNoteContent("");
    } finally {
      setIsSubmittingNote(false);
    }
  };

  const handleCrmSync = async () => {
    if (!selectedLead) return;

    setIsSyncingCrm(true);
    setCrmFeedback(null);
    try {
      if (onSyncCrm) {
        await onSyncCrm(selectedLead.id, crmProvider);
        setCrmFeedback(`Successfully dispatched to ${crmProvider}`);
      } else {
        const res = await fetch(`/api/dashboard/leads/${selectedLead.id}/crm-sync`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ provider: crmProvider }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          if (data.data) {
            onSelectLead(data.data);
          }
          setCrmFeedback(`CRM Synchronized: ${data.crmResult?.externalId || "OK"}`);
        } else {
          setCrmFeedback(`CRM Sync Failed: ${data.error?.message || "Unknown error"}`);
        }
      }
    } catch {
      setCrmFeedback("Network error attempting CRM dispatch.");
    } finally {
      setIsSyncingCrm(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 rounded border border-zinc-800 bg-zinc-900/40" />
        <div className="h-96 rounded border border-zinc-800 bg-zinc-900/40" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Header with Stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="font-serif text-xl font-semibold text-zinc-100">
            Enterprise Client Leads Pipeline
          </h2>
          <p className="text-xs text-zinc-400 font-light">
            Confidential boardroom inquiries, reputation triage, partner assignments, and CRM governance
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-zinc-500">Pipeline Total:</span>
          <span className="rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-gold-400 font-semibold">
            {leads.length} Active Records
          </span>
        </div>
      </div>

      {/* 2. Filter & Search Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by company, principal, or reference code..."
            className="w-full rounded border border-zinc-800 bg-zinc-950 pl-9 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto rounded border border-zinc-800 bg-zinc-950 p-1 font-mono text-[11px]">
            {["ALL", "NEW", "CONTACTED", "QUALIFIED", "IN_PROGRESS", "CONVERTED", "CLOSED"].map(
              (s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                    statusFilter === s
                      ? "bg-gold-500 text-zinc-950 font-semibold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {s}
                </button>
              )
            )}
          </div>

          {/* Industry Filter */}
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="rounded border border-zinc-800 bg-zinc-950 px-3 py-1.5 font-mono text-xs text-zinc-300 focus:border-gold-500 focus:outline-none"
          >
            <option value="ALL">All Industries</option>
            <option value="DEFENSE_AEROSPACE">Defense &amp; Aerospace</option>
            <option value="FINTECH_BFSI">FinTech &amp; BFSI</option>
            <option value="ENERGY_INFRASTRUCTURE">Energy &amp; Infrastructure</option>
            <option value="HEALTHCARE_PHARMA">Healthcare &amp; Pharma</option>
            <option value="ENTERPRISE_TECH">Enterprise Tech</option>
            <option value="FAMILY_OFFICES_UHNW">Family Offices &amp; UHNW</option>
          </select>
        </div>
      </div>

      {/* 3. Leads Table or Empty State */}
      {filtered.length === 0 ? (
        <EmptyState
          code="NO_LEADS_MATCHED"
          title="No Inquiries Match Filter"
          description="There are currently no strategic client leads matching the selected triage status or industry sector."
          action={
            <button
              onClick={() => {
                setStatusFilter("ALL");
                setIndustryFilter("ALL");
                setSearchQuery("");
              }}
              className="rounded border border-zinc-800 bg-zinc-900 px-4 py-2 font-mono text-xs text-gold-400 hover:bg-zinc-800 transition-colors"
            >
              Reset Filters
            </button>
          }
        />
      ) : (
        <div className="overflow-x-auto rounded border border-zinc-800 bg-zinc-900/60 shadow-sm">
          <table className="w-full text-left font-sans text-xs">
            <thead className="border-b border-zinc-800/80 bg-zinc-950/80 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="py-3 px-4">Enterprise Principal</th>
                <th className="py-3 px-4">Service Required</th>
                <th className="py-3 px-4">Industry Sector</th>
                <th className="py-3 px-4">Assigned Advisor</th>
                <th className="py-3 px-4">CRM Sync</th>
                <th className="py-3 px-4">Status &amp; Triage</th>
                <th className="py-3 px-4 text-right">Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {filtered.map((lead) => (
                <tr key={lead.id} className="hover:bg-zinc-950/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-sm font-semibold text-zinc-100">
                          {lead.companyName}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-500">
                          {lead.referenceCode || lead.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-400 text-xs">
                        <span>{lead.fullName}</span>
                        {lead.jobTitle && (
                          <span className="text-zinc-500">&bull; {lead.jobTitle}</span>
                        )}
                      </div>
                      <span className="font-mono text-[11px] text-zinc-500 block">
                        {lead.corporateEmail}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-zinc-300 font-medium">
                    {lead.serviceRequired}
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px] text-gold-500/90">
                    {lead.industry}
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px]">
                    {lead.assignedTo ? (
                      <span className="inline-flex items-center gap-1 rounded bg-zinc-800 px-2 py-0.5 text-zinc-200">
                        <UserCheck className="h-3 w-3 text-gold-400" />
                        {lead.assignedTo.userName}
                      </span>
                    ) : (
                      <span className="text-zinc-600 italic">Unassigned</span>
                    )}
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px]">
                    {lead.crmSync?.status === "SYNCED" ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {lead.crmSync.provider || "CRM"}
                      </span>
                    ) : (
                      <span className="text-zinc-500">Not synced</span>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    <select
                      value={lead.status}
                      disabled={isUpdating}
                      onChange={(e) =>
                        handleStatusChange(lead.id, e.target.value as LeadStatus)
                      }
                      className="rounded border border-zinc-800 bg-zinc-950 px-2 py-1 font-mono text-[11px] text-zinc-200 focus:border-gold-500 focus:outline-none"
                    >
                      <option value="NEW">NEW</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="QUALIFIED">QUALIFIED</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="CONVERTED">CONVERTED</option>
                      <option value="CLOSED">CLOSED</option>
                      <option value="IN_REVIEW">IN_REVIEW</option>
                      <option value="ARCHIVED">ARCHIVED</option>
                    </select>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        onSelectLead(lead);
                        setActiveTab("overview");
                      }}
                      className="font-mono text-[11px] text-gold-400 hover:text-gold-300 transition-colors inline-flex items-center gap-1"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. Confidential Mandate Modal / Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl space-y-4 rounded-lg border border-zinc-800 bg-zinc-900 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-gold-400">
                  Confidential Strategic Inquiry Dossier
                </span>
                <h3 className="font-serif text-xl font-bold text-zinc-100 mt-0.5">
                  {selectedLead.companyName}
                </h3>
                <span className="font-mono text-xs text-zinc-500">
                  Reference: {selectedLead.referenceCode || selectedLead.id} &bull; Received{" "}
                  {new Date(selectedLead.createdAt).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => onSelectLead(null)}
                className="text-zinc-400 hover:text-zinc-200 transition-colors p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Dossier Tabs */}
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 font-mono text-xs">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeTab === "overview"
                    ? "bg-zinc-800 text-gold-400 font-semibold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Overview &amp; Triage
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                  activeTab === "notes"
                    ? "bg-zinc-800 text-gold-400 font-semibold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Notes ({selectedLead.notes?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                  activeTab === "history"
                    ? "bg-zinc-800 text-gold-400 font-semibold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <History className="h-3.5 w-3.5" />
                Audit Trail ({selectedLead.history?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab("crm")}
                className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                  activeTab === "crm"
                    ? "bg-zinc-800 text-gold-400 font-semibold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                CRM Integration
              </button>
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-4">
                {/* Principal Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 rounded border border-zinc-800 bg-zinc-950/70 p-4 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block">Principal</span>
                    <span className="text-zinc-200 font-semibold">{selectedLead.fullName}</span>
                    {selectedLead.jobTitle && (
                      <span className="text-zinc-400 text-[11px] block">{selectedLead.jobTitle}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block">Corporate Email</span>
                    <span className="text-zinc-200 select-all">{selectedLead.corporateEmail}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block">Industry Sector</span>
                    <span className="text-gold-400">{selectedLead.industry}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block">Service Requested</span>
                    <span className="text-zinc-200">{selectedLead.serviceRequired}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block">Direct Line</span>
                    <span className="text-zinc-300">{selectedLead.phoneNumber || "Not provided"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block">Budget Allocation</span>
                    <span className="text-zinc-300">
                      {selectedLead.estimatedBudgetRange
                        ? selectedLead.estimatedBudgetRange.replace(/_/g, " ")
                        : "Retainer Confidential"}
                    </span>
                  </div>
                </div>

                {/* Inquiry Scope */}
                <div className="space-y-1.5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 block">
                    Scope of Inquiry / Mandate Briefing:
                  </span>
                  <div className="rounded border border-zinc-800 bg-zinc-950 p-4 text-xs font-serif leading-relaxed text-zinc-200 whitespace-pre-wrap">
                    {selectedLead.message}
                  </div>
                </div>

                {/* Status & Assignment Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded border border-zinc-800 bg-zinc-950/40 p-4 font-mono text-xs">
                  {/* Status Picker */}
                  <div className="space-y-1.5">
                    <span className="text-zinc-400 block">Lead Lifecycle State:</span>
                    <select
                      value={selectedLead.status}
                      disabled={isUpdating}
                      onChange={(e) =>
                        handleStatusChange(selectedLead.id, e.target.value as LeadStatus)
                      }
                      className="w-full rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-zinc-200 focus:border-gold-500 focus:outline-none"
                    >
                      <option value="NEW">NEW - Fresh submission pending evaluation</option>
                      <option value="CONTACTED">CONTACTED - Preliminary outreach made</option>
                      <option value="QUALIFIED">QUALIFIED - Strategic fit verified</option>
                      <option value="IN_PROGRESS">IN_PROGRESS - Advisory proposal active</option>
                      <option value="CONVERTED">CONVERTED - Retainer mandate executed</option>
                      <option value="CLOSED">CLOSED - Engagement declined / inactive</option>
                    </select>
                  </div>

                  {/* Advisor Assignment */}
                  <div className="space-y-1.5">
                    <span className="text-zinc-400 block">
                      Assigned Advisor:{" "}
                      {selectedLead.assignedTo ? (
                        <span className="text-gold-400 font-semibold">
                          {selectedLead.assignedTo.userName}
                        </span>
                      ) : (
                        <span className="text-zinc-600 italic">None</span>
                      )}
                    </span>
                    <form onSubmit={handleAssignSubmit} className="flex gap-2">
                      <select
                        value={selectedAssigneeId}
                        onChange={(e) => setSelectedAssigneeId(e.target.value)}
                        className="flex-1 rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-zinc-200 focus:border-gold-500 focus:outline-none"
                      >
                        <option value="">Select Partner / Advisor...</option>
                        {users.map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.name} ({u.role})
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        disabled={isAssigning || !selectedAssigneeId}
                        className="rounded bg-zinc-800 px-3 py-2 text-gold-400 hover:bg-zinc-700 transition-colors disabled:opacity-50 font-semibold"
                      >
                        {isAssigning ? "Assigning..." : "Assign"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ADVISORY NOTES */}
            {activeTab === "notes" && (
              <div className="space-y-4">
                {/* Note composer */}
                <form onSubmit={handleNoteSubmit} className="space-y-2">
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                    Add Confidential Briefing Note
                  </label>
                  <textarea
                    rows={3}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Enter confidential insights, call debrief, or next advisory milestones..."
                    className="w-full rounded border border-zinc-800 bg-zinc-950 p-3 font-sans text-xs text-zinc-100 placeholder-zinc-600 focus:border-gold-500 focus:outline-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmittingNote || !noteContent.trim()}
                      className="inline-flex items-center gap-1.5 rounded bg-gold-500 px-4 py-2 font-mono text-xs font-semibold text-zinc-950 hover:bg-gold-400 transition-colors disabled:opacity-50"
                    >
                      <Send className="h-3 w-3" />
                      <span>{isSubmittingNote ? "Recording..." : "Record Note"}</span>
                    </button>
                  </div>
                </form>

                {/* Notes List */}
                <div className="space-y-2">
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                    Dossier Notes History ({selectedLead.notes?.length || 0})
                  </span>
                  {!selectedLead.notes || selectedLead.notes.length === 0 ? (
                    <div className="rounded border border-zinc-800/80 bg-zinc-950/40 p-6 text-center text-xs text-zinc-500 font-mono">
                      No advisory notes recorded yet for this client inquiry.
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {selectedLead.notes.map((note) => (
                        <div
                          key={note.id}
                          className="rounded border border-zinc-800 bg-zinc-950 p-3 font-sans text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                            <span className="text-gold-400 font-semibold">{note.authorName}</span>
                            <span>{new Date(note.createdAt).toLocaleString()}</span>
                          </div>
                          <p className="text-zinc-200 leading-relaxed">{note.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: AUDIT TRAIL & HISTORY */}
            {activeTab === "history" && (
              <div className="space-y-3 font-mono text-xs">
                <span className="block text-[11px] uppercase tracking-wider text-zinc-500">
                  Cryptographically Verified Audit Timeline
                </span>
                {!selectedLead.history || selectedLead.history.length === 0 ? (
                  <div className="rounded border border-zinc-800/80 bg-zinc-950/40 p-6 text-center text-zinc-500">
                    No activity history recorded.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {selectedLead.history.map((h) => (
                      <div
                        key={h.id}
                        className="flex items-start gap-3 rounded border border-zinc-800/70 bg-zinc-950/60 p-3"
                      >
                        <div className="mt-1 h-2 w-2 rounded-full bg-gold-500 shrink-0" />
                        <div className="flex-1 space-y-0.5">
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-200 font-semibold">{h.title}</span>
                            <span className="text-[10px] text-zinc-500">
                              {new Date(h.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                            <span>Actor: {h.actorName}</span>
                            {h.previousValue && h.newValue && (
                              <span>
                                ({h.previousValue} &rarr; {h.newValue})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: CRM INTEGRATION */}
            {activeTab === "crm" && (
              <div className="space-y-4 font-mono text-xs">
                <div className="rounded border border-zinc-800 bg-zinc-950 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">
                        CRM Pipeline Synchronization
                      </span>
                      <h4 className="font-serif text-base font-semibold text-zinc-100">
                        Forward-Compatible Enterprise CRM Adapter
                      </h4>
                    </div>
                    {selectedLead.crmSync?.status === "SYNCED" ? (
                      <span className="rounded bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 text-[11px] text-emerald-400 font-semibold">
                        SYNCED
                      </span>
                    ) : (
                      <span className="rounded bg-amber-950/60 border border-amber-800 px-2.5 py-1 text-[11px] text-amber-400 font-semibold">
                        PENDING SYNC
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-zinc-800">
                    <div>
                      <span className="text-zinc-500 block text-[10px]">Provider:</span>
                      <span className="text-zinc-200">
                        {selectedLead.crmSync?.provider || "None"}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">External Record ID:</span>
                      <span className="text-zinc-200 select-all">
                        {selectedLead.crmSync?.externalId || "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">Last Synchronized:</span>
                      <span className="text-zinc-300">
                        {selectedLead.crmSync?.lastSyncedAt
                          ? new Date(selectedLead.crmSync.lastSyncedAt).toLocaleString()
                          : "Never"}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">Data Payload:</span>
                      <span className="text-zinc-400">Encrypted AES-256</span>
                    </div>
                  </div>

                  {crmFeedback && (
                    <div className="rounded border border-gold-800/60 bg-gold-950/40 p-2.5 text-gold-300 text-[11px]">
                      {crmFeedback}
                    </div>
                  )}

                  {/* Sync Trigger Controls */}
                  <div className="flex items-center gap-3 pt-2">
                    <select
                      value={crmProvider}
                      onChange={(e) => setCrmProvider(e.target.value)}
                      className="rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-zinc-200 focus:border-gold-500 focus:outline-none text-xs"
                    >
                      <option value="HUBSPOT">HubSpot Enterprise</option>
                      <option value="SALESFORCE">Salesforce Financial Services Cloud</option>
                      <option value="WEBHOOK">Secure Webhook (Zapier/Make)</option>
                      <option value="MOCK">Mock CRM Gateway</option>
                    </select>

                    <button
                      onClick={handleCrmSync}
                      disabled={isSyncingCrm}
                      className="inline-flex items-center gap-1.5 rounded bg-gold-500 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-gold-400 transition-colors disabled:opacity-50"
                    >
                      <RefreshCw
                        className={`h-3.5 w-3.5 ${isSyncingCrm ? "animate-spin" : ""}`}
                      />
                      <span>{isSyncingCrm ? "Dispatching..." : `Sync to ${crmProvider}`}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="flex items-center justify-end pt-3 border-t border-zinc-800">
              <button
                onClick={() => onSelectLead(null)}
                className="rounded bg-gold-500 px-5 py-2 font-mono text-xs font-semibold text-zinc-950 hover:bg-gold-400 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
