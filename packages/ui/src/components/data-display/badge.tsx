import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-obsidian-800 text-paper-200 border border-obsidian-700/80 hover:bg-obsidian-750",
        secondary: "bg-obsidian-850 text-paper-400 border border-obsidian-700/50",
        outline: "bg-transparent text-paper-300 border border-obsidian-700 hover:border-paper-400",
        gold: "bg-gold-500/10 text-gold-300 border border-gold-500/30 backdrop-blur-sm",
        positive:
          "bg-perception-positive/10 text-perception-positive border border-perception-positive/30",
        neutral:
          "bg-perception-neutral/10 text-perception-neutral border border-perception-neutral/30",
        alert: "bg-perception-alert/10 text-perception-alert border border-perception-alert/30",
        crisis: "bg-perception-crisis/10 text-perception-crisis border border-perception-crisis/30",
      },
      shape: {
        square: "rounded-xs px-2.5 py-1",
        pill: "rounded-full px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "square",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, shape, dot = false, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(badgeVariants({ variant, shape }), className)} {...props}>
        {dot && (
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              variant === "positive" && "bg-perception-positive animate-pulse",
              variant === "crisis" && "bg-perception-crisis animate-ping",
              variant === "alert" && "bg-perception-alert",
              variant === "gold" && "bg-gold-400",
              (!variant ||
                variant === "default" ||
                variant === "secondary" ||
                variant === "outline") &&
                "bg-paper-400"
            )}
          />
        )}
        <span>{children}</span>
      </div>
    );
  }
);
Badge.displayName = "Badge";
