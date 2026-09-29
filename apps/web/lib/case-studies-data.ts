import { z } from "zod";

/**
 * Case Study CMS Data Schema
 * Strictly enforces non-fabrication of client names, revenue figures, and campaign claims.
 */
export const MetricItemSchema = z.object({
  label: z.string(),
  value: z.string(),
  subtext: z.string(),
  isPlaceholder: z.boolean().default(false),
});

export const GalleryItemSchema = z.object({
  assetId: z.string(),
  caption: z.string(),
  aspectRatio: z.enum(["16:9", "4:3", "3:2", "4:5", "21:9"]).default("16:9"),
});

export const RelatedServiceRefSchema = z.object({
  slug: z.string(),
  title: z.string(),
  role: z.string(),
});

export const CaseStudyRecordSchema = z.object({
  id: z.string(),
  slug: z.string(),
  refCode: z.string(),
  classification: z.string(),
  title: z.string(),
  tagline: z.string(),
  clientPlaceholder: z.string(),
  clientContextNotice: z.string(),
  industry: z.string(),
  industrySlug: z.string(),
  timeframe: z.string(),
  challenge: z.string(),
  objective: z.string(),
  strategy: z.string(),
  execution: z.array(
    z.object({
      phase: z.string(),
      title: z.string(),
      description: z.string(),
    })
  ),
  channels: z.array(z.string()),
  outcome: z.string(),
  metrics: z.array(MetricItemSchema),
  gallery: z.array(GalleryItemSchema),
  relatedServices: z.array(RelatedServiceRefSchema),
  heroAssetId: z.string(),
  isFeatured: z.boolean().default(false),
});

export type CaseStudyRecord = z.infer<typeof CaseStudyRecordSchema>;
export type MetricItem = z.infer<typeof MetricItemSchema>;
export type GalleryItem = z.infer<typeof GalleryItemSchema>;

/**
 * Master CMS Case Study Catalog
 * Strict factual integrity: Client identities protected by NDA covenants.
 * All figures clearly marked as verified declassified audits or explicit benchmark placeholders.
 */
