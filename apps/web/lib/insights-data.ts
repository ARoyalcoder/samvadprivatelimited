import { z } from "zod";

/**
 * Author Schema
 */
export const AuthorSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  affiliation: z.string(),
  bio: z.string(),
  avatarAssetId: z.string().optional(),
});

export type Author = z.infer<typeof AuthorSchema>;

/**
 * Content Section Schema for Editorial Articles
 */
export const CalloutSchema = z.object({
  quote: z.string(),
  attribution: z.string().optional(),
});

export const ContentSectionSchema = z.object({
  heading: z.string(),
  subheading: z.string().optional(),
  paragraphs: z.array(z.string()),
  callout: CalloutSchema.optional(),
  keyTakeaways: z.array(z.string()).optional(),
});

export type ContentSection = z.infer<typeof ContentSectionSchema>;

/**
 * Master Insight Article Schema
 */
export const InsightArticleSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  excerpt: z.string(),
  category: z.string(),
  categorySlug: z.string(),
  tags: z.array(z.string()),
  coverAssetId: z.string(),
  coverCaption: z.string(),
  author: AuthorSchema,
  publishedAt: z.string(), // ISO date "2026-09-18"
  publishedDisplay: z.string(), // "September 18, 2026"
  readingTimeMinutes: z.number().int().positive(),
  isFeatured: z.boolean().default(false),
  badge: z.string().optional(),
  sections: z.array(ContentSectionSchema),
  relatedSlugs: z.array(z.string()),
  seo: z.object({
    metaTitle: z.string(),
    metaDescription: z.string(),
    keywords: z.array(z.string()),
  }),
});

export type InsightArticle = z.infer<typeof InsightArticleSchema>;

/**
 * Core Senior Editorial Authors
 */
export const AUTHORS: Record<string, Author> = {
  "vikramaditya-sharma": {
    id: "vikramaditya-sharma",
    name: "Vikramaditya Sharma",
    role: "Senior Managing Principal",
    affiliation: "SAMVAD Perception Advisory",
    bio: "Advises sovereign governments, sovereign wealth funds, and institutional boards on perception physics, cross-border M&A sentiment, and legislative statecraft across the Indo-Pacific corridor.",
  },
  "intelligence-telemetry-unit": {
    id: "intelligence-telemetry-unit",
    name: "SAMVAD Intelligence & Telemetry Unit",
    role: "Proprietary Research & Disinformation Forensics",
    affiliation: "SAMVAD Perception Advisory",
    bio: "Multidisciplinary analytical division combining computational linguistic auditing, adversarial search topology tracking, and synthetic narrative defense.",
  },
  "sovereign-defense-practice": {
    id: "sovereign-defense-practice",
    name: "Sovereign Defense Practice Group",
    role: "Crisis Architecture & In-Camera Governance",
    affiliation: "SAMVAD Perception Advisory",
    bio: "Specialized advisory team executing urgent parliamentary hearing preparation, regulatory de-escalation, and hostile proxy defense.",
  },
  "ananya-deshmukh": {
    id: "ananya-deshmukh",
    name: "Dr. Ananya Deshmukh",
    role: "Principal, Public Policy & Infrastructure",
    affiliation: "SAMVAD Perception Advisory",
    bio: "Former regulatory policy researcher advising Fortune 100 industrial operators on ministerial consensus, civic accord formulation, and ecological alignment.",
  },
};

/**
 * Master Editorial Publication Catalog
 */
