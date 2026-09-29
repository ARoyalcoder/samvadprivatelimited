"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";

export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    variant?: "underline" | "segmented";
  }
>(({ className, variant = "underline", ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center",
      variant === "underline" && "border-obsidian-700/60 w-full justify-start gap-8 border-b pb-px",
      variant === "segmented" &&
        "rounded-xs bg-obsidian-850 border-obsidian-700/80 gap-1 border p-1",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    variant?: "underline" | "segmented";
  }
>(({ className, variant = "underline", ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "focus-visible:ring-gold-400 inline-flex select-none items-center justify-center whitespace-nowrap font-mono text-xs uppercase tracking-[0.16em] transition-all focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",
      variant === "underline" &&
        "text-paper-400 hover:text-paper-200 data-[state=active]:border-gold-400 data-[state=active]:text-paper-100 border-b-2 border-transparent py-3 data-[state=active]:font-semibold",
      variant === "segmented" &&
        "rounded-xs text-paper-400 data-[state=active]:bg-obsidian-750 data-[state=active]:text-paper-100 data-[state=active]:shadow-elevation-1 px-4 py-2",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "ring-offset-background focus-visible:ring-gold-400 mt-6 focus-visible:outline-none focus-visible:ring-1",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
