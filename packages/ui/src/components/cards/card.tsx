import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

export const cardVariants = cva(
  "rounded-xs border text-paper-100 transition-all duration-300 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-obsidian-850/90 border-obsidian-700/60 shadow-elevation-1",
        elevated: "bg-obsidian-800 border-obsidian-700/80 shadow-elevation-2",
        bordered: "bg-transparent border-obsidian-700/80 hover:border-obsidian-600",
        interactive:
          "bg-obsidian-850/80 border-obsidian-700/60 shadow-elevation-1 hover:border-gold-500/50 hover:bg-obsidian-800 hover:shadow-gold-subtle cursor-pointer group",
        gold: "bg-obsidian-850 border-gold-500/40 shadow-gold-subtle hover:border-gold-400",
      },
      padding: {
        none: "p-0",
        compact: "p-4 sm:p-5",
        normal: "p-6 sm:p-8",
        spacious: "p-8 sm:p-12",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "normal",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant, padding, className }))} {...props} />
  )
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mb-4 flex flex-col space-y-2", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { as?: "h2" | "h3" | "h4" }
>(({ className, as: Tag = "h3", ...props }, ref) => (
  <Tag
    ref={ref}
    className={cn(
      "text-paper-100 font-serif text-xl font-normal leading-snug tracking-tight sm:text-2xl",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-paper-400 font-sans text-sm font-light leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-paper-300 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("border-obsidian-700/50 mt-6 flex items-center border-t pt-4", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";
