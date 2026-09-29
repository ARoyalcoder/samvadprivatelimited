"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  radius: number;
  color: string;
  alpha: number;
  category: "counsel" | "institution" | "public" | "capital";
}

interface Link {
  source: number;
  target: number;
  pulseProgress: number;
  pulseSpeed: number;
  strength: number;
}

export interface DialogueNetworkProps extends React.HTMLAttributes<HTMLDivElement> {
  density?: "sparse" | "medium" | "dense";
  interactive?: boolean;
  showLabels?: boolean;
  fadeEdges?: boolean;
}

/**
 * DialogueNetwork — Abstract Visual Motif
 *
 * Embodying interconnected strategic dialogue, institutional influence vectors,
 * and perception topology. Strictly rejects crypto/blockchain aesthetics (no neon
 * glowing hexagons or coin tokens); rendered with restrained archival hairline vectors,
 * gold nodal foci, and editorial institutional labels.
 */
export function DialogueNetwork({
  density = "medium",
  interactive = true,
  showLabels = true,
  fadeEdges = true,
  className,
  ...props
}: DialogueNetworkProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const mouseRef = React.useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

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
      if (!canvas || !container) return;
      const dpr = window.devicePixelRatio || 1;
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Initial institutional actors
    const actorLabels: Array<{
      label: string;
      category: "counsel" | "institution" | "public" | "capital";
    }> = [
      { label: "Executive Leadership", category: "counsel" },
      { label: "Advisory Council", category: "counsel" },
      { label: "Financial Media", category: "public" },
      { label: "Sovereign Regulators", category: "institution" },
      { label: "Capital Markets", category: "capital" },
      { label: "Institutional Shareholders", category: "capital" },
      { label: "Public Discourse", category: "public" },
      { label: "Global Policy Forum", category: "institution" },
      { label: "Strategic Counterparties", category: "counsel" },
      { label: "Perception Intelligence Desk", category: "counsel" },
      { label: "Litigation Advisory", category: "institution" },
      { label: "Cross-Border Analysts", category: "capital" },
    ];

    const nodeCount = {
      sparse: 8,
      medium: 12,
      dense: 18,
    }[density];

    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const actor = actorLabels[i % actorLabels.length];
      if (!actor) continue;
      const isCounsel = actor.category === "counsel";

      nodes.push({
        id: `node-${i}`,
        label: actor.label,
        x: Math.random() * (width - 120) + 60,
        y: Math.random() * (height - 80) + 40,
        targetX: Math.random() * (width - 120) + 60,
        targetY: Math.random() * (height - 80) + 40,
        radius: isCounsel ? 3.5 : 2.5,
        color: isCounsel ? "#C39651" : "#EAE8E1",
        alpha: isCounsel ? 0.9 : 0.6,
        category: actor.category,
      });
    }

    // Connect nodes with strategic dialogue threads
    const links: Link[] = [];
    for (let i = 0; i < nodes.length; i++) {
      const nodeA = nodes[i];
      if (!nodeA) continue;
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeB = nodes[j];
        if (!nodeB) continue;
        const dx = nodeA.x - nodeB.x;
        const dy = nodeA.y - nodeB.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Connect nodes within a maximum proximity threshold
        if (distance < width * 0.45) {
          links.push({
            source: i,
            target: j,
            pulseProgress: Math.random(),
            pulseSpeed: 0.003 + Math.random() * 0.004,
            strength: Math.max(0.1, 1 - distance / (width * 0.45)),
          });
        }
      }
    }

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Update node drift physics
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (!node) continue;

        // Smooth subtle harmonic wandering
        node.x += Math.sin(time + i * 1.5) * 0.25;
        node.y += Math.cos(time + i * 1.8) * 0.25;

        // Interactive mouse proximity attraction / divergence
        if (mouseRef.current.active) {
          const mdx = mouseRef.current.x - node.x;
          const mdy = mouseRef.current.y - node.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 180 && mDist > 0) {
            const force = (1 - mDist / 180) * 0.8;
            node.x += (mdx / mDist) * force;
            node.y += (mdy / mDist) * force;
          }
        }
      }

      // Draw Dialogue Connecting Threads
      for (const link of links) {
        const nA = nodes[link.source];
        const nB = nodes[link.target];
        if (!nA || !nB) continue;

        const isGoldConnection = nA.category === "counsel" || nB.category === "counsel";

        // Base hairline thread
        ctx.beginPath();
        ctx.moveTo(nA.x, nA.y);
        ctx.lineTo(nB.x, nB.y);
        ctx.strokeStyle = isGoldConnection
          ? `rgba(195, 150, 81, ${0.12 * link.strength})`
          : `rgba(255, 255, 255, ${0.05 * link.strength})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Dialogue Transmission Pulse (a subtle point gliding along the vector)
        link.pulseProgress = (link.pulseProgress + link.pulseSpeed) % 1;
        const px = nA.x + (nB.x - nA.x) * link.pulseProgress;
        const py = nA.y + (nB.y - nA.y) * link.pulseProgress;

        ctx.beginPath();
        ctx.arc(px, py, 1.25, 0, Math.PI * 2);
        ctx.fillStyle = isGoldConnection
          ? `rgba(209, 174, 116, ${0.75 * link.strength})`
          : `rgba(244, 243, 239, ${0.4 * link.strength})`;
        ctx.fill();
      }

      // Draw Institutional Dialogue Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (!node) continue;

        // Subtle outer focus aura for primary counsel nodes
        if (node.category === "counsel") {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2.8, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(195, 150, 81, 0.18)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Central core node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Editorial Typography Label
        if (showLabels && width > 640) {
          ctx.font = "9px 'JetBrains Mono', monospace";
          ctx.fillStyle =
            node.category === "counsel" ? "rgba(224, 202, 160, 0.85)" : "rgba(181, 176, 162, 0.65)";
          ctx.fillText(node.label.toUpperCase(), node.x + 8, node.y + 3);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    if (interactive) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (interactive && canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [density, interactive, showLabels]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "bg-obsidian-950 relative h-full min-h-[350px] w-full select-none overflow-hidden",
        fadeEdges && "[mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]",
        className
      )}
      {...props}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
