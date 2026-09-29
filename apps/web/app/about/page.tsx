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
  title: "Who We Are | SAMVAD Perception Advisory",
  description:
    "Institutional perception advisory, strategic communications, and crisis architecture. Rooted in the doctrine that perception is shaped by every conversation.",
};

export default function AboutPage() {
  return (
    <div className="flex w-full flex-col overflow-hidden bg-obsidian-950 text-sand-100">
      {/* 1. Hero: WHO WE ARE & Company Introduction */}
      <AboutHero />

      {/* 2. Our Philosophy: Perception is shaped by every conversation */}
      <AboutPhilosophy />

      {/* 3. Vision & Mission */}
      <AboutVisionMission />

      {/* 4. Core Values */}
      <AboutValues />

      {/* 5. Company History Timeline (Statutory & Milestone Placeholders) */}
      <AboutTimeline />

      {/* 6. Leadership & Advisory Bench (Role Placeholders) */}
      <AboutLeadership />

      {/* 7. Practice Capabilities & Depth */}
      <AboutCapabilities />

      {/* 8. Our Difference (Comparative Advantage) */}
      <AboutDifference />

      {/* 9. Strategic Call to Action */}
      <AboutCta />
    </div>
  );
}
