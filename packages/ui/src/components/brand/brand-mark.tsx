import * as React from "react";
import { cn } from "../../lib/utils";

export interface BrandMarkProps extends React.SVGAttributes<SVGSVGElement> {
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "gold" | "paper" | "monochrome" | "gradient";
}

/**
 * SAMVAD Brand Mark Geometry
 *
 * Core Concept: "Dialogue & Convergence" (Samvāda)
 * Two harmonic intersecting arcs representing two distinct entities entering into
 * strategic dialogue. Their intersection creates a focal node—representing shared perception,
 * influence, and trust. The overall flow forms an architectural monogram "S".
 */
export const BrandMark = React.forwardRef<SVGSVGElement, BrandMarkProps>(
  ({ size = "md", tone = "gold", className, ...props }, ref) => {
    const sizeMap = {
      sm: "h-6 w-6",
      md: "h-8 w-8",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
    };

    const toneClasses = {
      gold: "text-gold-400 stroke-gold-400",
      paper: "text-paper-100 stroke-paper-100",
      monochrome: "text-paper-400 stroke-paper-400",
      gradient: "text-gold-300 stroke-gold-300",
    }[tone];

    return (
      <svg
        ref={ref}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(sizeMap[size], toneClasses, "shrink-0", className)}
        aria-label="SAMVAD Brand Mark"
        {...props}
      >
        <defs>
          <linearGradient id="samvad-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C39651" />
            <stop offset="50%" stopColor="#E0CAA0" />
            <stop offset="100%" stopColor="#A97B3D" />
          </linearGradient>
        </defs>

        {/* Outer dialogue arc - Entity A (Counsel) */}
        <path
          d="M 12 14 C 12 8, 24 6, 32 10 C 38 13, 38 20, 32 24 C 26 28, 16 28, 16 36 C 16 42, 26 44, 36 40"
          stroke={tone === "gradient" ? "url(#samvad-gold-grad)" : "currentColor"}
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Counter dialogue arc - Entity B (Society / Stakeholder) */}
        <path
          d="M 36 34 C 36 40, 24 42, 16 38 C 10 35, 10 28, 16 24 C 22 20, 32 20, 32 12 C 32 6, 22 4, 12 8"
          stroke={tone === "gradient" ? "url(#samvad-gold-grad)" : "currentColor"}
          strokeWidth="1.2"
          strokeDasharray="2 3"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Central Convergence Node (Shared Perception & Trust) */}
        <circle
          cx="24"
          cy="24"
          r="2.5"
          fill={tone === "gradient" ? "url(#samvad-gold-grad)" : "currentColor"}
        />

        {/* Harmonic peripheral dialogue nodal points */}
        <circle cx="12" cy="14" r="1.5" fill="currentColor" opacity="0.8" />
        <circle cx="36" cy="34" r="1.5" fill="currentColor" opacity="0.8" />
      </svg>
    );
  }
);
BrandMark.displayName = "BrandMark";

export interface BrandLockupProps extends React.HTMLAttributes<HTMLDivElement> {
  layout?: "horizontal" | "stacked";
  size?: "sm" | "md" | "lg";
  markTone?: "gold" | "paper" | "monochrome" | "gradient";
}

export const BrandLockup = React.forwardRef<HTMLDivElement, BrandLockupProps>(
  ({ layout = "horizontal", size = "md", markTone = "gold", className, ...props }, ref) => {
    const markSize = {
      sm: "sm",
      md: "md",
      lg: "lg",
    }[size] as "sm" | "md" | "lg";

    if (layout === "stacked") {
      return (
        <div
          ref={ref}
          className={cn("group flex flex-col items-center space-y-3 text-center", className)}
          {...props}
        >
          <BrandMark size={markSize} tone={markTone} />
          <div className="flex flex-col space-y-0.5">
            <span className="text-paper-100 font-serif text-lg font-normal uppercase tracking-[0.2em] sm:text-xl">
              SAMVAD
            </span>
            <span className="text-paper-400 font-mono text-[9px] uppercase tracking-[0.3em]">
              Perception Advisory
            </span>
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("group inline-flex items-center gap-3.5", className)} {...props}>
        <BrandMark size={markSize} tone={markTone} />
        <div className="flex flex-col">
          <span className="text-paper-100 group-hover:text-gold-300 font-serif text-base font-normal uppercase tracking-[0.18em] transition-colors sm:text-lg">
            SAMVAD
          </span>
          <span className="text-paper-400 font-mono text-[8px] uppercase tracking-[0.25em] sm:text-[9px]">
            Perception Advisory
          </span>
        </div>
      </div>
    );
  }
);
BrandLockup.displayName = "BrandLockup";

export interface BrandWatermarkProps extends React.HTMLAttributes<HTMLDivElement> {
  opacity?: number;
  size?: number;
}

export function BrandWatermark({
  opacity = 0.03,
  size = 500,
  className,
  ...props
}: BrandWatermarkProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute flex select-none items-center justify-center overflow-hidden",
        className
      )}
      style={{ opacity }}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 12 14 C 12 8, 24 6, 32 10 C 38 13, 38 20, 32 24 C 26 28, 16 28, 16 36 C 16 42, 26 44, 36 40"
          stroke="#FFFFFF"
          strokeWidth="1"
        />
        <path
          d="M 36 34 C 36 40, 24 42, 16 38 C 10 35, 10 28, 16 24 C 22 20, 32 20, 32 12 C 32 6, 22 4, 12 8"
          stroke="#C39651"
          strokeWidth="0.8"
          strokeDasharray="2 4"
        />
        <circle cx="24" cy="24" r="2" fill="#C39651" />
      </svg>
    </div>
  );
}
