import * as React from "react";
import { cn } from "../../lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "elevated";
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "rounded-xs text-paper-100 placeholder:text-paper-500 flex min-h-[120px] w-full border p-4 font-sans text-sm leading-relaxed transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-40",
          variant === "default" &&
            "bg-obsidian-850/90 border-obsidian-700/80 focus-visible:border-gold-500 focus-visible:ring-gold-500/30",
          variant === "elevated" &&
            "bg-obsidian-800 border-obsidian-700 focus-visible:border-gold-400 focus-visible:ring-gold-400/40",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
