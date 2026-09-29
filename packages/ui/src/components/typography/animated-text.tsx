"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "../../lib/utils";
import { transitions } from "../../lib/motion";

export interface AnimatedTextProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  splitBy?: "words" | "characters" | "lines";
  delay?: number;
  once?: boolean;
}

export function AnimatedText({
  text,
  className,
  tag = "p",
  splitBy = "words",
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  const units = React.useMemo(() => {
    if (splitBy === "characters") {
      return text.split("");
    }
    if (splitBy === "lines") {
      return text.split("\n");
    }
    return text.split(" ");
  }, [text, splitBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: splitBy === "characters" ? 0.025 : 0.06,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 16,
      rotateX: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: transitions.luxury,
    },
  };

  const Tag = tag;

  return (
    <Tag className={cn("inline-block", className)}>
      <motion.span
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline-block"
      >
        {units.map((unit, index) => (
          <span key={index} className="inline-block overflow-hidden pb-1">
            <motion.span variants={childVariants} className="inline-block">
              {unit}
              {splitBy === "words" && index < units.length - 1 && "\u00A0"}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

export interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  once?: boolean;
}

export function RevealText({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: RevealTextProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.25 });

  const getInitialOffset = () => {
    switch (direction) {
      case "up":
        return { y: "110%", x: "0%" };
      case "down":
        return { y: "-110%", x: "0%" };
      case "left":
        return { x: "110%", y: "0%" };
      case "right":
        return { x: "-110%", y: "0%" };
    }
  };

  return (
    <div ref={ref} className={cn("inline-block overflow-hidden align-bottom", className)}>
      <motion.div
        initial={getInitialOffset()}
        animate={isInView ? { x: "0%", y: "0%" } : getInitialOffset()}
        transition={{
          ...transitions.luxury,
          delay,
        }}
        className="inline-block"
      >
        {children}
      </motion.div>
    </div>
  );
}
