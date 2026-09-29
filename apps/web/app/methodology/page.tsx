import * as React from "react";
import type { Metadata } from "next";
import { MethodologyHero } from "@/components/methodology/methodology-hero";
import { InteractiveMethodology } from "@/components/methodology/interactive-methodology";
import { MethodologyCta } from "@/components/methodology/methodology-cta";

export const metadata: Metadata = {
  title: "Core Methodology | SAMVAD Perception Advisory",
  description:
    "An interactive scroll-driven exploration of SAMVAD's six-stage perception doctrine: Listen, Analyze, Strategize, Engage, Amplify, and Measure.",
};

export default function MethodologyPage() {
  return (
    <div className="flex w-full flex-col overflow-hidden bg-obsidian-950 text-sand-100">
      {/* 1. Methodology Hero */}
      <MethodologyHero />

      {/* 2. Scroll-Driven Interactive Stage Experience */}
      <InteractiveMethodology />

      {/* 3. Advisory Intake CTA */}
      <MethodologyCta />
    </div>
  );
}
