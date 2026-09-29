import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Container } from "./container";
import { Eyebrow } from "../typography/heading";

export const sectionVariants = cva("relative w-full overflow-hidden", {
  variants: {
    padding: {
      none: "py-0",
      compact: "py-8 sm:py-12 md:py-16",
      normal: "py-16 sm:py-24 md:py-32",
      spacious: "py-24 sm:py-36 md:py-48",
      hero: "pt-28 pb-16 sm:pt-36 sm:pb-24 md:pt-48 md:pb-32",
    },
    tone: {
      transparent: "bg-transparent",
      obsidian: "bg-obsidian-900 text-paper-100",
      carbon: "bg-obsidian-850 text-paper-100",
      elevated: "bg-obsidian-800 text-paper-100 border-y border-obsidian-700/60",
      bordered: "border-b border-obsidian-700/60",
    },
  },
  defaultVariants: {
    padding: "normal",
    tone: "transparent",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof sectionVariants> {
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  noContainer?: boolean;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    { padding, tone, containerSize = "lg", noContainer = false, className, children, ...props },
    ref
  ) => {
    return (
      <section ref={ref} className={cn(sectionVariants({ padding, tone }), className)} {...props}>
        {noContainer ? children : <Container size={containerSize}>{children}</Container>}
      </section>
    );
  }
);
Section.displayName = "Section";

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: string | number;
  eyebrow?: string;
  title: string;
  lead?: string;
  action?: React.ReactNode;
  align?: "left" | "center" | "split";
}

export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ index, eyebrow, title, lead, action, align = "left", className, ...props }, ref) => {
    if (align === "split") {
      return (
        <div
          ref={ref}
          className={cn(
            "border-obsidian-700/40 mb-12 flex flex-col justify-between gap-6 border-b pb-8 sm:mb-16 sm:gap-8 sm:pb-12 md:flex-row md:items-end",
            className
          )}
          {...props}
        >
          <div className="max-w-2xl space-y-3">
            {(eyebrow || index !== undefined) && <Eyebrow index={index}>{eyebrow}</Eyebrow>}
            <h2 className="text-heading-xl sm:text-display-lg text-paper-100 font-serif tracking-tight">
              {title}
            </h2>
            {lead && <p className="text-lead text-paper-300 font-light leading-relaxed">{lead}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      );
    }

    const alignmentClasses = {
      left: "text-left items-start",
      center: "text-center items-center mx-auto",
    }[align];

    return (
      <div
        ref={ref}
        className={cn(
          "mb-12 flex max-w-3xl flex-col space-y-4 sm:mb-16",
          alignmentClasses,
          className
        )}
        {...props}
      >
        {(eyebrow || index !== undefined) && <Eyebrow index={index}>{eyebrow}</Eyebrow>}
        <h2 className="text-heading-xl sm:text-display-lg text-paper-100 text-balance font-serif tracking-tight">
          {title}
        </h2>
        {lead && <p className="text-lead text-paper-300 font-light leading-relaxed">{lead}</p>}
        {action && <div className="pt-2">{action}</div>}
      </div>
    );
  }
);
SectionHeader.displayName = "SectionHeader";

export const SectionDivider = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement> & { metallic?: boolean }
>(({ metallic = false, className, ...props }, ref) => {
  return (
    <hr
      ref={ref}
      className={cn(
        "h-[1px] w-full border-0",
        metallic
          ? "via-gold-500/40 bg-gradient-to-r from-transparent to-transparent"
          : "bg-obsidian-700/50",
        className
      )}
      {...props}
    />
  );
});
SectionDivider.displayName = "SectionDivider";
