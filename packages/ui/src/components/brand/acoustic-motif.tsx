import * as React from "react";
import { cn } from "../../lib/utils";

export interface AcousticWaveformProps extends React.HTMLAttributes<HTMLDivElement> {
  bars?: number;
  activeBarIndex?: number;
  height?: number;
  tone?: "gold" | "paper" | "subtle";
  animated?: boolean;
}

/**
 * AcousticWaveform — Visual Motif representing Dialogue & Cadence
 *
 * Represents speech, active listening, harmonic resonance, and the acoustics of discourse.
 */
export function AcousticWaveform({
  bars = 24,
  height = 36,
  tone = "gold",
  animated = true,
  className,
  ...props
}: AcousticWaveformProps) {
  // Pre-calculated harmonic bell curve heights simulating speech cadence
  const heights = React.useMemo(() => {
    return Array.from({ length: bars }, (_, i) => {
      const normalized = (i - bars / 2) / (bars / 2);
      const gaussian = Math.exp(-Math.pow(normalized * 1.8, 2));
      const variation = Math.sin(i * 0.8) * 0.25 + 0.75;
      return Math.max(0.12, gaussian * variation);
    });
  }, [bars]);

  const toneClass = {
    gold: "bg-gold-400",
    paper: "bg-paper-200",
    subtle: "bg-obsidian-600",
  }[tone];

  return (
    <div
      className={cn("flex h-9 select-none items-center gap-[3px]", className)}
      role="img"
      aria-label="Acoustic Dialogue Waveform"
      {...props}
    >
      {heights.map((h, i) => (
        <span
          key={i}
          className={cn(
            "w-[1.5px] rounded-full transition-all duration-300",
            toneClass,
            animated && "animate-pulse"
          )}
          style={{
            height: `${Math.round(h * height)}px`,
            animationDelay: `${(i % 6) * 120}ms`,
            animationDuration: "2.4s",
          }}
        />
      ))}
    </div>
  );
}

export interface EditorialFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  classification?: string;
  referenceId?: string;
  showTicks?: boolean;
}

/**
 * EditorialFrame — Architectural Document Frame
 *
 * Embodying confidential diplomatic stationery, archival dossiers, and statecraft papers.
 * Features architectural corner tick-marks (`+`, coordinates) and security clearance labels.
 */
export const EditorialFrame = React.forwardRef<HTMLDivElement, EditorialFrameProps>(
  ({ classification, referenceId, showTicks = true, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border-obsidian-700/80 bg-obsidian-900/90 rounded-xs relative border p-6 sm:p-10",
          className
        )}
        {...props}
      >
        {showTicks && (
          <>
            {/* Top Left Tick */}
            <span className="text-gold-500/80 pointer-events-none absolute -left-1.5 -top-1.5 select-none font-mono text-xs">
              +
            </span>
            {/* Top Right Tick */}
            <span className="text-gold-500/80 pointer-events-none absolute -right-1.5 -top-1.5 select-none font-mono text-xs">
              +
            </span>
            {/* Bottom Left Tick */}
            <span className="text-gold-500/80 pointer-events-none absolute -bottom-1.5 -left-1.5 select-none font-mono text-xs">
              +
            </span>
            {/* Bottom Right Tick */}
            <span className="text-gold-500/80 pointer-events-none absolute -bottom-1.5 -right-1.5 select-none font-mono text-xs">
              +
            </span>
          </>
        )}

        {(classification || referenceId) && (
          <div className="border-obsidian-700/50 text-paper-400 mb-6 flex items-center justify-between border-b pb-4 font-mono text-[9px] uppercase tracking-[0.25em]">
            {referenceId && <span>REF: {referenceId}</span>}
            {classification && (
              <span className="text-gold-400 bg-obsidian-800 rounded-xs border-obsidian-700/60 border px-2 py-0.5 font-semibold">
                {classification}
              </span>
            )}
          </div>
        )}

        {children}
      </div>
    );
  }
);
EditorialFrame.displayName = "EditorialFrame";

export interface InfluenceGridLinesProps extends React.HTMLAttributes<HTMLDivElement> {
  divisions?: number;
}

export function InfluenceGridLines({
  divisions = 4,
  className,
  ...props
}: InfluenceGridLinesProps) {
  return (
    <div
      className={cn(
        "divide-obsidian-700/20 pointer-events-none absolute inset-0 grid select-none grid-cols-4 divide-x overflow-hidden sm:grid-cols-6 lg:grid-cols-12",
        className
      )}
      {...props}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="h-full" />
      ))}
    </div>
  );
}
