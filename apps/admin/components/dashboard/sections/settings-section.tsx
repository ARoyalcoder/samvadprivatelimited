"use client";

import * as React from "react";
import {
  Shield,
  Lock,
  Database,
  CheckCircle2,
  RefreshCw,
  Save,
} from "lucide-react";
import { PlatformSettings } from "../../../lib/dashboard/dashboard-service";

interface SettingsSectionProps {
  settings: PlatformSettings;
  callerRole: string;
  onSaveSettings: (settings: Partial<PlatformSettings>) => Promise<void>;
}

export function SettingsSection({
  settings,
  callerRole,
  onSaveSettings,
}: SettingsSectionProps) {
  const isSuperAdmin = callerRole === "SUPER_ADMIN";

  const [form, setForm] = React.useState<PlatformSettings>(settings);
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);

  React.useEffect(() => {
    setForm(settings);
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSuperAdmin) return;

    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await onSaveSettings(form);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      // Handled
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* 1. Header */}
      <div className="border-b border-zinc-800/80 pb-4">
        <h2 className="font-serif text-xl font-semibold text-zinc-100">
          Platform Governance &amp; Security Controls
        </h2>
        <p className="text-xs text-zinc-400 font-light">
          Configure authentication policies, brute-force defense parameters, and telemetry retention
        </p>
      </div>

      {!isSuperAdmin && (
        <div className="flex items-center gap-2 rounded border border-amber-900/50 bg-amber-950/20 p-3 text-xs text-amber-300">
          <Lock className="h-4 w-4 shrink-0 text-amber-400" />
          <span>Platform configuration settings are read-only for {callerRole}. SUPER_ADMIN privilege required to persist modifications.</span>
        </div>
      )}

      {saveSuccess && (
        <div className="flex items-center gap-2 rounded border border-emerald-900/50 bg-emerald-950/20 p-3 text-xs text-emerald-300 animate-in fade-in duration-200">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>Platform governance parameters successfully committed to encrypted state.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Security & Access Policies Card */}
        <div className="rounded border border-zinc-800/80 bg-zinc-900/60 p-5 space-y-4">
          <h3 className="font-serif text-base font-semibold text-zinc-200 flex items-center gap-2">
            <Shield className="h-4 w-4 text-gold-400" />
            <span>Authentication &amp; Account Protection</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* MFA Enforcement */}
            <div className="flex items-center justify-between rounded border border-zinc-800 bg-zinc-950/60 p-4">
              <div className="space-y-0.5 pr-4">
                <span className="font-mono text-xs font-semibold text-zinc-200 block">
                  Mandatory MFA Enforcement
                </span>
                <span className="text-[11px] text-zinc-400 block font-light">
                  Require RFC 6238 TOTP validation for all 5 administrative roles.
                </span>
              </div>
              <input
                type="checkbox"
                disabled={!isSuperAdmin}
                checked={form.mfaEnforcedForAll}
                onChange={(e) => setForm({ ...form, mfaEnforcedForAll: e.target.checked })}
                className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-gold-500 focus:ring-gold-500 cursor-pointer"
              />
            </div>

            {/* Maintenance Mode */}
            <div className="flex items-center justify-between rounded border border-zinc-800 bg-zinc-950/60 p-4">
              <div className="space-y-0.5 pr-4">
                <span className="font-mono text-xs font-semibold text-zinc-200 block">
                  Advisory Maintenance Mode
                </span>
                <span className="text-[11px] text-zinc-400 block font-light">
                  Direct public nodes to static offline dispatch during system updates.
                </span>
              </div>
              <input
                type="checkbox"
                disabled={!isSuperAdmin}
                checked={form.maintenanceMode}
                onChange={(e) => setForm({ ...form, maintenanceMode: e.target.checked })}
                className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-gold-500 focus:ring-gold-500 cursor-pointer"
              />
            </div>

            {/* Lockout Attempts */}
            <div className="space-y-1.5 rounded border border-zinc-800 bg-zinc-950/60 p-4">
              <label className="font-mono text-xs text-zinc-300 block font-semibold">
                Lockout Threshold (Failed Attempts)
              </label>
              <input
                type="number"
                min={3}
                max={10}
                disabled={!isSuperAdmin}
                value={form.maxLoginAttempts}
                onChange={(e) => setForm({ ...form, maxLoginAttempts: parseInt(e.target.value, 10) || 5 })}
                className="w-full rounded border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-100 focus:border-gold-500 focus:outline-none"
              />
              <span className="text-[10px] text-zinc-500 font-light block">
                Standard baseline: 5 consecutive invalid attempts before engagement.
              </span>
            </div>

            {/* Lockout Duration */}
            <div className="space-y-1.5 rounded border border-zinc-800 bg-zinc-950/60 p-4">
              <label className="font-mono text-xs text-zinc-300 block font-semibold">
                Lockout Duration (Minutes)
              </label>
              <input
                type="number"
                min={5}
                max={60}
                disabled={!isSuperAdmin}
                value={form.lockoutDurationMinutes}
                onChange={(e) => setForm({ ...form, lockoutDurationMinutes: parseInt(e.target.value, 10) || 15 })}
                className="w-full rounded border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-100 focus:border-gold-500 focus:outline-none"
              />
              <span className="text-[10px] text-zinc-500 font-light block">
                Duration of temporary IP and credential throttle: 15 minutes.
              </span>
            </div>
          </div>
        </div>

        {/* Operational Telemetry Card */}
        <div className="rounded border border-zinc-800/80 bg-zinc-900/60 p-5 space-y-4">
          <h3 className="font-serif text-base font-semibold text-zinc-200 flex items-center gap-2">
            <Database className="h-4 w-4 text-gold-400" />
            <span>Telemetry &amp; Executive Notifications</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 rounded border border-zinc-800 bg-zinc-950/60 p-4">
              <label className="font-mono text-xs text-zinc-300 block font-semibold">
                Executive Lead Alert Recipient
              </label>
              <input
                type="email"
                disabled={!isSuperAdmin}
                value={form.executiveAlertEmail}
                onChange={(e) => setForm({ ...form, executiveAlertEmail: e.target.value })}
                className="w-full rounded border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-100 focus:border-gold-500 focus:outline-none"
              />
              <span className="text-[10px] text-zinc-500 font-light block">
                Target mailbox for high-priority mandate transmissions.
              </span>
            </div>

            <div className="space-y-1.5 rounded border border-zinc-800 bg-zinc-950/60 p-4">
              <label className="font-mono text-xs text-zinc-300 block font-semibold">
                Telemetry Log Retention (Days)
              </label>
              <input
                type="number"
                min={30}
                max={365}
                disabled={!isSuperAdmin}
                value={form.telemetryRetentionDays}
                onChange={(e) => setForm({ ...form, telemetryRetentionDays: parseInt(e.target.value, 10) || 90 })}
                className="w-full rounded border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-100 focus:border-gold-500 focus:outline-none"
              />
              <span className="text-[10px] text-zinc-500 font-light block">
                Immutable audit ledger retention threshold: 90 days.
              </span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        {isSuperAdmin && (
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 rounded bg-gold-500 px-5 py-2.5 font-mono text-xs font-semibold text-zinc-950 hover:bg-gold-400 transition-colors disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Committing Changes...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Governance Parameters</span>
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
