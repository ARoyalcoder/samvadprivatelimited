"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "../../lib/utils";
import { Button, type ButtonProps } from "./button";

export interface MagneticButtonProps extends ButtonProps {
  strength?: number;
  activeScale?: number;
}

export const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ strength = 0.35, activeScale = 0.98, className, children, ...props }, ref) => {
    const internalRef = React.useRef<HTMLButtonElement | null>(null);

    // Coordinate state with magnetic springs
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 16, stiffness: 220, mass: 0.2 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = internalRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = (e.clientX - centerX) * strength;
      const distanceY = (e.clientY - centerY) * strength;

      x.set(distanceX);
      y.set(distanceY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        style={{ x: springX, y: springY }}
        whileTap={{ scale: activeScale }}
        className="inline-block"
      >
        <Button
          ref={(node) => {
            internalRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
            }
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn("transition-colors", className)}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    );
  }
);
MagneticButton.displayName = "MagneticButton";
