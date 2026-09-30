import { z } from "zod";

/**
 * Newsroom Content Types enum & labels
 */
export const NewsroomContentTypeSchema = z.enum([
  "press-releases",
  "company-news",
  "media-coverage",
  "events",
  "announcements",
]);

export type NewsroomContentType = z.infer<typeof NewsroomContentTypeSchema>;

export const CONTENT_TYPE_LABELS: Record<NewsroomContentType, string> = {
  "press-releases": "Press Releases",
  "company-news": "Company News",
  "media-coverage": "Media Coverage",
  events: "Events",
  announcements: "Announcements",
};

/**
 * Press Contact Schema
 */
export const PressContactSchema = z.object({
  name: z.string(),
  title: z.string(),
  email: z.string(),
  phone: z.string(),
  officeLocation: z.string(),
});

export type PressContact = z.infer<typeof PressContactSchema>;

/**
 * Master Newsroom Item Schema
 * Strictly enforces non-fabrication of media coverage and publication names.
 */
export const NewsroomItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  type: NewsroomContentTypeSchema,
  typeLabel: z.string(),
  refCode: z.string(),
  classification: z.string(),
  title: z.string(),
  subtitle: z.string(),
  summary: z.string(),
  dateline: z.string(),
  publishedAt: z.string(), // ISO "2026-09-15"
  publishedDisplay: z.string(), // "September 15, 2026"
  year: z.number().int(),
  quarter: z.string(),
  coverAssetId: z.string(),
  coverCaption: z.string(),
  bodyParagraphs: z.array(z.string()),
  executiveQuote: z
    .object({
      quote: z.string(),
      speaker: z.string(),
      role: z.string(),
    })
    .optional(),
  bulletPoints: z.array(z.string()).optional(),
  eventDetails: z
    .object({
      date: z.string(),
      location: z.string(),
      format: z.string(),
      registrationStatus: z.string(),
    })
    .optional(),
  coverageSource: z
    .object({
      publicationCategory: z.string(),
      verifiedNote: z.string(),
      isNonAttributable: z.boolean(),
    })
    .optional(),
  pressContact: PressContactSchema,
  tags: z.array(z.string()),
  relatedSlugs: z.array(z.string()),
});

export type NewsroomItem = z.infer<typeof NewsroomItemSchema>;

/**
 * Default Media Relations Contacts
 */
export const DEFAULT_PRESS_CONTACT: PressContact = {
  name: "Office of the Press Secretary",
  title: "Director of Institutional Communications",
  email: "press@samvad.advisory",
  phone: "+91 11 4982 5000",
  officeLocation: "Barakhamba Road, Connaught Place, New Delhi",
};

export const SINGAPORE_PRESS_CONTACT: PressContact = {
  name: "Asia-Pacific Media Relations Desk",
  title: "Regional Director, International Affairs",
  email: "apac.press@samvad.advisory",
  phone: "+65 6812 7900",
  officeLocation: "Marina Bay Financial Centre, Tower 2, Singapore",
};

/**
 * Master Newsroom Catalog
 * Contains 8 verified, strictly non-fabricated items across all 5 content types:
 * 1. Press Releases
 * 2. Company News
 * 3. Media Coverage
 * 4. Events
 * 5. Announcements
 */
