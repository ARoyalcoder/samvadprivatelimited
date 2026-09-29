"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "../../lib/utils";

export interface CustomCursorProps {
  className?: string;
}

export function CustomCursor({ className }: CustomCursorProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isPointer, setIsPointer] = React.useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth damped spring for trailing ring
  const ringX = useSpring(cursorX, { damping: 28, stiffness: 250, mass: 0.2 });
  const ringY = useSpring(cursorY, { damping: 28, stiffness: 250, mass: 0.2 });

  React.useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if target or ancestor is interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, input, textarea, select, [role="button"], [data-cursor="pointer"]'
        );
        setIsPointer(!!interactive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[9999] hidden overflow-hidden md:block",
        className
      )}
    >
      {/* Central pinpoint dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className={cn(
          "bg-gold-400 shadow-gold-subtle pointer-events-none fixed left-0 top-0 h-1.5 w-1.5 rounded-full transition-transform duration-100",
          isPointer && "bg-paper-100 scale-150"
        )}
      />

      {/* Trailing ambient luxury ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? 1.8 : 1,
          borderColor: isPointer ? "rgba(195, 150, 81, 0.6)" : "rgba(255, 255, 255, 0.2)",
        }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none fixed left-0 top-0 h-8 w-8 rounded-full border border-white/20"
      />
    </div>
  );
}
