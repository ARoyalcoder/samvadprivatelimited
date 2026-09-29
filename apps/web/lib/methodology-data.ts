import { z } from "zod";

export const MethodologyStageSchema = z.object({
  id: z.string(),
  num: z.string(),
  name: z.string(),
  title: z.string(),
  eyebrow: z.string(),
  tagline: z.string(),
  explanation: z.string(),
  activities: z.array(z.string()),
  outputs: z.array(z.string()),
  visualMode: z.enum([
    "listen",
    "analyze",
    "strategize",
    "engage",
    "amplify",
    "measure",
  ]),
  telemetry: z.object({
    status: z.string(),
    signalCoherence: z.string(),
    networkDensity: z.string(),
    entropyReduction: z.string(),
  }),
  quote: z.string(),
});

export type MethodologyStage = z.infer<typeof MethodologyStageSchema>;

export const METHODOLOGY_STAGES: MethodologyStage[] = [
  {
    id: "stage-01-listen",
    num: "01",
    name: "LISTEN",
    title: "Horizon Listening & Sensory Topology",
    eyebrow: "Sensory Intake & Early Signal Detection",
    tagline: "Capturing unvarnished sentiment across regulatory, digital, and editorial corridors.",
    explanation:
      "Perception cannot be shaped until it is comprehensively perceived. In Stage 01, we deploy passive computational listening, stakeholder discourse tracking, and confidential corridor monitoring to map the ambient information field. We capture latent discontent, emerging regulatory concerns, and whispered competitor maneuvers 60–90 days before they escalate into public consciousness.",
    activities: [
      "Algorithmic search index and social graph listening sweeps",
      "Key Opinion Leader (KOL) discourse and alignment audits",
      "Parliamentary, ministerial, and regulatory filing telemetry",
      "Confidential stakeholder and analyst perception baseline interviews",
      "Dark web, paste-site, and activist coordination channel monitoring",
    ],
    outputs: [
      "Comprehensive Ambient Discourse Audit",
      "Baseline Stakeholder Perception Index",
      "Pre-Crisis Vulnerability Risk Map",
      "Key Influencer Sentiment Topology",
    ],
    visualMode: "listen",
    telemetry: {
      status: "PASSIVE HORIZON RADAR ACTIVE",
      signalCoherence: "42.8% [Diffuse]",
      networkDensity: "148 Monitored Nodes",
      entropyReduction: "Baseline Recorded",
    },
    quote:
      "The most dangerous crises are not those loudly declared, but those quietly gathering momentum in back channels. True listening precedes all strategy.",
  },
  {
    id: "stage-02-analyze",
    num: "02",
    name: "ANALYZE",
    title: "Forensic Dissection & Network Topology",
    eyebrow: "Quantitative Intelligence & Root Cause Attribution",
    tagline: "Distilling signals from adversarial noise and attributing narrative vectors.",
    explanation:
      "Raw data is meaningless without forensic interpretation. In Stage 02, our intelligence analysts dissect captured signals using computational sentiment topology and qualitative statecraft. We separate organic public concern from coordinated adversarial botnets, evaluate legislative crosswinds, and identify the nodal influence centers where perception is actively forged.",
    activities: [
      "Computational media graph clustering and botnet attribution",
      "Discourse entropy and semantic divergence scoring",
      "Legislative and regulatory cross-impact vulnerability modeling",
      "Adversary intent and opposition financing flow forensics",
      "Executive and brand vulnerability stress testing",
    ],
    outputs: [
      "Attributed Narrative Vector Dossier",
      "Adversarial Coordination Forensic Map",
      "Regulatory Exposure & Sanctions Likelihood Scorecard",
      "Target Stakeholder Influence Graph",
    ],
    visualMode: "analyze",
    telemetry: {
      status: "FORENSIC VECTOR ANALYSIS RUNNING",
      signalCoherence: "68.4% [Clustered]",
      networkDensity: "32 Focal Clusters",
      entropyReduction: "-38% Noise Suppressed",
    },
    quote:
      "Disinformation relies on perceived complexity. Through forensic network analysis, we isolate the actors, motives, and vectors behind the assault.",
  },
  {
    id: "stage-03-strategize",
    num: "03",
    name: "STRATEGIZE",
    title: "Narrative Genesis & Doctrinal Architecture",
    eyebrow: "Sovereign Thesis & Evidentiary Formulation",
    tagline: "Constructing an unassailable institutional thesis that commands authority.",
    explanation:
      "Strategy is the architectural blueprint of influence. In Stage 03, we synthesize verified operational facts, legal constraints, and commercial imperatives into an unassailable sovereign narrative. We formulate rigorous holding statements, ministerial briefing packages, and evidentiary counter-dossiers that withstand hostile media scrutiny and regulatory interrogation.",
    activities: [
      "Core sovereign narrative doctrine and positioning formulation",
      "Point-by-point evidentiary counter-dossier drafting",
      "Hostile scenario rehearsal and executive stress-testing",
      "Bilateral ministerial policy paper preparation",
      "Cross-functional legal, regulatory, and financial message alignment",
    ],
    outputs: [
      "Institutional Narrative Playbook",
      "Forensic Evidentiary Fact Dossiers",
      "Simulated War-Room Defense Manual",
      "Executive Hostile Interview Protocols",
    ],
    visualMode: "strategize",
    telemetry: {
      status: "SOVEREIGN THESIS ANCHORED",
      signalCoherence: "91.2% [Coherent]",
      networkDensity: "Single Unified Core",
      entropyReduction: "-64% Distortion Defended",
    },
    quote:
      "A weak defense reacts to every accusation. A sovereign strategy reframes the battlefield so every subsequent debate occurs on your terms.",
  },
  {
    id: "stage-04-engage",
    num: "04",
    name: "ENGAGE",
    title: "High-Trust Bilateral Deployment",
    eyebrow: "Diplomatic Corridors & Direct Counsel",
    tagline: "Connecting with key decision-makers through high-trust, confidential channels.",
    explanation:
      "The most consequential communication happens behind closed doors. In Stage 04, we execute high-trust bilateral engagements with government ministers, parliamentary committee aides, top-50 institutional investors, and tier-1 bureau chiefs. We deploy verified evidentiary briefings directly to decision-makers before public announcements are made.",
    activities: [
      "Confidential ministerial and legislative briefing sessions",
      "Off-the-record background sessions with key financial editors",
      "Institutional investor and proxy advisor consensus alignment",
      "Regulatory commissioner bilateral compliance consultations",
      "Sovereign wealth fund and strategic partner debriefings",
    ],
    outputs: [
      "Bilateral Ministerial Accord Briefings",
      "Executed Regulatory Compliance Memorandums",
      "Tier-1 Editor Background Briefing Packets",
      "Institutional Investor Support Statements",
    ],
    visualMode: "engage",
    telemetry: {
      status: "BILATERAL CORRIDORS SYNCHRONIZED",
      signalCoherence: "96.5% [High Alignment]",
      networkDensity: "Direct Corridors Established",
      entropyReduction: "-82% Asymmetry Resolved",
    },
    quote:
      "Authority is not won by shouting in the public square. It is established through disciplined, bilateral counsel in corridors of power.",
  },
  {
    id: "stage-05-amplify",
    num: "05",
    name: "AMPLIFY",
    title: "Channel Orchestration & Resonance",
    eyebrow: "Coordinated Public & Digital Dissemination",
    tagline: "Projecting the narrative across earned media, search indices, and institutional platforms.",
    explanation:
      "When the evidentiary foundation is secured and key stakeholders are aligned, we project the narrative into the broader ecosystem. In Stage 05, we orchestrate coordinated announcements across national press wires, high-authority digital publications, executive keynote stages, and search knowledge graphs, ensuring harmonious resonance across all touchpoints.",
    activities: [
      "Multi-jurisdiction coordinated announcement rollouts",
      "Tier-1 editorial exclusive placements and investigative rebuttals",
      "Search engine and generative AI knowledge graph remediation",
      "Keynote executive platform and public symposium addresses",
      "Third-party academic and industry expert validation",
    ],
    outputs: [
      "Global Editorial Placement Series",
      "High-Authority Evidentiary Indexing Networks",
      "Public Statement & Disclosure Clearances",
      "Sanitized Algorithmic Search Presence",
    ],
    visualMode: "amplify",
    telemetry: {
      status: "MAXIMUM RESONANCE REACHED",
      signalCoherence: "98.9% [Harmonic]",
      networkDensity: "Global Propagation Network",
      entropyReduction: "-92% Noise Displaced",
    },
    quote:
      "Amplification without strategy is mere noise. Amplification grounded in truth is an unassailable institutional shield.",
  },
  {
    id: "stage-06-measure",
    num: "06",
    name: "MEASURE",
    title: "Longitudinal Telemetry & Moat Defense",
    eyebrow: "Telemetry Verification & Permanent Insulation",
    tagline: "Verifying sentiment turnaround, protecting valuations, and locking in authority.",
    explanation:
      "Perception advisory is never a one-time transaction. In Stage 06, we measure longitudinal sentiment delta, track balance-sheet valuation resilience, and continuously audit knowledge graphs for latent drift. We establish a permanent reputational fortress that preserves leadership mandates across generational horizons.",
    activities: [
      "Longitudinal stakeholder sentiment delta benchmarking",
      "Enterprise valuation discount mitigation tracking",
      "Continuous algorithmic search knowledge-graph auditing",
      "Annual sovereign trust and reputational health scoring",
      "Long-term legislative accord and policy risk recalibration",
    ],
    outputs: [
      "Annual Sovereign Perception Scorecard",
      "Valuation Preservation & ROI Audit",
      "Permanent Knowledge-Graph Moat Architecture",
      "Board-Level Longitudinal Governance Dossier",
    ],
    visualMode: "measure",
    telemetry: {
      status: "PERMANENT MOAT ESTABLISHED",
      signalCoherence: "99.4% [Stabilized Fortress]",
      networkDensity: "Protected Sovereign Lattice",
      entropyReduction: "Zero Leakage / Fully Insulated",
    },
    quote:
      "The ultimate validation of perception architecture is not what happens today, but the enduring trust that shields the enterprise tomorrow.",
  },
];