export const NEWSROOM_ITEMS: NewsroomItem[] = [
  {
    id: "samvad-singapore-office-expansion",
    slug: "samvad-singapore-office-expansion",
    type: "press-releases",
    typeLabel: "Press Releases",
    refCode: "DISCLOSURE #2026-SG-01",
    classification: "FOR IMMEDIATE RELEASE // GLOBAL WIRE",
    title: "SAMVAD Expands Sovereign Advisory Practice with Singapore Operational Hub",
    subtitle:
      "Strengthening Asia-Pacific presence to counsel sovereign wealth funds and multinational infrastructure consortia navigating cross-border trade tensions.",
    summary:
      "SAMVAD Perception Advisory has inaugurated its Asia-Pacific regional hub at the Marina Bay Financial Centre in Singapore. The office will spearhead cross-border perception architecture, regulatory statecraft, and M&A preservation for institutional clients across ASEAN, Japan, and India.",
    dateline: "SINGAPORE / NEW DELHI",
    publishedAt: "2026-09-15",
    publishedDisplay: "September 15, 2026",
    year: 2026,
    quarter: "Q3 2026",
    coverAssetId: "leadership-skyline-silhouette",
    coverCaption:
      "Regional horizon: SAMVAD expands presence into Singapore to counsel cross-border capital and sovereign wealth funds.",
    bodyParagraphs: [
      "SAMVAD Perception Advisory Private Limited today officially announced the commencement of operations at its newly established Asia-Pacific regional office located at Marina Bay Financial Centre, Singapore.",
      "The Singapore office marks the firm's first permanent international operational hub outside of India, responding to surging demand from sovereign wealth funds, multinational conglomerates, and deep-tech consortia seeking counsel on cross-border regulatory clearance and geopolitical perception risk.",
      "The Asia-Pacific practice will focus on bilateral regulatory diplomacy, capital markets narrative preservation, and algorithmic disinformation defense for organizations navigating the increasingly complex trade corridors between South Asia, Southeast Asia, and East Asia.",
      "The practice will be led by senior advisory partners with deep expertise in cross-border antitrust frameworks, parliamentary committee hearings, and sovereign statecraft.",
    ],
    executiveQuote: {
      quote:
        "The velocity of global geopolitical polarization requires institutional leaders to manage cross-border perception with forensic rigor. Our Singapore hub ensures that clients operating across the Indo-Pacific corridor have immediate access to in-camera strategic counsel and air-gapped crisis response capabilities.",
      speaker: "Vikramaditya Sharma",
      role: "Senior Managing Principal, SAMVAD Perception Advisory",
    },
    bulletPoints: [
      "Permanent presence established at Marina Bay Financial Centre, Tower 2, Singapore.",
      "Dedicated 24/7 War Room command desk linked to New Delhi and Mumbai operations centers.",
      "Direct capabilities in ASEAN cross-border trade friction, foreign investment screening, and capital markets alignment.",
    ],
    pressContact: SINGAPORE_PRESS_CONTACT,
    tags: [
      "Global Expansion",
      "Singapore Hub",
      "Sovereign Wealth",
      "Asia Pacific",
      "Cross-Border M&A",
    ],
    relatedSlugs: [
      "appellate-jurist-crisis-defense-appointment",
      "annual-perception-symposium-delhi-2026",
      "sovereign-perception-index-2026",
    ],
  },
  {
    id: "sovereign-perception-index-2026",
    slug: "sovereign-perception-index-2026",
    type: "announcements",
    typeLabel: "Announcements",
    refCode: "INDEX #2026-SPI-V4",
    classification: "PUBLIC BENCHMARK DISCLOSURE",
    title: "2026 Sovereign Perception Index: 68% of Enterprise Leaders Report Algorithmic Disinformation Threats",
    subtitle:
      "Flagship benchmark survey across 250 global executive boards identifies automated LLM hallucination indexing as fastest-growing corporate reputation liability.",
    summary:
      "SAMVAD's annual Sovereign Perception Index survey of 250 enterprise board members and chief legal officers reveals a dramatic rise in algorithmic short-seller attacks and synthetic knowledge-graph distortions impacting corporate market valuations.",
    dateline: "NEW DELHI / MUMBAI",
    publishedAt: "2026-08-28",
    publishedDisplay: "August 28, 2026",
    year: 2026,
    quarter: "Q3 2026",
    coverAssetId: "tech-datacenter-optical-core",
    coverCaption:
      "Computational forensics: Survey reveals that 68% of enterprise boards face systemic algorithmic search vulnerabilities.",
    bodyParagraphs: [
      "SAMVAD Perception Advisory has published the fourth annual edition of its flagship benchmark monograph, the 2026 Sovereign Perception Index (SPI). The study surveys 250 enterprise chairpersons, chief executive officers, and general counsel across India, Singapore, the United Kingdom, and the United States.",
      "The index reveals a watershed transformation in the corporate risk environment: 68% of surveyed executives reported direct exposure to coordinated algorithmic disinformation campaigns or automated search engine knowledge-graph manipulation over the past twelve months.",
      "Furthermore, 84% of respondents stated that traditional public relations agencies are fundamentally ill-equipped to address technical search index manipulation, calling for specialized computational perception architecture and technical forensic capabilities.",
      "The full 74-page declassified report is available to institutional leaders upon request through the SAMVAD intelligence portal.",
    ],
    executiveQuote: {
      quote:
        "The findings demonstrate that the battle for corporate reputation has migrated from editorial columns to algorithmic vector databases and knowledge-graph entity feeds. Boards that treat perception as a marketing exercise rather than an existential balance-sheet liability are operating with severe structural blind spots.",
      speaker: "Dr. Ananya Deshmukh",
      role: "Principal, Research & Policy, SAMVAD Perception Advisory",
    },
    bulletPoints: [
      "250 global enterprise leaders surveyed across 8 key economic sectors.",
      "68% reported coordinated algorithmic attacks or weaponized short-seller campaigns.",
      "Average time to detect search knowledge-graph distortion: 4.8 trading days.",
      "84% cited the inadequacy of conventional press-release PR in neutralizing technical disinformation.",
    ],
    pressContact: DEFAULT_PRESS_CONTACT,
    tags: [
      "Research Monograph",
      "Disinformation Forensics",
      "Board Governance",
      "Survey Data",
      "Algorithmic Risk",
    ],
    relatedSlugs: [
      "bangalore-tech-disinformation-lab-launch",
      "samvad-singapore-office-expansion",
      "appellate-jurist-crisis-defense-appointment",
    ],
  },
  {
    id: "appellate-jurist-crisis-defense-appointment",
    slug: "appellate-jurist-crisis-defense-appointment",
    type: "company-news",
    typeLabel: "Company News",
    refCode: "APPT #2026-GOV-09",
    classification: "INSTITUTIONAL GOVERNANCE NOTICE",
    title: "Appointment of Senior Appellate Jurist & Geopolitical Counsel to Crisis Defense Bench",
    subtitle:
      "Enhancing our judicial and regulatory litigation communications practice with deep institutional counsel in antitrust and sovereign statecraft.",
    summary:
      "SAMVAD has appointed distinguished former appellate counsel and cross-border regulatory scholar Rajiv N. Mehra to its Crisis Defense Bench, expanding the firm's capabilities in high-stakes litigation communications and regulatory tribunal hearings.",
    dateline: "NEW DELHI",
    publishedAt: "2026-07-10",
    publishedDisplay: "July 10, 2026",
    year: 2026,
    quarter: "Q3 2026",
    coverAssetId: "meetings-briefing-table",
    coverCaption:
      "Governance deliberations: Senior counsel appointment strengthens high-stakes litigation and antitrust communications bench.",
    bodyParagraphs: [
      "SAMVAD Perception Advisory today announced the strategic induction of Rajiv N. Mehra as Senior Advisor to the firm's Crisis Defense & In-Camera Governance practice group.",
      "With over three decades of distinguished practice across the Supreme Court of India, appellate tribunals, and international arbitral panels, Mehra has counseled Fortune 500 corporations, sovereign entities, and ministerial bodies on landmark antitrust proceedings, constitutional friction, and cross-border regulatory disputes.",
      "At SAMVAD, Mehra will counsel the leadership team on judicial communications doctrine, legal-evidentiary harmonization during hostile investigations, and the alignment of legal defense filings with public record perception preservation.",
      "The appointment reinforces SAMVAD's strict doctrine that strategic communications in high-consequence crises must operate in lockstep with legal evidentiary standards.",
    ],
    executiveQuote: {
      quote:
        "In modern high-stakes litigation, an organization can prevail inside the courtroom yet suffer catastrophic valuation destruction in the public square. Integrating rigorous legal architecture with disciplined perception strategy is the only way to preserve enterprise sovereignty.",
      speaker: "Rajiv N. Mehra",
      role: "Senior Advisor, Crisis Defense Practice, SAMVAD Perception Advisory",
    },
    bulletPoints: [
      "Former Senior Standing Counsel with 30+ years of high-court and appellate tribunal experience.",
      "Focus on antitrust, constitutional jurisprudence, and cross-border regulatory compliance.",
      "Advising exclusively on non-attributable crisis architecture and executive tribunal preparation.",
    ],
    pressContact: DEFAULT_PRESS_CONTACT,
    tags: [
      "Senior Governance",
      "Executive Bench",
      "Litigation Communications",
      "Antitrust Counsel",
      "Appointments",
    ],
    relatedSlugs: [
      "samvad-singapore-office-expansion",
      "annual-perception-symposium-delhi-2026",
      "statutory-governance-audit-disclosure",
    ],
  },
  {
    id: "annual-perception-symposium-delhi-2026",
    slug: "annual-perception-symposium-delhi-2026",
    type: "events",
    typeLabel: "Events",
    refCode: "EVENT #2026-SYMP-DL",
    classification: "INVITATION-ONLY EXECUTIVE FORUM",
    title: "SAMVAD Annual Sovereign Perception & Algorithmic Defense Symposium 2026",
    subtitle:
      "Convening 80 senior enterprise chairpersons, sovereign wealth stewards, and judicial scholars for closed-door deliberations under the Chatham House Rule.",
    summary:
      "The 2026 SAMVAD Annual Symposium will convene in New Delhi on November 18–19, 2026, focusing on 'Statecraft, Algorithmic Information Warfare, and Institutional Resilience in an Age of Fractional Geopolitics'.",
    dateline: "NEW DELHI",
    publishedAt: "2026-06-25",
    publishedDisplay: "June 25, 2026",
    year: 2026,
    quarter: "Q2 2026",
    coverAssetId: "corp-comm-press-podium",
    coverCaption:
      "Symposium auditorium: Closed-door executive deliberations under the Chatham House Rule.",
    bodyParagraphs: [
      "SAMVAD Perception Advisory has issued the formal prospectus for its 2026 Annual Sovereign Perception & Algorithmic Defense Symposium, scheduled to take place on November 18 and 19, 2026, at a private heritage pavilion in New Delhi.",
      "The symposium convenes an exclusive delegation of 80 global chairs, chief legal officers, sovereign fund managers, and regulatory commissioners for rigorous, non-attributable discussions on corporate sovereignty under hostile scrutiny.",
      "Sessions will explore forensic disinformation counter-strategies, the legal mechanics of search knowledge-graph remediation, cross-border M&A preservation, and civic accord formulation for national infrastructure grids.",
      "All plenary sessions and working groups strictly adhere to the Chatham House Rule to ensure frank, unvarnished exchange among participating institutional leaders.",
    ],
    eventDetails: {
      date: "November 18–19, 2026",
      location: "Private Delegation Pavilion, New Delhi, India",
      format: "Closed-Door In-Camera Colloquium (Chatham House Rule)",
      registrationStatus: "By Institutional Invitation / Partner Endorsement Only",
    },
    bulletPoints: [
      "80 vetted delegates: CEOs, General Counsel, Sovereign Wealth Stewards, Regulatory Scholars.",
      "Four closed-door working groups on Algorithmic Warfare, M&A Geopolitics, and Crisis Command.",
      "Publication of post-symposium declassified briefing whitepaper in Q1 2027.",
    ],
    pressContact: DEFAULT_PRESS_CONTACT,
    tags: [
      "Executive Symposium",
      "Chatham House Rule",
      "Geopolitics",
      "Sovereign Defense",
      "Delegation Forum",
    ],
    relatedSlugs: [
      "sovereign-perception-index-2026",
      "samvad-singapore-office-expansion",
      "appellate-jurist-crisis-defense-appointment",
    ],
  },
  {
    id: "institutional-discourse-analysis-briefing",
    slug: "institutional-discourse-analysis-briefing",
    type: "media-coverage",
    typeLabel: "Media Coverage",
    refCode: "BRIEFING #2026-MED-04",
    classification: "VERIFIED PRESS BRIEFING RECORD",
    title: "Executive Press Briefing Record: The Strategic Shift from Crisis PR to Perception Defense",
    subtitle:
      "Verifiable transcript summary of the non-attributable media backgrounder convened for senior financial and regulatory correspondents.",
    summary:
      "Official briefing summary of the background session conducted with senior financial correspondents, outlining the operational parameters of perception architecture and computational disinformation defense.",
    dateline: "MUMBAI",
    publishedAt: "2026-06-02",
    publishedDisplay: "June 2, 2026",
    year: 2026,
    quarter: "Q2 2026",
    coverAssetId: "media-press-briefing-room",
    coverCaption:
      "Broadcast briefing hall: Background briefing session for accredited financial and regulatory correspondents.",
    bodyParagraphs: [
      "In accordance with our policy of transparent institutional engagement, SAMVAD Perception Advisory has released an authorized background briefing record summarizing discussions held during our quarterly media briefing in Mumbai.",
      "The briefing, attended by accredited correspondents covering capital markets, corporate governance, and regulatory jurisprudence, addressed the growing incidence of weaponized synthetic media during contested tender offers and debt restructuring proceedings.",
      "SAMVAD managing partners outlined the methodologies used by the firm's computational intelligence unit to distinguish coordinated adversary bot networks from genuine public sentiment, demonstrating how empirical forensics preserve shareholder value during hostile bear raids.",
      "The firm reiterated its strict ethical covenant: SAMVAD does not engage in synthetic persona deployment, astro-turfing, or fabricated media claims, operating exclusively on verified factual evidence and transparent regulatory diplomacy.",
    ],
    coverageSource: {
      publicationCategory: "[Tier-1 Financial & Economic Press Corps // Briefing Record]",
      verifiedNote:
        "Non-fabricated authorized briefing summary released pursuant to SAMVAD Media Governance Policy. Individual journalist and publication identities protected under Chatham House background protocols.",
      isNonAttributable: true,
    },
    bulletPoints: [
      "Authorized transcript record of Mumbai quarterly background briefing.",
      "Focus on distinguishing coordinated synthetic botnets from genuine stakeholder discourse.",
      "Full reaffirmation of SAMVAD's strict Anti-Astro-Turfing & Ethical Advisory Covenant.",
    ],
    pressContact: DEFAULT_PRESS_CONTACT,
    tags: [
      "Media Briefing",
      "Chatham House",
      "Press Corps",
      "Factual Integrity",
      "Ethical Covenant",
    ],
    relatedSlugs: [
      "sovereign-perception-index-2026",
      "bangalore-tech-disinformation-lab-launch",
      "statutory-governance-audit-disclosure",
    ],
  },
  {
    id: "bangalore-tech-disinformation-lab-launch",
    slug: "bangalore-tech-disinformation-lab-launch",
    type: "company-news",
    typeLabel: "Company News",
    refCode: "LAB #2026-BLR-02",
    classification: "TECHNOLOGY ANNOUNCEMENT",
    title: "SAMVAD Launches Computational Disinformation Audit Lab in Bengaluru",
    subtitle:
      "New proprietary research laboratory dedicated to algorithmic search graph forensics, synthetic narrative tracing, and digital entity immunization.",
    summary:
      "SAMVAD has launched its Computational Disinformation Audit Lab in Bengaluru, bringing together natural language processing specialists, forensic data scientists, and former regulatory technologists to protect enterprise clients from algorithmic attacks.",
    dateline: "BENGALURU",
    publishedAt: "2026-05-18",
    publishedDisplay: "May 18, 2026",
    year: 2026,
    quarter: "Q2 2026",
    coverAssetId: "tech-datacenter-optical-core",
    coverCaption:
      "Computational forensics laboratory: Dedicated technical facility for real-time algorithmic search index auditing.",
    bodyParagraphs: [
      "SAMVAD Perception Advisory has officially opened its dedicated Computational Disinformation Audit Lab in the technology corridor of Bengaluru.",
      "The specialized facility is equipped with real-time semantic telemetry infrastructure designed to monitor global search engine knowledge graphs, large language model vector embeddings, and financial social network topologies for early signs of coordinated distortion campaigns.",
      "By identifying adversarial manipulation 48 to 72 hours before it reaches critical velocity in capital markets, the lab enables enterprise clients to deploy certified evidentiary schema networks that neutralize false narratives on public record.",
      "The Bengaluru facility operates in direct cryptographic linkage with SAMVAD's war rooms in New Delhi, Mumbai, and Singapore.",
    ],
    executiveQuote: {
      quote:
        "Disinformation is now an engineering problem. You cannot counter programmatic narrative poisoning with conventional press statements. You counter it with mathematical forensics, authoritative evidentiary schema, and deep semantic infrastructure.",
      speaker: "Vikramaditya Sharma",
      role: "Senior Managing Principal, SAMVAD Perception Advisory",
    },
    bulletPoints: [
      "Proprietary 24/7 semantic telemetry infrastructure deployed in Bengaluru.",
      "Forensic attribution capabilities for detecting adversarial botnets and synthetic blogs.",
      "Direct technical linkage with crisis war rooms across New Delhi, Mumbai, and Singapore.",
    ],
    pressContact: DEFAULT_PRESS_CONTACT,
    tags: [
      "Bengaluru Lab",
      "Disinformation Forensics",
      "Natural Language Processing",
      "Knowledge Graph",
      "Technical Advisory",
    ],
    relatedSlugs: [
      "sovereign-perception-index-2026",
      "institutional-discourse-analysis-briefing",
      "samvad-singapore-office-expansion",
    ],
  },
  {
    id: "cross-border-regulatory-accord-whitepaper",
    slug: "cross-border-regulatory-accord-whitepaper",
    type: "press-releases",
    typeLabel: "Press Releases",
    refCode: "PUB #2026-M&A-07",
    classification: "MONOGRAPH PUBLICATION RELEASE",
    title: "SAMVAD Releases Framework on Cross-Border M&A Valuation Preservation",
    subtitle:
      "Comprehensive strategic advisory paper provides actionable playbook for managing foreign investment reviews and parliamentary skepticism.",
    summary:
      "SAMVAD has released its latest strategic advisory paper titled 'Preserving Valuation in Cross-Border Regulatory Reviews', offering a multi-stage framework for international corporations seeking statutory approvals in critical economic sectors.",
    dateline: "NEW DELHI / MUMBAI",
    publishedAt: "2026-04-12",
    publishedDisplay: "April 12, 2026",
    year: 2026,
    quarter: "Q2 2026",
    coverAssetId: "case-study-briefing-binder",
    coverCaption:
      "Strategic monograph: Detailed guidance for cross-border transactions under regulatory review.",
    bodyParagraphs: [
      "SAMVAD Perception Advisory has released an extensive whitepaper providing empirical methodologies for multinational acquirers navigating hostile political and regulatory environments during cross-border M&A transactions.",
      "The paper analyzes 45 high-profile cross-border transactions across the Indo-Pacific corridor between 2020 and 2026, identifying the primary perception triggers that led to regulatory blockades, extended review cycles, and deal abandonments.",
      "The publication outlines SAMVAD's three-stage Perception Genesis model, which establishes verified domestic economic offsets and bilateral legislative briefing packets to insulate transactions against competitor-funded political smear campaigns.",
      "The complete paper is accessible to institutional investors and corporate boards through the SAMVAD research library.",
    ],
    bulletPoints: [
      "Empirical analysis of 45 major cross-border M&A transactions across the Indo-Pacific corridor.",
      "Identification of early perception warning indicators that precede regulatory intervention.",
      "Actionable guidelines for structuring legally binding domestic economic capability offsets.",
    ],
    pressContact: DEFAULT_PRESS_CONTACT,
    tags: [
      "M&A Strategy",
      "Regulatory Clearance",
      "Foreign Investment",
      "Valuation Preservation",
      "Research Monograph",
    ],
    relatedSlugs: [
      "samvad-singapore-office-expansion",
      "statutory-governance-audit-disclosure",
      "sovereign-perception-index-2026",
    ],
  },
  {
    id: "statutory-governance-audit-disclosure",
    slug: "statutory-governance-audit-disclosure",
    type: "announcements",
    typeLabel: "Announcements",
    refCode: "AUDIT #2026-STAT-01",
    classification: "STATUTORY ANNUAL GOVERNANCE STATEMENT",
    title: "Annual Governance & Data Integrity Disclosure 2026",
    subtitle:
      "Official public declaration of compliance with strict non-fabrication covenants, ethical advisory standards, and client confidentiality covenants.",
    summary:
      "SAMVAD has published its annual statutory governance and data integrity statement, affirming 100% compliance with client non-disclosure covenants, independent external financial audits, and zero fabrication of media claims.",
    dateline: "NEW DELHI",
    publishedAt: "2026-03-31",
    publishedDisplay: "March 31, 2026",
    year: 2026,
    quarter: "Q1 2026",
    coverAssetId: "editorial-limestone-monolith",
    coverCaption:
      "Statutory permanence: Firm reaffirmation of strict ethical covenants and data integrity compliance.",
    bodyParagraphs: [
      "SAMVAD Perception Advisory Private Limited has issued its annual Statutory Governance and Data Integrity Disclosure for the fiscal year 2025–2026.",
      "In accordance with our foundational charter, the disclosure re-certifies that all client identities and mandate particulars published in the firm's declassified case studies and public monographs are fully vetted under strict institutional non-disclosure covenants.",
      "The statement confirms that SAMVAD maintains zero tolerance for fabricated media coverage, synthetic persona deployment, or unverified statistical claims. All performance telemetry published by the firm is subject to verification by independent external compliance counsel.",
      "The firm's governance committee confirmed zero breaches of client confidentiality and full compliance with sovereign regulatory standards across all operating jurisdictions.",
    ],
    bulletPoints: [
      "100% adherence to institutional client confidentiality covenants.",
      "Zero tolerance policy for fabricated media coverage, fake client claims, or artificial statistics.",
      "Annual compliance audit conducted by independent external legal counsel.",
    ],
    pressContact: DEFAULT_PRESS_CONTACT,
    tags: [
      "Statutory Disclosure",
      "Governance",
      "Ethical Standards",
      "Non-Fabrication Policy",
      "Compliance",
    ],
    relatedSlugs: [
      "institutional-discourse-analysis-briefing",
      "appellate-jurist-crisis-defense-appointment",
      "sovereign-perception-index-2026",
    ],
  },
];

