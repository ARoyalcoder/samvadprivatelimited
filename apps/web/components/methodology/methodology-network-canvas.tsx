"use client";

import * as React from "react";
import { cn } from "@samvad/ui";
import type { MethodologyStage } from "@/lib/methodology-data";

export interface MethodologyNetworkCanvasProps
  extends React.HTMLAttributes<HTMLDivElement> {
  activeStage: MethodologyStage;
  staticMode?: boolean;
}

export function MethodologyNetworkCanvas({
  activeStage,
  staticMode = false,
  className,
  ...props
}: MethodologyNetworkCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  // Check prefers-reduced-motion
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const shouldAnimate = !reducedMotion && !staticMode;

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Node generator based on active stage
    const centerX = width / 2;
    const centerY = height / 2;

    interface NodePoint {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      r: number;
      color: string;
      label?: string;
    }

    const nodes: NodePoint[] = [];
    const count = activeStage.visualMode === "amplify" ? 36 : 24;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      let radius = Math.min(width, height) * 0.35;

      if (activeStage.visualMode === "strategize") {
        radius = i % 2 === 0 ? radius * 0.8 : radius * 0.4;
      } else if (activeStage.visualMode === "analyze") {
        radius = (i % 3 + 1) * 0.12 * Math.min(width, height);
      }

      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      nodes.push({
        x,
        y,
        targetX: x,
        targetY: y,
        r: i === 0 ? 6 : 2.5 + (i % 3),
        color: i === 0 ? "#E0CAA0" : i % 4 === 0 ? "#C39651" : "#71717A",
        label: i === 0 ? "CENTRAL SOVEREIGN CORE" : undefined,
      });
    }

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw architectural grid background
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Stage-Specific Visual Transformations
      if (activeStage.visualMode === "listen") {
        // Concentric sonar ripple waves
        const rippleCount = 3;
        for (let r = 0; r < rippleCount; r++) {
          const progress = ((tick * 0.015 + r / rippleCount) % 1);
          const maxR = Math.min(width, height) * 0.45;
          const currentR = progress * maxR;
          ctx.beginPath();
          ctx.arc(centerX, centerY, currentR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(195, 150, 81, ${0.4 * (1 - progress)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      } else if (activeStage.visualMode === "analyze") {
        // Analytical coordinate reticle & clustering lines
        ctx.strokeStyle = "rgba(195, 150, 81, 0.15)";
        ctx.beginPath();
        ctx.moveTo(centerX - 80, centerY);
        ctx.lineTo(centerX + 80, centerY);
        ctx.moveTo(centerX, centerY - 80);
        ctx.lineTo(centerX, centerY + 80);
        ctx.stroke();
      } else if (activeStage.visualMode === "strategize") {
        // Symmetrical protective shield perimeter
        ctx.beginPath();
        const shieldR = Math.min(width, height) * 0.38;
        ctx.arc(centerX, centerY, shieldR, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(224, 202, 160, 0.25)";
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      } else if (activeStage.visualMode === "engage") {
        // Bilateral energy transmission pulses between key nodes
        for (let i = 0; i < 6; i++) {
          const target = nodes[i + 1];
          if (target) {
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(target.x, target.y);
            ctx.strokeStyle = "rgba(195, 150, 81, 0.35)";
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Traveling packet
            if (shouldAnimate) {
              const p = (tick * 0.03 + i * 0.15) % 1;
              const px = centerX + (target.x - centerX) * p;
              const py = centerY + (target.y - centerY) * p;
              ctx.beginPath();
              ctx.arc(px, py, 2.5, 0, Math.PI * 2);
              ctx.fillStyle = "#E0CAA0";
              ctx.fill();
            }
          }
        }
      } else if (activeStage.visualMode === "amplify") {
        // Wide outward radiating shockwaves
        for (let i = 0; i < nodes.length; i++) {
          const n1 = nodes[i]!;
          for (let j = i + 1; j < nodes.length; j++) {
            const n2 = nodes[j]!;
            const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
            if (dist < 110) {
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.strokeStyle = `rgba(195, 150, 81, ${0.12 * (1 - dist / 110)})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      } else if (activeStage.visualMode === "measure") {
        // Stabilized harmonic hexagonal lattice
        ctx.strokeStyle = "rgba(16, 185, 129, 0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        const r = Math.min(width, height) * 0.32;
        for (let a = 0; a < 6; a++) {
          const ang = (a / 6) * Math.PI * 2;
          const x = centerX + Math.cos(ang) * r;
          const y = centerY + Math.sin(ang) * r;
          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // 3. Draw inter-node connecting hairlines
      ctx.lineWidth = 0.75;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]!;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(n.x, n.y);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
        ctx.stroke();
      }

      // 4. Draw Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]!;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        // Node halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 2, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(195, 150, 81, 0.2)";
        ctx.stroke();
      }

      // 5. Center Sovereign Node
      ctx.beginPath();
      ctx.arc(centerX, centerY, 7, 0, Math.PI * 2);
      ctx.fillStyle = "#E0CAA0";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 14, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(224, 202, 160, 0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();

      tick++;

      if (shouldAnimate) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [activeStage, shouldAnimate]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-[380px] sm:h-[460px] lg:h-[540px] w-full overflow-hidden rounded-xs border border-obsidian-750 bg-obsidian-950",
        className
      )}
      role="img"
      aria-label={`Network visualization for Stage ${activeStage.num} ${activeStage.name}: ${activeStage.title}`}
      {...props}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />

      {/* Live Telemetry HUD Overlay */}
      <div className="pointer-events-none absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 rounded-xs border border-obsidian-750 bg-obsidian-900/90 px-3 py-1 text-gold-300 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest">
            {activeStage.telemetry.status}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-[10px] text-obsidian-400">
          <span>Coherence: {activeStage.telemetry.signalCoherence}</span>
          <span>·</span>
          <span>Density: {activeStage.telemetry.networkDensity}</span>
        </div>
      </div>

      {/* Bottom Center Stage Indicator */}
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-obsidian-400">
        <span className="text-sand-300">STAGE {activeStage.num} · {activeStage.name}</span>
        <span className="text-gold-400">{activeStage.telemetry.entropyReduction}</span>
      </div>
    </div>
  );
}
