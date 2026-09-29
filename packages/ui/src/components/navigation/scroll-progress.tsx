"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "../../lib/utils";

export interface ScrollProgressProps {
  className?: string;
  color?: string;
}

export function ScrollProgress({ className }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className={cn(
        "from-gold-600 via-gold-400 to-champagne-300 shadow-gold-subtle pointer-events-none fixed left-0 right-0 top-0 z-50 h-[2px] bg-gradient-to-r",
        className
      )}
    />
  );
}
