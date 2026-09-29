import * as React from "react";
import { cn } from "../../lib/utils";
import { Label } from "./label";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: string;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex w-full flex-col space-y-2", className)} {...props}>
        {children}
        {error && (
          <p className="text-perception-crisis mt-1 flex items-center gap-1.5 font-mono text-xs">
            <span>!</span>
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);
Field.displayName = "Field";

export interface FieldLabelProps extends React.ComponentPropsWithoutRef<typeof Label> {
  required?: boolean;
}

export const FieldLabel = React.forwardRef<React.ElementRef<typeof Label>, FieldLabelProps>(
  ({ children, required, className, ...props }, ref) => (
    <Label ref={ref} className={cn("flex items-center gap-1", className)} {...props}>
      <span>{children}</span>
      {required && <span className="text-gold-400 font-bold">*</span>}
    </Label>
  )
);
FieldLabel.displayName = "FieldLabel";

export const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-paper-500 font-sans text-xs leading-normal", className)}
    {...props}
  />
));
FieldDescription.displayName = "FieldDescription";