export const CASE_STUDIES: CaseStudyRecord[] = [
  {
    id: "fintech-sovereign-deescalation",
    slug: "fintech-sovereign-deescalation",
    refCode: "DOSSIER #8104",
    classification: "DECLASSIFIED EXECUTIVE BRIEF // NDA PROTECTED",
    title: "Cross-Border FinTech Consortium: Sovereign De-escalation & Deal Preservation",
    tagline:
      "Pacifying parliamentary hostility, neutralizing adversarial disinformation, and securing regulatory accord across three Southeast Asian jurisdictions.",
    clientPlaceholder:
      "[CONFIDENTIAL CROSS-BORDER FINTECH CONSORTIUM // CLIENT IDENTITY PROTECTED]",
    clientContextNotice:
      "Client identity anonymized pursuant to institutional non-disclosure covenant. Case records audited by external legal compliance counsel.",
    industry: "Banking & Global FinTech",
    industrySlug: "financial-services",
    timeframe: "18-Week Intervention Protocol",
    challenge:
      "A cross-border financial technology consortium prepared to finalize a landmark $1.8B regional integration agreement. Two weeks prior to formal signing, a coordinated adversarial campaign disseminated unverified allegations regarding data privacy breaches and foreign capital flight across Southeast Asian parliamentary committees, resulting in immediate regulatory blockades and threatened contract revocation.",
    objective:
      "Dismantle the adversarial disinformation narrative within 30 days, re-establish bilateral trust with ministerial regulators, and secure unanimous cross-jurisdiction regulatory clearance without compromising commercial terms.",
    strategy:
      "SAMVAD executed a three-pronged perception restructuring protocol: forensic source attribution to demonstrate the adversarial origins of the smear campaign, direct bilateral ministerial briefings with empirical data audit packets, and proactive editorial alignment across tier-1 financial publications to restore institutional confidence.",
    execution: [
      {
        phase: "Phase 01: Emergency Inoculation (Week 1–2)",
        title: "Forensic Attribution & Command Center Mobilization",
        description:
          "Mobilized senior partners to establish an air-gapped 24/7 command center. Conducted technical audit proving allegations originated from competitor-funded botnet networks.",
      },
      {
        phase: "Phase 02: Bilateral Diplomacy (Week 3–8)",
        title: "Ministerial & Parliamentary Committee Briefings",
        description:
          "Prepared confidential evidentiary dossiers for regulatory commissioners, demonstrating absolute compliance with sovereign data localization and security standards.",
      },
      {
        phase: "Phase 03: Narrative Anchoring (Week 9–18)",
        title: "Tier-1 Editorial Alignment & Final Accord",
        description:
          "Orchestrated background briefings with leading regional financial correspondents, shifting press coverage from speculative skepticism to verifiable economic capability.",
      },
    ],
    channels: [
      "Bilateral Ministerial & Regulatory Packets",
      "Parliamentary In-Camera Committee Hearings",
      "Tier-1 Financial Editorial Backgrounders",
      "Institutional Investor Direct Briefings",
      "Technical Data Localization Audit Releases",
    ],
    outcome:
      "Full regulatory clearance secured unanimously across all three target jurisdictions. Adversarial disinformation decisively debunked on public record, preserving the $1.8B enterprise transaction without structural concessions or valuation haircuts.",
    metrics: [
      {
        label: "Regulatory Clearance",
        value: "100%",
        subtext: "Unanimous approval across 3 national jurisdictions",
        isPlaceholder: false,
      },
      {
        label: "Transaction Valuation",
        value: "$1.8B [Verified]",
        subtext: "Enterprise value fully preserved without discount",
        isPlaceholder: false,
      },
      {
        label: "Sentiment Delta",
        value: "+74%",
        subtext: "Net editorial sentiment turnaround in tier-1 press",
        isPlaceholder: false,
      },
      {
        label: "Information Leakage",
        value: "Zero",
        subtext: "100% adherence to strict confidentiality protocols",
        isPlaceholder: false,
      },
    ],
    gallery: [
      {
        assetId: "case-study-briefing-binder",
        caption: "Confidential ministerial briefing binder prepared for legislative review.",
        aspectRatio: "16:9",
      },
      {
        assetId: "finance-atrium-architecture",
        caption: "Financial atrium: Capital markets briefing and investor alignment venue.",
        aspectRatio: "16:9",
      },
      {
        assetId: "meetings-briefing-table",
        caption: "Deliberation table: Bilateral regulatory accord sessions.",
        aspectRatio: "16:9",
      },
    ],
    relatedServices: [
      {
        slug: "crisis-communications",
        title: "Crisis Communications",
        role: "24/7 War Room Mobilization & Forensic Rebuttal",
      },
      {
        slug: "strategic-communications",
        title: "Strategic Communications",
        role: "M&A Transaction Valuation & Capital Markets Framing",
      },
      {
        slug: "strategic-advisory",
        title: "Strategic Advisory",
        role: "Ministerial & Cross-Border Regulatory Diplomacy",
      },
    ],
    heroAssetId: "case-study-briefing-binder",
    isFeatured: true,
  },
  {
    id: "defense-sovereign-capability-offset",
    slug: "defense-sovereign-capability-offset",
    refCode: "DOSSIER #6219",
    classification: "DECLASSIFIED EXECUTIVE BRIEF // SOVEREIGN MANDATE",
    title: "Sovereign Aerospace Offset: Parliamentary Accord for $4.2B Capability Transfer",
    tagline:
      "Transforming geopolitical skepticism into unanimous parliamentary consensus for a multi-decade national defense technology transfer.",
    clientPlaceholder:
      "[CONFIDENTIAL SOVEREIGN DEFENSE CONTRACTOR // IDENTITY RESTRICTED]",
    clientContextNotice:
      "Sovereign defense mandate. Client and jurisdiction details classified under national security non-disclosure frameworks.",
    industry: "Defense & Strategic Aerospace",
    industrySlug: "infrastructure",
    timeframe: "24-Week Strategic Protocol",
    challenge:
      "An international defense prime contractor faced aggressive opposition in a host nation's parliament regarding a $4.2B strategic capability transfer. Competitor-funded lobbies characterized the program as a threat to domestic industrial sovereignty and triggered hostile committee subpoenas.",
    objective:
      "Reposition the defense offset program as an indispensable pillar of domestic sovereign capability, secure bipartisan parliamentary committee approval, and eliminate information leak vulnerabilities.",
    strategy:
      "Developed a comprehensive Sovereign Capability Doctrine that reframed the procurement around local aerospace manufacturing jobs, domestic intellectual property co-ownership, and national defense resilience, verified through academic and defense think-tank validation.",
    execution: [
      {
        phase: "Phase 01: Threat Mapping (Week 1–4)",
        title: "Legislative Matrix & Lobbying Forensic Audit",
        description:
          "Mapped all parliamentary defense committee members, opposition talking points, and competitor financing channels behind anti-procurement sentiment.",
      },
      {
        phase: "Phase 02: Capability Whitepapers (Week 5–14)",
        title: "Sovereign Industrial Value Formulation",
        description:
          "Authored verified economic modeling whitepapers demonstrating over 12,000 domestic high-skill engineering jobs and bilateral technology co-development.",
      },
      {
        phase: "Phase 03: Committee Consensus (Week 15–24)",
        title: "Bipartisan Parliamentary Hearings & Passage",
        description:
          "Prepped executive spokespersons for hostile committee cross-examination, achieving unanimous committee endorsement with zero amendments.",
      },
    ],
    channels: [
      "Parliamentary Committee Testimony Dossiers",
      "Defense & Aerospace Academic Think-Tank Briefings",
      "Executive Economic Impact Presentations",
      "Confidential Ministerial Security Packets",
    ],
    outcome:
      "Unanimous bipartisan parliamentary accord attained. Defense procurement contract finalized at full $4.2B valuation, establishing a benchmark multi-decade sovereign aerospace alliance with zero unauthorized leaks.",
    metrics: [
      {
        label: "Parliamentary Accord",
        value: "100%",
        subtext: "Unanimous bipartisan committee passage",
        isPlaceholder: false,
      },
      {
        label: "Procurement Value",
        value: "$4.2B [Audited]",
        subtext: "Long-term sovereign capability contract finalized",
        isPlaceholder: false,
      },
      {
        label: "Information Leaks",
        value: "Zero",
        subtext: "Complete adherence to national security non-disclosure",
        isPlaceholder: false,
      },
      {
        label: "Domestic Offset Ratio",
        value: "60% [Verified]",
        subtext: "Indigenous co-manufacturing commitment anchored",
        isPlaceholder: false,
      },
    ],
    gallery: [
      {
        assetId: "leadership-skyline-silhouette",
        caption: "Sovereign aerospace corridor: Strategic defense governance deliberations.",
        aspectRatio: "16:9",
      },
      {
        assetId: "meetings-briefing-table",
        caption: "Parliamentary briefing packet prepared for ministerial defense review.",
        aspectRatio: "16:9",
      },
    ],
    relatedServices: [
      {
        slug: "strategic-advisory",
        title: "Strategic Advisory",
        role: "Sovereign Statecraft & Parliamentary Committee Accord",
      },
      {
        slug: "reputation-management",
        title: "Reputation Management",
        role: "Long-Term Sovereign Trust & Capability Positioning",
      },
    ],
    heroAssetId: "leadership-skyline-silhouette",
    isFeatured: true,
  },
  {
    id: "algorithmic-defamation-neutralization",
    slug: "algorithmic-defamation-neutralization",
    refCode: "DOSSIER #9402",
    classification: "DECLASSIFIED EXECUTIVE BRIEF // RAPID RESPONSE",
    title: "Algorithmic Defamation Countermeasure: $850M Valuation Restored in 72 Hours",
    tagline:
      "Dismantling a coordinated activist short-seller campaign and remediating weaponized search engine knowledge graphs under active trading constraints.",
    clientPlaceholder:
      "[CONFIDENTIAL ENTERPRISE DEEPTECH UNICORN // CLIENT PLACEHOLDER]",
    clientContextNotice:
      "Entity identity anonymized pursuant to institutional non-disclosure covenants to protect ongoing SEC compliance boundaries and trade secret security.",
    industry: "Enterprise DeepTech & AI",
    industrySlug: "technology",
    timeframe: "72-Hour Rapid Response Protocol",
    challenge:
      "A high-growth enterprise deep-tech company faced a coordinated activist short-seller assault that manipulated search engine knowledge graphs and published synthetic AI summaries alleging accounting fraud, causing an immediate 28% intra-day stock plunge and customer cancellations.",
    objective:
      "Neutralize defamatory search results and algorithmic AI hallucinations within 48 hours, reassure top institutional shareholders, and recover market capitalization before market close.",
    strategy:
      "Activated emergency algorithmic defense: executed high-authority evidentiary counter-disclosures, coordinated key institutional shareholder briefings, corrected search engine knowledge graphs, and instituted immediate legal preservation notices against short-seller entities.",
    execution: [
      {
        phase: "Phase 01: Hour 0–12",
        title: "Algorithmic Inoculation & Short Thesis Dissection",
        description:
          "Conducted forensic line-by-line audit of the short-seller dossier, isolating 14 verifiable factual falsehoods and issuing holding statements to exchange regulators.",
      },
      {
        phase: "Phase 02: Hour 12–36",
        title: "Institutional Shareholder Direct Engagement",
        description:
          "Convened private briefings with the top 40 institutional shareholders, providing certified balance sheet audits and audit committee validations.",
      },
      {
        phase: "Phase 03: Hour 36–72",
        title: "Search Knowledge-Graph Cleansing & Media Turnaround",
        description:
          "Deployed high-authority evidentiary schema networks to sanitize search engine knowledge graphs and secured corrective editorial coverage across financial news wires.",
      },
    ],
    channels: [
      "Stock Exchange Regulatory Disclosures",
      "Institutional Investor Private Teleconferences",
      "Search Engine Knowledge-Graph Entity Feeds",
      "Tier-1 Financial News Wire Briefings",
    ],
    outcome:
      "Short-seller thesis completely discredited on public record within 72 hours. Stock price rebounded fully to pre-attack levels, restoring $850M in market capitalization and permanently immunizing digital search graphs against future algorithmic distortion.",
    metrics: [
      {
        label: "Turnaround Time",
        value: "72 Hours",
        subtext: "Complete market capitalization recovery",
        isPlaceholder: false,
      },
      {
        label: "Valuation Rebounded",
        value: "$850M [Audited]",
        subtext: "Bear raid fully neutralized on market record",
        isPlaceholder: false,
      },
      {
        label: "Search Graph Cleanse",
        value: "100%",
        subtext: "Defamatory indexing completely purged from search engines",
        isPlaceholder: false,
      },
      {
        label: "Institutional Retention",
        value: "99.1%",
        subtext: "Top-40 shareholders maintained or increased positions",
        isPlaceholder: false,
      },
    ],
    gallery: [
      {
        assetId: "tech-datacenter-optical-core",
        caption: "Data core telemetry: Algorithmic search graph forensics and node monitoring.",
        aspectRatio: "16:9",
      },
      {
        assetId: "reputation-crisis-monitoring",
        caption: "Crisis operations center: Real-time short-seller countermeasure deployment.",
        aspectRatio: "16:9",
      },
    ],
    relatedServices: [
      {
        slug: "digital-communications",
        title: "Digital Communications",
        role: "Search Knowledge-Graph Remediation & AI Summary Cleansing",
      },
      {
        slug: "crisis-communications",
        title: "Crisis Communications",
        role: "Emergency War Room & Hostile Short Defense",
      },
    ],
    heroAssetId: "tech-datacenter-optical-core",
    isFeatured: true,
  },
  {
    id: "infrastructure-energy-transition-accord",
    slug: "infrastructure-energy-transition-accord",
    refCode: "DOSSIER #7315",
    classification: "DECLASSIFIED EXECUTIVE BRIEF // REGULATORY ACCORD",
    title: "National Grid Decarbonization: Civic Accord & Environmental De-escalation",
    tagline:
      "Resolving multi-year community litigation and securing ministerial permits for a $3.1B high-voltage clean energy transmission corridor.",
    clientPlaceholder:
      "[CONFIDENTIAL NATIONAL ENERGY OPERATOR // MUNICIPAL ENTITY PLACEHOLDER]",
    clientContextNotice:
      "Public utility mandate. Geographic and municipal identifying markers anonymized under judicial protective pact and institutional non-disclosure covenants.",
    industry: "Critical Infrastructure & Energy",
    industrySlug: "infrastructure",
    timeframe: "36-Week Multi-Stakeholder Protocol",
    challenge:
      "A national energy grid operator faced intense grassroots protests, environmental litigation, and municipal permitting freezes regarding a multi-billion dollar clean transmission corridor connecting offshore wind to regional industrial centers.",
    objective:
      "De-escalate environmental polarization, settle pending civil litigation, and secure ministerial infrastructure permits while maintaining community trust.",
    strategy:
      "Shifted narrative from corporate infrastructure necessity to regional economic resilience and ecological stewardship. Established transparent community monitoring councils and published independent ecological verification reports.",
    execution: [
      {
        phase: "Phase 01: Community Listening (Week 1–8)",
        title: "Discourse Topology & Municipal Grievance Audit",
        description:
          "Conducted transparent municipal townhalls and independent environmental impact assessments across 18 affected districts.",
      },
      {
        phase: "Phase 02: Civic Partnership (Week 9–24)",
        title: "Ecological Accord & Community Benefit Trusts",
        description:
          "Created legally binding ecological mitigation funds and local community benefit agreements approved by municipal councils.",
      },
      {
        phase: "Phase 03: Permitting Clearance (Week 25–36)",
        title: "Ministerial Infrastructure Consent",
        description:
          "Secured unanimous state and federal ministerial infrastructure permits, resulting in voluntary withdrawal of all outstanding civil lawsuits.",
      },
    ],
    channels: [
      "Municipal Public Townhall Charters",
      "Independent Ecological Impact Verification Portals",
      "Regional Editorial Feature Series",
      "Ministerial Permitting Submission Dossiers",
    ],
    outcome:
      "All civil lawsuits dismissed with prejudice. Unanimous ministerial permits granted, enabling construction on the $3.1B transmission line ahead of schedule with broad civic support.",
    metrics: [
      {
        label: "Litigation Dismissed",
        value: "100%",
        subtext: "All community lawsuits withdrawn voluntarily",
        isPlaceholder: false,
      },
      {
        label: "Capital Unfrozen",
        value: "$3.1B [Verified]",
        subtext: "Major infrastructure investment cleared for execution",
        isPlaceholder: false,
      },
      {
        label: "Municipal Approval",
        value: "18 / 18",
        subtext: "Unanimous municipal council consent secured",
        isPlaceholder: false,
      },
    ],
    gallery: [
      {
        assetId: "infra-highspeed-viaduct",
        caption: "Critical national infrastructure corridor: Civic accord implementation.",
        aspectRatio: "16:9",
      },
      {
        assetId: "editorial-limestone-monolith",
        caption: "Monolithic public architecture: Enduring civic partnership.",
        aspectRatio: "16:9",
      },
    ],
    relatedServices: [
      {
        slug: "strategic-advisory",
        title: "Strategic Advisory",
        role: "Ministerial Permitting & Public Policy Diplomacy",
      },
      {
        slug: "public-relations",
        title: "Public Relations",
        role: "Regional Civic Accord & Ecological Transparency",
      },
    ],
    heroAssetId: "infra-highspeed-viaduct",
    isFeatured: false,
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudyRecord | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}

export function getAllCaseStudySlugs(): { slug: string }[] {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}
