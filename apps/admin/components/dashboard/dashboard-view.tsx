"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Briefcase,
  BarChart3,
  Users,
  ShieldCheck,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { Badge, ErrorState } from "@samvad/ui";
import {
  DashboardMetricsResult,
  LeadItem,
  UnifiedContentItem,
  AdminUserListItem,
  PlatformSettings,
} from "../../lib/dashboard/dashboard-service";
import { AuditRecord } from "../../lib/auth/auth-service";

import { OverviewSection } from "./sections/overview-section";
import { ContentSection } from "./sections/content-section";
import { MediaSection } from "./sections/media-section";
import { LeadsSection } from "./sections/leads-section";
import { AnalyticsSection } from "./sections/analytics-section";
import { UsersSection } from "./sections/users-section";
import { AuditSection } from "./sections/audit-section";
import { SettingsSection } from "./sections/settings-section";

interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
}

export function DashboardView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Active Section (synced with URL query param `?section=...`)
  const currentSectionParam = searchParams.get("section") || "overview";
  const [activeSection, setActiveSection] = React.useState<string>(currentSectionParam);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);

  // Core Data States
  const [sessionUser, setSessionUser] = React.useState<SessionUser | null>(null);
  const [metrics, setMetrics] = React.useState<DashboardMetricsResult | null>(null);
  const [leads, setLeads] = React.useState<LeadItem[]>([]);
  const [content, setContent] = React.useState<UnifiedContentItem[]>([]);
  const [users, setUsers] = React.useState<AdminUserListItem[]>([]);
  const [auditLogs, setAuditLogs] = React.useState<AuditRecord[]>([]);
  const [platformSettings, setPlatformSettings] = React.useState<PlatformSettings | null>(null);

  // Selected Lead for Modal Dossier
  const [selectedLead, setSelectedLead] = React.useState<LeadItem | null>(null);

  // Loading & Error States
  const [loadingInitial, setLoadingInitial] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  // Sync state with URL param
  React.useEffect(() => {
    if (currentSectionParam) {
      setActiveSection(currentSectionParam);
    }
  }, [currentSectionParam]);

  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.set("section", sectionId);
    window.history.pushState({}, "", url.toString());
  };

  // 1. Initial Load: Session & Metrics
  const loadInitialData = React.useCallback(async () => {
    setLoadingInitial(true);
    setErrorMessage(null);

    try {
      // Fetch session
      const sessionRes = await fetch("/api/auth/session");
      if (sessionRes.ok) {
        const sessionData = await sessionRes.json();
        if (sessionData.success && sessionData.data) {
          setSessionUser(sessionData.data);
        }
      }

      // Fetch primary metrics
      const metricsRes = await fetch("/api/dashboard/metrics");
      if (metricsRes.ok) {
        const metricsData = await metricsRes.json();
        if (metricsData.success && metricsData.data) {
          setMetrics(metricsData.data);
        }
      }

      // Fetch initial leads for overview mini-table
      const leadsRes = await fetch("/api/dashboard/leads?limit=50");
      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        if (leadsData.success && leadsData.data?.leads) {
          setLeads(leadsData.data.leads);
        }
      }

      // Fetch content
      const contentRes = await fetch("/api/dashboard/content");
      if (contentRes.ok) {
        const contentData = await contentRes.json();
        if (contentData.success && contentData.data) {
          setContent(contentData.data);
        }
      }

      // Fetch users
      const usersRes = await fetch("/api/dashboard/users");
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        if (usersData.success && usersData.data) {
          setUsers(usersData.data);
        }
      }

      // Fetch audit logs
      const auditRes = await fetch("/api/dashboard/audit");
      if (auditRes.ok) {
        const auditData = await auditRes.json();
        if (auditData.success && auditData.data) {
          setAuditLogs(auditData.data);
        }
      }

      // Fetch settings
      const settingsRes = await fetch("/api/dashboard/settings");
      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        if (settingsData.success && settingsData.data) {
          setPlatformSettings(settingsData.data);
        }
      }
    } catch {
      setErrorMessage("Intelligence connection timeout. Operating with resilient cache state.");
    } finally {
      setLoadingInitial(false);
    }
  }, []);

  React.useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Lead status update handler
  const handleUpdateLeadStatus = async (leadId: string, status: LeadItem["status"]) => {
    try {
      const res = await fetch("/api/dashboard/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, status }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status } : l))
        );
        if (selectedLead?.id === leadId) {
          setSelectedLead((prev) => (prev ? { ...prev, status } : null));
        }
      }
    } catch {
      // Revert or alert
    }
  };

  // Content status update handler
  const handleUpdateContentStatus = async (
    id: string,
    newStatus: "PUBLISHED" | "DRAFT" | "ARCHIVED"
  ) => {
    try {
      const res = await fetch("/api/dashboard/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setContent((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
        );
      }
    } catch {
      // Handled
    }
  };

  // User role update handler
  const handleUpdateUserRole = async (userId: string, newRole: any) => {
    try {
      const res = await fetch("/api/dashboard/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
        );
      }
    } catch {
      // Handled
    }
  };

  // Settings update handler
  const handleSaveSettings = async (updated: Partial<PlatformSettings>) => {
    const res = await fetch("/api/dashboard/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.data) {
        setPlatformSettings(data.data);
      }
    }
  };

  // Logout handler
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Handled
    }
    router.push("/login");
    router.refresh();
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "content", label: "CMS Studio", icon: FileText, count: content.length },
    { id: "media", label: "Media", icon: ImageIcon },
    { id: "leads", label: "Leads", icon: Briefcase, count: leads.filter((l) => l.status === "NEW").length },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users, count: users.length },
    { id: "audit", label: "Audit Logs", icon: ShieldCheck },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const roleColors: Record<string, "gold" | "secondary" | "outline"> = {
    SUPER_ADMIN: "gold",
    CONTENT_ADMIN: "gold",
    EDITOR: "secondary",
    AUTHOR: "outline",
    ANALYST: "secondary",
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-gold-500/30">
      {/* 1. TOP EXECUTIVE MASTHEAD */}
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Mobile Toggle & Brand */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded border border-zinc-800 text-zinc-400 hover:text-zinc-200"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <div className="flex items-center space-x-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-gradient-to-br from-gold-400 to-gold-700 text-xs font-bold text-zinc-950 shadow-sm">
                S
              </div>
              <div>
                <span className="font-serif text-sm font-bold uppercase tracking-[0.25em] text-zinc-100">
                  SAMVAD
                </span>
                <span className="block font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                  Executive Command Portal
                </span>
              </div>
            </div>
          </div>

          {/* Right: Principal Identity, System Status & Sign Out */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="hidden sm:flex items-center gap-2 rounded border border-zinc-800 bg-zinc-900/60 px-3 py-1 font-mono text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-zinc-400 text-[11px]">Node: ACTIVE</span>
            </div>

            {sessionUser && (
              <div className="flex items-center gap-2">
                <Badge variant={roleColors[sessionUser.role] || "gold"}>
                  {sessionUser.role}
                </Badge>
                <span className="hidden md:inline font-mono text-xs text-zinc-300">
                  {sessionUser.name}
                </span>
              </div>
            )}

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-1.5 rounded border border-zinc-800 bg-zinc-900 px-3 py-1.5 font-mono text-xs text-zinc-400 hover:border-rose-900/60 hover:text-rose-300 transition-colors disabled:opacity-50"
              title="Terminate Secure Session"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{isLoggingOut ? "Exiting..." : "Sign Out"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. BODY LAYOUT: SIDEBAR + MAIN CONTENT AREA */}
      <div className="flex flex-1 overflow-hidden">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-zinc-800 bg-zinc-950/70 p-4 space-y-6 shrink-0">
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 px-3">
              Operational Navigation
            </span>
            <nav className="space-y-1 pt-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigateSection(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-mono transition-colors ${
                      isActive
                        ? "bg-gold-500/10 border border-gold-500/40 text-gold-300 font-semibold"
                        : "text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`h-4 w-4 ${isActive ? "text-gold-400" : "text-zinc-500"}`} />
                      <span>{item.label}</span>
                    </div>
                    {typeof item.count === "number" && item.count > 0 && (
                      <span
                        className={`px-1.5 py-0.2 rounded-full text-[10px] font-semibold ${
                          isActive
                            ? "bg-gold-500 text-zinc-950"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Links & Direct Sites */}
          <div className="pt-4 border-t border-zinc-900 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 px-3">
              Direct Portals
            </span>
            <div className="space-y-1 font-mono text-[11px]">
              <a
                href="/cms"
                className="flex items-center justify-between px-3 py-1.5 rounded text-zinc-400 hover:text-gold-300 hover:bg-zinc-900/40"
              >
                <span>CMS Studio Direct</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="/subscribers"
                className="flex items-center justify-between px-3 py-1.5 rounded text-zinc-400 hover:text-gold-300 hover:bg-zinc-900/40"
              >
                <span>Subscribers Portal</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="/media"
                className="flex items-center justify-between px-3 py-1.5 rounded text-zinc-400 hover:text-gold-300 hover:bg-zinc-900/40"
              >
                <span>Media Asset CDN</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </aside>

        {/* MOBILE DRAWER */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-30 lg:hidden bg-zinc-950/95 backdrop-blur-md p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <span className="font-serif text-sm font-semibold text-zinc-200">
                Command Navigation
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded text-zinc-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="space-y-1 font-mono text-sm">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigateSection(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-xs transition-colors ${
                    activeSection === item.id
                      ? "bg-gold-500 text-zinc-950 font-semibold"
                      : "text-zinc-300 hover:bg-zinc-900"
                  }`}
                >
                  <span>{item.label}</span>
                  {typeof item.count === "number" && item.count > 0 && (
                    <span className="text-[10px] opacity-80">{item.count}</span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* MAIN SECTION VIEWPORT */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Error Notice */}
          {errorMessage && (
            <ErrorState
              title="Operational Notice"
              message={errorMessage}
              onRetry={loadInitialData}
            />
          )}

          {/* ACTIVE SECTION CONDITIONAL RENDERING */}
          {activeSection === "overview" && (
            <OverviewSection
              metrics={metrics}
              leads={leads}
              loading={loadingInitial}
              onNavigateSection={handleNavigateSection}
              onSelectLead={setSelectedLead}
            />
          )}

          {activeSection === "content" && (
            <ContentSection
              content={content}
              loading={loadingInitial}
              onUpdateStatus={handleUpdateContentStatus}
              callerRole={sessionUser?.role || "ANALYST"}
            />
          )}

          {activeSection === "media" && <MediaSection />}

          {activeSection === "leads" && (
            <LeadsSection
              leads={leads}
              loading={loadingInitial}
              selectedLead={selectedLead}
              users={users}
              onSelectLead={setSelectedLead}
              onUpdateStatus={handleUpdateLeadStatus}
            />
          )}

          {activeSection === "analytics" && (
            <AnalyticsSection trendData={metrics?.websiteVisitors.trend || []} />
          )}

          {activeSection === "users" && (
            <UsersSection
              users={users}
              callerRole={sessionUser?.role || "ANALYST"}
              loading={loadingInitial}
              onUpdateRole={handleUpdateUserRole}
            />
          )}

          {activeSection === "audit" && (
            <AuditSection
              logs={auditLogs}
              loading={loadingInitial}
              onRefresh={loadInitialData}
            />
          )}

          {activeSection === "settings" && platformSettings && (
            <SettingsSection
              settings={platformSettings}
              callerRole={sessionUser?.role || "ANALYST"}
              onSaveSettings={handleSaveSettings}
            />
          )}
        </main>
      </div>
    </div>
  );
}
