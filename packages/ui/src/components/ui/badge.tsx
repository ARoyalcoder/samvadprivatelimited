import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
        secondary: "border-transparent bg-zinc-900 text-zinc-300 hover:bg-zinc-800",
        destructive: "border-transparent bg-red-900/60 text-red-200 border-red-800/50",
        outline: "text-zinc-300 border-zinc-700",
        gold: "border-gold-500/30 bg-gold-500/10 text-gold-300 backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
