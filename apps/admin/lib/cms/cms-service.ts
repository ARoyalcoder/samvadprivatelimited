import { AuthRole, hasPermission } from "@samvad/auth";
import { adminAuthService } from "../auth/auth-service";
import {
  CmsEntity,
  CmsEntityType,
  CmsLifecycleStatus,
} from "@samvad/types";

export interface CmsMutationActor {
  id: string;
  email: string;
  role: AuthRole;
}

export interface CmsEntityInput {
  id?: string;
  entityType: CmsEntityType;
  title: string;
  slug: string;
  status: CmsLifecycleStatus;
  author: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  featuredImage?: string | null;
  metadata?: Record<string, unknown> | null;
  publishedAt?: string | Date | null;
}

export interface CmsMutationResult {
  success: boolean;
  data?: CmsEntity;
  error?: string;
}

class CmsService {
  // In-memory collection supporting all 8 entity types
  private entities: Map<string, CmsEntity> = new Map();

  constructor() {
    this.seedDefaultEntities();
  }

  /**
   * Seed comprehensive baseline entities across all 8 required content types
   */
  public seedDefaultEntities(): void {
    this.entities.clear();
    const now = new Date();

    const initialSeed: CmsEntity[] = [
      // 1. PAGES
      {
        id: "page_home",
        entityType: "PAGES",
        title: "SAMVAD Perception Advisory - Sovereign & Boardroom Command",
        slug: "/",
        status: "PUBLISHED",
        author: "Devavrat Mukherjee",
        seoTitle: "Strategic Communications & Perception Advisory | SAMVAD",
        seoDescription: "Confidential reputation architecture, sovereign narrative defense, and crisis communications advisory for enterprise leadership.",
        featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
        metadata: { template: "homepage", priority: 1.0 },
        createdAt: new Date(now.getTime() - 90 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 2 * 86400 * 1000).toISOString(),
        publishedAt: new Date(now.getTime() - 90 * 86400 * 1000).toISOString(),
      },
      {
        id: "page_about",
        entityType: "PAGES",
        title: "About SAMVAD - Institutional Heritage & Advisory Philosophy",
        slug: "about",
        status: "PUBLISHED",
        author: "Priyanka Sen",
        seoTitle: "About SAMVAD | Strategic Perception Advisory & Doctrine",
        seoDescription: "Founded on the doctrine of cognitive asymmetry and discreet boardroom intervention, SAMVAD counsels sovereign and commercial entities.",
        featuredImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
        metadata: { template: "editorial", priority: 0.8 },
        createdAt: new Date(now.getTime() - 85 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 5 * 86400 * 1000).toISOString(),
        publishedAt: new Date(now.getTime() - 85 * 86400 * 1000).toISOString(),
      },
      {
        id: "page_methodology",
        entityType: "PAGES",
        title: "Six-Stage Perception Intervention Methodology",
        slug: "methodology",
        status: "PUBLISHED",
        author: "Aaditya Singhania",
        seoTitle: "The Six-Stage Methodology | SAMVAD Strategic Architecture",
        seoDescription: "Listen, Analyze, Strategize, Engage, Amplify, Measure. The rigorous mathematical and cognitive framework governing our mandates.",
        featuredImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
        metadata: { stagesCount: 6, interactive: true },
        createdAt: new Date(now.getTime() - 80 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 10 * 86400 * 1000).toISOString(),
        publishedAt: new Date(now.getTime() - 80 * 86400 * 1000).toISOString(),
      },
      {
        id: "page_contact",
        entityType: "PAGES",
        title: "Confidential Advisory Contact & Inquiry Dispatch",
        slug: "contact",
        status: "PUBLISHED",
        author: "Practice Directorate",
        seoTitle: "Initiate Advisory Mandate | Confidential Contact | SAMVAD",
        seoDescription: "Direct, encrypted communications link to the SAMVAD Managing Directorate for urgent perception and sovereign inquiries.",
        featuredImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
        metadata: { encrypted: true, slaHours: 2 },
        createdAt: new Date(now.getTime() - 75 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 3 * 86400 * 1000).toISOString(),
        publishedAt: new Date(now.getTime() - 75 * 86400 * 1000).toISOString(),
      },

      // 2. SERVICES
      {
        id: "svc_strategic_comm",
        entityType: "SERVICES",
        title: "Strategic Communications & Sovereign Positioning",
        slug: "strategic-communications",
        status: "PUBLISHED",
        author: "Devavrat Mukherjee",
        seoTitle: "Strategic Communications Practice | SAMVAD Advisory",
        seoDescription: "High-level geopolitical and market narrative framing for sovereign states and enterprise consortia.",
        featuredImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200",
        metadata: { practiceLead: "Devavrat Mukherjee", serviceType: "STRATEGIC_COMMUNICATIONS" },
        createdAt: new Date(now.getTime() - 70 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 4 * 86400 * 1000).toISOString(),
        publishedAt: new Date(now.getTime() - 70 * 86400 * 1000).toISOString(),
      },
      {
        id: "svc_crisis_rep",
        entityType: "SERVICES",
        title: "Crisis Communications & Reputation Shield",
        slug: "crisis-reputation",
        status: "PUBLISHED",
        author: "Priyanka Sen",
        seoTitle: "Crisis Communications & Hostile Narrative Defense | SAMVAD",
        seoDescription: "Rapid de-escalation of regulatory, financial, and adversarial media assaults.",
        featuredImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200",
        metadata: { practiceLead: "Priyanka Sen", serviceType: "CRISIS_REPUTATION" },
        createdAt: new Date(now.getTime() - 65 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 7 * 86400 * 1000).toISOString(),
        publishedAt: new Date(now.getTime() - 65 * 86400 * 1000).toISOString(),
      },
      {
        id: "svc_narrative_arch",
        entityType: "SERVICES",
        title: "Narrative Architecture & Cognitive Arbitrage",
        slug: "narrative-architecture",
        status: "REVIEW",
        author: "Vikramaditya Verma",
        seoTitle: "Narrative Architecture Practice | SAMVAD Advisory",
        seoDescription: "Constructing persistent stakeholder consensus frameworks across contested jurisdictions.",
        featuredImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
        metadata: { practiceLead: "Vikramaditya Verma", serviceType: "NARRATIVE_ARCHITECTURE" },
        createdAt: new Date(now.getTime() - 15 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 1 * 86400 * 1000).toISOString(),
        publishedAt: null,
      },

      // 3. INDUSTRIES
      {
        id: "ind_defense",
        entityType: "INDUSTRIES",
        title: "Defense, Aerospace & Sovereign Security",
        slug: "defense-aerospace",
        status: "PUBLISHED",
        author: "Devavrat Mukherjee",
        seoTitle: "Defense & Aerospace Strategic Advisory | SAMVAD",
        seoDescription: "Perception strategy and parliamentary consensus building for defense procurement programs.",
        featuredImage: "https://images.unsplash.com/photo-1517976487583-0570f7724227?q=80&w=1200",
        metadata: { sector: "DEFENSE_AEROSPACE", marketCapTier: "$10B+" },
        createdAt: new Date(now.getTime() - 60 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 6 * 86400 * 1000).toISOString(),
        publishedAt: new Date(now.getTime() - 60 * 86400 * 1000).toISOString(),
      },
      {
        id: "ind_fintech",
        entityType: "INDUSTRIES",
        title: "FinTech, Banking & Sovereign Wealth (BFSI)",
        slug: "fintech-bfsi",
        status: "PUBLISHED",
        author: "Aaditya Singhania",
        seoTitle: "FinTech & Banking Reputation Advisory | SAMVAD",
        seoDescription: "Cross-border regulatory alignment, hostile short-seller defense, and institutional investor confidence.",
        featuredImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200",
        metadata: { sector: "FINTECH_BFSI", marketCapTier: "$5B+" },
        createdAt: new Date(now.getTime() - 55 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 8 * 86400 * 1000).toISOString(),
        publishedAt: new Date(now.getTime() - 55 * 86400 * 1000).toISOString(),
      },
      {
        id: "ind_energy",
        entityType: "INDUSTRIES",
        title: "Energy Transition, Infrastructure & Resources",
        slug: "energy-infrastructure",
        status: "REVIEW",
        author: "Shreya Nair",
        seoTitle: "Energy Transition Stakeholder Communications | SAMVAD",
        seoDescription: "Community arbitration and regulatory policy framing for continental utility networks.",
        featuredImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200",
        metadata: { sector: "ENERGY_INFRASTRUCTURE", marketCapTier: "$20B+" },
        createdAt: new Date(now.getTime() - 20 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 2 * 86400 * 1000).toISOString(),
        publishedAt: null,
      },

      // 4. CASE STUDIES
      {
        id: "cs_fintech_deescalation",
        entityType: "CASE_STUDIES",
        title: "De-escalating Cross-Border Sovereign Scrutiny for a $4B FinTech Conglomerate",
        slug: "fintech-sovereign-deescalation",
        status: "PUBLISHED",
        author: "Strategic Advisory Practice",
        seoTitle: "FinTech Sovereign De-escalation Case Study | SAMVAD",
        seoDescription: "How SAMVAD neutralized cross-border regulatory scrutiny and prevented license revocation across 3 Asian jurisdictions.",
        featuredImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200",
        metadata: { clientSector: "FINTECH_BFSI", isFeatured: true, anonymized: true },
        createdAt: new Date(now.getTime() - 45 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 12 * 86400 * 1000).toISOString(),
        publishedAt: new Date(now.getTime() - 45 * 86400 * 1000).toISOString(),
      },
      {
        id: "cs_defense_offset",
        entityType: "CASE_STUDIES",
        title: "Architecting a Sovereign Capability Offset Narrative for Defense Consortium",
        slug: "defense-sovereign-capability-offset",
        status: "PUBLISHED",
        author: "Defense & Strategic Practice",
        seoTitle: "Defense Consortium Sovereign Offset Case Study | SAMVAD",
        seoDescription: "Aligning domestic parliamentary stakeholders and national industry bodies behind a $6.2B defense procurement accord.",
        featuredImage: "https://images.unsplash.com/photo-1517976487583-0570f7724227?q=80&w=1200",
        metadata: { clientSector: "DEFENSE_AEROSPACE", isFeatured: true, anonymized: true },
        createdAt: new Date(now.getTime() - 40 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 15 * 86400 * 1000).toISOString(),
        publishedAt: new Date(now.getTime() - 40 * 86400 * 1000).toISOString(),
      },
      {
        id: "cs_algorithmic_defamation",
        entityType: "CASE_STUDIES",
        title: "Neutralizing an Algorithmic Defamation Assault Targeting Enterprise SaaS",
        slug: "algorithmic-defamation-neutralization",
        status: "DRAFT",
        author: "Vikramaditya Verma",
        seoTitle: "Algorithmic Defamation Response Case Study | SAMVAD",
        seoDescription: "Counter-narrative orchestration against coordinated bot swarms and fraudulent whistleblower dispatches.",
        featuredImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200",
        metadata: { clientSector: "ENTERPRISE_TECH", isFeatured: false, anonymized: true },
        createdAt: new Date(now.getTime() - 10 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 1 * 86400 * 1000).toISOString(),
        publishedAt: null,
      },

      // 5. INSIGHTS
      {
        id: "ins_death_reactive_pr",
        entityType: "INSIGHTS",
        title: "The Death of Reactive PR: Cognitive Asymmetry in Modern Crisis",
        slug: "death-of-reactive-pr",
        status: "PUBLISHED",
        author: "Devavrat Mukherjee",
        seoTitle: "The Death of Reactive PR | SAMVAD Insights",
        seoDescription: "Why 20th-century press release rebuttals accelerate enterprise reputational collapse in algorithmic information ecosystems.",
        featuredImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
        metadata: { readTimeMinutes: 7, category: "THOUGHT_LEADERSHIP", citations: 18 },
        createdAt: new Date(now.getTime() - 30 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 3 * 86400 * 1000).toISOString(),
        publishedAt: new Date(now.getTime() - 30 * 86400 * 1000).toISOString(),
      },
      {
        id: "ins_algorithmic_asymmetry",
        entityType: "INSIGHTS",
        title: "Algorithmic Perception Defense: Countering Coordinated Market Narratives",
        slug: "algorithmic-asymmetry",
        status: "PUBLISHED",
        author: "Aaditya Singhania",
        seoTitle: "Algorithmic Perception Defense | SAMVAD Insights",
        seoDescription: "Mathematical frameworks to diagnose and neutralize coordinated information operations targeting publicly listed equity.",
        featuredImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200",
        metadata: { readTimeMinutes: 9, category: "MARKET_ANALYSIS", citations: 12 },
        createdAt: new Date(now.getTime() - 25 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 8 * 86400 * 1000).toISOString(),
        publishedAt: new Date(now.getTime() - 25 * 86400 * 1000).toISOString(),
      },
      {
        id: "ins_boardroom_crisis_playbook",
        entityType: "INSIGHTS",
        title: "Boardroom Crisis Playbook: The First 48 Hours of Hostile Disclosure",
        slug: "boardroom-crisis-playbook",
        status: "REVIEW",
        author: "Priyanka Sen",
        seoTitle: "Boardroom Crisis Playbook (First 48 Hours) | SAMVAD",
        seoDescription: "The empirical operational protocol executed by managing directors when confronting hostile adversarial leaks.",
        featuredImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
        metadata: { readTimeMinutes: 6, category: "CRISIS_CASEBOOK" },
        createdAt: new Date(now.getTime() - 5 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 1 * 86400 * 1000).toISOString(),
        publishedAt: null,
      },
      {
        id: "ins_sovereign_debt_perception",
        entityType: "INSIGHTS",
        title: "Sovereign Debt Restructuring: Public Perception and Geopolitical Realpolitik",
        slug: "sovereign-debt-perception",
        status: "DRAFT",
        author: "Vikramaditya Verma",
        seoTitle: "Sovereign Debt Perception Strategy | SAMVAD",
        seoDescription: "Balancing bondholder expectations and domestic electorate stability in restructuring negotiations.",
        featuredImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200",
        metadata: { readTimeMinutes: 11, category: "POLICY_BRIEF" },
        createdAt: new Date(now.getTime() - 3 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 3 * 86400 * 1000).toISOString(),
        publishedAt: null,
      },

      // 6. NEWSROOM
      {
        id: "news_singapore_expansion",
        entityType: "NEWSROOM",
        title: "SAMVAD Perception Advisory Establishes Southeast Asia Office in Singapore",
        slug: "samvad-singapore-office-expansion",
        status: "PUBLISHED",
        author: "Executive Press Desk",
        seoTitle: "SAMVAD Expands to Singapore | Southeast Asia Advisory",
        seoDescription: "Establishment of regional headquarters at Marina Bay Financial Centre to counsel Asian sovereign funds and conglomerate boards.",
        featuredImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200",
        metadata: { category: "PRESS_RELEASE", mediaContact: "press@samvadadvisory.com" },
        createdAt: new Date(now.getTime() - 20 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 10 * 86400 * 1000).toISOString(),
        publishedAt: new Date(now.getTime() - 20 * 86400 * 1000).toISOString(),
      },
      {
        id: "news_sovereign_index_2026",
        entityType: "NEWSROOM",
        title: "Release of the Sovereign Perception Index 2026: Benchmark of Asian Enterprises",
        slug: "sovereign-perception-index-2026",
        status: "PUBLISHED",
        author: "Research Directorate",
        seoTitle: "Sovereign Perception Index 2026 Released | SAMVAD",
        seoDescription: "Annual quantitative survey of 250 enterprise leadership boards across India, Singapore, and the United Kingdom.",
        featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
        metadata: { category: "MARKET_REPORT", pdfUrl: "/downloads/index-2026.pdf" },
        createdAt: new Date(now.getTime() - 15 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 5 * 86400 * 1000).toISOString(),
        publishedAt: new Date(now.getTime() - 15 * 86400 * 1000).toISOString(),
      },
      {
        id: "news_jurist_appointment",
        entityType: "NEWSROOM",
        title: "SAMVAD Appoints Former Appellate Jurist as Senior Defense Counsel",
        slug: "appellate-jurist-crisis-defense-appointment",
        status: "ARCHIVED",
        author: "Executive Press Desk",
        seoTitle: "Senior Appellate Jurist Joins SAMVAD Defense Practice",
        seoDescription: "Former High Court judge joins the strategic reputation practice to guide cross-border litigation communications.",
        featuredImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200",
        metadata: { category: "EXECUTIVE_APPOINTMENT", archivedReason: "Contract concluded" },
        createdAt: new Date(now.getTime() - 50 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 30 * 86400 * 1000).toISOString(),
        publishedAt: new Date(now.getTime() - 50 * 86400 * 1000).toISOString(),
      },

      // 7. LEADERSHIP
      {
        id: "lead_devavrat",
        entityType: "LEADERSHIP",
        title: "Devavrat Mukherjee - Managing Principal & Founder",
        slug: "devavrat-mukherjee",
        status: "PUBLISHED",
        author: "Managing Directorate",
        seoTitle: "Devavrat Mukherjee | Managing Principal | SAMVAD",
        seoDescription: "Over two decades counseling prime ministerial offices, sovereign wealth trusts, and Fortune 100 chairpersons.",
        featuredImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200",
        metadata: { designation: "Managing Principal", roleCategory: "Practice Leadership", orderIndex: 1 },
        createdAt: new Date(now.getTime() - 90 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 10 * 86400 * 1000).toISOString(),
        publishedAt: new Date(now.getTime() - 90 * 86400 * 1000).toISOString(),
      },
      {
        id: "lead_aaditya",
        entityType: "LEADERSHIP",
        title: "Aaditya Singhania - Partner, Perception Intelligence",
        slug: "aaditya-singhania",
        status: "PUBLISHED",
        author: "Managing Directorate",
        seoTitle: "Aaditya Singhania | Partner, Perception Telemetry | SAMVAD",
        seoDescription: "Pioneer in algorithmic narrative tracking, sentiment graph modeling, and adversarial information deconstruction.",
        featuredImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200",
        metadata: { designation: "Partner, Perception Intelligence", roleCategory: "Practice Leadership", orderIndex: 2 },
        createdAt: new Date(now.getTime() - 85 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 12 * 86400 * 1000).toISOString(),
        publishedAt: new Date(now.getTime() - 85 * 86400 * 1000).toISOString(),
      },
      {
        id: "lead_priyanka",
        entityType: "LEADERSHIP",
        title: "Priyanka Sen - Partner, Crisis Communications & Litigation Defense",
        slug: "priyanka-sen",
        status: "PUBLISHED",
        author: "Managing Directorate",
        seoTitle: "Priyanka Sen | Partner, Crisis & Reputation Shield | SAMVAD",
        seoDescription: "Specialist in high-velocity boardroom arbitrations, hostile disclosure de-escalation, and media gagging orders.",
        featuredImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200",
        metadata: { designation: "Partner, Crisis Communications", roleCategory: "Practice Leadership", orderIndex: 3 },
        createdAt: new Date(now.getTime() - 80 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 15 * 86400 * 1000).toISOString(),
        publishedAt: new Date(now.getTime() - 80 * 86400 * 1000).toISOString(),
      },

      // 8. MEDIA
      {
        id: "med_sovereign_index_pdf",
        entityType: "MEDIA",
        title: "Sovereign Perception Index 2026 Executive Summary Document",
        slug: "sovereign-index-2026-pdf",
        status: "PUBLISHED",
        author: "Research Desk",
        seoTitle: "Sovereign Perception Index 2026 PDF Asset",
        seoDescription: "Complete unredacted publication benchmark report with cross-sector rankings.",
        featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400",
        metadata: { mediaType: "PDF", fileSizeBytes: 4404019, cdnUrl: "https://cdn.samvadadvisory.com/assets/sovereign-index-2026.pdf" },
        createdAt: new Date(now.getTime() - 18 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 4 * 86400 * 1000).toISOString(),
        publishedAt: new Date(now.getTime() - 18 * 86400 * 1000).toISOString(),
      },
      {
        id: "med_singapore_loft_img",
        entityType: "MEDIA",
        title: "Singapore Advisory Loft Architectural Visual",
        slug: "singapore-loft-editorial",
        status: "PUBLISHED",
        author: "Media Directorate",
        seoTitle: "Singapore Advisory Loft Press Asset",
        seoDescription: "High-resolution architectural photography of the Marina Bay headquarters.",
        featuredImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200",
        metadata: { mediaType: "IMAGE", fileSizeBytes: 1887436, dimensions: "2400x1350" },
        createdAt: new Date(now.getTime() - 19 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 5 * 86400 * 1000).toISOString(),
        publishedAt: new Date(now.getTime() - 19 * 86400 * 1000).toISOString(),
      },
      {
        id: "med_crisis_infographic",
        entityType: "MEDIA",
        title: "Crisis Intervention Flowchart Vector Asset",
        slug: "crisis-intervention-vector",
        status: "REVIEW",
        author: "Design Desk",
        seoTitle: "Crisis Intervention Flowchart Graphic",
        seoDescription: "Visual protocol diagram for boardroom crisis mobilization.",
        featuredImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600",
        metadata: { mediaType: "IMAGE", fileSizeBytes: 860160, dimensions: "1920x1080" },
        createdAt: new Date(now.getTime() - 2 * 86400 * 1000).toISOString(),
        updatedAt: new Date(now.getTime() - 1 * 86400 * 1000).toISOString(),
        publishedAt: null,
      },
    ];

    for (const e of initialSeed) {
      this.entities.set(e.id, e);
    }
  }

