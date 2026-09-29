import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

export const labelVariants = cva(
  "text-xs font-mono uppercase tracking-[0.16em] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 select-none text-paper-300",
  {
    variants: {
      tone: {
        default: "text-paper-300",
        gold: "text-gold-400",
        muted: "text-paper-500",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  }
);

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, tone, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants({ tone }), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;
