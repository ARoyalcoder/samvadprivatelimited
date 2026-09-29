import * as React from "react";
import { cn } from "../../lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "focus-visible:border-gold-500/80 focus-visible:ring-gold-500/40 flex min-h-[120px] w-full rounded-sm border border-zinc-800 bg-zinc-950/80 px-4 py-3 text-sm text-zinc-100 shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
