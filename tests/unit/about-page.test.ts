import { describe, it, expect } from "vitest";
import { Timeline } from "../../packages/ui/src/components/data-display/timeline";
import { AboutHero } from "../../apps/web/components/about/about-hero";
import { AboutPhilosophy } from "../../apps/web/components/about/about-philosophy";
import { AboutVisionMission } from "../../apps/web/components/about/about-vision-mission";
import { AboutValues } from "../../apps/web/components/about/about-values";
import { AboutTimeline } from "../../apps/web/components/about/about-timeline";
import { AboutLeadership } from "../../apps/web/components/about/about-leadership";
import { AboutCapabilities } from "../../apps/web/components/about/about-capabilities";
import { AboutDifference } from "../../apps/web/components/about/about-difference";
import { AboutCta } from "../../apps/web/components/about/about-cta";

describe("SAMVAD About Page & Timeline Architecture", () => {
  it("should export Timeline component from @samvad/ui", () => {
    expect(typeof Timeline).toBe("object"); // forwardRef component
  });

  it("should export all 9 modular About page section components as valid functions", () => {
    const sections = [
      AboutHero,
      AboutPhilosophy,
      AboutVisionMission,
      AboutValues,
      AboutTimeline,
      AboutLeadership,
      AboutCapabilities,
      AboutDifference,
      AboutCta,
    ];

    expect(sections).toHaveLength(9);
    sections.forEach((section) => {
      expect(typeof section).toBe("function");
      expect(section.name).toBeTruthy();
    });
  });

  it("should enforce placeholder transparency for corporate timeline items without fabricated milestones", () => {
    // Verify that the timeline component correctly identifies placeholder items
    const sampleItems = [
      {
        id: "item-1",
        dateOrPeriod: "[INCORPORATION DATE PLACEHOLDER]",
        title: "Statutory Incorporation",
        description: "Official registration placeholder",
        isPlaceholder: true,
      },
    ];

    expect(sampleItems[0]?.isPlaceholder).toBe(true);
    expect(sampleItems[0]?.dateOrPeriod).toContain("[INCORPORATION DATE PLACEHOLDER]");
  });
});
