/**
 * SAMVAD PERCEPTION ADVISORY - Master Global Navigation Data
 *
 * Provides typed data structures for desktop nav, mega menus (Services & Industries),
 * mobile drawer, and quick system links. Pure TypeScript without runtime dependencies.
 */

export type NavLinkComponent = (props: {
  href: string;
  children: any;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}) => any;

export interface NavServiceItem {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  badge?: string;
  accent: string;
  iconName: string;
}

export interface NavIndustryItem {
  id: string;
  title: string;
  description: string;
  href: string;
  code: string;
  badge?: string;
}

export interface GlobalNavData {
  mainLinks: {
    label: string;
    href: string;
    hasMegaMenu?: boolean;
    megaMenuType?: "services" | "industries";
    description?: string;
  }[];
  services: NavServiceItem[];
  industries: NavIndustryItem[];
  featuredService: {
    tag: string;
    title: string;
    description: string;
    metric: string;
    metricLabel: string;
    href: string;
    cta: string;
  };
  featuredIndustry: {
    tag: string;
    title: string;
    description: string;
    metric: string;
    metricLabel: string;
    href: string;
    cta: string;
  };
  systemLinks: {
    label: string;
    href: string;
    badge?: string;
  }[];
}

export const GLOBAL_NAV_DATA: GlobalNavData = {
  mainLinks: [
    { label: "About", href: "/#about", description: "Firm history, governance, and advisory doctrine" },
    { label: "Services", href: "/#services", hasMegaMenu: true, megaMenuType: "services", description: "Disciplines of narrative dominance and crisis architecture" },
    { label: "Industries", href: "/#industries", hasMegaMenu: true, megaMenuType: "industries", description: "Specialized sectors operating in high-consequence corridors" },
    { label: "Work", href: "/#case-studies", description: "Documented case records and transaction preservation" },
    { label: "Insights", href: "/#intelligence", description: "Executive thought leadership and intelligence dossiers" },
    { label: "Newsroom", href: "/#newsroom", description: "Official announcements, disclosures, and media channels" },
  ],

  services: [
    {
      id: "perception-intelligence",
      title: "Perception Intelligence & Sentiment Topology",
      eyebrow: "Predictive Defense",
      description: "Algorithmic listening, early adversary signal detection, and discourse threat modeling 60–90 days ahead.",
      href: "/#services",
      badge: "Predictive",
      accent: "#3B82F6",
      iconName: "Cpu",
    },
    {
      id: "crisis-architecture",
      title: "Crisis Architecture & Litigation Defense",
      eyebrow: "Rapid Response",
      description: "Decisive command center management for active regulatory investigations, hostile activist campaigns, and litigation exposure.",
      href: "/#services",
      badge: "24/7 War Room",
      accent: "#EF4444",
      iconName: "ShieldAlert",
    },
    {
      id: "strategic-communications",
      title: "Strategic Communications & M&A Genesis",
      eyebrow: "Capital Markets",
      description: "Architecting sovereign and capital-market narratives for landmark mergers, IPOs, and cross-border restructuring.",
      href: "/#services",
      badge: "Value Creation",
      accent: "#D4AF37",
      iconName: "Compass",
    },
    {
      id: "public-affairs",
      title: "Public Affairs & Sovereign Statecraft",
      eyebrow: "Institutional Accord",
      description: "Building bipartisan policy consensus and sovereign credibility in complex, highly-regulated corridors.",
      href: "/#services",
      badge: "Statecraft",
      accent: "#10B981",
      iconName: "Landmark",
    },
    {
      id: "executive-positioning",
      title: "Executive Positioning & Leadership",
      eyebrow: "Reputation Stewardship",
      description: "Stewardship for sovereign leaders, founders, and managing principals navigating high-visibility exposure.",
      href: "/#services",
      badge: "Confidential",
      accent: "#C5A059",
      iconName: "ShieldCheck",
    },
    {
      id: "digital-sovereignty",
      title: "Digital Sovereignty & Algorithm Defense",
      eyebrow: "Information Integrity",
      description: "Countering automated search bias, algorithmic misinformation indexing, and knowledge-graph distortion.",
      href: "/#services",
      badge: "DeepTech",
      accent: "#8B5CF6",
      iconName: "Sparkles",
    },
  ],

  industries: [
    {
      id: "defense-aerospace",
      title: "Defense & Strategic Aerospace",
      description: "Sovereign capability positioning, offset agreements, and defense procurement transparency.",
      href: "/#industries",
      code: "01",
      badge: "Sovereign",
    },
    {
      id: "banking-fintech",
      title: "Banking & Global FinTech",
      description: "Solvency reassurance, central bank regulatory dialogue, and algorithmic risk framing.",
      href: "/#industries",
      code: "02",
      badge: "Tier-1 Capital",
    },
    {
      id: "infrastructure-energy",
      title: "Critical Infrastructure & Energy",
      description: "Grid security comms, energy transition credibility, and regional industrial logistics.",
      href: "/#industries",
      code: "03",
      badge: "National Arteries",
    },
    {
      id: "healthcare-lifesciences",
      title: "Healthcare & Life Sciences",
      description: "Clinical trial optics, bio-ethics narrative, and patent litigation perception defense.",
      href: "/#industries",
      code: "04",
      badge: "R&D",
    },
    {
      id: "deeptech-ai",
      title: "Enterprise DeepTech & AI",
      description: "Algorithmic governance positioning, data sovereignty, and legislative scrutiny defense.",
      href: "/#industries",
      code: "05",
      badge: "Frontier AI",
    },
    {
      id: "family-offices",
      title: "Family Offices & Sovereign Funds",
      description: "Confidential wealth stewardship, succession communications, and cross-border privacy shielding.",
      href: "/#industries",
      code: "06",
      badge: "Discreet",
    },
  ],

  featuredService: {
    tag: "Featured Case Record",
    title: "Cross-Border FinTech Consortium",
    description: "Sovereign de-escalation & legislative brief pacified parliamentary blockades across SE Asia.",
    metric: "$1.8B",
    metricLabel: "Transaction Valuation Preserved",
    href: "/#case-studies",
    cta: "View Case Dossier",
  },

  featuredIndustry: {
    tag: "Operating Scale",
    title: "Sovereign & Enterprise Corridors",
    description: "Guiding mission-critical perception across the Americas, EMEA, and Indo-Pacific jurisdictions.",
    metric: "$40B+",
    metricLabel: "Total Enterprise Value Advised",
    href: "/#industries",
    cta: "Explore Sector Dossiers",
  },

  systemLinks: [
    { label: "Brand Identity", href: "/brand-identity", badge: "Design" },
    { label: "Design System", href: "/design-system", badge: "Tokens" },
    { label: "Asset System", href: "/asset-system", badge: "AI Images" },
  ],
};
