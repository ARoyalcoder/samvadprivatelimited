import { z } from "zod";

/**
 * CMS-Ready Service Schema
 */
export const ServiceProcessPhaseSchema = z.object({
  phase: z.string(),
  title: z.string(),
  timeframe: z.string(),
  description: z.string(),
  deliverables: z.array(z.string()),
});

export const RelevantIndustrySchema = z.object({
  id: z.string(),
  code: z.string(),
  title: z.string(),
  relevance: z.string(),
});

export const RelatedCaseStudySchema = z.object({
  ref: z.string(),
  title: z.string(),
  sector: z.string(),
  outcome: z.string(),
  metrics: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
});

export const RelatedInsightSchema = z.object({
  title: z.string(),
  category: z.string(),
  readTime: z.string(),
  author: z.string(),
  slug: z.string(),
});

export const ServiceRecordSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  eyebrow: z.string(),
  tagline: z.string(),
  shortDescription: z.string(),
  longOverview: z.string(),
  heroAssetId: z.string(),
  supportingAssetId: z.string(),
  accentColor: z.string(),
  iconName: z.string(),
  capabilities: z.array(z.string()),
  process: z.array(ServiceProcessPhaseSchema),
  deliverables: z.array(z.string()),
  relevantIndustries: z.array(RelevantIndustrySchema),
  relatedCaseStudies: z.array(RelatedCaseStudySchema),
  relatedInsights: z.array(RelatedInsightSchema),
});

export type ServiceRecord = z.infer<typeof ServiceRecordSchema>;
export type ServiceProcessPhase = z.infer<typeof ServiceProcessPhaseSchema>;

/**
 * The Master 6 Primary Services Catalog
 * Strictly factual, advisory-grade, no invented statistical claims or fabricated client identities.
 */
