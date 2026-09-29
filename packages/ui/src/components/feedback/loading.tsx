import * as React from "react";
import { cn } from "../../lib/utils";

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  size?: "sm" | "md" | "lg";
  tone?: "gold" | "paper" | "muted";
}

export function Spinner({ size = "md", tone = "gold", className, ...props }: SpinnerProps) {
  const sizeMap = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
  };

  const toneMap = {
    gold: "text-gold-400",
    paper: "text-paper-100",
    muted: "text-paper-500",
  };

  return (
    <svg
      className={cn("animate-spin", sizeMap[size], toneMap[tone], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-label="Loading..."
      {...props}
    >
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export interface ShimmerBarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ShimmerBar({ className, ...props }: ShimmerBarProps) {
  return (
    <div
      className={cn("bg-obsidian-800 relative h-[2px] w-full overflow-hidden", className)}
      {...props}
    >
      <div className="via-gold-400 absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent to-transparent" />
    </div>
  );
}

export interface OrbitLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export function OrbitLoader({
  label = "Synthesizing Intelligence...",
  className,
  ...props
}: OrbitLoaderProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center space-y-4 p-8", className)}
      {...props}
    >
      <div className="relative flex h-12 w-12 items-center justify-center">
        <div className="border-gold-500/20 absolute inset-0 animate-ping rounded-full border" />
        <div className="border-t-gold-400 border-b-gold-400/20 absolute inset-1 animate-spin rounded-full border border-l-transparent border-r-transparent" />
        <div className="bg-gold-400 shadow-gold-subtle h-2 w-2 rounded-full" />
      </div>
      {label && (
        <p className="text-paper-400 animate-pulse font-mono text-xs uppercase tracking-[0.2em]">
          {label}
        </p>
      )}
    </div>
  );
}
