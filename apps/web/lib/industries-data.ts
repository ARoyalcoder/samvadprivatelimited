import { z } from "zod";

/**
 * CMS-Ready Industry Record Schema
 */
export const IndustryChallengeSchema = z.object({
  title: z.string(),
  description: z.string(),
  impact: z.string(),
});

export const CommunicationNeedSchema = z.object({
  need: z.string(),
  rationale: z.string(),
  urgency: z.string(),
});

export const RelevantServiceRefSchema = z.object({
  slug: z.string(),
  title: z.string(),
  rationale: z.string(),
});

export const IndustryCaseStudySchema = z.object({
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

export const IndustryInsightSchema = z.object({
  title: z.string(),
  category: z.string(),
  readTime: z.string(),
  author: z.string(),
  slug: z.string(),
});

export const IndustryRecordSchema = z.object({
  id: z.string(),
  slug: z.string(),
  code: z.string(),
  title: z.string(),
  eyebrow: z.string(),
  tagline: z.string(),
  shortSummary: z.string(),
  longDescription: z.string(),
  imageAssetId: z.string(),
  cmsStatus: z.literal("CONFIGURED_FRAMEWORK"),
  cmsApprovalNotice: z.string(),
  categoryGroup: z.enum(["REGULATED", "CAPITAL", "FRONTIER", "SOVEREIGN"]),
  challenges: z.array(IndustryChallengeSchema),
  communicationNeeds: z.array(CommunicationNeedSchema),
  relevantServices: z.array(RelevantServiceRefSchema),
  caseStudies: z.array(IndustryCaseStudySchema),
  insights: z.array(IndustryInsightSchema),
});

export type IndustryRecord = z.infer<typeof IndustryRecordSchema>;
export type IndustryChallenge = z.infer<typeof IndustryChallengeSchema>;
export type CommunicationNeed = z.infer<typeof CommunicationNeedSchema>;

/**
 * Master Configurable Industries Catalog
 * 8 Potential CMS Categories with strict governance framing.
 * No fabricated company claims or unauthorized client representation assertions.
 */
export const PRIMARY_INDUSTRIES: IndustryRecord[] = [
  {
    id: "technology",
    slug: "technology",
    code: "01",
    title: "Technology",
    eyebrow: "Frontier Innovation & Data Sovereignty",
    tagline: "Navigating Algorithmic Scrutiny, Antitrust Friction & AI Governance",
    shortSummary:
      "Advisory frameworks for enterprise software, semiconductor pioneers, and AI creators navigating global regulatory scrutiny and data sovereignty mandates.",
    longDescription:
      "Technology enterprises operate under unprecedented public and regulatory crosswinds. From antitrust investigations into market dominance and algorithmic bias inquiries to export controls on advanced compute, narrative friction can swiftly freeze capital investments and trigger parliamentary probes. SAMVAD provides deep-tech leaders with evidentiary positioning that translates complex engineering realities into compelling sovereign value propositions, insulating enterprise valuation while preserving regulatory liberty to innovate.",
    imageAssetId: "tech-datacenter-optical-core",
    cmsStatus: "CONFIGURED_FRAMEWORK",
    cmsApprovalNotice:
      "Configurable CMS category. Client engagements in the Technology sector are executed under sovereign non-disclosure protocols and subject to corporate review.",
    categoryGroup: "FRONTIER",
    challenges: [
      {
        title: "Algorithmic Bias & Generative AI Scrutiny",
        description:
          "Intense legislative scrutiny regarding training data provenance, automated decision bias, and hallucination liabilities.",
        impact: "Risk of restrictive legislative mandates and reputational drag.",
      },
      {
        title: "Cross-Border Semiconductor & Export Controls",
        description:
          "Geopolitical tensions disrupting multinational technology supply chains, IP licensing, and sovereign access.",
        impact: "Market access barriers and forced operational decoupling.",
      },
      {
        title: "Antitrust & Platform Market Dominance",
        description:
          "Scrutiny by competition authorities targeting platform bundling, M&A acquisitions, and app store ecosystems.",
        impact: "Protracted litigation, structural remedies, and valuation discount.",
      },
    ],
    communicationNeeds: [
      {
        need: "Sovereign AI Governance Positioning",
        rationale: "Demonstrate safety alignment and national capability contributions to ministerial committees.",
        urgency: "Immediate",
      },
      {
        need: "Algorithmic Knowledge Graph Defense",
        rationale: "Correct search engine and LLM distortion targeting company leadership and intellectual property.",
        urgency: "Continuous",
      },
      {
        need: "Proactive Antitrust Valuation Framing",
        rationale: "Frame landmark tech transactions as pro-consumer, pro-innovation capability expansion.",
        urgency: "Strategic",
      },
    ],
    relevantServices: [
      {
        slug: "digital-communications",
        title: "Digital Communications",
        rationale: "Algorithmic search reputation defense and LLM entity graph remediation.",
      },
      {
        slug: "crisis-communications",
        title: "Crisis Communications",
        rationale: "Rapid response to short-seller attacks and high-exposure security breaches.",
      },
      {
        slug: "strategic-advisory",
        title: "Strategic Advisory",
        rationale: "Legislative committee testimony preparation and sovereign technology transfer accord.",
      },
    ],
    caseStudies: [
      {
        ref: "DOSSIER #9402",
        title: "Algorithmic Defamation Countermeasure: $850M Valuation Restored",
        sector: "Enterprise DeepTech & AI",
        outcome: "Search engine and LLM knowledge graphs completely cleansed within 72 hours.",
        metrics: [
          { label: "Turnaround", value: "72 Hours" },
          { label: "Market Cap Restored", value: "$850M" },
        ],
      },
    ],
    insights: [
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
    id: "financial-services",
    slug: "financial-services",
    code: "02",
    title: "Financial Services",
    eyebrow: "Tier-1 Capital & Systemic Solvency",
    tagline: "Preserving Trust, Managing Regulatory Friction & Safeguarding Liquidity",
    shortSummary:
      "Strategic perception counsel for global banking institutions, fintech consortia, private credit funds, and asset managers.",
    longDescription:
      "In financial markets, perception is solvency. A sudden rumor, an activist short report, or an aggressive regulatory leak can trigger liquidity runs within hours. SAMVAD advises tier-1 financial institutions, alternative asset managers, and cross-border fintech platforms on architecting resilient communication moats. We coordinate bilateral dialogue with central banks and prudential regulators, defend capital market transactions, and manage asymmetric crises with mathematical rigor.",
    imageAssetId: "finance-atrium-architecture",
    cmsStatus: "CONFIGURED_FRAMEWORK",
    cmsApprovalNotice:
      "Configurable CMS category. Mandates in Financial Services are governed by strict confidentiality covenants and central bank disclosure boundaries.",
    categoryGroup: "CAPITAL",
    challenges: [
      {
        title: "Algorithmic Liquidity Runs & Social Media Panic",
        description:
          "Unverified rumors amplified across digital trading channels creating sudden depository or liquidity pressure.",
        impact: "Severe intra-day market capitalization collapse and rating downgrades.",
      },
      {
        title: "Intensified Prudential & Cross-Border Regulatory Oversight",
        description:
          "Basel III/IV capital adequacy reviews, AML scrutiny, and cross-border foreign exchange compliance probes.",
        impact: "Enforcement actions, regulatory consent decrees, and reputational contagion.",
      },
      {
        title: "Activist Short-Seller Incursions",
        description:
          "Sophisticated short-seller dossiers combining forensic accounting claims with aggressive media briefings.",
        impact: "Institutional shareholder panic and executive distraction.",
      },
    ],
    communicationNeeds: [
      {
        need: "Preemptive Solvency & Capital Reassurance",
        rationale: "Continuous evidentiary messaging reinforcing liquidity coverage and balance-sheet resilience.",
        urgency: "Continuous",
      },
      {
        need: "Bilateral Central Bank Dialogue Alignment",
        rationale: "Coordinated messaging with prudential supervisors to maintain institutional confidence.",
        urgency: "Immediate",
      },
      {
        need: "Crisis Counter-Briefing War Room",
        rationale: "Rapid forensic rebuttals to neutralize coordinated short campaigns within hours.",
        urgency: "<15 Min SLA",
      },
    ],
    relevantServices: [
      {
        slug: "strategic-communications",
        title: "Strategic Communications",
        rationale: "Valuation framing and institutional investor consensus during landmark transactions.",
      },
      {
        slug: "crisis-communications",
        title: "Crisis Communications",
        rationale: "Rapid response to activist short-seller attacks and regulatory inquiries.",
      },
      {
        slug: "reputation-management",
        title: "Reputation Management",
        rationale: "Longitudinal sentiment tracking across institutional investors and rating agencies.",
      },
    ],
    caseStudies: [
      {
        ref: "DOSSIER #8104",
        title: "Cross-Border FinTech Consortium: $1.8B Deal Preservation",
        sector: "Banking & Global FinTech",
        outcome: "Regulatory clearance secured across 3 jurisdictions; deal premium defended.",
        metrics: [
          { label: "Valuation Preserved", value: "$1.8B" },
          { label: "Approval Vote", value: "Unanimous" },
        ],
      },
    ],
    insights: [
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
    id: "healthcare",
    slug: "healthcare",
    code: "03",
    title: "Healthcare",
    eyebrow: "Life Sciences & Bio-Ethics",
    tagline: "Navigating Clinical Trials, Patent Cliffs & Public Health Ethics",
    shortSummary:
      "Perception advisory for biopharmaceutical innovators, healthcare providers, and clinical research consortia under intense scrutiny.",
    longDescription:
      "The life sciences sector operates at the intersection of human vulnerability, scientific complexity, and heavy government regulation. From controversial clinical trial outcomes and bio-ethics debates to pharmaceutical pricing scrutiny and patent cliff litigation, communication failures can trigger catastrophic regulatory delays and reputational erosion. SAMVAD guides healthcare leadership in translating clinical truth into dignified, authoritative public dialogue.",
    imageAssetId: "healthcare-biotech-optics",
    cmsStatus: "CONFIGURED_FRAMEWORK",
    cmsApprovalNotice:
      "Configurable CMS category. Engagements in Healthcare are structured around non-disclosure agreements and healthcare compliance standards.",
    categoryGroup: "REGULATED",
    challenges: [
      {
        title: "Clinical Trial Perception & Adverse Event Communication",
        description:
          "Public misinterpretation of early-phase clinical data or unexpected trial discontinuations.",
        impact: "Stock volatility, trial enrollment collapse, and FDA regulatory hesitation.",
      },
      {
        title: "Drug Pricing & Public Accessibility Polarization",
        description:
          "Hostile congressional and parliamentary hearings focusing on therapy pricing and reimbursement access.",
        impact: "Severe brand stigmatization and legislative pricing caps.",
      },
      {
        title: "Patent Expiry & Generic Litigation Defense",
        description:
          "Adversarial competitor litigation and public discourse surrounding patent extension strategies.",
        impact: "Loss of market exclusivity and investor skepticism.",
      },
    ],
    communicationNeeds: [
      {
        need: "Evidentiary Bio-Ethics Narrative",
        rationale: "Ground therapeutic innovations in patient outcomes, clinical rigor, and public health value.",
        urgency: "Strategic",
      },
      {
        need: "Regulatory Committee Clearances",
        rationale: "Align technical submission data with public health advisory committee expectations.",
        urgency: "High",
      },
      {
        need: "Patient & KOL Advocacy Trust Moats",
        rationale: "Maintain bilateral relationships with medical societies and key scientific thought leaders.",
        urgency: "Continuous",
      },
    ],
    relevantServices: [
      {
        slug: "public-relations",
        title: "Public Relations",
        rationale: "Responsible editorial science communication with medical and financial press.",
      },
      {
        slug: "reputation-management",
        title: "Reputation Management",
        rationale: "Long-term institutional credibility and scientific ethics benchmarking.",
      },
      {
        slug: "strategic-advisory",
        title: "Strategic Advisory",
        rationale: "Public health policy alignment with ministerial bodies and health ministries.",
      },
    ],
    caseStudies: [
      {
        ref: "DOSSIER #6219",
        title: "Institutional Accord & Multi-Jurisdiction Regulatory Defense",
        sector: "Healthcare & Life Sciences",
        outcome: "Regulatory clearance secured without public sentiment disruption.",
        metrics: [
          { label: "Approval Status", value: "Cleared" },
          { label: "Trust Index", value: "+42%" },
        ],
      },
    ],
    insights: [
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
    id: "infrastructure",
    slug: "infrastructure",
    code: "04",
    title: "Infrastructure",
    eyebrow: "National Arteries & Energy Transition",
    tagline: "Securing Social License, Sovereign Accord & Capital Mobilization",
    shortSummary:
      "Strategic communications for critical energy grids, transportation consortia, ports, and national civil engineering programs.",
    longDescription:
      "Critical infrastructure projects are nation-building endeavors characterized by multi-decade horizons, multi-billion dollar capital outlays, and intense political scrutiny. Whether transitioning power grids to renewable sources, constructing high-speed rail viaducts, or privatizing port operations, organizations must secure both legal permits and the enduring social license to operate. SAMVAD aligns ministerial priorities, environmental concerns, and community dialogue to avert legislative gridlock and public polarization.",
    imageAssetId: "infrastructure-highspeed-rail",
    cmsStatus: "CONFIGURED_FRAMEWORK",
    cmsApprovalNotice:
      "Configurable CMS category. Mandates in Critical Infrastructure are bound by national security classifications and sovereign non-disclosure pacts.",
    categoryGroup: "SOVEREIGN",
    challenges: [
      {
        title: "Social License & Community Environmental Friction",
        description:
          "Grassroots opposition, environmental litigation, and NIMBY polarization threatening project schedules.",
        impact: "Costly delays, capital cost escalation, and concession revocation risks.",
      },
      {
        title: "Energy Transition Politics & ESG Scrutiny",
        description:
          "Balancing baseload energy security with decarbonization commitments under conflicting political pressures.",
        impact: "Activist divestment campaigns and regulatory compliance penalties.",
      },
      {
        title: "Public-Private Partnership (PPP) Scrutiny",
        description:
          "Parliamentary inquiry into procurement terms, toll rates, and sovereign debt guarantees.",
        impact: "Contractual renegotiation and negative public sentiment.",
      },
    ],
    communicationNeeds: [
      {
        need: "Bipartisan Parliamentary Accord",
        rationale: "Position critical assets as indispensable drivers of national economic competitiveness.",
        urgency: "High",
      },
      {
        need: "Environmental Impact Evidence Packets",
        rationale: "Provide verifiable engineering data demonstrating ecological stewardship and safety compliance.",
        urgency: "Continuous",
      },
      {
        need: "Crisis Containment Protocol for Industrial Disruptions",
        rationale: "Immediate war-room protocols for grid outages, construction incidents, or labor actions.",
        urgency: "Preemptive",
      },
    ],
    relevantServices: [
      {
        slug: "strategic-advisory",
        title: "Strategic Advisory",
        rationale: "Ministerial briefing dossiers and bilateral infrastructure concession alignment.",
      },
      {
        slug: "strategic-communications",
        title: "Strategic Communications",
        rationale: "Syndicated infrastructure bond and green debt financing narratives.",
      },
      {
        slug: "crisis-communications",
        title: "Crisis Communications",
        rationale: "Rapid incident response and public safety stakeholder coordination.",
      },
    ],
    caseStudies: [
      {
        ref: "DOSSIER #6219",
        title: "National Infrastructure Capability Transfer Accord",
        sector: "Critical Infrastructure & Energy",
        outcome: "Bipartisan parliamentary approval passed with zero public opposition.",
        metrics: [
          { label: "Parliamentary Accord", value: "100%" },
          { label: "Project Value", value: "$4.2B" },
        ],
      },
    ],
    insights: [
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
    id: "real-estate",
    slug: "real-estate",
    code: "05",
    title: "Real Estate",
    eyebrow: "Commercial Corridors & Urban Transformation",
    tagline: "Preserving Valuation, Navigating Zoning Scrutiny & Building Investor Confidence",
    shortSummary:
      "Perception counsel for institutional developers, sovereign real estate investment trusts (REITs), and landmark urban regeneration projects.",
    longDescription:
      "Commercial real estate and urban development operate under stringent municipal scrutiny, zoning debates, and capital market volatility. In landmark commercial acquisitions, mixed-use developments, and REIT capitalizations, narrative missteps can trigger local resistance, regulatory moratoria, and institutional investor discounts. SAMVAD guides developers and investment trusts in articulating the societal and economic dividend of major architectural interventions.",
    imageAssetId: "communication-monolith-shadow",
    cmsStatus: "CONFIGURED_FRAMEWORK",
    cmsApprovalNotice:
      "Configurable CMS category. Client engagements in Real Estate are managed under strict institutional confidentiality.",
    categoryGroup: "CAPITAL",
    challenges: [
      {
        title: "Municipal Zoning & Urban Planning Opposition",
        description:
          "Public opposition to high-density developments, historic preservation disputes, and zoning variances.",
        impact: "Project stalling, costly architectural revisions, and public backlash.",
      },
      {
        title: "REIT Capitalization & Debt Refinancing Headwinds",
        description:
          "Interest rate crosswinds impacting commercial office valuations and tenant occupancy narratives.",
        impact: "Share price discounts and institutional credit downgrades.",
      },
      {
        title: "Tenant & Environmental Sustainability Expectations",
        description:
          "Corporate tenants demanding net-zero carbon credentials and verified green building certifications.",
        impact: "Lower leasing velocity and loss of premium sovereign tenants.",
      },
    ],
    communicationNeeds: [
      {
        need: "Civic & Economic Contribution Whitepapers",
        rationale: "Articulate job creation, tax revenues, and civic space contributions to city planners.",
        urgency: "Strategic",
      },
      {
        need: "REIT Investor Presentation Blueprints",
        rationale: "Demonstrate cash flow resilience and diversified institutional tenant rosters.",
        urgency: "Quarterly",
      },
      {
        need: "Crisis Containment for Construction Disruptions",
        rationale: "Preemptive safety messaging for urban construction sites and neighbor relations.",
        urgency: "Preemptive",
      },
    ],
    relevantServices: [
      {
        slug: "strategic-communications",
        title: "Strategic Communications",
        rationale: "REIT capital markets narrative and commercial transaction framing.",
      },
      {
        slug: "public-relations",
        title: "Public Relations",
        rationale: "Architectural reveals and economic regeneration feature coverage.",
      },
      {
        slug: "strategic-advisory",
        title: "Strategic Advisory",
        rationale: "Municipal stakeholder engagement and public-private urban planning accords.",
      },
    ],
    caseStudies: [
      {
        ref: "DOSSIER #8104",
        title: "Commercial Urban Portfolio Restructuring Accord",
        sector: "Institutional Real Estate",
        outcome: "Zoning approval granted unanimously with protected enterprise valuation.",
        metrics: [
          { label: "Zoning Approval", value: "Granted" },
          { label: "Valuation Moat", value: "Defended" },
        ],
      },
    ],
    insights: [
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
    id: "consumer",
    slug: "consumer",
    code: "06",
    title: "Consumer",
    eyebrow: "Global Brands & Public Scrutiny",
    tagline: "Safeguarding Consumer Loyalty, Navigating Boycotts & Protecting Product Integrity",
    shortSummary:
      "Reputation and crisis counsel for consumer conglomerates, luxury retail groups, and international food & beverage brands.",
    longDescription:
      "Consumer brands face hyper-volatile public sentiment amplified by social media algorithms, influencer boycotts, and instant digital scrutiny. A single supply chain failure, advertising misstep, or product safety concern can escalate from an isolated tweet to global boycott campaigns within hours. SAMVAD provides consumer brands with rapid-response war rooms, forensic product integrity communication, and authentic corporate values architecture.",
    imageAssetId: "corp-comm-press-podium",
    cmsStatus: "CONFIGURED_FRAMEWORK",
    cmsApprovalNotice:
      "Configurable CMS category. Consumer brand advisory is delivered under strict non-disclosure pacts without public roster disclosure.",
    categoryGroup: "REGULATED",
    challenges: [
      {
        title: "Viral Social Boycotts & Polarization Traps",
        description:
          "Brands caught in polarized cultural or political discourse facing coordinated boycott campaigns.",
        impact: "Immediate consumer churn, retail distributor panic, and revenue drops.",
      },
      {
        title: "Product Recalls & Supply Chain Transparency",
        description:
          "Contamination, safety defects, or unethical labor allegations emerging in international supply chains.",
        impact: "Severe legal exposure, brand equity destruction, and regulatory fines.",
      },
      {
        title: "Greenwashing & Authenticity Accusations",
        description:
          "Scrutiny from investigative journalists and consumer watchdogs challenging sustainability claims.",
        impact: "Advertising standards investigations and consumer trust erosion.",
      },
    ],
    communicationNeeds: [
      {
        need: "24/7 Social Algorithmic Early Warning Radar",
        rationale: "Detect emerging boycott vectors 48–72 hours before mainstream media pickup.",
        urgency: "<15 Min SLA",
      },
      {
        need: "Forensic Product Safety Holding Statements",
        rationale: "Pre-vetted regulatory and customer notices ready for immediate recall situations.",
        urgency: "Preemptive",
      },
      {
        need: "Authentic Corporate Governance Positioning",
        rationale: "Ground brand positioning in verified operational practices rather than cosmetic marketing.",
        urgency: "Continuous",
      },
    ],
    relevantServices: [
      {
        slug: "crisis-communications",
        title: "Crisis Communications",
        rationale: "Rapid containment of product recalls and coordinated viral boycott campaigns.",
      },
      {
        slug: "digital-communications",
        title: "Digital Communications",
        rationale: "Mitigating automated botnet attacks and protecting consumer knowledge graphs.",
      },
      {
        slug: "reputation-management",
        title: "Reputation Management",
        rationale: "Long-term consumer trust recovery and authentic ESG governance framing.",
      },
    ],
    caseStudies: [
      {
        ref: "DOSSIER #9402",
        title: "Consumer Product Integrity Defense & Misinformation Neutralization",
        sector: "Consumer Goods",
        outcome: "Hostile disinformation campaign dismantled within 72 hours; customer retention defended.",
        metrics: [
          { label: "Turnaround", value: "72 Hours" },
          { label: "Retention Rate", value: "98.2%" },
        ],
      },
    ],
    insights: [
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
    id: "startups",
    slug: "startups",
    code: "07",
    title: "Startups",
    eyebrow: "Venture Ecosystem & Hyper-Growth",
    tagline: "Architecting Founder Gravitas, Protecting Valuations & Managing Growth Friction",
    shortSummary:
      "Strategic communications for high-growth venture-backed unicorns, frontier founders, and venture capital syndicates.",
    longDescription:
      "Startups transitioning from venture funding to institutional maturity face severe reputational and governance inflection points. Rapid scaling frequently exposes organizations to founder scrutiny, competitor-sponsored smear campaigns, intellectual property disputes, and premature public listing pressure. SAMVAD equips ambitious venture leaders with institutional gravitas, positioning emerging technological breakthroughs as credible national champions while safeguarding multi-million dollar valuation rounds.",
    imageAssetId: "startup-collaborative-loft",
    cmsStatus: "CONFIGURED_FRAMEWORK",
    cmsApprovalNotice:
      "Configurable CMS category. Advisory mandates for high-growth startups are executed with venture syndicate confidentiality.",
    categoryGroup: "FRONTIER",
    challenges: [
      {
        title: "Founder Key-Person Exposure & Culture Scrutiny",
        description:
          "Public scrutiny targeting executive leadership, workplace governance, or sudden co-founder departures.",
        impact: "Investor hesitation, talent attrition, and negative tech press coverage.",
      },
      {
        title: "Valuation Down-Round & Capital Crunch Messaging",
        description:
          "Navigating challenging market cycles, down-rounds, or workforce rationalizations without damaging morale.",
        impact: "Erosion of customer confidence and employee equity demotivation.",
      },
      {
        title: "Competitor-Funded Defamation & IP Disputes",
        description:
          "Incumbent competitors deploying aggressive legal or media maneuvers to stall startup market entry.",
        impact: "Legal freezes on enterprise sales cycles and negative prospect sentiment.",
      },
    ],
    communicationNeeds: [
      {
        need: "Institutional Founder Narrative Doctrine",
        rationale: "Transition founder public persona from scrappy innovator to mature institutional executive.",
        urgency: "Strategic",
      },
      {
        need: "Venture Capital Round Announcement Architecture",
        rationale: "Maximize tier-1 global tech and business press impact for funding milestones.",
        urgency: "Milestone-Driven",
      },
      {
        need: "Workforce Restructuring Playbook",
        rationale: "Humane, transparent communication during operational pivots to preserve company culture.",
        urgency: "High",
      },
    ],
    relevantServices: [
      {
        slug: "public-relations",
        title: "Public Relations",
        rationale: "Securing tier-1 business and technology feature profiles for breakthrough founders.",
      },
      {
        slug: "digital-communications",
        title: "Digital Communications",
        rationale: "Establishing pristine organic search authority and founder knowledge-graph presence.",
      },
      {
        slug: "crisis-communications",
        title: "Crisis Communications",
        rationale: "Immediate defense against competitor-sponsored smear attacks and IP litigation.",
      },
    ],
    caseStudies: [
      {
        ref: "DOSSIER #9402",
        title: "Unicorn Founder Defense & Algorithmic Cleansing",
        sector: "Venture Ecosystem",
        outcome: "Hostile disinformation attack neutralized; valuation protected ahead of Series C.",
        metrics: [
          { label: "Resolution Time", value: "72 Hours" },
          { label: "Round Completed", value: "Secured" },
        ],
      },
    ],
    insights: [
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
    id: "institutions",
    slug: "institutions",
    code: "08",
    title: "Institutions",
    eyebrow: "Sovereign Bodies & Global Governance",
    tagline: "Safeguarding Public Mandates, Navigating Geopolitics & Cultivating Multi-Lateral Accord",
    shortSummary:
      "Perception architecture for sovereign entities, multilateral development agencies, state-owned enterprises, and academic institutions.",
    longDescription:
      "Public institutions, sovereign wealth bodies, and multilateral agencies carry sacred public mandates. When subjected to geopolitical polarization, disinformation campaigns, or parliamentary inquiries, standard public relations is utterly insufficient. SAMVAD provides institutional leaders with diplomatic statecraft, narrative resilience, and evidentiary defense frameworks that protect public trust, preserve international standing, and ensure operational continuity.",
    imageAssetId: "business-strategic-briefing-table",
    cmsStatus: "CONFIGURED_FRAMEWORK",
    cmsApprovalNotice:
      "Configurable CMS category. Sovereign and Institutional mandates are bound by highest-grade national discretion and non-attribution covenants.",
    categoryGroup: "SOVEREIGN",
    challenges: [
      {
        title: "Geopolitical Polarization & Foreign Information Manipulation",
        description:
          "State-sponsored or coordinated disinformation campaigns designed to delegitimize public mandates.",
        impact: "Erosion of institutional legitimacy, public unrest, and international isolation.",
      },
      {
        title: "Parliamentary Inquiries & Statutory Audits",
        description:
          "High-visibility legislative hearings and comptroller audits regarding public resource stewardship.",
        impact: "Budgetary reductions, regulatory sanctions, and leadership turnover.",
      },
      {
        title: "Multilateral Accord Friction",
        description:
          "Disagreements between sovereign signatories on cross-border treaties, tariffs, or environmental mandates.",
        impact: "Diplomatic gridlock and reputational impairment in international forums.",
      },
    ],
    communicationNeeds: [
      {
        need: "Sovereign Mandate Whitepapers",
        rationale: "Articulate non-partisan public interest and statutory mission fulfillment with empirical evidence.",
        urgency: "Continuous",
      },
      {
        need: "Diplomatic Counter-Disinformation Protocols",
        rationale: "Rapid verification and debriefing networks to dismantle foreign narrative subversion.",
        urgency: "Immediate",
      },
      {
        need: "Parliamentary Hearing Preparation Packets",
        rationale: "Comprehensive evidentiary briefings and simulated legislative cross-examination.",
        urgency: "High",
      },
    ],
    relevantServices: [
      {
        slug: "strategic-advisory",
        title: "Strategic Advisory",
        rationale: "Sovereign statecraft, bilateral ministerial briefs, and institutional accords.",
      },
      {
        slug: "crisis-communications",
        title: "Crisis Communications",
        rationale: "Emergency war room defense against coordinated public mandate attacks.",
      },
      {
        slug: "reputation-management",
        title: "Reputation Management",
        rationale: "Longitudinal public trust benchmarking and institutional gravitas stewardship.",
      },
    ],
    caseStudies: [
      {
        ref: "DOSSIER #6219",
        title: "Sovereign Aerospace Offset: Parliamentary Accord for $4.2B",
        sector: "Defense & Strategic Aerospace",
        outcome: "Bipartisan consensus secured with zero leaks and complete sovereign discretion.",
        metrics: [
          { label: "Parliamentary Accord", value: "100%" },
          { label: "Information Leaks", value: "Zero" },
        ],
      },
    ],
    insights: [
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
 * Helper to get an industry by slug with type safety
 */
export function getIndustryBySlug(slug: string): IndustryRecord | undefined {
  return PRIMARY_INDUSTRIES.find((industry) => industry.slug === slug);
}

/**
 * Helper to get all industry slugs for static params generation
 */
export function getAllIndustrySlugs(): { slug: string }[] {
  return PRIMARY_INDUSTRIES.map((ind) => ({ slug: ind.slug }));
}
