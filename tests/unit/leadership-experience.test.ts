import { describe, it, expect } from "vitest";
import {
  LEADERSHIP_PROFILES,
  getAllLeadershipProfiles,
  getLeadershipProfileBySlug,
  getAllLeadershipSlugs,
  getFeaturedLeadershipProfiles,
  getLeadershipProfilesByCategory,
  getAdjacentLeadershipProfiles,
} from "../../apps/web/lib/leadership-data";
import {
  leadershipProfileSchema,
  leadershipExperienceItemSchema,
} from "@samvad/validation";

describe("SAMVAD Leadership & Advisory Bench Architecture", () => {
  it("should contain at least 5 leadership practice profiles in the CMS dataset", () => {
    expect(LEADERSHIP_PROFILES.length).toBeGreaterThanOrEqual(5);
  });

  it("should strictly validate all leadership profiles against leadershipProfileSchema", () => {
    LEADERSHIP_PROFILES.forEach((profile) => {
      const result = leadershipProfileSchema.safeParse(profile);
      expect(result.success).toBe(true);
    });
  });

  it("should enforce all 7 required profile fields on every profile", () => {
    LEADERSHIP_PROFILES.forEach((profile) => {
      // 1. Photo
      expect(profile.photoUrl).toBeTruthy();
      expect(profile.photoUrl).toMatch(/^\/images\//);
      expect(profile.photoAlt).toBeTruthy();
      expect(profile.photoAlt.length).toBeGreaterThanOrEqual(10);

      // 2. Name
      expect(profile.name).toBeTruthy();
      expect(profile.name.length).toBeGreaterThanOrEqual(2);

      // 3. Designation
      expect(profile.designation).toBeTruthy();
      expect(profile.designation.length).toBeGreaterThanOrEqual(3);

      // 4. Biography
      expect(profile.biography).toBeTruthy();
      expect(profile.biography.length).toBeGreaterThanOrEqual(30);

      // 5. Expertise
      expect(profile.expertise).toBeInstanceOf(Array);
      expect(profile.expertise.length).toBeGreaterThanOrEqual(3);
      profile.expertise.forEach((exp) => {
        expect(exp.length).toBeGreaterThanOrEqual(2);
      });

      // 6. Experience
      expect(profile.experience).toBeInstanceOf(Array);
      expect(profile.experience.length).toBeGreaterThanOrEqual(2);
      profile.experience.forEach((item) => {
        const expResult = leadershipExperienceItemSchema.safeParse(item);
        expect(expResult.success).toBe(true);
        expect(item.title).toBeTruthy();
        expect(item.organization).toBeTruthy();
      });

      // 7. Areas of focus
      expect(profile.areasOfFocus).toBeInstanceOf(Array);
      expect(profile.areasOfFocus.length).toBeGreaterThanOrEqual(3);
      profile.areasOfFocus.forEach((focus) => {
        expect(focus.length).toBeGreaterThanOrEqual(2);
      });
    });
  });

  it("should strictly enforce non-fabrication constraints across all profiles", () => {
    LEADERSHIP_PROFILES.forEach((profile) => {
      // 1. Every profile must be marked as placeholder
      expect(profile.isPlaceholder).toBe(true);

      // 2. Name must clearly feature bracketed placeholder designation
      expect(profile.name).toMatch(/^\[.+\]$/);
      expect(profile.statusBadge).toContain("[CMS Placeholder]");

      // 3. Biography must state non-fabrication / confidentiality clearance or approval notice
      expect(profile.biography).toMatch(/\[.*(clearance|approval|placeholder|protocol).*\]/i);
    });
  });

  it("should retrieve a profile by valid slug and return undefined for invalid slug", () => {
    const firstSlug = LEADERSHIP_PROFILES[0]!.slug;
    const found = getLeadershipProfileBySlug(firstSlug);
    expect(found).toBeDefined();
    expect(found?.slug).toBe(firstSlug);
    expect(found?.designation).toBe(LEADERSHIP_PROFILES[0]!.designation);

    const missing = getLeadershipProfileBySlug("non-existent-leadership-slug");
    expect(missing).toBeUndefined();
  });

  it("should generate all slugs for static site generation", () => {
    const slugs = getAllLeadershipSlugs();
    expect(slugs.length).toBe(LEADERSHIP_PROFILES.length);
    slugs.forEach((slug) => {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    });
  });

  it("should return sorted profiles via getAllLeadershipProfiles()", () => {
    const profiles = getAllLeadershipProfiles();
    for (let i = 0; i < profiles.length - 1; i++) {
      expect(profiles[i]!.orderIndex).toBeLessThanOrEqual(
        profiles[i + 1]!.orderIndex
      );
    }
  });

  it("should filter profiles by role category", () => {
    const execProfiles = getLeadershipProfilesByCategory("Executive Leadership");
    expect(execProfiles.length).toBeGreaterThanOrEqual(1);
    expect(
      execProfiles.every((p) => p.roleCategory === "Executive Leadership")
    ).toBe(true);

    const practiceProfiles = getLeadershipProfilesByCategory("Practice Leadership");
    expect(practiceProfiles.length).toBeGreaterThanOrEqual(1);
    expect(
      practiceProfiles.every((p) => p.roleCategory === "Practice Leadership")
    ).toBe(true);
  });

  it("should compute adjacent dossiers for editorial navigation", () => {
    const firstSlug = LEADERSHIP_PROFILES[0]!.slug;
    const firstAdjacent = getAdjacentLeadershipProfiles(firstSlug);
    expect(firstAdjacent.prev).toBeNull();
    expect(firstAdjacent.next).not.toBeNull();
    expect(firstAdjacent.next?.slug).toBe(LEADERSHIP_PROFILES[1]!.slug);

    const lastSlug = LEADERSHIP_PROFILES[LEADERSHIP_PROFILES.length - 1]!.slug;
    const lastAdjacent = getAdjacentLeadershipProfiles(lastSlug);
    expect(lastAdjacent.next).toBeNull();
    expect(lastAdjacent.prev).not.toBeNull();
  });
});
