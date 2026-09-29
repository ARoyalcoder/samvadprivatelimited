"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "../../lib/utils";
import { transitions } from "../../lib/motion";

export interface ImageRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  aspectRatio?: "video" | "portrait" | "landscape" | "square" | "wide";
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  once?: boolean;
}

export function ImageReveal({
  src,
  alt,
  aspectRatio = "landscape",
  direction = "up",
  delay = 0,
  once = true,
  className,
  ...props
}: ImageRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  const aspectClasses = {
    video: "aspect-video",
    portrait: "aspect-[4/5]",
    landscape: "aspect-[3/2]",
    square: "aspect-square",
    wide: "aspect-[21/9]",
  }[aspectRatio];

  const getClipPaths = () => {
    switch (direction) {
      case "up":
        return {
          hidden: "inset(100% 0% 0% 0%)",
          visible: "inset(0% 0% 0% 0%)",
        };
      case "down":
        return {
          hidden: "inset(0% 0% 100% 0%)",
          visible: "inset(0% 0% 0% 0%)",
        };
      case "left":
        return {
          hidden: "inset(0% 100% 0% 0%)",
          visible: "inset(0% 0% 0% 0%)",
        };
      case "right":
        return {
          hidden: "inset(0% 0% 0% 100%)",
          visible: "inset(0% 0% 0% 0%)",
        };
    }
  };

  const clip = getClipPaths();

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xs bg-obsidian-850 relative overflow-hidden",
        aspectClasses,
        className
      )}
      {...props}
    >
      <motion.div
        initial={{ clipPath: clip.hidden }}
        animate={{ clipPath: isInView ? clip.visible : clip.hidden }}
        transition={{
          ...transitions.luxury,
          delay,
        }}
        className="h-full w-full"
      >
        <motion.img
          src={src}
          alt={alt}
          initial={{ scale: 1.12 }}
          animate={{ scale: isInView ? 1.0 : 1.12 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            delay,
          }}
          className="h-full w-full object-cover object-center"
        />
      </motion.div>
      {/* Subtle editorial film grain overlay */}
      <div className="from-obsidian-950/60 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
    </div>
  );
}
