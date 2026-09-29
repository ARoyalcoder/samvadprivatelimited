import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

export const gridVariants = cva("grid w-full", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
      12: "grid-cols-12",
      "editorial-5-7": "grid-cols-1 lg:grid-cols-12",
      "editorial-4-8": "grid-cols-1 lg:grid-cols-12",
    },
    gap: {
      none: "gap-0",
      sm: "gap-4 sm:gap-6",
      md: "gap-6 sm:gap-8",
      lg: "gap-8 sm:gap-12",
      xl: "gap-10 sm:gap-16",
    },
  },
  defaultVariants: {
    cols: 3,
    gap: "md",
  },
});

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof gridVariants> {}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ cols, gap, className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(gridVariants({ cols, gap }), className)} {...props}>
        {children}
      </div>
    );
  }
);
Grid.displayName = "Grid";

export const gridColVariants = cva("", {
  variants: {
    span: {
      1: "col-span-1",
      2: "col-span-1 sm:col-span-2",
      3: "col-span-1 sm:col-span-3",
      4: "col-span-1 md:col-span-4",
      5: "col-span-1 lg:col-span-5",
      6: "col-span-1 md:col-span-6",
      7: "col-span-1 lg:col-span-7",
      8: "col-span-1 md:col-span-8",
      9: "col-span-1 lg:col-span-9",
      10: "col-span-1 lg:col-span-10",
      11: "col-span-1 lg:col-span-11",
      12: "col-span-12",
    },
  },
  defaultVariants: {
    span: 12,
  },
});

export interface GridColProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof gridColVariants> {}

export const GridCol = React.forwardRef<HTMLDivElement, GridColProps>(
  ({ span, className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(gridColVariants({ span }), className)} {...props}>
        {children}
      </div>
    );
  }
);
GridCol.displayName = "GridCol";
