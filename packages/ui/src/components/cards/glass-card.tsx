"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  interactive?: boolean;
  blur?: "sm" | "md" | "lg" | "xl";
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    { glow = false, interactive = false, blur = "md", className, children, onMouseMove, ...props },
    ref
  ) => {
    const cardRef = React.useRef<HTMLDivElement | null>(null);
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0, opacity: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        opacity: 1,
      });
      onMouseMove?.(e);
    };

    const handleMouseLeave = () => {
      setMousePos((prev) => ({ ...prev, opacity: 0 }));
    };

    const blurMap = {
      sm: "backdrop-blur-sm",
      md: "backdrop-blur-md",
      lg: "backdrop-blur-lg",
      xl: "backdrop-blur-xl",
    };

    return (
      <div
        ref={(node) => {
          cardRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "rounded-xs bg-obsidian-900/70 text-paper-100 shadow-glass relative overflow-hidden border border-white/[0.08] p-6 transition-all duration-300 sm:p-8",
          blurMap[blur],
          glow && "shadow-gold-subtle border-gold-500/30",
          interactive &&
            "hover:border-gold-500/40 hover:bg-obsidian-900/85 hover:shadow-elevation-3 cursor-pointer",
          className
        )}
        {...props}
      >
        {/* Subtle radial light highlight following cursor */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity: mousePos.opacity,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(195, 150, 81, 0.08), transparent 70%)`,
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";
