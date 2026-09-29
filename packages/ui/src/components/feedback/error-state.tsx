import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../buttons/button";

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  code?: string;
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryText?: string;
}

export const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  (
    {
      code = "ERR_TRANSMISSION_FAILED",
      title = "Intelligence Pipeline Interrupted",
      message = "An unexpected error occurred while communicating with the advisory telemetry layer. Our operations desk has logged the event.",
      onRetry,
      retryText = "Retry Transmission",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "border-perception-crisis/30 rounded-xs bg-perception-crisis/5 my-8 flex flex-col items-center justify-center border p-8 text-center sm:p-14",
          className
        )}
        {...props}
      >
        <div className="bg-perception-crisis/10 text-perception-crisis border-perception-crisis/20 mb-4 rounded-full border p-3">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <span className="text-perception-crisis mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em]">
          [{code}]
        </span>
        <h3 className="text-paper-100 mb-3 max-w-md font-serif text-xl font-normal sm:text-2xl">
          {title}
        </h3>
        <p className="text-paper-400 mb-6 max-w-md font-sans text-sm font-light leading-relaxed">
          {message}
        </p>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            {retryText}
          </Button>
        )}
      </div>
    );
  }
);
ErrorState.displayName = "ErrorState";

export function ErrorCard({
  title = "Query Failed",
  message,
  className,
}: {
  title?: string;
  message: string;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-xs border-perception-crisis/30 bg-perception-crisis/10 text-paper-200 flex items-start gap-3 border p-4 font-mono text-xs",
        className
      )}
    >
      <AlertTriangle className="text-perception-crisis mt-0.5 h-4 w-4 shrink-0" />
      <div>
        <div className="text-perception-crisis mb-1 font-semibold uppercase tracking-wider">
          {title}
        </div>
        <p className="text-paper-400 font-sans leading-normal">{message}</p>
      </div>
    </div>
  );
}
