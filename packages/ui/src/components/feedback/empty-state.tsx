import * as React from "react";
import { cn } from "../../lib/utils";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  code?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ code = "NO_RECORDS_LOCATED", title, description, action, icon, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border-obsidian-700/80 rounded-xs bg-obsidian-850/40 my-6 flex flex-col items-center justify-center border border-dashed p-8 text-center sm:p-16",
          className
        )}
        {...props}
      >
        {icon && (
          <div className="bg-obsidian-800 text-gold-400/80 border-obsidian-700/60 mb-4 rounded-full border p-3">
            {icon}
          </div>
        )}
        <span className="text-paper-500 mb-2 font-mono text-[10px] uppercase tracking-[0.25em]">
          [{code}]
        </span>
        <h3 className="text-paper-100 mb-2 max-w-md font-serif text-xl font-normal sm:text-2xl">
          {title}
        </h3>
        <p className="text-paper-400 mb-6 max-w-sm font-sans text-sm font-light leading-relaxed">
          {description}
        </p>
        {action && <div>{action}</div>}
      </div>
    );
  }
);
EmptyState.displayName = "EmptyState";
