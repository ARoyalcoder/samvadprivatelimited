import {
  LeadershipProfile,
  leadershipProfileSchema,
} from "@samvad/validation";

/**
 * MASTER CMS DATASET: SAMVAD LEADERSHIP & GOVERNANCE BENCH
 *
 * Strictly adheres to non-fabrication governance constraints:
 * - Executive and senior partner records are presented with explicit placeholder markers.
 * - Confirms that actual living personas are not falsely fabricated or misattributed.
 * - Provides full CMS-ready schemas for real-time editorial population upon corporate clearance.
 */
export const LEADERSHIP_PROFILES: LeadershipProfile[] = [
  {
    id: "lead-01-managing-principal",
    slug: "managing-principal-strategic-advisory",
    name: "[Executive Principal — Practice Founder]",
    designation: "Managing Principal & Practice Leader",
    roleCategory: "Executive Leadership",
    statusBadge: "Senior Practice Leader [CMS Placeholder]",
    photoUrl: "/images/leadership/skyline-silhouette.jpg",
    photoAlt:
      "Contemplative silhouette of Senior Executive Principal overlooking the commercial skyline at blue hour.",
    quote:
      "Perception is not a cosmetic veneer; it is the structural architecture through which institutional trust and market sovereignty are earned.",
    biography:
      "Directs firm-wide advisory strategy, sovereign statecraft mandates, and boardroom defense engagements across Asia and Europe. Over three decades of combined practitioner tenure, has counselled chairpersons and executive boards through multi-billion-dollar cross-border M&A transactions, contested activist proxy campaigns, and hostile geopolitical narrative exposure. [Official biographical details, academic fellowships, and sovereign advisory gazetting will be populated from corporate records upon formal public clearance in compliance with active non-disclosure covenants].",
    advisoryPractice: "Strategic Communications & Sovereign Advisory",
    primaryOffice: "New Delhi",
    contactProtocol:
      "Direct Strategic Consultation via Office of the Managing Principal",
    expertise: [
      "Sovereign Advisory & Bilateral Accords",
      "Boardroom Governance & Activist Defense",
      "Cross-Border M&A Narrative Architecture",
      "Capital Allocation Strategy Dispatches",
      "Enterprise Crisis Architecture",
    ],
    experience: [
      {
        title: "Managing Principal & Head of Practice",
        organization: "SAMVAD Perception Advisory",
        period: "2018 – Present",
        description:
          "Leads core sovereign advisory mandates, firm governance, and senior boardroom strategy councils across primary commercial and institutional sectors.",
      },
      {
        title: "Chair of Strategic Disclosures & M&A Governance",
        organization: "Cross-Border Corporate Governance Consortium",
        period: "2012 – 2018",
        description:
          "Advised multinational boards during hostile takeover maneuvers, cross-jurisdictional clearances, and contested shareholder voting assemblies.",
      },
      {
        title: "Senior Counsel — Dispute Communications",
        organization: "International Commercial Arbitration Dispatches",
        period: "2004 – 2012",
        description:
          "Formulated perception defense and stakeholder management frameworks during high-value commercial tribunal proceedings.",
      },
    ],
    areasOfFocus: [
      "Sovereign Mandates & Statecraft",
      "Hostile Takeover Defense",
      "Capital Markets Narrative",
      "Institutional Reputation Architecture",
    ],
    orderIndex: 1,
    isFeatured: true,
    isPlaceholder: true,
    relatedMonographs: [
      {
        title: "The Death of Reactive PR: Architecture for the Algorithmic Age",
        slug: "death-of-reactive-pr",
        date: "2026-09-15",
      },
      {
        title: "Boardroom Crisis Architecture: The 72-Hour War Room Playbook",
        slug: "boardroom-crisis-playbook",
        date: "2026-08-20",
      },
    ],
    relatedServices: [
      {
        title: "Strategic Communications",
        slug: "strategic-communications",
      },
      {
        title: "Reputation Management",
        slug: "reputation-management",
      },
    ],
  },
  {
    id: "lead-02-crisis-litigation",
    slug: "senior-partner-crisis-litigation",
    name: "[Senior Litigation Partner — War Room Lead]",
    designation: "Senior Partner & Head of Crisis Architecture",
    roleCategory: "Practice Leadership",
    statusBadge: "Crisis Directorate [CMS Placeholder]",
    photoUrl: "/images/corporate-communication/press-podium.jpg",
    photoAlt:
      "Acoustic timber and glass executive press podium set up in briefing auditorium under focused stage illumination.",
    quote:
      "When institutional integrity is assailed, silence is interpreted as culpability, and speculation fills the vacuum. Precision in time is precision in defense.",
    biography:
      "Leads SAMVAD's 24/7 Rapid Response Directorate and Litigation Defense practice. Specializes in real-time containment during parliamentary inquiries, whistleblower disclosures, industrial contingencies, and judicial enforcement proceedings. Has architected war-room doctrines deployed across multiple jurisdictions to neutralize asymmetric perception campaigns. [Credentials and historical defense docket details are maintained under privileged protocol and will be published upon verified corporate approval].",
    advisoryPractice: "Crisis Communications & Special Situations",
    primaryOffice: "Mumbai",
    contactProtocol:
      "24/7 Emergency Crisis Escrow via War Room Directorate",
    expertise: [
      "Hostile Activist Defense",
      "Regulatory Inquiries & Subpoena Communications",
      "Judicial Media Operations",
      "24/7 War Room Mobilization",
      "Defamation & Malicious Campaign Neutralization",
    ],
    experience: [
      {
        title: "Lead Partner — Crisis Communications & War Room Directorate",
        organization: "SAMVAD Perception Advisory",
        period: "2019 – Present",
        description:
          "Directs emergency response protocols, regulatory dispute dispatches, and judicial narrative defense during active multi-forum litigation.",
      },
      {
        title: "Regulatory Defense Counsel & Special Committee Advisor",
        organization: "Special Inquiries Defense Practice",
        period: "2013 – 2019",
        description:
          "Counselled audit committees and special independent director panels during statutory forensic audits and public regulatory scrutiny.",
      },
      {
        title: "Senior Judicial Media Strategist",
        organization: "Appellate Tribunals Media Advisory Group",
        period: "2006 – 2013",
        description:
          "Structured public disclosure statements and legal dispatches during landmark anti-trust and competition commission appeals.",
      },
    ],
    areasOfFocus: [
      "Parliamentary Inquiries & Hearings",
      "Cross-Border Sanctions & Compliance",
      "Industrial & Environmental Contingency",
      "Algorithmic Smear Mitigation",
    ],
    orderIndex: 2,
    isFeatured: true,
    isPlaceholder: true,
    relatedMonographs: [
      {
        title: "Boardroom Crisis Architecture: The 72-Hour War Room Playbook",
        slug: "boardroom-crisis-playbook",
        date: "2026-08-20",
      },
      {
        title: "Algorithmic Asymmetry: Managing Brand Perception in LLM Knowledge-Graphs",
        slug: "algorithmic-asymmetry",
        date: "2026-09-02",
      },
    ],
    relatedServices: [
      {
        title: "Crisis Communications",
        slug: "crisis-communications",
      },
      {
        title: "Reputation Management",
        slug: "reputation-management",
      },
    ],
  },
  {
    id: "lead-03-perception-telemetry",
    slug: "partner-perception-telemetry",
    name: "[Chief Intelligence Partner — Telemetry Lead]",
    designation: "Partner & Head of Perception Telemetry",
    roleCategory: "Practice Leadership",
    statusBadge: "Perception Intelligence [CMS Placeholder]",
    photoUrl: "/images/technology/datacenter-core.jpg",
    photoAlt:
      "Optical data center transmission core symbolizing high-velocity algorithmic perception modeling.",
    quote:
      "Modern narrative warfare is fought in the latent vectors of large language models and search knowledge graphs. If you cannot measure perception velocity, you cannot govern it.",
    biography:
      "Pioneers the application of quantitative computational linguistics, search graph forensics, and synthetic sentiment modeling to perception advisory. Directs SAMVAD's proprietary sentiment topology engine, which maps asymmetric narrative formation across global digital vectors 72 hours before mainstream media penetration. [Technical patents, computational research appointments, and institutional background are maintained as CMS placeholders pending official clearances].",
    advisoryPractice: "Perception Telemetry & Algorithmic Defense",
    primaryOffice: "Bengaluru",
    contactProtocol:
      "Intelligence Briefings via Perception Telemetry Operations Node",
    expertise: [
      "Quantitative Sentiment Topology",
      "LLM Knowledge Graph Audits",
      "Algorithmic Search Asymmetry Defense",
      "Predictive Crisis Velocity Modeling",
      "Real-Time Vector Forensics",
    ],
    experience: [
      {
        title: "Head of Algorithmic Defense & Perception Telemetry",
        organization: "SAMVAD Perception Advisory",
        period: "2021 – Present",
        description:
          "Oversees algorithmic perception audits, knowledge-graph entity disambiguation, and automated sentiment early-warning systems.",
      },
      {
        title: "Director of Computational Media & Information Integrity",
        organization: "Advanced Digital Forensics Institute",
        period: "2015 – 2021",
        description:
          "Engineered graph neural networks to detect coordinated inauthentic behavior and narrative manipulation across syndicated news streams.",
      },
      {
        title: "Chief Data Strategist",
        organization: "Global Financial Graph Intelligence",
        period: "2010 – 2015",
        description:
          "Built high-frequency sentiment tracking algorithms for quantitative sovereign credit and institutional fund managers.",
      },
    ],
    areasOfFocus: [
      "AI Knowledge Graph Alignment",
      "Disinformation Vector Neutralization",
      "Search Engine Entity Disambiguation",
      "Real-Time Sentiment Indexing",
    ],
    orderIndex: 3,
    isFeatured: true,
    isPlaceholder: true,
    relatedMonographs: [
      {
        title: "Algorithmic Asymmetry: Managing Brand Perception in LLM Knowledge-Graphs",
        slug: "algorithmic-asymmetry",
        date: "2026-09-02",
      },
      {
        title: "The Death of Reactive PR: Architecture for the Algorithmic Age",
        slug: "death-of-reactive-pr",
        date: "2026-09-15",
      },
    ],
    relatedServices: [
      {
        title: "Digital Communications",
        slug: "digital-communications",
      },
      {
        title: "Strategic Communications",
        slug: "strategic-communications",
      },
    ],
  },
  {
    id: "lead-04-public-affairs",
    slug: "senior-counsel-public-affairs",
    name: "[Senior Diplomatic Counsel — Sovereign Bench]",
    designation: "Senior Advisory Counsel & Head of Public Affairs",
    roleCategory: "Senior Advisory Council",
    statusBadge: "Sovereign Bench [CMS Placeholder]",
    photoUrl: "/images/business-meetings/briefing-table.jpg",
    photoAlt:
      "Documentary detail of strategic consultation table with leather portfolio, fountain pen, and crystal glass.",
    quote:
      "Policy alignment is not an exercise in lobbying; it is the craft of demonstrating how private enterprise strategy serves national sovereignty and public prosperity.",
    biography:
      "StHandlewards sovereign positioning, bilateral economic accords, and regulatory diplomacy across critical national infrastructure sectors including semiconductor manufacturing, energy transition, and defence offsets. Former senior diplomat and trade commissioner with deep jurisdictional acumen across South Asia, the GCC, and Southeast Asia. [Diplomatic postings and government credentials remain under sovereign confidentiality protocols and will be gazetted upon official authorization].",
    advisoryPractice:
      "Public Affairs, Regulatory Diplomacy & Government Relations",
    primaryOffice: "New Delhi & Singapore",
    contactProtocol:
      "Sovereign Mandates via Office of Senior Advisory Counsel",
    expertise: [
      "Parliamentary Committee Inquiries",
      "Bilateral Sovereign Accords",
      "Critical Infrastructure Permitting",
      "Foreign Direct Investment (FDI) Strategy",
      "Public-Private Defense Partnerships",
    ],
    experience: [
      {
        title: "Senior Advisory Counsel — Public Affairs & Sovereign Bench",
        organization: "SAMVAD Perception Advisory",
        period: "2017 – Present",
        description:
          "Counsels sovereign wealth funds and sovereign state departments on national strategic narratives, bilateral commercial treaties, and policy alignment.",
      },
      {
        title: "Special Advisor to Inter-Ministerial Infrastructure Harmonization Councils",
        organization: "National Infrastructure Advisory Commission",
        period: "2011 – 2017",
        description:
          "Formulated public stakeholder frameworks for high-capacity multi-modal transport and green hydrogen corridor investments.",
      },
      {
        title: "Director of Bilateral Commercial Strategy",
        organization: "Indo-Pacific Economic Corridor Secretariat",
        period: "2003 – 2011",
        description:
          "Led trade delegations and diplomatic dispatches across ASEAN and South Asian economic integration conventions.",
      },
    ],
    areasOfFocus: [
      "National Security Investment Clearances",
      "Energy Transition & Sovereign Accords",
      "Telecom & Satellite Spectrum Regulations",
      "Multilateral Treaty Advocacy",
    ],
    orderIndex: 4,
    isFeatured: true,
    isPlaceholder: true,
    relatedMonographs: [
      {
        title: "The Death of Reactive PR: Architecture for the Algorithmic Age",
        slug: "death-of-reactive-pr",
        date: "2026-09-15",
      },
    ],
    relatedServices: [
      {
        title: "Strategic Advisory",
        slug: "strategic-advisory",
      },
      {
        title: "Public Relations",
        slug: "public-relations",
      },
    ],
  },
  {
    id: "lead-05-capital-markets",
    slug: "senior-partner-capital-markets",
    name: "[Senior Capital Markets Partner — Transaction Lead]",
    designation: "Senior Partner — Capital Markets & Valuation Narrative",
    roleCategory: "Practice Leadership",
    statusBadge: "Capital Markets [CMS Placeholder]",
    photoUrl: "/images/finance/atrium-architecture.jpg",
    photoAlt:
      "Minimalist financial atrium architecture with geometric glass skylights representing capital market transparency.",
    quote:
      "Valuation is a mathematical reflection of narrative conviction. When leadership speaks with clarity, capital markets respond with patience.",
    biography:
      "Directs capital markets communication, strategic IPO roadshows, dual-listing narratives, and shareholder activism defense. Specializes in translating complex business model transformations, deep-tech research pipelines, and sovereign debt instruments into disciplined valuation narratives for institutional allocators. [Professional capital advisory records and transactional history are maintained as structured CMS placeholders].",
    advisoryPractice: "Capital Markets & Strategic Valuation Advisory",
    primaryOffice: "Mumbai & London",
    contactProtocol:
      "Confidential Transaction Advisory via Capital Markets Directorate",
    expertise: [
      "IPO & Dual-Listing Roadshow Narratives",
      "Activist Defense Positioning",
      "Bondholder & Credit Rating Agency Dispatches",
      "Sovereign Debt Issuance Disclosures",
      "Post-Merger Integration Messaging",
    ],
    experience: [
      {
        title: "Senior Partner — Capital Markets Advisory Practice",
        organization: "SAMVAD Perception Advisory",
        period: "2018 – Present",
        description:
          "Advises corporate boards, promoters, and investment bankers on equity storytelling, pre-IPO quiet periods, and hostile takeover defenses.",
      },
      {
        title: "Managing Director — Investment Banking Strategic Communications",
        organization: "Global Merchant Banking Group",
        period: "2012 – 2018",
        description:
          "Led deal communications for tier-1 cross-border mergers, secondary block trades, and sovereign fund placements.",
      },
      {
        title: "Head of Financial Media Relations",
        organization: "Institutional Equity Research Directorate",
        period: "2005 – 2012",
        description:
          "Orchestrated quarterly earnings communications, analyst day consensus presentations, and governance roadshows.",
      },
    ],
    areasOfFocus: [
      "Sovereign Green Bond Issuances",
      "Unsolicited Hostile Tender Responses",
      "Institutional Shareholder Services (ISS) Alignment",
      "Analyst Day & Investor Presentation Strategy",
    ],
    orderIndex: 5,
    isFeatured: true,
    isPlaceholder: true,
    relatedMonographs: [
      {
        title: "Boardroom Crisis Architecture: The 72-Hour War Room Playbook",
        slug: "boardroom-crisis-playbook",
        date: "2026-08-20",
      },
    ],
    relatedServices: [
      {
        title: "Strategic Communications",
        slug: "strategic-communications",
      },
      {
        title: "Strategic Advisory",
        slug: "strategic-advisory",
      },
    ],
  },
];

