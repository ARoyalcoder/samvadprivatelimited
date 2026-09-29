"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "../../lib/utils";

export interface HoverImageProps {
  imageSrc: string;
  imageAlt?: string;
  children: React.ReactNode;
  className?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export function HoverImage({
  imageSrc,
  imageAlt = "Preview",
  children,
  className,
  imageWidth = 240,
  imageHeight = 160,
}: HoverImageProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 180, mass: 0.3 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={cn("group relative inline-block cursor-pointer select-none", className)}
    >
      {children}

      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
          width: imageWidth,
          height: imageHeight,
          translateX: "-50%",
          translateY: "-110%",
        }}
        initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
        animate={
          isHovered ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.85, rotate: -3 }
        }
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-xs bg-obsidian-900 shadow-elevation-3 pointer-events-none absolute z-50 overflow-hidden border border-white/20"
      >
        <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover object-center" />
        <div className="from-obsidian-950/40 absolute inset-0 bg-gradient-to-t to-transparent" />
      </motion.div>
    </div>
  );
}