  /**
   * Enforce Role Authorization for Content Mutations
   */
  public verifyMutationAuthorization(
    actorRole: AuthRole,
    action: "CREATE" | "EDIT" | "PUBLISH" | "ARCHIVE" | "DELETE"
  ): { allowed: boolean; reason?: string } {
    // ANALYST is strictly read-only
    if (actorRole === "ANALYST") {
      return { allowed: false, reason: "ANALYST role has strictly read-only intelligence access." };
    }

    if (action === "CREATE" || action === "EDIT") {
      // AUTHOR, EDITOR, CONTENT_ADMIN, SUPER_ADMIN can create and edit
      const canDraft =
        hasPermission(actorRole, "content:create") || hasPermission(actorRole, "content:draft");
      if (!canDraft) {
        return { allowed: false, reason: `Role ${actorRole} does not have content drafting authority.` };
      }
      return { allowed: true };
    }

    if (action === "PUBLISH") {
      // Only EDITOR, CONTENT_ADMIN, and SUPER_ADMIN can publish
      const canPublish = hasPermission(actorRole, "content:publish");
      if (!canPublish) {
        return {
          allowed: false,
          reason: `Role ${actorRole} cannot publish content directly. Submit for REVIEW instead.`,
        };
      }
      return { allowed: true };
    }

    if (action === "ARCHIVE" || action === "DELETE") {
      // Only CONTENT_ADMIN and SUPER_ADMIN can delete / archive
      const canDelete =
        actorRole === "SUPER_ADMIN" ||
        actorRole === "CONTENT_ADMIN" ||
        hasPermission(actorRole, "content:delete");
      if (!canDelete) {
        return {
          allowed: false,
          reason: `Role ${actorRole} lacks content retraction and deletion privilege.`,
        };
      }
      return { allowed: true };
    }

    return { allowed: true };
  }

