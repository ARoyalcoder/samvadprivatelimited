import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

export const containerVariants = cva("mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12", {
  variants: {
    size: {
      sm: "max-w-3xl", // 768px - Dossiers, essays, articles
      md: "max-w-5xl", // 1024px - Standard forms and briefings
      lg: "max-w-7xl", // 1280px - High-density dashboards and grids
      xl: "max-w-[1440px]", // 1440px - Cinematic editorial canvas
      full: "max-w-none px-4 sm:px-6 lg:px-8",
      default: "max-w-7xl",
    },
    padding: {
      none: "px-0 sm:px-0 md:px-0 lg:px-0",
      compact: "px-4 sm:px-6",
      normal: "px-4 sm:px-6 md:px-8 lg:px-12",
      spacious: "px-6 sm:px-10 md:px-16 lg:px-24",
    },
  },
  defaultVariants: {
    size: "default",
    padding: "normal",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {
  as?: "div" | "main" | "section" | "article";
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ as: Tag = "div", size, padding, className, children, ...props }, ref) => {
    return (
      <Tag
        ref={ref as any}
        className={cn(containerVariants({ size, padding }), className)}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);
Container.displayName = "Container";
