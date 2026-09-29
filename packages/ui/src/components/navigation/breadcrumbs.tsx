import * as React from "react";
import { cn } from "../../lib/utils";

export interface BreadcrumbsProps extends React.ComponentPropsWithoutRef<"nav"> {
  separator?: React.ReactNode;
}

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, separator = "/", children, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={cn(
        "text-paper-400 flex items-center font-mono text-xs uppercase tracking-wider",
        className
      )}
      {...props}
    >
      <ol className="flex flex-wrap items-center gap-2">{children}</ol>
    </nav>
  )
);
Breadcrumbs.displayName = "Breadcrumbs";

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex items-center gap-2", className)} {...props} />
  )
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & { asChild?: boolean }
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn("text-paper-400 hover:text-gold-300 transition-colors duration-200", className)}
    {...props}
  />
));
BreadcrumbLink.displayName = "BreadcrumbLink";

export const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-current="page"
    aria-disabled="true"
    className={cn("text-paper-100 font-medium", className)}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

export const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("text-obsidian-600 select-none font-mono", className)}
    {...props}
  >
    {children ?? "/"}
  </span>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
