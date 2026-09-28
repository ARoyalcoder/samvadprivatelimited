import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-xs uppercase tracking-widest font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default: "bg-white text-zinc-950 shadow hover:bg-zinc-200 border border-transparent",
        destructive: "bg-red-600 text-white shadow-sm hover:bg-red-700",
        outline:
          "border border-zinc-700/80 bg-transparent text-zinc-200 hover:bg-zinc-900/60 hover:border-gold-400/60",
        secondary: "bg-zinc-800 text-zinc-100 shadow-sm hover:bg-zinc-700",
        ghost: "text-zinc-300 hover:bg-zinc-800/60 hover:text-white",
        link: "text-gold-400 underline-offset-4 hover:underline lowercase tracking-normal text-sm font-normal",
        // Bespoke luxury perception advisory styling
        gold: "bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-zinc-950 font-bold shadow-lg shadow-gold-500/10 hover:shadow-gold-500/25 hover:brightness-105 active:scale-[0.99]",
        executive:
          "bg-zinc-900/90 text-gold-300 border border-gold-500/40 hover:bg-zinc-800 hover:border-gold-400 shadow-md backdrop-blur-sm",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-[11px]",
        lg: "h-13 px-8 text-sm",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
