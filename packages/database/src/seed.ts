import {
  PrismaClient,
  ServiceType,
  IndustryType,
  InsightCategory,
  PublicationStatus,
} from "@prisma/client";

declare const process: {
  exit: (code?: number) => never;
};

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding SAMVAD PERCEPTION ADVISORY database...");

  // 1. Core Services
  const services = [
    {
      slug: "perception-intelligence",
      title: "Perception Intelligence & Predictive Sentiment",
      tagline:
        "Quantitative narrative tracking, stakeholder threat mapping, and real-time narrative arbitration.",
      serviceType: ServiceType.PERCEPTION_INTELLIGENCE,
      description:
        "We deploy advanced algorithmic listening, media network topology analysis, and institutional stakeholder profiling to identify narrative vulnerabilities before they manifest as crises.",
      capabilities: [
        "Real-time institutional discourse mapping",
        "Algorithmic sentiment trajectory modeling",
        "Key opinion leader (KOL) network analysis",
        "Counter-narrative pre-emption frameworks",
      ],
      deliverables: [
        "Bi-weekly Perception Threat Matrix",
        "Executive Sentiment Index",
        "Stakeholder Alignment Playbook",
      ],
      isFeatured: true,
      orderIndex: 1,
    },
    {
      slug: "crisis-reputation",
      title: "Crisis Architecture & Reputation Safeguard",
      tagline:
        "Rapid-response command center, adversarial communications defense, and enterprise brand resilience.",
      serviceType: ServiceType.CRISIS_REPUTATION,
      description:
        "When high-stakes crises strike, SAMVAD mobilizes war-room advisory within minutes. We orchestrate litigation communications, regulatory friction management, and executive shield maneuvers.",
      capabilities: [
        "24/7 Rapid Response Incident Command",
        "Regulatory & Parliamentary Inquiry Comms",
        "Litigation PR & Judicial Perception Management",
        "Hostile Takeover & Activist Shareholder Defense",
      ],
      deliverables: [
        "Crisis Protocol Playbook",
        "Media Blackout & Response Tree",
        "Executive Statements & Q&A Grids",
      ],
      isFeatured: true,
      orderIndex: 2,
    },
    {
      slug: "strategic-communications",
      title: "Strategic Communications & Executive Positioning",
      tagline:
        "Architecting bespoke market narratives, C-suite authority platforms, and transformative corporate transactions.",
      serviceType: ServiceType.STRATEGIC_COMMUNICATIONS,
      description:
        "We craft multi-stakeholder communication architectures for enterprise transformations, M&A announcements, IPOs, and market restructuring.",
      capabilities: [
        "M&A and Transaction Communications",
        "IPO Narrative Genesis & Investor Framing",
        "C-Suite & Board Executive Reputation Building",
        "Corporate Re-anchoring & Cultural Restructuring",
      ],
      deliverables: [
        "Comprehensive Narrative Blueprint",
        "Executive Keynote & Media Strategy",
        "Stakeholder Cascade Communication Schedule",
      ],
      isFeatured: true,
      orderIndex: 3,
    },
    {
      slug: "public-affairs",
      title: "Public Affairs & Policy Narrative",
      tagline:
        "Navigating regulatory corridors, institutional consensus building, and sovereign policy positioning.",
      serviceType: ServiceType.PUBLIC_AFFAIRS,
      description:
        "Bridging the gap between corporate imperative and national interest. We engineer high-trust dialogues with legislative, regulatory, and civic stakeholders.",
      capabilities: [
        "Policy Position Whitepapers & Legislative Tracking",
        "Public Policy Coalition Genesis",
        "Regulatory Friction Arbitration",
        "Geopolitical Narrative Risk Advisory",
      ],
      deliverables: [
        "Policy Impact Matrix",
        "Institutional Stakeholder Mapping",
        "Public Interest Briefing Packages",
      ],
      isFeatured: false,
      orderIndex: 4,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }

  // 2. Industries
  const industries = [
    {
      slug: "defense-aerospace",
      title: "Defense & Strategic Aerospace",
      industryType: IndustryType.DEFENSE_AEROSPACE,
      summary:
        "Advising prime contractors, dual-use technology creators, and sovereign aerospace enterprises on public procurement credibility and national defense alignment.",
      strategicChallenges: [
        "Heightened parliamentary and public scrutiny",
        "Export control and multi-jurisdictional compliance comms",
        "High barrier to sovereign institutional trust",
      ],
      advisorySolutions: [
        "National security contribution framing",
        "Confidential multi-tier stakeholder briefings",
        "Sovereign capability narrative architecture",
      ],
      orderIndex: 1,
    },
    {
      slug: "fintech-bfsi",
      title: "Banking, Financial Services & FinTech",
      industryType: IndustryType.FINTECH_BFSI,
      summary:
        "Guiding tier-1 banks, sovereign wealth funds, and neo-finance infrastructure providers through regulatory shifts and market liquidity cycles.",
      strategicChallenges: [
        "Algorithmic panic and systemic trust preservation",
        "Central bank compliance and scrutiny",
        "Executive liability exposure during audits",
      ],
      advisorySolutions: [
        "Liquidity and solvency reassurance communications",
        "Central bank alignment messaging",
        "Institutional investor trust stabilization",
      ],
      orderIndex: 2,
    },
    {
      slug: "energy-infrastructure",
      title: "Energy, Transition & Critical Infrastructure",
      industryType: IndustryType.ENERGY_INFRASTRUCTURE,
      summary:
        "Equipping renewable conglomerates, grid operators, and hydrocarbon leaders to navigate ESG polarization and community stakeholder dialogue.",
      strategicChallenges: [
        "Environmental regulatory friction",
        "Local community activism and litigation",
        "Energy security versus green transition dichotomy",
      ],
      advisorySolutions: [
        "Transition credibility audits",
        "Grassroots civic alignment frameworks",
        "Global investor ESG clarity campaigns",
      ],
      orderIndex: 3,
    },
  ];

  for (const ind of industries) {
    await prisma.industry.upsert({
      where: { slug: ind.slug },
      update: ind,
      create: ind,
    });
  }

  // 3. Featured Case Study
  await prisma.caseStudy.upsert({
    where: { slug: "sovereign-cross-border-arbitration" },
    update: {},
    create: {
      slug: "sovereign-cross-border-arbitration",
      title: "Cross-Border Market Entry & Regulatory De-escalation",
      clientSector: IndustryType.FINTECH_BFSI,
      anonymizedClientName: "Tier-1 Pan-Asian Financial Infrastructure Provider",
      challenge:
        "A leading financial infrastructure consortium faced sudden regulatory blockades and an orchestrated disinformation campaign in a strategic expansion market.",
      strategicIntervention:
        "SAMVAD orchestrated an 18-week perception turnaround campaign, combining forensic media source tracking, parliamentary committee briefing papers, and a calibrated C-suite public positioning strategy.",
      impactMetrics: [
        { label: "Regulatory Clearance", value: "100% Attained" },
        { label: "Positive Media Sentiment Shift", value: "+74%" },
        { label: "Deal Valuation Preserved", value: "$1.8 Billion" },
      ],
      isFeatured: true,
    },
  });

  // 4. Initial Insight Article
  await prisma.insight.upsert({
    where: { slug: "the-death-of-reactive-pr" },
    update: {},
    create: {
      slug: "the-death-of-reactive-pr",
      title: "The Death of Reactive PR: Why Sovereign Brands Need Perception Architecture",
      subtitle:
        "In an era of hyper-accelerated information ecosystems, waiting for a narrative crisis before acting is fatal to enterprise value.",
      category: InsightCategory.THOUGHT_LEADERSHIP,
      authorName: "Vikramaditya Sharma",
      authorRole: "Managing Principal & Chief Strategist",
      readTimeMinutes: 7,
      status: PublicationStatus.PUBLISHED,
      publishedAt: new Date(),
      contentMarkdown: `
# The Death of Reactive PR

In the modern enterprise landscape, reputation is no longer an intangible corporate byproduct—it is the primary determinant of cost of capital, regulatory liberty, and market resilience.

### 1. The Velocity of Perception Decay
Traditional public relations operates on a 24-hour news cycle model. Today, narrative velocity is measured in seconds, distributed across encrypted channels, algorithmic feeds, and institutional whisper networks.

### 2. Narrative Architecture vs. Spin
At SAMVAD, we discard traditional spin. We construct substantive narrative architectures backed by empirical stakeholder analysis, institutional alignment, and proactive transparency.
      `,
    },
  });

  console.log("✅ Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
