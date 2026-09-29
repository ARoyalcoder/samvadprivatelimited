import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-xs font-mono uppercase tracking-[0.16em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400 disabled:pointer-events-none disabled:opacity-40 select-none cursor-pointer group relative overflow-hidden",
  {
    variants: {
      variant: {
        primary:
          "bg-paper-100 text-obsidian-950 font-semibold hover:bg-gold-200 border border-transparent shadow-elevation-1 active:scale-[0.99]",
        secondary:
          "bg-obsidian-850 text-paper-200 border border-obsidian-700/80 hover:bg-obsidian-800 hover:border-paper-400/40 shadow-elevation-1",
        outline:
          "border border-obsidian-700/80 bg-transparent text-paper-200 hover:border-gold-400/70 hover:text-gold-300 hover:bg-gold-500/5",
        ghost: "bg-transparent text-paper-300 hover:text-paper-100 hover:bg-obsidian-800/60",
        gold: "bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-obsidian-950 font-bold shadow-gold-subtle hover:shadow-gold-glow hover:brightness-105 active:scale-[0.99]",
        luxury:
          "bg-obsidian-900/95 text-gold-300 border border-gold-500/50 hover:border-gold-400 hover:bg-obsidian-850 shadow-elevation-2 backdrop-blur-md hover:shadow-gold-subtle",
        destructive:
          "bg-perception-crisis/20 text-perception-crisis border border-perception-crisis/40 hover:bg-perception-crisis/30",
        link: "text-gold-400 underline-offset-4 hover:underline lowercase font-sans text-sm tracking-normal p-0 h-auto",
      },
      size: {
        sm: "h-8 px-3.5 text-[10px] rounded-xs",
        md: "h-11 px-6 text-xs rounded-xs",
        lg: "h-13 px-8 text-xs rounded-xs",
        xl: "h-14 px-10 text-sm rounded-xs",
        icon: "h-10 w-10 p-0 rounded-xs",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, isLoading = false, children, disabled, ...props },
    ref
  ) => {
    if (asChild) {
      return (
        <Slot className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {isLoading && (
          <svg
            className="-ml-1 mr-2.5 h-3.5 w-3.5 animate-spin text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </button>
    );
  }
);
Button.displayName = "Button";