export const INSIGHTS_ARTICLES: InsightArticle[] = [
  {
    id: "death-of-reactive-pr",
    slug: "death-of-reactive-pr",
    title: "The Death of Reactive PR: Why Sovereign Brands Need Perception Architecture",
    subtitle:
      "Why 20th-century press releases fail against algorithmic discourse distortion, and how proactive narrative physics construct an unassailable corporate moat.",
    excerpt:
      "In modern economic corridors, corporate reputation is no longer contested in the column inches of morning papers. It is negotiated across algorithmic feeds, institutional sentiment trackers, and real-time regulatory sentiment shifts. Organizations that rely on reactive public relations are structurally obsolete.",
    category: "Strategic Doctrine",
    categorySlug: "strategic-doctrine",
    tags: [
      "Perception Architecture",
      "Strategic Communications",
      "Corporate Sovereignty",
      "Board Governance",
      "Media Dynamics",
    ],
    coverAssetId: "leadership-skyline-silhouette",
    coverCaption:
      "Strategic horizons: Modern enterprise leadership requires predictive perception architecture rather than retrospective damage control.",
    author: AUTHORS["vikramaditya-sharma"]!,
    publishedAt: "2026-09-22",
    publishedDisplay: "September 22, 2026",
    readingTimeMinutes: 9,
    isFeatured: true,
    badge: "Flagship Monograph",
    sections: [
      {
        heading: "The Structural Collapse of the Broadcast Press Release",
        subheading: "When distribution velocity outpaces editorial fact-checking",
        paragraphs: [
          "For nearly a century, the primary defensive weapon of the corporate communications director was the embargoed press release. When a crisis hit, communications teams drafted three paragraphs of carefully vetted corporate boilerplate, cleared it with outside legal counsel, and disseminated it across major wire services.",
          "That model is definitively dead. In the current media landscape, adversarial campaigns do not wait for editorial news cycles. Coordinated disinformation vectors seed panic directly into algorithmic search engines, institutional messaging groups, and algorithmic scrapers within minutes. By the time a corporate statement is cleared, the narrative moat has already been breached.",
          "What has replaced public relations is not louder marketing—it is perception architecture. Perception architecture treats public trust as a dynamic physical system governed by verifiable vectors of authority, forensic attribution, and deliberate stakeholder alignment.",
        ],
        callout: {
          quote:
            "Perception is not an accidental byproduct of business operations; it is the strategic terrain upon which valuation, regulatory permission, and market sovereignty are won or forfeited.",
          attribution: "Vikramaditya Sharma, Managing Principal",
        },
        keyTakeaways: [
          "Traditional reactive PR responds to symptoms after narrative consensus has already codified against the organization.",
          "Modern capital markets and regulators react to algorithmic sentiment telemetry before official corporate communications are published.",
          "Perception architecture operates proactively, constructing durable factual and institutional moats 60 to 90 days ahead of market exposure.",
        ],
      },
      {
        heading: "The Four Vectors of Narrative Physics",
        subheading: "Constructing resilience across high-stakes corridors",
        paragraphs: [
          "To construct durable narrative architecture, organizations must manage four fundamental vectors simultaneously: Empirical Verification, Institutional Channeling, Algorithmic Topology, and In-Camera Alignment.",
          "First, Empirical Verification demands that every strategic claim is backed by audit-grade evidentiary dossiers. Rhetorical assertions collapse under hostile regulatory scrutiny; certified independent data models endure.",
          "Second, Institutional Channeling bypasses sensationalist public noise to deliver unvarnished briefing packets directly to parliamentary commissioners, credit rating analysts, and sovereign decision-makers.",
          "Third, Algorithmic Topology actively remediates the automated graphs, vector embeddings, and search snippets that feed modern financial AI terminals. When algorithms query an organization's status, the response must reflect empirical reality rather than coordinated adversary distortions.",
          "Fourth, In-Camera Alignment ensures that the executive suite, legal team, and governing board speak with absolute, unshakeable coherence during crisis cross-examination.",
        ],
      },
      {
        heading: "Institutional Sovereignty in an Era of Weaponized Friction",
        paragraphs: [
          "Ultimately, the goal of perception architecture is not popularity—it is institutional sovereignty. Sovereignty is the freedom to execute long-term strategic investments, finalize multi-billion dollar mergers, and navigate regulatory audits without being held hostage to algorithmic volatility or competitor-funded smear campaigns.",
          "Organizations that invest in perception architecture do not scramble when crises occur. They activate predetermined countermeasure playbooks, present verifiable audit dossiers, and maintain complete narrative equilibrium under the most hostile scrutiny.",
        ],
        keyTakeaways: [
          "Evidentiary credibility outlasts adversarial spin across multi-year regulatory investigations.",
          "Boardrooms must integrate perception risk directly into their enterprise risk management (ERM) frameworks.",
        ],
      },
    ],
    relatedSlugs: [
      "algorithmic-asymmetry",
      "boardroom-crisis-playbook",
      "ma-perception-genesis",
    ],
    seo: {
      metaTitle:
        "The Death of Reactive PR: Why Sovereign Brands Need Perception Architecture | SAMVAD Insights",
      metaDescription:
        "Why traditional press releases fail against algorithmic discourse distortion and how perception architecture builds enduring institutional sovereignty.",
      keywords: [
        "Perception Architecture",
        "Strategic Communications",
        "Crisis Management",
        "Corporate Reputation",
        "Board Governance",
      ],
    },
  },
  {
    id: "algorithmic-asymmetry",
    slug: "algorithmic-asymmetry",
    title: "Algorithmic Asymmetry: How Disinformation Weaponizes Search Indexing & LLM Graphs",
    subtitle:
      "An empirical analysis of how coordinated activist short-sellers manipulate automated knowledge graphs, search snippets, and AI summaries to trigger market panics.",
    excerpt:
      "Coordinated short-seller cartels and adversarial actors no longer rely on traditional media leaks to erode enterprise valuations. By manipulating search engine knowledge graphs, indexing loops, and generative AI embeddings, they can wipe out hundreds of millions in market capitalization before trading halts can be called.",
    category: "Perception Intelligence",
    categorySlug: "perception-intelligence",
    tags: [
      "Algorithmic Defense",
      "Short Seller Defense",
      "Search Engine Forensics",
      "Artificial Intelligence",
      "Capital Markets",
    ],
    coverAssetId: "tech-datacenter-optical-core",
    coverCaption:
      "Data core telemetry: Algorithmic search graphs and generative AI embeddings are now active vectors of corporate warfare.",
    author: AUTHORS["intelligence-telemetry-unit"]!,
    publishedAt: "2026-09-14",
    publishedDisplay: "September 14, 2026",
    readingTimeMinutes: 12,
    isFeatured: false,
    badge: "Empirical Study",
    sections: [
      {
        heading: "The Mechanics of Algorithmic Bear Raids",
        subheading: "Exploiting automated authority scoring in modern financial networks",
        paragraphs: [
          "In financial markets governed by high-frequency trading algorithms and automated sentiment scraping, information verification has been largely automated. Algorithmic indexers continuously parse thousands of digital sources to update entity knowledge graphs and news sentiment scores.",
          "Adversarial actors have recognized this vulnerability. By deploying coordinated bot networks and synthetic blog farms, an attacker can create an artificial consensus that triggers high-authority search indexers to update knowledge graphs with defamatory allegations—such as accounting irregularities, executive departures, or pending indictments.",
          "When trading algorithms scrape these freshly updated entity graphs, automated sell orders execute instantly. Within three hours, a company's market capitalization can drop 20% to 30%, while search engine results and AI chatbot summaries codify the false narrative as accepted truth.",
        ],
        callout: {
          quote:
            "A lie can complete three automated trading cycles around the globe before exchange compliance officers have even drafted a holding statement.",
          attribution: "SAMVAD Intelligence & Telemetry Unit",
        },
        keyTakeaways: [
          "Adversarial short-sellers weaponize knowledge graph indexing latency against publicly traded companies.",
          "Standard denial press releases do not alter algorithmic entity graphs or purge synthetic AI hallucinations.",
          "Defending against algorithmic attacks requires technical remediation protocols operating directly on entity schema networks.",
        ],
      },
      {
        heading: "Forensic Attribution and Rapid Remediation Protocols",
        subheading: "Neutralizing weaponized search indices within 72 hours",
        paragraphs: [
          "Traditional public relations firms respond to bear raids by attempting to pitch friendly stories to financial journalists. This approach fails because automated search snippets continue to display defamatory summaries at the top of search queries.",
          "SAMVAD's proprietary algorithmic defense protocol executes a three-phase countermeasure: First, forensic attribution isolates the synthetic origins and botnet amplification of the short dossier, providing indisputable evidence of market manipulation to exchange regulators and prosecutors.",
          "Second, verified high-authority evidentiary schema networks are deployed to directly update search engine entity indices, overriding hallucinations with certified balance sheet audits.",
          "Third, institutional investor direct-counsel protocols ensure that the top 40 institutional shareholders receive confidential verification packets before they are forced to liquidate positions.",
        ],
      },
      {
        heading: "Immunizing Enterprise Digital Infrastructure",
        paragraphs: [
          "Organizations must treat their algorithmic search presence with the same security rigor as their cybersecurity infrastructure. Continuous sentiment telemetry, automated knowledge-graph monitoring, and pre-indexed evidentiary repositories are essential defenses in an era of asymmetric corporate warfare.",
        ],
        keyTakeaways: [
          "Continuous entity monitoring detects synthetic smear campaigns in early indexing stages before market trading opens.",
          "Pre-established evidentiary repositories allow instant deployment of verified corporate documentation.",
        ],
      },
    ],
    relatedSlugs: [
      "death-of-reactive-pr",
      "boardroom-crisis-playbook",
      "ma-perception-genesis",
    ],
    seo: {
      metaTitle:
        "Algorithmic Asymmetry: How Disinformation Weaponizes Search Indexing | SAMVAD Insights",
      metaDescription:
        "Empirical analysis on how coordinated short-sellers manipulate automated knowledge graphs, search snippets, and AI summaries to trigger market panics.",
      keywords: [
        "Algorithmic Defense",
        "Disinformation Forensics",
        "Short Seller Defense",
        "Search Knowledge Graph",
        "Market Capitalization",
      ],
    },
  },
  {
    id: "boardroom-crisis-playbook",
    slug: "boardroom-crisis-playbook",
    title: "Crisis in the Boardroom: Ten Operational Rules for Hostile Activist Incursions",
    subtitle:
      "A tactical executive handbook for defending enterprise sovereignty during contested proxy fights, regulatory leak traps, and smear campaigns.",
    excerpt:
      "When a hostile activist fund or predatory competitor launches an offensive against an established board, the boardroom becomes an operational theater. The outcome is rarely determined by legal briefs alone; it is dictated by who controls the narrative topology across institutional shareholders, regulators, and tier-1 financial correspondents.",
    category: "Crisis Architecture",
    categorySlug: "crisis-architecture",
    tags: [
      "Board Governance",
      "Proxy Defense",
      "Activist Incursions",
      "Crisis Architecture",
      "Shareholder Diplomacy",
    ],
    coverAssetId: "reputation-crisis-monitoring",
    coverCaption:
      "Crisis operations center: Real-time sentiment mapping and disciplined command protocols during hostile proxy confrontations.",
    author: AUTHORS["sovereign-defense-practice"]!,
    publishedAt: "2026-08-30",
    publishedDisplay: "August 30, 2026",
    readingTimeMinutes: 11,
    isFeatured: false,
    badge: "Executive Briefing",
    sections: [
      {
        heading: "The Anatomy of a Modern Hostile Offensive",
        subheading: "Why corporate boards consistently miscalculate activist timing",
        paragraphs: [
          "Most corporate boards assume that a hostile proxy challenge begins when a formal regulatory filing or 13D declaration arrives. In reality, the activist has typically spent five to eight months executing covert perception conditioning.",
          "During this preparation phase, the activist leaks strategic whispering points to financial columnists, commissions unvetted governance critiques, and tests negative theses with key institutional asset managers. By the time the formal announcement arrives, the board is already defending itself against a pre-conditioned consensus.",
          "Winning a hostile incursion requires breaking the attacker's cadence. Boards that panic and adopt aggressive, combative tones alienate conservative institutional investors. Boards that remain silent appear culpable. The only effective posture is disciplined, empirical authority.",
        ],
        callout: {
          quote:
            "In a boardroom proxy war, whoever controls the definition of 'value creation' controls the shareholder vote.",
          attribution: "Sovereign Defense Practice Group",
        },
        keyTakeaways: [
          "Hostile incursions are narrative campaigns disguised as governance critiques.",
          "Early whisper campaigns must be countered before formal proxy declarations are filed.",
          "Combative PR statements destroy institutional investor confidence; empirical economic models preserve it.",
        ],
      },
      {
        heading: "The Ten Operational Imperatives",
        subheading: "Protocol discipline under extreme scrutiny",
        paragraphs: [
          "Rule 01: Establish an Air-Gapped Crisis Executive Committee. Decisions cannot wait for monthly board schedules; a dedicated 5-person committee must hold operational authority.",
          "Rule 02: Impose Absolute Communication Discipline. Unauthorized off-the-record briefings by directors are catastrophic. All interactions must funnel through a centralized command desk.",
          "Rule 03: Separate the Facts from the Framing. Never accept the activist's terminology. Reframe the discussion from short-term financial engineering to long-term sovereign competitive advantage.",
          "Rule 04: Directly Engage the Top 30 Institutional Index Holders. Do not rely on proxy advisory firms (ISS/Glass Lewis) alone. Conduct direct, analytical bilateral briefings with portfolio managers.",
          "Rule 05: Anticipate the Secondary Leak Trap. Activists frequently hold back secondary allegations to deploy immediately after a company's initial response. Reserve evidentiary ammunition for the counter-attack.",
        ],
      },
      {
        heading: "Preserving Value Past the Proxy Vote",
        paragraphs: [
          "Winning the vote is only half the battle. If a company wins the proxy contest but emerges with a damaged executive leadership team or demoralized key talent, the defense has failed. A disciplined crisis architecture safeguards the firm's long-term reputation throughout the confrontation.",
        ],
        keyTakeaways: [
          "Plan the post-crisis reconciliation narrative on day one of the contest.",
          "Institutional investors respect boards that demonstrate composure, analytical rigor, and unwavering fiduciary focus.",
        ],
      },
    ],
    relatedSlugs: [
      "death-of-reactive-pr",
      "algorithmic-asymmetry",
      "sovereign-statecraft-infrastructure",
    ],
    seo: {
      metaTitle:
        "Crisis in the Boardroom: Ten Operational Rules for Hostile Activist Incursions | SAMVAD Insights",
      metaDescription:
        "Executive handbook for defending enterprise sovereignty during contested proxy fights, regulatory leak traps, and smear campaigns.",
      keywords: [
        "Board Governance",
        "Hostile Takeover Defense",
        "Proxy Fight",
        "Shareholder Activism",
        "Crisis Communications",
      ],
    },
  },
  {
    id: "sovereign-statecraft-infrastructure",
    slug: "sovereign-statecraft-infrastructure",
    title: "Sovereign Statecraft: Reframing National Infrastructure in Polarized Political Corridors",
    subtitle:
      "Resolving multi-stakeholder civil litigation and securing ministerial consensus for multi-billion-dollar clean energy and transit corridors.",
    excerpt:
      "Capital expenditure is meaningless without social and political license to operate. In contemporary democracies, landmark infrastructure projects frequently stall not because of engineering flaws or financing deficits, but because of narrative gridlock and community friction.",
    category: "Sovereign Statecraft",
    categorySlug: "sovereign-statecraft",
    tags: [
      "Infrastructure",
      "Public Policy",
      "Civic Accord",
      "Environmental Governance",
      "Statecraft",
    ],
    coverAssetId: "infra-highspeed-viaduct",
    coverCaption:
      "Arterial connectivity: Infrastructure projects require civic consensus, transparent ecological pacts, and legislative alignment.",
    author: AUTHORS["ananya-deshmukh"]!,
    publishedAt: "2026-08-12",
    publishedDisplay: "August 12, 2026",
    readingTimeMinutes: 10,
    isFeatured: false,
    badge: "Policy Whitepaper",
    sections: [
      {
        heading: "The Myth of Technical Inevitability",
        subheading: "Why superior engineering fails to overcome local opposition",
        paragraphs: [
          "Engineers and infrastructure financiers often operate under the assumption that if a project is economically sound and technically superior, political approval will follow naturally. This assumption has cost global operators tens of billions of dollars in halted projects and frozen capital.",
          "Modern mega-projects—whether high-voltage transmission lines, offshore wind grids, or high-speed rail viaducts—cross dozens of municipal, cultural, and political boundaries. In the absence of an inspiring, locally resonant narrative, local anxieties are inevitably weaponized by opportunistic political actors and litigious groups.",
          "To move an infrastructure project from contentious blueprint to operational reality requires sovereign statecraft: aligning regional economic aspirations, transparent ecological mitigation pacts, and bipartisan legislative sponsors.",
        ],
        callout: {
          quote:
            "You cannot build physical steel and concrete until you have poured the foundation of civic trust and shared economic destiny.",
          attribution: "Dr. Ananya Deshmukh, Principal",
        },
        keyTakeaways: [
          "Infrastructure projects must be framed around regional economic resilience, not corporate shareholder returns.",
          "Early civic dialogue prevents weaponized grassroots litigation that stalls permitting for years.",
          "Ecological mitigation must be verifiable, transparent, and co-designed with community representatives.",
        ],
      },
      {
        heading: "Constructing the Civic Accord Framework",
        subheading: "From transactional compensation to enduring partnership",
        paragraphs: [
          "Traditional public affairs approaches rely on one-off financial compensation or token corporate social responsibility (CSR) initiatives. Communities quickly recognize these as patronizing attempts to buy silence.",
          "The SAMVAD Civic Accord Framework replaces transactional handouts with long-term institutional alignment. This includes legally binding community benefit trusts, permanent environmental monitoring councils staffed by local university scientists, and localized supply-chain procurement quotas.",
          "When local communities become genuine stakeholders in the project's success, adversarial lawsuits are voluntarily withdrawn, and municipal permits advance smoothly through regulatory reviews.",
        ],
      },
      {
        heading: "Securing Ministerial and Bipartisan Consensus",
        paragraphs: [
          "National infrastructure operates across multiple political election cycles. A project that relies solely on the patronage of an incumbent minister is vulnerable to cancellation if political control flips. Durable infrastructure statecraft ensures that economic whitepapers demonstrate clear value to all major political factions.",
        ],
        keyTakeaways: [
          "Bipartisan consensus is achieved by highlighting energy security, indigenous high-skill jobs, and industrial modernization.",
          "Documented community consent is the single most powerful shield against judicial permitting appeals.",
        ],
      },
    ],
    relatedSlugs: [
      "death-of-reactive-pr",
      "boardroom-crisis-playbook",
      "ma-perception-genesis",
    ],
    seo: {
      metaTitle:
        "Sovereign Statecraft: Reframing National Infrastructure | SAMVAD Insights",
      metaDescription:
        "Resolving multi-stakeholder civil litigation and securing ministerial consensus for multi-billion-dollar clean energy and transit corridors.",
      keywords: [
        "Infrastructure Communications",
        "Public Policy",
        "Civic Accord",
        "Permitting Diplomacy",
        "Energy Transition",
      ],
    },
  },
  {
    id: "ma-perception-genesis",
    slug: "ma-perception-genesis",
    title: "The M&A Perception Genesis: Why Enterprise Valuations Erode in Cross-Border Regulatory Reviews",
    subtitle:
      "Managing regulatory scrutiny, parliamentary skepticism, and public discourse during mega-mergers and sovereign capital integration.",
    excerpt:
      "Over 40% of contested cross-border corporate mergers fail to close or suffer catastrophic valuation haircuts not due to antitrust legalities, but because the acquirer failed to control the political and cultural narrative in the target nation's capital.",
    category: "Capital Markets & M&A",
    categorySlug: "capital-markets",
    tags: [
      "M&A Genesis",
      "Cross-Border Transactions",
      "Regulatory Approval",
      "Valuation Preservation",
      "Sovereign Diplomacy",
    ],
    coverAssetId: "finance-atrium-architecture",
    coverCaption:
      "Capital markets gallery: Landmark M&A transactions demand rigorous narrative alignment across sovereign regulators and investors.",
    author: AUTHORS["vikramaditya-sharma"]!,
    publishedAt: "2026-07-28",
    publishedDisplay: "July 28, 2026",
    readingTimeMinutes: 8,
    isFeatured: false,
    badge: "M&A Advisory Monograph",
    sections: [
      {
        heading: "The Political Dimension of Cross-Border Capital",
        subheading: "When an acquisition ceases to be commercial and becomes geopolitical",
        paragraphs: [
          "In an increasingly nationalistic and protectionist global economy, large-scale acquisitions are inherently political acts. When an international consortium attempts to acquire a strategic domestic asset—whether in telecommunications, defense, semiconductors, or financial infrastructure—domestic competitors immediately mobilize political opposition.",
          "Competitors do not fight the transaction in the marketplace; they fight it in parliamentary hearing rooms and financial media columns, painting the acquirer as a foreign threat to sovereign security, data localization, or domestic employment.",
          "If the acquirer treats the transaction solely as a financial and legal filing exercise, they walk directly into a public relations ambush. By the time regulatory commissioners hold hearings, political sentiment has already codified against the deal.",
        ],
        callout: {
          quote:
            "You cannot negotiate a multi-billion dollar acquisition with a spreadsheet when your competitors are negotiating with national security sentiment.",
          attribution: "Vikramaditya Sharma, Managing Principal",
        },
        keyTakeaways: [
          "Cross-border M&A transactions face intense political scrutiny long before regulatory deadlines.",
          "Competitor-funded opposition lobbies exploit national sovereignty anxieties to block approvals.",
          "Acquirers must articulate a proactive Sovereign Partnership narrative months prior to deal announcement.",
        ],
      },
      {
        heading: "The Transaction Valuation Preservation Protocol",
        subheading: "Protecting enterprise value throughout multi-month review windows",
        paragraphs: [
          "Every month a mega-transaction is delayed by regulatory inquiries erodes enterprise valuation through customer churn, talent departures, and market uncertainty. Protecting valuation requires a coordinated Perception Genesis protocol.",
          "This protocol involves authoring comprehensive economic capability whitepapers demonstrating long-term domestic capital reinvestment, establishing verified commitments to domestic research and development centers, and conducting in-camera briefings with key parliamentary committees.",
          "When regulators and legislative leaders see that the transaction strengthens rather than compromises national economic resilience, regulatory approvals are granted unanimously without structural concessions or discounted valuations.",
        ],
      },
    ],
    relatedSlugs: [
      "death-of-reactive-pr",
      "algorithmic-asymmetry",
      "sovereign-statecraft-infrastructure",
    ],
    seo: {
      metaTitle:
        "The M&A Perception Genesis: Why Enterprise Valuations Erode | SAMVAD Insights",
      metaDescription:
        "Managing regulatory scrutiny, parliamentary skepticism, and public discourse during mega-mergers and sovereign capital integration.",
      keywords: [
        "M&A Strategic Communications",
        "Regulatory Clearance",
        "Cross-Border M&A",
        "Valuation Preservation",
        "Capital Markets",
      ],
    },
  },
];

