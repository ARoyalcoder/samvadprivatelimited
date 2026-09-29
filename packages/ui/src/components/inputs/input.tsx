import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

export const inputVariants = cva(
  "flex w-full rounded-xs border font-sans text-paper-100 transition-colors file:border-0 file:bg-transparent file:text-xs file:font-mono placeholder:text-paper-500 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-40",
  {
    variants: {
      variant: {
        default:
          "bg-obsidian-850/90 border-obsidian-700/80 focus-visible:border-gold-500 focus-visible:ring-gold-500/30",
        elevated:
          "bg-obsidian-800 border-obsidian-700 focus-visible:border-gold-400 focus-visible:ring-gold-400/40",
        ghost:
          "bg-transparent border-b border-t-0 border-x-0 border-obsidian-700 rounded-none px-0 focus-visible:border-gold-400 focus-visible:ring-0",
      },
      inputSize: {
        sm: "h-9 px-3 text-xs",
        md: "h-11 px-4 text-sm",
        lg: "h-13 px-5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  }
);

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type, startIcon, endIcon, ...props }, ref) => {
    if (startIcon || endIcon) {
      return (
        <div className="relative flex w-full items-center">
          {startIcon && (
            <div className="text-paper-400 pointer-events-none absolute left-3.5 flex items-center justify-center">
              {startIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant, inputSize }),
              startIcon && "pl-10",
              endIcon && "pr-10",
              className
            )}
            ref={ref}
            {...props}
          />
          {endIcon && (
            <div className="text-paper-400 pointer-events-none absolute right-3.5 flex items-center justify-center">
              {endIcon}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, inputSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