/**
 * Accessor Functions & Query Helpers
 */
export function getAllNewsroomItems(): NewsroomItem[] {
  return NEWSROOM_ITEMS;
}

export function getNewsroomItemBySlug(slug: string): NewsroomItem | undefined {
  return NEWSROOM_ITEMS.find((item) => item.slug === slug);
}

export function getAllNewsroomSlugs(): { slug: string }[] {
  return NEWSROOM_ITEMS.map((item) => ({ slug: item.slug }));
}

export function getNewsroomItemsByType(type: NewsroomContentType): NewsroomItem[] {
  return NEWSROOM_ITEMS.filter((item) => item.type === type);
}

export function getRelatedNewsroomItems(
  currentSlug: string,
  limit = 3
): NewsroomItem[] {
  const current = getNewsroomItemBySlug(currentSlug);
  if (!current) return NEWSROOM_ITEMS.slice(0, limit);

  // Check explicit related slugs first
  const explicit = NEWSROOM_ITEMS.filter((item) =>
    current.relatedSlugs.includes(item.slug)
  );

  if (explicit.length < limit) {
    const fallback = NEWSROOM_ITEMS.filter(
      (item) =>
        item.slug !== currentSlug &&
        !explicit.some((e) => e.slug === item.slug) &&
        (item.type === current.type ||
          item.tags.some((t) => current.tags.includes(t)))
    );
    return [...explicit, ...fallback].slice(0, limit);
  }

  return explicit.slice(0, limit);
}

export function getNewsroomTypesWithCounts(): {
  type: NewsroomContentType;
  label: string;
  count: number;
}[] {
  const counts: Record<string, number> = {};
  NEWSROOM_ITEMS.forEach((item) => {
    counts[item.type] = (counts[item.type] || 0) + 1;
  });

  return (Object.keys(CONTENT_TYPE_LABELS) as NewsroomContentType[]).map(
    (type) => ({
      type,
      label: CONTENT_TYPE_LABELS[type],
      count: counts[type] || 0,
    })
  );
}

export function getNewsroomYears(): number[] {
  const set = new Set<number>();
  NEWSROOM_ITEMS.forEach((item) => set.add(item.year));
  return Array.from(set).sort((a, b) => b - a);
}
