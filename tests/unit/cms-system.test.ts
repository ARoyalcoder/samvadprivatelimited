import { describe, it, expect, beforeEach } from "vitest";
import { cmsService } from "../../apps/admin/lib/cms/cms-service";
import { adminAuthService } from "../../apps/admin/lib/auth/auth-service";
import {
  cmsEntityTypeEnum,
  cmsLifecycleStatusEnum,
  cmsEntityMutationSchema,
  cmsStatusTransitionSchema,
} from "@samvad/validation";
import { CmsEntityType, CmsLifecycleStatus, CmsEntity } from "@samvad/types";

describe("SAMVAD Advisory - Enterprise Content Management System (CMS)", () => {
  beforeEach(() => {
    cmsService.seedDefaultEntities();
    adminAuthService.resetInMemoryStore();
  });

  /* -------------------------------------------------------------------------- */
  /* 1. Validation Schemas & Type Enums                                        */
  /* -------------------------------------------------------------------------- */
  describe("1. Validation Schemas & Type Enums", () => {
    it("should strictly validate all 8 required content entity types", () => {
      const validTypes: CmsEntityType[] = [
        "PAGES",
        "SERVICES",
        "INDUSTRIES",
        "CASE_STUDIES",
        "INSIGHTS",
        "NEWSROOM",
        "LEADERSHIP",
        "MEDIA",
      ];

      for (const t of validTypes) {
        const result = cmsEntityTypeEnum.safeParse(t);
        expect(result.success).toBe(true);
      }

      // Invalid types must fail
      expect(cmsEntityTypeEnum.safeParse("BLOG_POST").success).toBe(false);
      expect(cmsEntityTypeEnum.safeParse("PRODUCTS").success).toBe(false);
      expect(cmsEntityTypeEnum.safeParse("").success).toBe(false);
    });

    it("should strictly validate all 4 required lifecycle statuses", () => {
      const validStatuses: CmsLifecycleStatus[] = [
        "DRAFT",
        "REVIEW",
        "PUBLISHED",
        "ARCHIVED",
      ];

      for (const s of validStatuses) {
        const result = cmsLifecycleStatusEnum.safeParse(s);
        expect(result.success).toBe(true);
      }

      // Invalid statuses must fail
      expect(cmsLifecycleStatusEnum.safeParse("PENDING").success).toBe(false);
      expect(cmsLifecycleStatusEnum.safeParse("DELETED").success).toBe(false);
      expect(cmsLifecycleStatusEnum.safeParse("SCHEDULED").success).toBe(false);
    });

    it("should validate and sanitize entity mutation input", () => {
      const validPayload = {
        entityType: "INSIGHTS" as const,
        title: "Perception Warfare in Cross-Border Hostile Takeovers",
        slug: "perception-warfare-hostile-takeovers",
        status: "DRAFT" as const,
        author: "Devavrat Mukherjee",
        seoTitle: "Perception Warfare & M&A Defense Advisory | SAMVAD",
        seoDescription:
          "Comprehensive doctrine on defense narrative deployment during contested corporate acquisitions.",
        featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
        metadata: { readingTimeMinutes: 8, sector: "DEFENSE_AEROSPACE" },
      };

      const result = cmsEntityMutationSchema.safeParse(validPayload);
      expect(result.success).toBe(true);

      // Must reject invalid slug format
      const invalidSlug = { ...validPayload, slug: "Invalid Slug with spaces!" };
      const slugResult = cmsEntityMutationSchema.safeParse(invalidSlug);
      expect(slugResult.success).toBe(false);

      // Must reject excessively long SEO title (> 160 chars)
      const longSeoTitle = { ...validPayload, seoTitle: "A".repeat(161) };
      const seoTitleResult = cmsEntityMutationSchema.safeParse(longSeoTitle);
      expect(seoTitleResult.success).toBe(false);

      // Must reject excessively long SEO description (> 320 chars)
      const longSeoDesc = { ...validPayload, seoDescription: "B".repeat(321) };
      const seoDescResult = cmsEntityMutationSchema.safeParse(longSeoDesc);
      expect(seoDescResult.success).toBe(false);
    });

    it("should validate status transition payloads", () => {
      const validTransition = {
        id: "page_home",
        entityType: "PAGES" as const,
        targetStatus: "REVIEW" as const,
      };

      expect(cmsStatusTransitionSchema.safeParse(validTransition).success).toBe(true);

      const invalidTransition = {
        id: "",
        entityType: "UNKNOWN",
        targetStatus: "APPROVED",
      };
      expect(cmsStatusTransitionSchema.safeParse(invalidTransition).success).toBe(false);
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 2. Standard Entity Fields & Seeding Integrity                             */
  /* -------------------------------------------------------------------------- */
  describe("2. Standard Entity Fields & Seeding Integrity across 8 Domains", () => {
    it("should pre-seed entities covering all 8 domains", async () => {
      const allEntities = await cmsService.getEntities();
      expect(allEntities.length).toBeGreaterThanOrEqual(16);

      const entityTypesFound = new Set(allEntities.map((e) => e.entityType));
      const expectedTypes: CmsEntityType[] = [
        "PAGES",
        "SERVICES",
        "INDUSTRIES",
        "CASE_STUDIES",
        "INSIGHTS",
        "NEWSROOM",
        "LEADERSHIP",
        "MEDIA",
      ];

      for (const expected of expectedTypes) {
        expect(entityTypesFound.has(expected)).toBe(true);
      }
    });

    it("should guarantee every entity contains all required standard fields", async () => {
      const allEntities = await cmsService.getEntities();

      for (const entity of allEntities) {
        // author
        expect(entity.author).toBeDefined();
        expect(typeof entity.author).toBe("string");
        expect(entity.author.trim().length).toBeGreaterThan(0);

        // createdAt & updatedAt
        expect(entity.createdAt).toBeDefined();
        expect(new Date(entity.createdAt).toString()).not.toBe("Invalid Date");
        expect(entity.updatedAt).toBeDefined();
        expect(new Date(entity.updatedAt).toString()).not.toBe("Invalid Date");

        // publishedAt (must exist if PUBLISHED, or null/undefined if DRAFT/REVIEW)
        if (entity.status === "PUBLISHED") {
          expect(entity.publishedAt).toBeDefined();
          expect(entity.publishedAt).not.toBeNull();
        }

        // SEO title & description
        expect(entity.seoTitle).toBeDefined();
        expect(typeof entity.seoTitle).toBe("string");
        expect(entity.seoDescription).toBeDefined();

        // slug
        expect(entity.slug).toBeDefined();
        expect(typeof entity.slug).toBe("string");
        expect(entity.slug.length).toBeGreaterThan(0);

        // featuredImage
        expect(entity.featuredImage).toBeDefined();

        // metadata (structured record)
        expect(entity.metadata).toBeDefined();
        expect(typeof entity.metadata).toBe("object");
      }
    });

    it("should support all 4 lifecycle states in seeded database", async () => {
      const allEntities = await cmsService.getEntities();
      const statusesFound = new Set(allEntities.map((e) => e.status));

      expect(statusesFound.has("DRAFT")).toBe(true);
      expect(statusesFound.has("REVIEW")).toBe(true);
      expect(statusesFound.has("PUBLISHED")).toBe(true);
      expect(statusesFound.has("ARCHIVED")).toBe(true);
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 3. Query, Search and Filtering Abstraction                                */
  /* -------------------------------------------------------------------------- */
  describe("3. Query, Search and Filtering Abstraction", () => {
    it("should filter entities by domain entityType", async () => {
      const pages = await cmsService.getEntities({ entityType: "PAGES" });
      expect(pages.length).toBeGreaterThan(0);
      expect(pages.every((p) => p.entityType === "PAGES")).toBe(true);

      const leadership = await cmsService.getEntities({ entityType: "LEADERSHIP" });
      expect(leadership.length).toBeGreaterThan(0);
      expect(leadership.every((l) => l.entityType === "LEADERSHIP")).toBe(true);
    });

    it("should filter entities by lifecycle status", async () => {
      const published = await cmsService.getEntities({ status: "PUBLISHED" });
      expect(published.length).toBeGreaterThan(0);
      expect(published.every((p) => p.status === "PUBLISHED")).toBe(true);

      const review = await cmsService.getEntities({ status: "REVIEW" });
      expect(review.length).toBeGreaterThan(0);
      expect(review.every((r) => r.status === "REVIEW")).toBe(true);
    });

    it("should perform case-insensitive multi-field search", async () => {
      const results = await cmsService.getEntities({ search: "Devavrat" });
      expect(results.length).toBeGreaterThan(0);
      expect(
        results.some(
          (r) =>
            r.title.includes("Devavrat") ||
            r.author.includes("Devavrat") ||
            r.slug.includes("devavrat")
        )
      ).toBe(true);
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 4. Role Authorization & Mutation Guards                                   */
  /* -------------------------------------------------------------------------- */
  describe("4. Role Authorization & Mutation Enforcement", () => {
    const superAdminActor = { id: "usr_super", email: "director@samvad.com", role: "SUPER_ADMIN" as const };
    const contentAdminActor = { id: "usr_content", email: "editor-in-chief@samvad.com", role: "CONTENT_ADMIN" as const };
    const editorActor = { id: "usr_editor", email: "desk-editor@samvad.com", role: "EDITOR" as const };
    const authorActor = { id: "usr_author", email: "staff-writer@samvad.com", role: "AUTHOR" as const };
    const analystActor = { id: "usr_analyst", email: "data-analyst@samvad.com", role: "ANALYST" as const };

    it("should strictly block ANALYST from creating, updating, or deleting content", async () => {
      const newEntityInput = {
        entityType: "SERVICES" as const,
        title: "Perception Intelligence Audit",
        slug: "perception-intelligence-audit",
        status: "DRAFT" as const,
        author: "Analyst User",
      };

      // 1. Create blocked
      const createRes = await cmsService.createEntity(newEntityInput, analystActor);
      expect(createRes.success).toBe(false);
      expect(createRes.error).toContain("ANALYST role has strictly read-only intelligence access");

      // 2. Transition blocked
      const transRes = await cmsService.transitionStatus("page_home", "DRAFT", analystActor);
      expect(transRes.success).toBe(false);
      expect(transRes.error).toContain("ANALYST role has strictly read-only intelligence access");

      // 3. Delete blocked
      const delRes = await cmsService.deleteEntity("page_home", analystActor);
      expect(delRes.success).toBe(false);
      expect(delRes.error).toContain("ANALYST role has strictly read-only intelligence access");
    });

    it("should allow AUTHOR to draft and submit for review, but prevent direct publishing or archiving", async () => {
      // Draft creation: allowed
      const draftRes = await cmsService.createEntity(
        {
          entityType: "INSIGHTS" as const,
          title: "Sovereign Bond Telemetry and Market Resonance",
          slug: "sovereign-bond-telemetry",
          status: "DRAFT" as const,
          author: "Research Fellow",
          seoTitle: "Sovereign Bond Telemetry Analysis",
          seoDescription: "An in-depth assessment of algorithmic debt perception.",
        },
        authorActor
      );

      expect(draftRes.success).toBe(true);
      expect(draftRes.data).toBeDefined();
      const entityId = draftRes.data!.id;

      // Transition to REVIEW: allowed for AUTHOR
      const reviewRes = await cmsService.transitionStatus(entityId, "REVIEW", authorActor);
      expect(reviewRes.success).toBe(true);
      expect(reviewRes.data?.status).toBe("REVIEW");

      // Transition directly to PUBLISHED: BLOCKED for AUTHOR
      const pubRes = await cmsService.transitionStatus(entityId, "PUBLISHED", authorActor);
      expect(pubRes.success).toBe(false);
      expect(pubRes.error).toContain("Submit for REVIEW instead");

      // Transition to ARCHIVED: BLOCKED for AUTHOR
      const archRes = await cmsService.transitionStatus(entityId, "ARCHIVED", authorActor);
      expect(archRes.success).toBe(false);
      expect(archRes.error).toContain("lacks content retraction");
    });

    it("should allow EDITOR to publish reviewed content, but block permanent deletion", async () => {
      const created = await cmsService.createEntity(
        {
          entityType: "NEWSROOM" as const,
          title: "SAMVAD Expands Zurich Arbitration Practice",
          slug: "zurich-arbitration-expansion",
          status: "REVIEW" as const,
          author: "Editorial Desk",
        },
        editorActor
      );

      expect(created.success).toBe(true);
      const entityId = created.data!.id;

      // Publish: allowed for EDITOR
      const pubRes = await cmsService.transitionStatus(entityId, "PUBLISHED", editorActor);
      expect(pubRes.success).toBe(true);
      expect(pubRes.data?.status).toBe("PUBLISHED");
      expect(pubRes.data?.publishedAt).toBeDefined();

      // Delete: BLOCKED for EDITOR (requires CONTENT_ADMIN or SUPER_ADMIN)
      const delRes = await cmsService.deleteEntity(entityId, editorActor);
      expect(delRes.success).toBe(false);
      expect(delRes.error).toContain("lacks content retraction and deletion privilege");
    });

    it("should grant SUPER_ADMIN and CONTENT_ADMIN full lifecycle and deletion authority", async () => {
      const created = await cmsService.createEntity(
        {
          entityType: "INDUSTRIES" as const,
          title: "Aerospace & Sovereign Defense Practice",
          slug: "aerospace-defense-practice",
          status: "DRAFT" as const,
          author: "Managing Directorate",
        },
        contentAdminActor
      );

      expect(created.success).toBe(true);
      const entityId = created.data!.id;

      // Direct Publish
      const pubRes = await cmsService.transitionStatus(entityId, "PUBLISHED", superAdminActor);
      expect(pubRes.success).toBe(true);
      expect(pubRes.data?.status).toBe("PUBLISHED");

      // Archive
      const archRes = await cmsService.transitionStatus(entityId, "ARCHIVED", contentAdminActor);
      expect(archRes.success).toBe(true);
      expect(archRes.data?.status).toBe("ARCHIVED");

      // Delete
      const delRes = await cmsService.deleteEntity(entityId, superAdminActor);
      expect(delRes.success).toBe(true);

      const notFound = await cmsService.getEntityById(entityId);
      expect(notFound).toBeNull();
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 5. Complete Lifecycle State Transitions                                   */
  /* -------------------------------------------------------------------------- */
  describe("5. Complete 4-Stage Lifecycle State Machine", () => {
    const adminActor = { id: "usr_admin", email: "admin@samvad.com", role: "CONTENT_ADMIN" as const };

    it("should correctly transition through DRAFT -> REVIEW -> PUBLISHED -> ARCHIVED", async () => {
      // 1. DRAFT
      const createRes = await cmsService.createEntity(
        {
          entityType: "CASE_STUDIES" as const,
          title: "Hostile Proxy Defense for Sovereign Port Consortium",
          slug: "hostile-proxy-defense-port-consortium",
          status: "DRAFT" as const,
          author: "Devavrat Mukherjee",
          seoTitle: "Maritime Proxy Defense Case Study | SAMVAD",
          seoDescription: "Multi-jurisdictional defense against sovereign hostile takeover.",
          metadata: { clientSector: "INFRASTRUCTURE", enterpriseValueUsd: 12000000000 },
        },
        adminActor
      );

      expect(createRes.success).toBe(true);
      const entity = createRes.data!;
      expect(entity.status).toBe("DRAFT");
      expect(entity.publishedAt).toBeNull();

      // 2. REVIEW
      const toReview = await cmsService.transitionStatus(entity.id, "REVIEW", adminActor);
      expect(toReview.success).toBe(true);
      expect(toReview.data?.status).toBe("REVIEW");
      expect(toReview.data?.publishedAt).toBeNull();

      // 3. PUBLISHED
      const toPublished = await cmsService.transitionStatus(entity.id, "PUBLISHED", adminActor);
      expect(toPublished.success).toBe(true);
      expect(toPublished.data?.status).toBe("PUBLISHED");
      expect(toPublished.data?.publishedAt).not.toBeNull();

      // 4. ARCHIVED
      const toArchived = await cmsService.transitionStatus(entity.id, "ARCHIVED", adminActor);
      expect(toArchived.success).toBe(true);
      expect(toArchived.data?.status).toBe("ARCHIVED");
      // Retains original published timestamp for archive records
      expect(toArchived.data?.publishedAt).not.toBeNull();

      // 5. Unpublish back to DRAFT clears publishedAt
      const backToDraft = await cmsService.transitionStatus(entity.id, "DRAFT", adminActor);
      expect(backToDraft.success).toBe(true);
      expect(backToDraft.data?.status).toBe("DRAFT");
      expect(backToDraft.data?.publishedAt).toBeNull();
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 6. Immutable Audit Logging on CMS Mutations                               */
  /* -------------------------------------------------------------------------- */
  describe("6. Audit Trail Logging for CMS Operations", () => {
    const adminActor = { id: "usr_chief_editor", email: "chief@samvad.com", role: "CONTENT_ADMIN" as const };

    it("should write audit log entries for creation, status transition, and deletion", async () => {
      const initialLogs = await adminAuthService.getAuditLogs(100);
      const initialCount = initialLogs.length;

      // 1. Create entity
      const created = await cmsService.createEntity(
        {
          entityType: "LEADERSHIP" as const,
          title: "Ambassador Vikramaditya Roy - Senior Diplomatic Advisor",
          slug: "ambassador-vikramaditya-roy",
          status: "DRAFT" as const,
          author: "Executive Secretariat",
        },
        adminActor
      );
      expect(created.success).toBe(true);

      // 2. Transition status
      await cmsService.transitionStatus(created.data!.id, "REVIEW", adminActor);

      // 3. Delete entity
      await cmsService.deleteEntity(created.data!.id, adminActor);

      const logsAfter = await adminAuthService.getAuditLogs(100);
      expect(logsAfter.length).toBe(initialCount + 3);

      const actions = logsAfter.slice(0, 3).map((l) => l.action);
      expect(actions).toContain("CMS_ENTITY_CREATED");
      expect(actions).toContain("CMS_STATUS_TRANSITIONED");
      expect(actions).toContain("CMS_ENTITY_DELETED");
    });
  });
});