/**
 * Validates all leadership entries at runtime
 */
LEADERSHIP_PROFILES.forEach((profile) => {
  const parsed = leadershipProfileSchema.safeParse(profile);
  if (!parsed.success) {
    console.error(
      `[CMS Integrity Error] Invalid leadership profile "${profile.slug}":`,
      parsed.error.format()
    );
  }
});

/**
 * Query: Get all leadership profiles sorted by order index
 */
export function getAllLeadershipProfiles(): LeadershipProfile[] {
  return [...LEADERSHIP_PROFILES].sort((a, b) => a.orderIndex - b.orderIndex);
}

/**
 * Query: Get leadership profile by slug
 */
export function getLeadershipProfileBySlug(
  slug: string
): LeadershipProfile | undefined {
  return LEADERSHIP_PROFILES.find((p) => p.slug === slug);
}

/**
 * Query: Get all slugs for static site generation (generateStaticParams)
 */
export function getAllLeadershipSlugs(): string[] {
  return LEADERSHIP_PROFILES.map((p) => p.slug);
}

/**
 * Query: Get featured leadership profiles
 */
export function getFeaturedLeadershipProfiles(): LeadershipProfile[] {
  return LEADERSHIP_PROFILES.filter((p) => p.isFeatured).sort(
    (a, b) => a.orderIndex - b.orderIndex
  );
}

/**
 * Query: Get leadership profiles by role category
 */
export function getLeadershipProfilesByCategory(
  category: LeadershipProfile["roleCategory"]
): LeadershipProfile[] {
  return LEADERSHIP_PROFILES.filter((p) => p.roleCategory === category).sort(
    (a, b) => a.orderIndex - b.orderIndex
  );
}

/**
 * Query: Get previous and next profile for editorial pagination
 */
export function getAdjacentLeadershipProfiles(currentSlug: string): {
  prev: LeadershipProfile | null;
  next: LeadershipProfile | null;
} {
  const profiles = getAllLeadershipProfiles();
  const currentIndex = profiles.findIndex((p) => p.slug === currentSlug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex > 0 ? profiles[currentIndex - 1]! : null;
  const next =
    currentIndex < profiles.length - 1 ? profiles[currentIndex + 1]! : null;

  return { prev, next };
}