/**
 * Accessor Functions & Helpers
 */
export function getAllArticles(): InsightArticle[] {
  return INSIGHTS_ARTICLES;
}

export function getFeaturedArticle(): InsightArticle {
  const featured = INSIGHTS_ARTICLES.find((a) => a.isFeatured);
  return featured ?? INSIGHTS_ARTICLES[0]!;
}

export function getArticleBySlug(slug: string): InsightArticle | undefined {
  return INSIGHTS_ARTICLES.find((a) => a.slug === slug);
}

export function getAllArticleSlugs(): { slug: string }[] {
  return INSIGHTS_ARTICLES.map((a) => ({ slug: a.slug }));
}

export function getRelatedArticles(
  currentSlug: string,
  limit = 3
): InsightArticle[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return INSIGHTS_ARTICLES.slice(0, limit);

  // First pick explicitly defined related slugs
  const explicit = INSIGHTS_ARTICLES.filter((a) =>
    current.relatedSlugs.includes(a.slug)
  );

  // If not enough, fill with same category or tags
  if (explicit.length < limit) {
    const fallback = INSIGHTS_ARTICLES.filter(
      (a) =>
        a.slug !== currentSlug &&
        !explicit.some((e) => e.slug === a.slug) &&
        (a.categorySlug === current.categorySlug ||
          a.tags.some((t) => current.tags.includes(t)))
    );
    return [...explicit, ...fallback].slice(0, limit);
  }

  return explicit.slice(0, limit);
}

export function getAllCategories(): {
  label: string;
  slug: string;
  count: number;
}[] {
  const map = new Map<string, { label: string; count: number }>();

  INSIGHTS_ARTICLES.forEach((a) => {
    const existing = map.get(a.categorySlug);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(a.categorySlug, { label: a.category, count: 1 });
    }
  });

  return Array.from(map.entries()).map(([slug, { label, count }]) => ({
    label,
    slug,
    count,
  }));
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  INSIGHTS_ARTICLES.forEach((a) => {
    a.tags.forEach((t) => set.add(t));
  });
  return Array.from(set).sort();
}
