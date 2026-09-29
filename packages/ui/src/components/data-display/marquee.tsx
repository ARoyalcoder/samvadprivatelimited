"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  pauseOnHover?: boolean;
  reverse?: boolean;
  speed?: "slow" | "normal" | "fast";
  fadeEdges?: boolean;
}

export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      pauseOnHover = true,
      reverse = false,
      speed = "normal",
      fadeEdges = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const speedDuration = {
      slow: "55s",
      normal: "35s",
      fast: "20s",
    }[speed];

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full select-none overflow-hidden",
          fadeEdges &&
            "[mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "animate-marquee flex shrink-0 items-center justify-around gap-8 whitespace-nowrap will-change-transform",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
          style={{
            animationDuration: speedDuration,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
        <div
          aria-hidden="true"
          className={cn(
            "animate-marquee flex shrink-0 items-center justify-around gap-8 whitespace-nowrap will-change-transform",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
          style={{
            animationDuration: speedDuration,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);
Marquee.displayName = "Marquee";
