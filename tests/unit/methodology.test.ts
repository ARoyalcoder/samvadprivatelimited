import { describe, it, expect } from "vitest";
import {
  METHODOLOGY_STAGES,
  MethodologyStageSchema,
} from "../../apps/web/lib/methodology-data";
import { MethodologyNetworkCanvas } from "../../apps/web/components/methodology/methodology-network-canvas";
import { InteractiveMethodology } from "../../apps/web/components/methodology/interactive-methodology";

describe("SAMVAD 6-Stage Core Methodology Architecture", () => {
  const expectedStages = [
    { num: "01", name: "LISTEN" },
    { num: "02", name: "ANALYZE" },
    { num: "03", name: "STRATEGIZE" },
    { num: "04", name: "ENGAGE" },
    { num: "05", name: "AMPLIFY" },
    { num: "06", name: "MEASURE" },
  ];

  it("should contain all 6 methodology stages in exact order", () => {
    expect(METHODOLOGY_STAGES).toHaveLength(6);
    METHODOLOGY_STAGES.forEach((stage, idx) => {
      expect(stage.num).toBe(expectedStages[idx]?.num);
      expect(stage.name).toBe(expectedStages[idx]?.name);
    });
  });

  it("should validate all 6 stages against MethodologyStageSchema", () => {
    METHODOLOGY_STAGES.forEach((stage) => {
      const res = MethodologyStageSchema.safeParse(stage);
      expect(res.success).toBe(true);
    });
  });

  it("should ensure every stage includes title, explanation, activities, outputs, and telemetry", () => {
    METHODOLOGY_STAGES.forEach((stage) => {
      expect(stage.title.length).toBeGreaterThan(5);
      expect(stage.explanation.length).toBeGreaterThan(50);
      expect(stage.activities.length).toBeGreaterThanOrEqual(4);
      expect(stage.outputs.length).toBeGreaterThanOrEqual(3);
      expect(stage.telemetry.status).toBeTruthy();
      expect(stage.quote.length).toBeGreaterThan(20);
    });
  });

  it("should export MethodologyNetworkCanvas and InteractiveMethodology components", () => {
    expect(typeof MethodologyNetworkCanvas).toBe("function");
    expect(typeof InteractiveMethodology).toBe("function");
  });
});
