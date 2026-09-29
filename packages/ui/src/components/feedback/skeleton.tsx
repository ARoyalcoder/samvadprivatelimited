import * as React from "react";
import { cn } from "../../lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-xs bg-obsidian-800/80 border-obsidian-700/40 animate-pulse border",
        className
      )}
      {...props}
    />
  );
}

export function TextSkeleton({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("w-full space-y-2.5", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn("h-4 w-full", i === lines - 1 && "w-3/5")} />
      ))}
    </div>
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xs border-obsidian-700/60 bg-obsidian-850/80 space-y-4 border p-6",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-12" />
      </div>
      <Skeleton className="h-6 w-3/4" />
      <TextSkeleton lines={3} />
      <div className="border-obsidian-700/40 flex justify-between border-t pt-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

export function MetricSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xs border-obsidian-700/60 bg-obsidian-850 space-y-3 border p-6",
        className
      )}
    >
      <div className="flex justify-between">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-3 w-12" />
      </div>
      <Skeleton className="h-10 w-36" />
      <Skeleton className="h-3 w-48" />
    </div>
  );
}