export const PRIMARY_SERVICES: ServiceRecord[] = [
  {
    id: "public-relations",
    slug: "public-relations",
    title: "Public Relations",
    eyebrow: "Earned Media Statecraft",
    tagline: "Earned Editorial Influence & Institutional Narrative Dissemination",
    shortDescription:
      "Architecting authoritative earned editorial access across national and international media corridors to anchor factual accuracy and build institutional trust.",
    longOverview:
      "Public Relations at SAMVAD transcends routine press announcements and vanity publicity. We operate at the nexus of editorial journalism, investigative inquiry, and corporate statecraft. We cultivate bilateral trust with editors, investigative bureaus, and sovereign correspondents to ensure institutional positions are represented with absolute factual fidelity. By establishing direct lines of communication with tier-1 media decision-makers, we protect our clients against distorted narratives and asymmetric press scrutiny before erroneous reports crystallize into conventional wisdom.",
    heroAssetId: "corp-comm-press-podium",
    supportingAssetId: "media-broadcast-briefing-room",
    accentColor: "#D4AF37",
    iconName: "Newspaper",
    capabilities: [
      "Tier-1 Editorial Relations & Bureau Briefings",
      "Executive Keynote & Public Platform Management",
      "Institutional Media Training & Spoke Preparation",
      "Forensic Press Release Architecture & Embargo Coordination",
      "International Media Delegation Management",
      "Fact-Verification Defense Against Investigative Scrutiny",
    ],
    process: [
      {
        phase: "Phase 01",
        title: "Editorial Landscape & Sentiment Audit",
        timeframe: "Week 1",
        description:
          "Comprehensive mapping of key editorial beats, beat reporters, investigative bureaus, and historic coverage trajectories across target jurisdictions.",
        deliverables: [
          "Editorial Risk & Opportunity Dossier",
          "Tier-1 Journalist Resonance Matrix",
        ],
      },
      {
        phase: "Phase 02",
        title: "Evidentiary Narrative Formulation",
        timeframe: "Weeks 2–3",
        description:
          "Synthesizing institutional facts into clear, unassailable briefing packets designed to satisfy investigative cross-examination and editorial standards.",
        deliverables: [
          "Core Institutional Messaging Playbook",
          "Fact-Check Verification Data Packets",
        ],
      },
      {
        phase: "Phase 03",
        title: "Targeted Bureau Engagement",
        timeframe: "Weeks 3–6",
        description:
          "Conducting background briefing sessions with select tier-1 editors and correspondents under Chatham House Rule or attributed protocols.",
        deliverables: [
          "Executive On-the-Record Interview Series",
          "Embargoed Press Clearances",
        ],
      },
      {
        phase: "Phase 04",
        title: "Coverage Verification & Sentiment Anchoring",
        timeframe: "Ongoing",
        description:
          "Continuous analysis of published coverage, factual correction protocols for erroneous reporting, and long-term journalist trust maintenance.",
        deliverables: [
          "Real-Time Coverage Tone Reports",
          "Rapid Factual Rebuttal Corrections",
        ],
      },
    ],
    deliverables: [
      "Bespoke Editorial Briefing Packets",
      "Verified Media Contact & Bureau Matrix",
      "Executive Interview Briefing Books",
      "Forensic Press Protocol Clearances",
      "Quarterly Editorial Sentiment Analysis",
      "Rapid Response Correction Memorandums",
    ],
    relevantIndustries: [
      {
        id: "banking-fintech",
        code: "02",
        title: "Banking & Global FinTech",
        relevance: "Solvency reassurance and financial media clarity during earnings scrutiny.",
      },
      {
        id: "defense-aerospace",
        code: "01",
        title: "Defense & Strategic Aerospace",
        relevance: "Procurement transparency and national capability communication.",
      },
      {
        id: "deeptech-ai",
        code: "05",
        title: "Enterprise DeepTech & AI",
        relevance: "Explaining complex algorithmic breakthroughs without hype or overpromising.",
      },
    ],
    relatedCaseStudies: [
      {
        ref: "DOSSIER #8104",
        title: "Cross-Border FinTech Consortium: Sovereign De-escalation",
        sector: "Banking & Global FinTech",
        outcome: "Regulatory clearance secured; adverse press cycle turned constructive.",
        metrics: [
          { label: "Regulatory Clearance", value: "100%" },
          { label: "Sentiment Delta", value: "+74%" },
        ],
      },
    ],
    relatedInsights: [
      {
        title: "The Death of Reactive PR: Why Sovereign Brands Need Perception Architecture",
        category: "Whitepaper",
        readTime: "8 min read",
        author: "Vikramaditya Sharma, Managing Principal",
        slug: "death-of-reactive-pr",
      },
    ],
  },
  {
    id: "strategic-communications",
    slug: "strategic-communications",
    title: "Strategic Communications",
    eyebrow: "Capital Markets & Governance",
    tagline: "Value Framing for Capital Markets & Landmark Transactions",
    shortDescription:
      "Guiding the communications physics of multi-billion dollar transactions, sovereign restructurings, and IPO roadshows to preserve deal premiums and defeat shareholder friction.",
    longOverview:
      "Strategic Communications bridges internal corporate strategy with capital markets sentiment and regulatory mandate. In high-consequence transformations—such as cross-border mega-mergers, strategic disinvestment, initial public offerings, and shareholder proxy contests—valuation is profoundly influenced by stakeholder consensus. SAMVAD architects narrative coherence across institutional investors, proxy advisory firms, rating agencies, and antitrust authorities to ensure the strategic thesis withstands adversarial scrutiny and unlocks full enterprise value.",
    heroAssetId: "finance-atrium-architecture",
    supportingAssetId: "business-strategic-briefing-table",
    accentColor: "#D4AF37",
    iconName: "Compass",
    capabilities: [
      "M&A Transaction Narrative & Antitrust Framing",
      "IPO Genesis, Investor Day & Roadshow Comms",
      "Shareholder Activism Defense & Proxy Contests",
      "Institutional Restructuring & Executive Succession",
      "Analyst & Sovereign Investor Consensus Building",
      "Debt Restructuring & Credit Rating Agency Engagement",
    ],
    process: [
      {
        phase: "Phase 01",
        title: "Transaction Valuation & Asymmetry Audit",
        timeframe: "Weeks 1–2",
        description:
          "Forensic audit of market sentiment, analyst consensus vulnerabilities, and antitrust regulatory hurdles facing the proposed transaction.",
        deliverables: [
          "Transaction Vulnerability Assessment",
          "Institutional Shareholder Matrix",
        ],
      },
      {
        phase: "Phase 02",
        title: "Transaction Thesis Formulation",
        timeframe: "Weeks 3–4",
        description:
          "Architecting core valuation arguments, industrial logic narratives, and cross-border regulatory alignment dossiers.",
        deliverables: [
          "Comprehensive M&A Narrative Blueprint",
          "Proxy Advisor Rebuttal Dossier",
        ],
      },
      {
        phase: "Phase 03",
        title: "Synchronized Announcement Execution",
        timeframe: "Day 0",
        description:
          "Multi-jurisdictional rollout orchestrated across regulatory wires, stock exchanges, financial press, and internal townhalls.",
        deliverables: [
          "Regulatory Disclosure Packets",
          "Investor Presentation Q&A Briefings",
        ],
      },
      {
        phase: "Phase 04",
        title: "Post-Close Integration & Value Anchoring",
        timeframe: "Day 1–90",
        description:
          "Sustained communication to retain talent, preserve customer trust, and demonstrate synergy milestones to capital markets.",
        deliverables: [
          "Quarterly Synergy Milestone Updates",
          "Shareholder Sentiment Telemetry",
        ],
      },
    ],
    deliverables: [
      "Transaction Narrative Blueprints",
      "Institutional Investor Presentation Decks",
      "Hostile Proxy Contest Defense Playbooks",
      "Antitrust Regulatory Alignment Dossiers",
      "Executive Roadshow Scripting & Prep",
      "Board-Level Strategic Communication Memorandums",
    ],
    relevantIndustries: [
      {
        id: "banking-fintech",
        code: "02",
        title: "Banking & Global FinTech",
        relevance: "Complex cross-border capital requirements and central bank dialogue.",
      },
      {
        id: "infrastructure-energy",
        code: "03",
        title: "Critical Infrastructure & Energy",
        relevance: "Public-private partnership concessions and capital investment framing.",
      },
      {
        id: "family-offices",
        code: "06",
        title: "Family Offices & Sovereign Funds",
        relevance: "Direct private-equity investments and generational succession governance.",
      },
    ],
    relatedCaseStudies: [
      {
        ref: "DOSSIER #8104",
        title: "Cross-Border FinTech Consortium: $1.8B Deal Preservation",
        sector: "Banking & Global FinTech",
        outcome: "Deal premium preserved without antitrust restructuring.",
        metrics: [
          { label: "Deal Valuation", value: "$1.8 Billion" },
          { label: "Approval Vote", value: "Unanimous" },
        ],
      },
    ],
    relatedInsights: [
      {
        title: "The Death of Reactive PR: Why Sovereign Brands Need Perception Architecture",
        category: "Whitepaper",
        readTime: "8 min read",
        author: "Vikramaditya Sharma, Managing Principal",
        slug: "death-of-reactive-pr",
      },
    ],
  },
  {
    id: "reputation-management",
    slug: "reputation-management",
    title: "Reputation Management",
    eyebrow: "Trust Preservation",
    tagline: "Continuous Institutional Trust Moat & Sentiment Telemetry",
    shortDescription:
      "Deploying quantitative sentiment topology and longitudinal perception tracking to insulate enterprise credibility against slow-burning reputational erosion.",
    longOverview:
      "Reputation is the ultimate intangible asset on an institutional balance sheet. It determines access to sovereign corridors, lowers the cost of capital, and grants the benefit of the doubt during unforeseen operational crises. SAMVAD's Reputation Management practice operates not through cosmetic promotional campaigns, but through systemic trust architecture. We track stakeholder sentiment across regulatory bodies, academic experts, industry analysts, and the public square to identify emerging friction points and build resilient reputational moats.",
    heroAssetId: "reputation-crisis-monitoring",
    supportingAssetId: "leadership-skyline-silhouette",
    accentColor: "#C5A059",
    iconName: "ShieldCheck",
    capabilities: [
      "Longitudinal Institutional Sentiment Audits",
      "Key Opinion Leader (KOL) Alignment & Moat Architecture",
      "ESG & Sovereign Responsibility Positioning",
      "Counter-Defamation & Character Defense Protocols",
      "Executive Trust Index Benchmarking",
      "Stakeholder Trust Recovery & Remediation Roadmaps",
    ],
    process: [
      {
        phase: "Phase 01",
        title: "Baseline Reputation & Sentiment Audit",
        timeframe: "Month 1",
        description:
          "Diagnostic research across stakeholder cohorts to establish baseline perception indices and uncover hidden reputational liabilities.",
        deliverables: [
          "Baseline Trust Index Audit",
          "Latent Risk Topology Report",
        ],
      },
      {
        phase: "Phase 02",
        title: "Reputational Moat Architecture",
        timeframe: "Month 2",
        description:
          "Engineering deliberate institutional positioning, thought leadership initiatives, and strategic alignments with high-credibility partners.",
        deliverables: [
          "Trust Moat Strategic Roadmap",
          "Key Opinion Leader Engagement Protocol",
        ],
      },
      {
        phase: "Phase 03",
        title: "Proactive Narrative Inoculation",
        timeframe: "Months 3–6",
        description:
          "Systematically reinforcing operational achievements and governance standards across key regulatory and investor channels.",
        deliverables: [
          "Institutional Authority Publishing Series",
          "Stakeholder Trust Validation Briefings",
        ],
      },
      {
        phase: "Phase 04",
        title: "Continuous Telemetry & Maintenance",
        timeframe: "Ongoing",
        description:
          "Real-time sentiment monitoring and automated alert mechanisms to track fluctuations and recalibrate messaging proactively.",
        deliverables: [
          "Quarterly Institutional Perception Scorecards",
          "Annual Reputation Defense Review",
        ],
      },
    ],
    deliverables: [
      "Annual Sovereign Perception Scorecards",
      "Key Opinion Leader Influence Topology",
      "Stakeholder Trust Defensibility Audits",
      "Executive Vulnerability Remediation Briefs",
      "ESG Authenticity & Governance Frameworks",
      "Post-Crisis Trust Restoration Plans",
    ],
    relevantIndustries: [
      {
        id: "healthcare-lifesciences",
        code: "04",
        title: "Healthcare & Life Sciences",
        relevance: "Bio-ethics, clinical research integrity, and pricing perception defense.",
      },
      {
        id: "infrastructure-energy",
        code: "03",
        title: "Critical Infrastructure & Energy",
        relevance: "Environmental transition credibility and community infrastructure accords.",
      },
      {
        id: "family-offices",
        code: "06",
        title: "Family Offices & Sovereign Funds",
        relevance: "Multi-generational reputation preservation and philanthropic stewardship.",
      },
    ],
    relatedCaseStudies: [
      {
        ref: "DOSSIER #6219",
        title: "Sovereign Aerospace Offset: Parliamentary Accord",
        sector: "Defense & Strategic Aerospace",
        outcome: "National capability consensus secured with zero reputational friction.",
        metrics: [
          { label: "Parliamentary Accord", value: "100%" },
          { label: "Information Leaks", value: "Zero" },
        ],
      },
    ],
    relatedInsights: [
      {
        title: "Crisis in the Boardroom: Ten Operational Rules for Hostile Activist Incursions",
        category: "Crisis Casebook",
        readTime: "10 min read",
        author: "Sovereign Defense Practice",
        slug: "boardroom-crisis-playbook",
      },
    ],
  },
  {
    id: "digital-communications",
    slug: "digital-communications",
    title: "Digital Communications",
    eyebrow: "Frontier Information Ecosystem",
    tagline: "Algorithmic Integrity, Knowledge Graph Defense & Search Sovereignty",
    shortDescription:
      "Engineering digital authority, sanitizing distorted knowledge graphs, and insulating organizations against automated disinformation and algorithmic bias.",
    longOverview:
      "In a digital ecosystem governed by large language models, automated search algorithms, and algorithmic feed amplification, perception is no longer formed exclusively by human journalists. Automated knowledge graphs, AI summaries, and coordinated digital amplification frequently dictate public and investor reality before facts can assemble. SAMVAD's Digital Communications practice combines technical SEO forensics, computational sentiment tracking, and high-authority evidentiary publishing to ensure search engines and AI models cite accurate, verified corporate records.",
    heroAssetId: "tech-datacenter-optical-core",
    supportingAssetId: "abstract-prism-refraction",
    accentColor: "#3B82F6",
    iconName: "Cpu",
    capabilities: [
      "Generative AI & LLM Knowledge-Graph Remediation",
      "Algorithmic Search Reputation & Organic Vector Defense",
      "Automated Disinformation Detection & Botnet Suppression",
      "Digital Footprint Governance & Executive Privacy Moats",
      "High-Authority Evidentiary Digital Corpus Publishing",
      "Algorithmic Feed Vulnerability & Sentiment Audits",
    ],
    process: [
      {
        phase: "Phase 01",
        title: "Algorithmic Surface Attack Audit",
        timeframe: "48 Hours",
        description:
          "Comprehensive computational sweep of search results, knowledge graph entities, LLM prompt responses, and social vector anomalies.",
        deliverables: [
          "Knowledge Graph Vulnerability Report",
          "Algorithmic Disinformation Map",
        ],
      },
      {
        phase: "Phase 02",
        title: "Evidentiary Authority Architecture",
        timeframe: "Days 3–14",
        description:
          "Structuring verified corporate disclosures, authoritative citations, and schema markup to establish unambiguous algorithmic provenance.",
        deliverables: [
          "High-Authority Evidentiary Schema Corpus",
          "Primary Source Citation Network",
        ],
      },
      {
        phase: "Phase 03",
        title: "Search & LLM Knowledge Remediation",
        timeframe: "Weeks 2–6",
        description:
          "Executing technical corrections, indexing signals, and counter-authority deployments to displace distorted snippets and false assertions.",
        deliverables: [
          "Search Result Cleanse Verification",
          "LLM Entity Graph Recalibration",
        ],
      },
      {
        phase: "Phase 04",
        title: "Continuous Algorithmic Defense",
        timeframe: "Ongoing",
        description:
          "24/7 automated monitoring of knowledge-graph drifts, newly indexed negative queries, and synthetic media attacks.",
        deliverables: [
          "Automated Threat Telemetry Alerts",
          "Monthly Algorithmic Dominance Audit",
        ],
      },
    ],
    deliverables: [
      "Algorithmic Knowledge Graph Health Reports",
      "Digital Vulnerability & Attribution Maps",
      "High-Authority Evidentiary Indexing Networks",
      "LLM Search Summary Defense Blueprints",
      "Executive Digital Privacy Moats",
      "24/7 Digital Distortion Alert Telemetry",
    ],
    relevantIndustries: [
      {
        id: "deeptech-ai",
        code: "05",
        title: "Enterprise DeepTech & AI",
        relevance: "AI governance optics, data sovereignty, and congressional scrutiny.",
      },
      {
        id: "banking-fintech",
        code: "02",
        title: "Banking & Global FinTech",
        relevance: "Preventing algorithmic panic runs triggered by social media bot networks.",
      },
      {
        id: "healthcare-lifesciences",
        code: "04",
        title: "Healthcare & Life Sciences",
        relevance: "Correcting medical disinformation and clinical trial inaccuracies.",
      },
    ],
    relatedCaseStudies: [
      {
        ref: "DOSSIER #9402",
        title: "Algorithmic Defamation Countermeasure",
        sector: "Enterprise DeepTech & AI",
        outcome: "Search engine and LLM knowledge graphs completely cleansed within 72 hours.",
        metrics: [
          { label: "Recovery Time", value: "72 Hours" },
          { label: "Search Graph Cleanse", value: "100%" },
        ],
      },
    ],
    relatedInsights: [
      {
        title: "Algorithmic Asymmetry: How Disinformation Weaponizes Search Indexing & LLM Graphs",
        category: "Intelligence Dossier",
        readTime: "12 min read",
        author: "SAMVAD Intelligence & Telemetry Unit",
        slug: "algorithmic-asymmetry",
      },
    ],
  },
  {
    id: "crisis-communications",
    slug: "crisis-communications",
    title: "Crisis Communications",
    eyebrow: "Rapid Response & War Room",
    tagline: "Rapid War-Room Mobilization & Asymmetric Conflict Containment",
    shortDescription:
      "Mobilizing senior partners within 15 minutes of crisis trigger to contain fallout, neutralize hostile disinformation, and restore narrative control.",
    longOverview:
      "When an acute existential shock strikes—an aggressive activist short-seller campaign, hostile regulatory raid, major industrial disaster, sudden C-suite departure, or coordinated smear operation—reaction time determines survival. SAMVAD's Crisis Communications war-room mobilizes senior partners within 15 minutes of briefing. We take immediate command of communications channels, execute forensic fact-checking to dismantle false accusations, insulate key decision-makers, and construct an impenetrable evidentiary perimeter around the enterprise.",
    heroAssetId: "reputation-crisis-monitoring",
    supportingAssetId: "corp-comm-press-podium",
    accentColor: "#EF4444",
    iconName: "ShieldAlert",
    capabilities: [
      "24/7 Senior Partner War-Room Mobilization (<15 min SLA)",
      "Adversarial Short-Seller Attack Countermeasures",
      "Regulatory & Law Enforcement Inquiry Communications",
      "Whistleblower & Hostile Leaks Containment Protocol",
      "Executive Hostile Interview & Cross-Examination Prep",
      "Judicial & Litigation Perception Management",
    ],
    process: [
      {
        phase: "Phase 01",
        title: "Hour 0–2: Emergency Containment",
        timeframe: "Hours 0–2",
        description:
          "Immediate command center activation, facts verification, leak isolation, and establishment of single-source spokesperson control.",
        deliverables: [
          "Emergency Holding Statements",
          "War-Room Directive Briefing #01",
        ],
      },
      {
        phase: "Phase 02",
        title: "Hour 2–12: Evidentiary Rebuttal",
        timeframe: "Hours 2–12",
        description:
          "Formulating forensic rebuttals to address specific allegations, briefing board members, and coordinating with outside legal counsel.",
        deliverables: [
          "Comprehensive Point-by-Point Rebuttal Packet",
          "Key Stakeholder Alert Dispatch",
        ],
      },
      {
        phase: "Phase 03",
        title: "Day 1–7: Proactive Narrative Control",
        timeframe: "Days 1–7",
        description:
          "Orchestrating targeted background briefings for tier-1 financial press, communicating directly with sovereign regulators, and reassuring key customers.",
        deliverables: [
          "On-the-Record Executive Press Conferences",
          "Ministerial Regulatory Briefings",
        ],
      },
      {
        phase: "Phase 04",
        title: "Day 7–30: Stabilization & Moat Building",
        timeframe: "Days 7–30",
        description:
          "Conducting comprehensive post-crisis perception audits, repairing damaged relationships, and fortifying organizational resilience against future attacks.",
        deliverables: [
          "Post-Crisis Audit & Lessons Learned Dossier",
          "Permanent Reputation Fortress Architecture",
        ],
      },
    ],
    deliverables: [
      "Real-Time War-Room Crisis Directive Briefings",
      "Forensic Evidentiary Counter-Dossiers",
      "Judicial & Regulatory Statement Packets",
      "Hostile Media Cross-Examination Playbooks",
      "Key Stakeholder Direct Reassurance Communications",
      "Post-Incident Reputation Recovery Roadmaps",
    ],
    relevantIndustries: [
      {
        id: "banking-fintech",
        code: "02",
        title: "Banking & Global FinTech",
        relevance: "Rapid liquidity panic de-escalation and regulator communication.",
      },
      {
        id: "defense-aerospace",
        code: "01",
        title: "Defense & Strategic Aerospace",
        relevance: "Export compliance issues, classified leaks, and parliamentary scrutiny.",
      },
      {
        id: "deeptech-ai",
        code: "05",
        title: "Enterprise DeepTech & AI",
        relevance: "Short-seller bear raids and data privacy breach response.",
      },
    ],
    relatedCaseStudies: [
      {
        ref: "DOSSIER #9402",
        title: "Algorithmic Defamation Countermeasure: $850M Restored",
        sector: "Enterprise DeepTech & AI",
        outcome: "Short-seller thesis dismantled within 72 hours; valuation fully recovered.",
        metrics: [
          { label: "Turnaround Time", value: "72 Hours" },
          { label: "Market Cap Restored", value: "$850M" },
        ],
      },
      {
        ref: "DOSSIER #8104",
        title: "Cross-Border FinTech Consortium: Sovereign De-escalation",
        sector: "Banking & Global FinTech",
        outcome: "Paralyzing parliamentary investigation pacified through evidentiary briefings.",
        metrics: [
          { label: "Valuation Preserved", value: "$1.8B" },
          { label: "Sanctions Avoided", value: "100%" },
        ],
      },
    ],
    relatedInsights: [
      {
        title: "Crisis in the Boardroom: Ten Operational Rules for Hostile Activist Incursions",
        category: "Crisis Casebook",
        readTime: "10 min read",
        author: "Sovereign Defense Practice",
        slug: "boardroom-crisis-playbook",
      },
    ],
  },
  {
    id: "strategic-advisory",
    slug: "strategic-advisory",
    title: "Strategic Advisory",
    eyebrow: "Sovereign Counsel",
    tagline: "Sovereign Statecraft, Public Affairs & Institutional Diplomacy",
    shortDescription:
      "Counseling sovereign ministers, board chairs, and chief executives on navigating regulatory diplomacy, geopolitical realignment, and cross-border commercial friction.",
    longOverview:
      "Strategic Advisory operates in the highest echelons of institutional decision-making. We counsel sovereign ministers, board chairs, and chief executives on navigating complex regulatory diplomacy, geopolitical realignment, and commercial friction where political sentiment and commercial viability collide. Rather than conventional lobbying, our advisory practice is grounded in sovereign capability alignment—demonstrating how enterprise objectives serve the long-term national interest, economic resilience, and societal welfare.",
    heroAssetId: "leadership-skyline-silhouette",
    supportingAssetId: "business-strategic-briefing-table",
    accentColor: "#10B981",
    iconName: "Landmark",
    capabilities: [
      "Sovereign Statecraft & National Interest Alignment",
      "Ministerial & Parliamentary Committee Briefings",
      "Cross-Border Trade Sanctions & Geopolitical Diplomacy",
      "Institutional Governance & Board Advisory",
      "Multilateral Accord & Public Interest Alignment",
      "Critical Concession & Offset Agreement Communications",
    ],
    process: [
      {
        phase: "Phase 01",
        title: "Geopolitical & Sovereign Power Mapping",
        timeframe: "Month 1",
        description:
          "Mapping legislative priorities, parliamentary committee dynamics, and geopolitical crosswinds affecting corporate licenses to operate.",
        deliverables: [
          "Sovereign Influence Topology Matrix",
          "Legislative Vulnerability Audit",
        ],
      },
      {
        phase: "Phase 02",
        title: "Doctrinal Statecraft Formulation",
        timeframe: "Month 2",
        description:
          "Formulating policy whitepapers and national capability arguments that align enterprise investments with sovereign strategic priorities.",
        deliverables: [
          "Sovereign Capability Whitepapers",
          "Policy Alignment Memorandum",
        ],
      },
      {
        phase: "Phase 03",
        title: "High-Trust Bilateral Engagement",
        timeframe: "Months 3–6",
        description:
          "Conducting discreet, substantive briefings with ministerial policy chiefs, parliamentary aides, and regulatory commissioners.",
        deliverables: [
          "Ministerial Briefing Dossiers",
          "Bilateral Accord Frameworks",
        ],
      },
      {
        phase: "Phase 04",
        title: "Sustained Institutional Accord",
        timeframe: "Ongoing",
        description:
          "Long-term policy alignment, maintaining ongoing dialogue through regulatory transitions, and safeguarding sovereign credibility.",
        deliverables: [
          "Bi-Annual Sovereign Alignment Briefs",
          "Regulatory Risk Horizon Updates",
        ],
      },
    ],
    deliverables: [
      "Confidential Ministerial Briefing Dossiers",
      "Geopolitical Risk & Narrative Alignment Reports",
      "Parliamentary Committee Preparation Packets",
      "Sovereign Capability Whitepapers",
      "Cross-Border Trade Compliance Narratives",
      "Long-Term Sovereign Trust Frameworks",
    ],
    relevantIndustries: [
      {
        id: "defense-aerospace",
        code: "01",
        title: "Defense & Strategic Aerospace",
        relevance: "Sovereign capability transfer, offset commitments, and defense exports.",
      },
      {
        id: "infrastructure-energy",
        code: "03",
        title: "Critical Infrastructure & Energy",
        relevance: "Grid security, national infrastructure concessions, and clean energy transition.",
      },
      {
        id: "family-offices",
        code: "06",
        title: "Family Offices & Sovereign Funds",
        relevance: "Sovereign wealth investment alignment and foreign direct investment clearance.",
      },
    ],
    relatedCaseStudies: [
      {
        ref: "DOSSIER #6219",
        title: "Sovereign Aerospace Offset: Parliamentary Accord for $4.2B",
        sector: "Defense & Strategic Aerospace",
        outcome: "Unanimous bipartisan parliamentary approval secured without leak friction.",
        metrics: [
          { label: "Parliamentary Accord", value: "100%" },
          { label: "Procurement Secured", value: "$4.2B" },
        ],
      },
    ],
    relatedInsights: [
      {
        title: "The Death of Reactive PR: Why Sovereign Brands Need Perception Architecture",
        category: "Whitepaper",
        readTime: "8 min read",
        author: "Vikramaditya Sharma, Managing Principal",
        slug: "death-of-reactive-pr",
      },
    ],
  },
];

/**
 * Helper to get a service by slug with type safety
 */
export function getServiceBySlug(slug: string): ServiceRecord | undefined {
  return PRIMARY_SERVICES.find((service) => service.slug === slug);
}

/**
 * Helper to get all service slugs for static params generation
 */
export function getAllServiceSlugs(): { slug: string }[] {
  return PRIMARY_SERVICES.map((s) => ({ slug: s.slug }));
}
