import { describe, it, expect } from "vitest";
import { GLOBAL_NAV_DATA } from "../../packages/ui/src/components/navigation/nav-data";

describe("SAMVAD Global Navigation System", () => {
  it("should contain all required desktop navigation links", () => {
    const requiredLabels = [
      "About",
      "Services",
      "Industries",
      "Work",
      "Insights",
      "Newsroom",
    ];

    const actualLabels = GLOBAL_NAV_DATA.mainLinks.map((item) => item.label);
    expect(actualLabels).toEqual(requiredLabels);
  });

  it("should have mega menus enabled for Services and Industries", () => {
    const servicesLink = GLOBAL_NAV_DATA.mainLinks.find(
      (item) => item.label === "Services"
    );
    expect(servicesLink).toBeDefined();
    expect(servicesLink?.hasMegaMenu).toBe(true);
    expect(servicesLink?.megaMenuType).toBe("services");

    const industriesLink = GLOBAL_NAV_DATA.mainLinks.find(
      (item) => item.label === "Industries"
    );
    expect(industriesLink).toBeDefined();
    expect(industriesLink?.hasMegaMenu).toBe(true);
    expect(industriesLink?.megaMenuType).toBe("industries");
  });

  it("should provide rich data for all 6 Services in the mega menu", () => {
    expect(GLOBAL_NAV_DATA.services).toHaveLength(6);

    GLOBAL_NAV_DATA.services.forEach((service) => {
      expect(service.id).toBeTruthy();
      expect(service.title).toBeTruthy();
      expect(service.eyebrow).toBeTruthy();
      expect(service.description.length).toBeGreaterThan(20);
      expect(service.href).toBeTruthy();
      expect(service.accent).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(service.iconName).toBeTruthy();
    });
  });

  it("should provide rich data for all 6 Industry sectors in the mega menu", () => {
    expect(GLOBAL_NAV_DATA.industries).toHaveLength(6);

    GLOBAL_NAV_DATA.industries.forEach((industry, idx) => {
      expect(industry.id).toBeTruthy();
      expect(industry.title).toBeTruthy();
      expect(industry.description.length).toBeGreaterThan(20);
      expect(industry.href).toBeTruthy();
      expect(industry.code).toBe(String(idx + 1).padStart(2, "0"));
    });
  });

  it("should provide featured showcase dossiers for both mega menus", () => {
    expect(GLOBAL_NAV_DATA.featuredService.title).toBeTruthy();
    expect(GLOBAL_NAV_DATA.featuredService.metric).toBe("$1.8B");
    expect(GLOBAL_NAV_DATA.featuredService.cta).toBeTruthy();

    expect(GLOBAL_NAV_DATA.featuredIndustry.title).toBeTruthy();
    expect(GLOBAL_NAV_DATA.featuredIndustry.metric).toBe("$40B+");
    expect(GLOBAL_NAV_DATA.featuredIndustry.cta).toBeTruthy();
  });

  it("should include quick system links to Brand, Tokens, and Assets", () => {
    const systemLabels = GLOBAL_NAV_DATA.systemLinks.map((s) => s.label);
    expect(systemLabels).toContain("Brand Identity");
    expect(systemLabels).toContain("Design System");
    expect(systemLabels).toContain("Asset System");
  });
});
