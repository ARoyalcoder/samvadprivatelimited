import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

export const headingVariants = cva("font-serif tracking-tight text-paper-100", {
  variants: {
    size: {
      "display-2xl": "text-display-2xl font-light",
      "display-xl": "text-display-xl font-light",
      "display-lg": "text-display-lg font-normal",
      xl: "text-heading-xl font-normal",
      lg: "text-heading-lg font-normal",
      md: "text-heading-md font-medium",
      sm: "font-sans text-heading-sm font-medium",
    },
    tone: {
      default: "text-paper-100",
      muted: "text-paper-400",
      gold: "text-gold-400",
      gradient:
        "bg-gradient-to-r from-paper-100 via-gold-200 to-gold-400 bg-clip-text text-transparent",
    },
  },
  defaultVariants: {
    size: "lg",
    tone: "default",
  },
});

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  level?: HeadingLevel;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, size, tone, className, children, ...props }, ref) => {
    const Tag = `h${level}` as const;
    return (
      <Tag ref={ref} className={cn(headingVariants({ size, tone }), className)} {...props}>
        {children}
      </Tag>
    );
  }
);
Heading.displayName = "Heading";

export interface DisplayProps extends Omit<HeadingProps, "size"> {
  size?: "display-2xl" | "display-xl" | "display-lg";
}

export const Display = React.forwardRef<HTMLHeadingElement, DisplayProps>(
  ({ level = 1, size = "display-xl", ...props }, ref) => {
    return <Heading ref={ref} level={level} size={size} {...props} />;
  }
);
Display.displayName = "Display";

export interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  index?: string | number;
}

export const Eyebrow = React.forwardRef<HTMLParagraphElement, EyebrowProps>(
  ({ index, className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          "text-eyebrow text-gold-400/90 inline-flex items-center gap-2.5 font-mono font-semibold uppercase tracking-[0.22em]",
          className
        )}
        {...props}
      >
        {index !== undefined && (
          <span className="text-paper-500 font-normal">[{String(index).padStart(2, "0")}]</span>
        )}
        <span>{children}</span>
      </p>
    );
  }
);
Eyebrow.displayName = "Eyebrow";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: string | number;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  size?: "display-2xl" | "display-xl" | "display-lg" | "xl" | "lg";
}

export const SectionHeading = React.forwardRef<HTMLDivElement, SectionHeadingProps>(
  (
    {
      index,
      eyebrow,
      title,
      description,
      align = "left",
      size = "display-lg",
      className,
      ...props
    },
    ref
  ) => {
    const alignmentClasses = {
      left: "text-left items-start",
      center: "text-center items-center mx-auto",
      right: "text-right items-end ml-auto",
    };

    return (
      <div
        ref={ref}
        className={cn("flex max-w-3xl flex-col space-y-4", alignmentClasses[align], className)}
        {...props}
      >
        {(eyebrow || index !== undefined) && <Eyebrow index={index}>{eyebrow}</Eyebrow>}
        <Heading level={2} size={size} className="text-balance">
          {title}
        </Heading>
        {description && (
          <p className="text-lead text-paper-300 max-w-2xl font-light leading-relaxed">
            {description}
          </p>
        )}
      </div>
    );
  }
);
SectionHeading.displayName = "SectionHeading";
