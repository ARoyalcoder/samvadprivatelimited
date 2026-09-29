import * as React from "react";
import { cn } from "../../lib/utils";

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  size?: number;
}

/**
 * 1. IconDialogue — Convergence of two voices / mutual discourse
 */
export function IconDialogue({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path d="M4 12c0-4.418 3.582-8 8-8 1.8 0 3.45.6 4.78 1.61" />
      <path d="M20 12c0 4.418-3.582 8-8 8-1.8 0-3.45-.6-4.78-1.61" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 4v2" />
      <path d="M12 18v2" />
    </svg>
  );
}

/**
 * 2. IconPerceptionShield — Reputational defense & perception integrity
 */
export function IconPerceptionShield({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <circle cx="12" cy="11" r="2.5" />
      <path d="M7 11h2.5" />
      <path d="M14.5 11H17" />
    </svg>
  );
}

/**
 * 3. IconInfluenceNodes — Network of institutional influence & transmission
 */
export function IconInfluenceNodes({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      {...props}
    >
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="8" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8.2 7.2l7.6 1.6" />
      <path d="M7.4 8.2l3.4 7.6" />
      <path d="M16.6 10.2l-3.4 5.6" />
    </svg>
  );
}

/**
 * 4. IconCrisisContainment — Rapid containment & volatility stabilization
 */
export function IconCrisisContainment({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v5" />
      <path d="M12 16v5" />
      <path d="M3 12h5" />
      <path d="M16 12h5" />
    </svg>
  );
}

/**
 * 5. IconSovereignBrief — Diplomatic intelligence dossier & advisory record
 */
export function IconSovereignBrief({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a2.5 2.5 0 0 1-2.5-2.5z" />
      <path d="M6 6h8" />
      <path d="M6 10h10" />
      <circle cx="15" cy="16" r="2" />
      <path d="M15 18v3l1.5-1 1.5 1v-3" />
    </svg>
  );
}

/**
 * 6. IconSentimentRadar — Quadrant perception diagnostic & signal tracking
 */
export function IconSentimentRadar({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
      <path d="M12 3v18" />
      <path d="M3 12h18" />
      <path d="M12 12l5.5-4" />
    </svg>
  );
}

/**
 * 7. IconNarrativeVector — Strategic trajectory & narrative velocity
 */
export function IconNarrativeVector({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path d="M3 19l6.5-6.5 4 4L21 6" />
      <path d="M15 6h6v6" />
      <path d="M3 19h18" strokeDasharray="2 3" opacity="0.4" />
    </svg>
  );
}

/**
 * 8. IconInstitutionalTrust — Classical authority, governance & balanced counsel
 */
export function IconInstitutionalTrust({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path d="M3 9l9-5 9 5v2H3V9z" />
      <path d="M5 11v8" />
      <path d="M9 11v8" />
      <path d="M15 11v8" />
      <path d="M19 11v8" />
      <path d="M2 19h20v2H2v-2z" />
    </svg>
  );
}
