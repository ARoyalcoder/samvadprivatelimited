"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldAlert,
  Terminal,
  KeyRound,
  ArrowRight,
  Eye,
  EyeOff,
  AlertTriangle,
  RefreshCw,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@samvad/ui";

type AuthStep = "CREDENTIALS" | "MFA_CHALLENGE" | "ACCOUNT_LOCKED";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/";

  // Form states
  const [step, setStep] = React.useState<AuthStep>("CREDENTIALS");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [honeypot, setHoneypot] = React.useState("");

  // MFA states
  const [challengeToken, setChallengeToken] = React.useState("");
  const [mfaCode, setMfaCode] = React.useState("");
  const [isBackupCode, setIsBackupCode] = React.useState(false);

  // Status & error states
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [remainingAttempts, setRemainingAttempts] = React.useState<number | null>(null);
  const [remainingMinutes, setRemainingMinutes] = React.useState<number | null>(null);

  // Quick fill for authorized roles in testing/demo
  const handleQuickFill = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword("AdminSecurePassphrase2026!");
    setErrorMessage(null);
    setRemainingAttempts(null);
  };

  // Step 1: Submit Credentials
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Corporate email and password are required.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setRemainingAttempts(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (res.status === 423 || data.error?.code === "ACCOUNT_LOCKED") {
          setStep("ACCOUNT_LOCKED");
          setRemainingMinutes(data.error?.remainingMinutes || 15);
          setErrorMessage(data.error?.message || "Account is locked due to excessive failed attempts.");
        } else {
          setErrorMessage(data.error?.message || "Invalid administrative credentials.");
          if (typeof data.error?.remainingAttempts === "number") {
            setRemainingAttempts(data.error.remainingAttempts);
          }
        }
        setIsLoading(false);
        return;
      }

      // Check if MFA is required
      if (data.data?.mfaRequired) {
        setChallengeToken(data.data.challengeToken);
        setStep("MFA_CHALLENGE");
        setIsLoading(false);
        return;
      }

      // Success without MFA
      router.push(redirectTarget);
      router.refresh();
    } catch {
      setErrorMessage("Network or authentication server error. Please retry.");
      setIsLoading(false);
    }
  };

  // Step 2: Submit MFA verification
  const handleMfaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mfaCode.trim()) {
      setErrorMessage("Please enter your verification code.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/mfa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengeToken,
          code: mfaCode.trim(),
          isBackupCode,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error?.message || "Verification failed. Check the code and try again.");
        setIsLoading(false);
        return;
      }

      // Successfully authenticated via MFA
      router.push(redirectTarget);
      router.refresh();
    } catch {
      setErrorMessage("Verification service error. Please retry.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4 sm:p-6 text-zinc-100 selection:bg-gold-500/30">
      {/* Background Ambience */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)]" />

      <div className="relative w-full max-w-md space-y-6 rounded-lg border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-md">
        {/* Header Branding */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-5">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-gradient-to-br from-gold-400 to-gold-700 text-xs font-bold text-zinc-950 shadow-sm">
              S
            </div>
            <div>
              <span className="font-serif text-sm font-bold uppercase tracking-[0.25em] text-zinc-100">
                SAMVAD
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                Perception Advisory
              </span>
            </div>
          </div>
          <Badge variant="gold">Restricted Access</Badge>
        </div>

        {/* Step 1: Credentials Form */}
        {step === "CREDENTIALS" && (
          <div className="space-y-5">
            <div className="space-y-1">
              <h1 className="font-serif text-xl font-semibold tracking-tight text-zinc-100">
                Admin Command Center
              </h1>
              <p className="text-xs text-zinc-400">
                Sign in with authorized corporate credentials to access confidential advisory workflows.
              </p>
            </div>

            {/* Error & Warning Notice */}
            {errorMessage && (
              <div className="flex items-start gap-2.5 rounded border border-rose-900/50 bg-rose-950/30 p-3 text-xs text-rose-300 animate-in fade-in duration-200">
                <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
                <div className="space-y-1">
                  <p>{errorMessage}</p>
                  {remainingAttempts !== null && remainingAttempts > 0 && (
                    <p className="font-mono text-[11px] text-rose-400/90">
                      {remainingAttempts} attempt{remainingAttempts === 1 ? "" : "s"} remaining before temporary 15-minute account lock.
                    </p>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              {/* Bot Honeypot */}
              <input
                type="text"
                name="honeypot"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                aria-hidden="true"
                className="hidden"
                autoComplete="off"
              />

              {/* Email Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400"
                >
                  Corporate Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="partner@samvadadvisory.com"
                    autoComplete="username"
                    className="w-full rounded border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 transition-colors focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400"
                  >
                    Passphrase
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••••••••••"
                    autoComplete="current-password"
                    className="w-full rounded border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 pr-10 text-sm text-zinc-100 placeholder-zinc-600 transition-colors focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group flex w-full items-center justify-center gap-2 rounded bg-gradient-to-r from-gold-500 to-gold-600 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-950 shadow-md transition-all hover:from-gold-400 hover:to-gold-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate Session</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            {/* Authorized Roles Quick Fill */}
            <div className="pt-2 border-t border-zinc-800/60">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-2">
                Quick-Select Provisioned Role (Testing &amp; Verification):
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: "SUPER_ADMIN", email: "admin@samvadadvisory.com" },
                  { label: "CONTENT_ADMIN", email: "content@samvadadvisory.com" },
                  { label: "EDITOR", email: "editor@samvadadvisory.com" },
                  { label: "AUTHOR", email: "author@samvadadvisory.com" },
                  { label: "ANALYST", email: "analyst@samvadadvisory.com" },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleQuickFill(item.email)}
                    className="truncate rounded border border-zinc-800 bg-zinc-950/60 px-2 py-1 text-left font-mono text-[9px] text-zinc-400 hover:border-gold-500/50 hover:text-gold-300 transition-colors"
                    title={item.email}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: MFA Challenge */}
        {step === "MFA_CHALLENGE" && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gold-400 font-mono text-xs mb-1">
                <KeyRound className="h-4 w-4" />
                <span>Multi-Factor Authentication</span>
              </div>
              <h2 className="font-serif text-lg font-semibold tracking-tight text-zinc-100">
                {isBackupCode ? "Enter Emergency Backup Code" : "Authenticator Verification"}
              </h2>
              <p className="text-xs text-zinc-400">
                {isBackupCode
                  ? "Enter one of your 8-character single-use emergency recovery codes (e.g., A1B2-C3D4)."
                  : "Enter the 6-digit verification code from your authenticator app (Google Authenticator, 1Password, etc.)."}
              </p>
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 rounded border border-rose-900/50 bg-rose-950/30 p-3 text-xs text-rose-300">
                <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400" />
                <p>{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleMfaSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="mfaCode"
                  className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400"
                >
                  {isBackupCode ? "Recovery Code" : "6-Digit Security Token"}
                </label>
                <input
                  id="mfaCode"
                  type="text"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  required
                  autoFocus
                  maxLength={isBackupCode ? 12 : 6}
                  placeholder={isBackupCode ? "XXXX-XXXX" : "000000"}
                  className="w-full text-center tracking-[0.3em] font-mono text-lg rounded border border-zinc-800 bg-zinc-950 px-3.5 py-3 text-zinc-100 placeholder-zinc-700 transition-colors focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded bg-gold-500 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-950 transition-colors hover:bg-gold-400 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Validating Token...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    <span>Verify &amp; Continue</span>
                  </>
                )}
              </button>
            </form>

            {/* Toggle Backup Code / TOTP */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-xs">
              <button
                type="button"
                onClick={() => {
                  setIsBackupCode(!isBackupCode);
                  setMfaCode("");
                  setErrorMessage(null);
                }}
                className="text-gold-400 hover:text-gold-300 font-mono text-[11px] underline underline-offset-4"
              >
                {isBackupCode ? "Use Authenticator App instead" : "Use Emergency Backup Code"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep("CREDENTIALS");
                  setMfaCode("");
                  setErrorMessage(null);
                }}
                className="text-zinc-500 hover:text-zinc-400 text-[11px]"
              >
                Back to Login
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Account Locked Notice */}
        {step === "ACCOUNT_LOCKED" && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 rounded-lg border border-rose-900/60 bg-rose-950/20 p-4">
              <ShieldAlert className="h-8 w-8 shrink-0 text-rose-500" />
              <div>
                <h2 className="font-serif text-base font-semibold text-rose-200">
                  Account Temporarily Locked
                </h2>
                <p className="text-xs text-rose-300/80 mt-0.5">
                  5 consecutive failed authentication attempts triggered defense lock policy.
                </p>
              </div>
            </div>

            <div className="space-y-3 rounded border border-zinc-800 bg-zinc-950/80 p-4 font-mono text-xs text-zinc-300">
              <div className="flex items-center gap-2 text-amber-400">
                <Clock className="h-4 w-4" />
                <span>Lockout Duration: ~{remainingMinutes || 15} minutes</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                For security reasons, your IP and credentials have been throttled. The restriction will
                automatically lift once the security timeout expires.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setStep("CREDENTIALS");
                setErrorMessage(null);
                setPassword("");
              }}
              className="flex w-full items-center justify-center gap-2 rounded border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-200 transition-colors hover:bg-zinc-800"
            >
              Return to Login Screen
            </button>
          </div>
        )}

        {/* Security Diagnostics Footer */}
        <div className="space-y-1.5 border-t border-zinc-800/80 pt-4 font-mono text-[10px] text-zinc-500">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Terminal className="h-3 w-3 text-gold-500/80" />
              <span>TLS 1.3 / Strict SameSite Guard</span>
            </span>
            <span className="text-zinc-600">RFC 6238 TOTP</span>
          </div>
          <div className="flex items-center justify-between text-zinc-600">
            <span>PBKDF2-SHA512 (100k rounds)</span>
            <span>Immutable Audit Logging</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-6 text-zinc-100 font-mono text-xs text-gold-400">
          Initializing Administrative Authentication...
        </div>
      }
    >
      <AdminLoginForm />
    </React.Suspense>
  );
}