  /**
   * Retrieve entities with type, status, and query filtering
   */
  public async getEntities(filters?: {
    entityType?: CmsEntityType | "ALL";
    status?: CmsLifecycleStatus | "ALL";
    search?: string;
  }): Promise<CmsEntity[]> {
    const { entityType = "ALL", status = "ALL", search = "" } = filters || {};

    let list = Array.from(this.entities.values());

    if (entityType !== "ALL") {
      list = list.filter((e) => e.entityType === entityType);
    }

    if (status !== "ALL") {
      list = list.filter((e) => e.status === status);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.slug.toLowerCase().includes(q) ||
          e.author.toLowerCase().includes(q) ||
          (e.seoTitle && e.seoTitle.toLowerCase().includes(q))
      );
    }

    // Sort by updatedAt descending
    return list.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  /**
   * Retrieve single entity by ID
   */
  public async getEntityById(id: string): Promise<CmsEntity | null> {
    return this.entities.get(id) || null;
  }

  /**
   * Create new content entity with strict authorization
   */
  public async createEntity(
    input: CmsEntityInput,
    actor: CmsMutationActor
  ): Promise<CmsMutationResult> {
    // 1. Authorize action
    const requiredAction = input.status === "PUBLISHED" ? "PUBLISH" : "CREATE";
    const authCheck = this.verifyMutationAuthorization(actor.role, requiredAction);
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.reason };
    }

    const now = new Date();
    const id = input.id || `cms_${input.entityType.toLowerCase()}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    const entity: CmsEntity = {
      id,
      entityType: input.entityType,
      title: input.title,
      slug: input.slug,
      status: input.status,
      author: input.author || actor.email.split("@")[0] || "Author",
      seoTitle: input.seoTitle || input.title,
      seoDescription: input.seoDescription || null,
      featuredImage: input.featuredImage || null,
      metadata: input.metadata || {},
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      publishedAt: input.status === "PUBLISHED" ? now.toISOString() : null,
    };

    this.entities.set(id, entity);

    // Audit log
    await adminAuthService.recordAuditLog({
      userId: actor.id,
      action: "CMS_ENTITY_CREATED",
      entityType: entity.entityType,
      entityId: entity.id,
      metadata: { title: entity.title, status: entity.status, author: entity.author },
    });

    return { success: true, data: entity };
  }

  /**
   * Update existing content entity
   */
  public async updateEntity(
    id: string,
    updates: Partial<CmsEntityInput>,
    actor: CmsMutationActor
  ): Promise<CmsMutationResult> {
    const existing = this.entities.get(id);
    if (!existing) {
      return { success: false, error: `Entity "${id}" was not located.` };
    }

    // Determine target action
    let requiredAction: "EDIT" | "PUBLISH" | "ARCHIVE" = "EDIT";
    if (updates.status === "PUBLISHED" && existing.status !== "PUBLISHED") {
      requiredAction = "PUBLISH";
    } else if (updates.status === "ARCHIVED" && existing.status !== "ARCHIVED") {
      requiredAction = "ARCHIVE";
    }

    const authCheck = this.verifyMutationAuthorization(actor.role, requiredAction);
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.reason };
    }

    const now = new Date();
    const targetStatus = updates.status || existing.status;

    const updatedEntity: CmsEntity = {
      ...existing,
      ...updates,
      id: existing.id,
      entityType: existing.entityType,
      status: targetStatus,
      updatedAt: now.toISOString(),
      publishedAt:
        targetStatus === "PUBLISHED"
          ? existing.publishedAt || now.toISOString()
          : targetStatus === "DRAFT" || targetStatus === "REVIEW"
          ? null
          : existing.publishedAt,
    };

    this.entities.set(id, updatedEntity);

    // Audit log
    await adminAuthService.recordAuditLog({
      userId: actor.id,
      action: "CMS_ENTITY_UPDATED",
      entityType: updatedEntity.entityType,
      entityId: updatedEntity.id,
      metadata: {
        title: updatedEntity.title,
        previousStatus: existing.status,
        newStatus: updatedEntity.status,
      },
    });

    return { success: true, data: updatedEntity };
  }

  /**
   * Transition content lifecycle status: DRAFT -> REVIEW -> PUBLISHED -> ARCHIVED
   */
  public async transitionStatus(
    id: string,
    targetStatus: CmsLifecycleStatus,
    actor: CmsMutationActor
  ): Promise<CmsMutationResult> {
    const existing = this.entities.get(id);
    if (!existing) {
      return { success: false, error: `Entity "${id}" was not located.` };
    }

    let requiredAction: "EDIT" | "PUBLISH" | "ARCHIVE" = "EDIT";
    if (targetStatus === "PUBLISHED") {
      requiredAction = "PUBLISH";
    } else if (targetStatus === "ARCHIVED") {
      requiredAction = "ARCHIVE";
    }

    const authCheck = this.verifyMutationAuthorization(actor.role, requiredAction);
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.reason };
    }

    const now = new Date();
    const previousStatus = existing.status;
    existing.status = targetStatus;
    existing.updatedAt = now.toISOString();
    if (targetStatus === "PUBLISHED" && !existing.publishedAt) {
      existing.publishedAt = now.toISOString();
    } else if (targetStatus === "DRAFT" || targetStatus === "REVIEW") {
      existing.publishedAt = null;
    }

    this.entities.set(id, existing);

    await adminAuthService.recordAuditLog({
      userId: actor.id,
      action: "CMS_STATUS_TRANSITIONED",
      entityType: existing.entityType,
      entityId: existing.id,
      metadata: { targetStatus, previousStatus },
    });

    return { success: true, data: existing };
  }

  /**
   * Delete or permanently archive entity
   */
  public async deleteEntity(
    id: string,
    actor: CmsMutationActor
  ): Promise<{ success: boolean; error?: string }> {
    const existing = this.entities.get(id);
    if (!existing) {
      return { success: false, error: `Entity "${id}" was not located.` };
    }

    const authCheck = this.verifyMutationAuthorization(actor.role, "DELETE");
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.reason };
    }

    this.entities.delete(id);

    await adminAuthService.recordAuditLog({
      userId: actor.id,
      action: "CMS_ENTITY_DELETED",
      entityType: existing.entityType,
      entityId: existing.id,
      metadata: { title: existing.title },
    });

    return { success: true };
  }
}

export const cmsService = new CmsService();
