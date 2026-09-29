import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

export const textVariants = cva("font-sans leading-relaxed text-balance", {
  variants: {
    variant: {
      lead: "text-lead font-light text-paper-200",
      body: "text-body font-normal text-paper-300",
      small: "text-small text-paper-400",
      caption: "text-caption text-paper-400 tracking-wider uppercase font-mono",
    },
    tone: {
      default: "",
      muted: "text-paper-500",
      paper: "text-paper-100",
      gold: "text-gold-400",
    },
  },
  defaultVariants: {
    variant: "body",
    tone: "default",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div";
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ as: Tag = "p", variant, tone, className, children, ...props }, ref) => {
    return (
      <Tag ref={ref as any} className={cn(textVariants({ variant, tone }), className)} {...props}>
        {children}
      </Tag>
    );
  }
);
Text.displayName = "Text";

export interface LeadProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const Lead = React.forwardRef<HTMLParagraphElement, LeadProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-lead text-paper-200 font-light leading-relaxed", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
Lead.displayName = "Lead";

export interface QuoteProps extends React.BlockquoteHTMLAttributes<HTMLQuoteElement> {
  author?: string;
  role?: string;
  source?: string;
}

export const Quote = React.forwardRef<HTMLQuoteElement, QuoteProps>(
  ({ author, role, source, className, children, ...props }, ref) => {
    return (
      <blockquote
        ref={ref}
        className={cn(
          "border-gold-500/60 text-paper-200 relative my-6 border-l-2 pl-6 font-serif text-lg italic sm:pl-8 sm:text-xl",
          className
        )}
        {...props}
      >
        <p className="mb-3">{children}</p>
        {(author || role || source) && (
          <footer className="text-paper-400 flex items-center gap-2 font-sans text-xs uppercase not-italic tracking-wider">
            {author && <span className="text-gold-300 font-medium">{author}</span>}
            {role && <span className="text-paper-500">— {role}</span>}
            {source && <span className="text-paper-500">({source})</span>}
          </footer>
        )}
      </blockquote>
    );
  }
);
Quote.displayName = "Quote";

export interface MetricNumberProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number;
  label?: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}

export const MetricNumber = React.forwardRef<HTMLDivElement, MetricNumberProps>(
  ({ value, label, change, changeType = "neutral", className, ...props }, ref) => {
    const changeColor = {
      positive: "text-perception-positive",
      negative: "text-perception-crisis",
      neutral: "text-paper-400",
    }[changeType];

    return (
      <div ref={ref} className={cn("flex flex-col space-y-1", className)} {...props}>
        <div className="flex items-baseline gap-2">
          <span className="text-paper-100 font-serif text-3xl font-light tracking-tight sm:text-4xl lg:text-5xl">
            {value}
          </span>
          {change && (
            <span className={cn("font-mono text-xs font-medium", changeColor)}>{change}</span>
          )}
        </div>
        {label && (
          <span className="text-paper-400 font-sans text-xs uppercase tracking-wider">{label}</span>
        )}
      </div>
    );
  }
);
MetricNumber.displayName = "MetricNumber";
