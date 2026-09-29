"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { transitions } from "../../lib/motion";
import { cn } from "../../lib/utils";

export interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  routeKey?: string;
}

export function PageTransition({ children, className, routeKey }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={transitions.editorial}
        className={cn("min-h-screen w-full", className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
