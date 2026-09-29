import * as React from "react";
import { cn } from "../../lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "./card";

export interface DossierCardProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: string | number;
  classification?: string;
  category: string;
  title: string;
  excerpt: string;
  date?: string;
  actionText?: string;
  href?: string;
}

export const DossierCard = React.forwardRef<HTMLDivElement, DossierCardProps>(
  (
    {
      index,
      classification = "CONFIDENTIAL",
      category,
      title,
      excerpt,
      date,
      actionText = "Review Dossier",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        variant="interactive"
        className={cn("group flex flex-col justify-between", className)}
        {...props}
      >
        <div>
          <div className="border-obsidian-700/50 mb-4 flex items-center justify-between border-b pb-4 font-mono text-[10px] uppercase tracking-widest">
            <span className="text-gold-400 font-semibold">
              {index !== undefined ? `[${String(index).padStart(2, "0")}]` : ""} {category}
            </span>
            <span className="text-paper-500 bg-obsidian-800 rounded-xs border-obsidian-700/60 border px-2 py-0.5">
              {classification}
            </span>
          </div>

          <CardHeader>
            <CardTitle className="group-hover:text-gold-300 transition-colors">{title}</CardTitle>
            <CardDescription className="mt-2 line-clamp-3">{excerpt}</CardDescription>
          </CardHeader>
        </div>

        <CardFooter className="justify-between font-mono text-xs">
          <span className="text-paper-500">{date}</span>
          <span className="text-paper-300 group-hover:text-gold-400 flex items-center gap-1.5 transition-all group-hover:translate-x-0.5">
            {actionText} →
          </span>
        </CardFooter>
      </Card>
    );
  }
);
DossierCard.displayName = "DossierCard";

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  description?: string;
}

export const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ label, value, change, trend = "neutral", description, className, ...props }, ref) => {
    const trendColor = {
      up: "text-perception-positive",
      down: "text-perception-crisis",
      neutral: "text-paper-400",
    }[trend];

    return (
      <Card ref={ref} variant="default" className={cn("p-6", className)} {...props}>
        <div className="text-paper-400 mb-3 flex items-center justify-between font-mono text-xs uppercase tracking-wider">
          <span>{label}</span>
          {change && (
            <span className={cn("flex items-center gap-1 font-semibold", trendColor)}>
              {trend === "up" && "↑"}
              {trend === "down" && "↓"}
              {change}
            </span>
          )}
        </div>
        <div className="text-paper-100 mb-2 font-serif text-3xl font-light tracking-tight sm:text-4xl">
          {value}
        </div>
        {description && (
          <p className="text-paper-400 font-sans text-xs font-light leading-relaxed">
            {description}
          </p>
        )}
      </Card>
    );
  }
);
MetricCard.displayName = "MetricCard";
