import * as React from "react";

import type { Metadata } from "next";

import { AboutHero } from "@/components/about/about-hero";

import { AboutPhilosophy } from "@/components/about/about-philosophy";

import { AboutVisionMission } from "@/components/about/about-vision-mission";

import { AboutValues } from "@/components/about/about-values";

import { AboutTimeline } from "@/components/about/about-timeline";

import { AboutLeadership } from "@/components/about/about-leadership";

import { AboutCapabilities } from "@/components/about/about-capabilities";

import { AboutDifference } from "@/components/about/about-difference";

import { AboutCta } from "@/components/about/about-cta";

export const metadata: Metadata = {
  title: "About | SAMVAD Perception Advisory",
  description:
    "Institutional perception, strategic communications, and crisis advisory.",
};

export default function AboutPage() {
  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#f3f0e8] text-[#1d2529]">
      {/* 1. Hero */}
      <AboutHero />

      {/* 2. Philosophy */}
      <AboutPhilosophy />

      {/* 3. Vision & Mission */}
      <AboutVisionMission />

      {/* 4. Values */}
      <AboutValues />

      {/* 5. History */}
      <AboutTimeline />

      {/* 6. Leadership */}
      <AboutLeadership />

      {/* 7. Capabilities */}
      <AboutCapabilities />

      {/* 8. Difference */}
      <AboutDifference />

      {/* 9. CTA */}
      <AboutCta />
    </div>
  );
}