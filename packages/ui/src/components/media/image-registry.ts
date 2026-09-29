/**
 * SAMVAD Perception Advisory - AI Image Asset System & Registry
 *
 * Provides a centralized configuration layer for all imagery across the SAMVAD platform.
 * Supports:
 * - 14 editorial and industry categories
 * - Decoupled replacement keys (e.g. SAMVAD_CORP_COMM_PODIUM_01)
 * - Strict negative constraint enforcement (no fake logos/clients, no AI employee impersonation)
 * - Future-proof photographic replacement with zero layout shift
 * - Descriptive accessibility alt text for every asset
 * - Shimmer blur placeholders and responsive aspect ratios
 */

export type SamvadImageCategory =
  | "corporate-communication"
  | "leadership"
  | "business-meetings"
  | "media-interaction"
  | "technology"
  | "infrastructure"
  | "healthcare"
  | "finance"
  | "startup-ecosystem"
  | "reputation"
  | "communication"
  | "abstract-perception"
  | "editorial-backgrounds"
  | "case-study-placeholders";

export type SamvadAspectRatio = "16:9" | "3:2" | "4:3" | "1:1" | "21:9" | "4:5" | "9:16";

export interface RealPhotoSlotGuide {
  recommendedDimensions: string;
  artDirection: string;
  recommendedAspect: SamvadAspectRatio;
  status: "ai-placeholder" | "real-asset-ready" | "in-production";
  productionNotes?: string;
}

export interface SamvadImageAsset {
  id: string;
  category: SamvadImageCategory;
  replacementKey: string;
  title: string;
  caption: string;
  description: string;
  alt: string;
  src: string;
  width: number;
  height: number;
  aspectRatio: SamvadAspectRatio;
  blurDataURL?: string;
  tags: string[];
  isAiGenerated: boolean;
  personnelRuleCompliant: boolean;
  realPhotoSlot: RealPhotoSlotGuide;
}

export interface CategoryMeta {
  key: SamvadImageCategory;
  label: string;
  description: string;
  primarySubject: string;
  accentTone: string;
}

export const SAMVAD_IMAGE_CATEGORIES: Record<SamvadImageCategory, CategoryMeta> = {
  "corporate-communication": {
    key: "corporate-communication",
    label: "Corporate Communication",
    description: "Executive disclosures, institutional statements, and podium architecture.",
    primarySubject: "Announcements, official briefings, acoustic stages",
    accentTone: "#D4AF37",
  },
  leadership: {
    key: "leadership",
    label: "Leadership & Governance",
    description: "Atmospheric silhouetted leadership overlooking prime economic corridors.",
    primarySubject: "Senior governance, strategic horizons, contemplative advisory",
    accentTone: "#C5A059",
  },
  "business-meetings": {
    key: "business-meetings",
    label: "Business Meetings & Deliberation",
    description: "High-stakes board deliberation, tactile leather dossiers, and advisory tables.",
    primarySubject: "In-depth strategic council, document analysis, confidential review",
    accentTone: "#8C7355",
  },
  "media-interaction": {
    key: "media-interaction",
    label: "Media Interaction & Press",
    description: "Authentic press corps camera ranks, broadcast lighting, and media briefings.",
    primarySubject: "Broadcast journalism, press conferences, public scrutiny",
    accentTone: "#B33927",
  },
  technology: {
    key: "technology",
    label: "Technology & Data Sovereignty",
    description: "Tier-4 data architecture, optical network exchanges, and data integrity.",
    primarySubject: "Enterprise infrastructure, cybersecurity, computational power",
    accentTone: "#3B82F6",
  },
  infrastructure: {
    key: "infrastructure",
    label: "National Infrastructure & Mobility",
    description: "Civil engineering viaducts, transit corridors, and logistics connectivity.",
    primarySubject: "High-speed rail, regional connectivity, industrial momentum",
    accentTone: "#F59E0B",
  },
  healthcare: {
    key: "healthcare",
    label: "Healthcare & Life Sciences",
    description: "Analytical biopharmaceutical microscopy and cleanroom clinical rigor.",
    primarySubject: "Pharmaceutical R&D, clinical precision, biotechnology",
    accentTone: "#10B981",
  },
  finance: {
    key: "finance",
    label: "Institutional Finance",
    description: "Monumental financial atriums, architectural transparency, and capital flow.",
    primarySubject: "Capital markets, banking architecture, institutional trust",
    accentTone: "#EAB308",
  },
  "startup-ecosystem": {
    key: "startup-ecosystem",
    label: "Startup Ecosystem & Founders",
    description: "High-density collaborative studios, whiteboard system architectures, and venture scale.",
    primarySubject: "Venture incubation, technical architecture, founder resilience",
    accentTone: "#EC4899",
  },
  reputation: {
    key: "reputation",
    label: "Reputation & Crisis Management",
    description: "Operations rooms, sentiment telemetry, and late-night calm under pressure.",
    primarySubject: "Reputation defense, narrative control, crisis intelligence",
    accentTone: "#EF4444",
  },
  communication: {
    key: "communication",
    label: "Strategic Communication",
    description: "Refracted light through optical crystal prisms symbolizing clarity through dialogue.",
    primarySubject: "Dialogue dynamics, clarity from noise, elevated discourse",
    accentTone: "#D4AF37",
  },
  "abstract-perception": {
    key: "abstract-perception",
    label: "Abstract Perception",
    description: "Prismatic caustics and geometric refraction illustrating perception shaping.",
    primarySubject: "Optics of truth, multifaceted viewpoints, deliberate focus",
    accentTone: "#6366F1",
  },
  "editorial-backgrounds": {
    key: "editorial-backgrounds",
    label: "Editorial Backgrounds",
    description: "Minimalist monolithic limestone and brushed brass architectural textures.",
    primarySubject: "Architectural tranquility, tactile negative space, editorial poise",
    accentTone: "#9CA3AF",
  },
  "case-study-placeholders": {
    key: "case-study-placeholders",
    label: "Case Study Placeholders",
    description: "Textured linen dossiers, blind debossing, and archival briefing binders.",
    primarySubject: "Confidential intelligence briefs, case outcomes, advisory dossiers",
    accentTone: "#C5A059",
  },
};

/**
 * Standard inline SVG shimmer placeholder generator for zero-CLS layout stability.
 */
export function createShimmerBlurDataURL(
  w = 700,
  h = 475,
  colorFrom = "#18181B",
  colorTo = "#27272A"
): string {
  const svg = `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stop-color="${colorFrom}" offset="20%" />
          <stop stop-color="${colorTo}" offset="50%" />
          <stop stop-color="${colorFrom}" offset="80%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="${colorFrom}" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.4s" repeatCount="indefinite"  />
    </svg>
  `;
  const nodeBuffer = (globalThis as unknown as { Buffer?: { from: (s: string) => { toString: (enc: string) => string } } }).Buffer;
  const base64 =
    typeof window !== "undefined"
      ? window.btoa(svg)
      : nodeBuffer
      ? nodeBuffer.from(svg).toString("base64")
      : "";
  return `data:image/svg+xml;base64,${base64}`;
}

const DEFAULT_BLUR = createShimmerBlurDataURL();

/**
 * The Master SAMVAD Image Catalog.
 * Preconfigured with editorial AI assets, strict negative constraint compliance,
 * complete accessibility alt texts, and real photography replacement guides.
 */
export const SAMVAD_IMAGE_REGISTRY: Record<string, SamvadImageAsset> = {
  "corp-comm-press-podium": {
    id: "corp-comm-press-podium",
    category: "corporate-communication",
    replacementKey: "SAMVAD_CORP_COMM_PODIUM_01",
    title: "Corporate Briefing Podium & Chamber",
    caption: "Acoustic timber and dark glass press podium prepared for enterprise disclosure.",
    description: "Minimalist executive podium and presentation hall ready for corporate statements and stakeholder addresses.",
    alt: "Acoustic timber and glass executive press podium set up in a modern conference hall with warm backlighting and discreet microphones.",
    src: "/images/corporate-communication/press-podium.jpg",
    width: 1376,
    height: 768,
    aspectRatio: "16:9",
    blurDataURL: DEFAULT_BLUR,
    tags: ["press", "podium", "briefing", "corporate-communication", "disclosure"],
    isAiGenerated: true,
    personnelRuleCompliant: true,
    realPhotoSlot: {
      recommendedDimensions: "1920x1080 or 2560x1440",
      recommendedAspect: "16:9",
      artDirection: "Photograph actual SAMVAD client disclosure events or briefing podiums with soft ambient backlighting and zero visible competitor branding.",
      status: "ai-placeholder",
      productionNotes: "Stage podium with SAMVAD debossed leather folders prior to press arrival.",
    },
  },

  "leadership-skyline-silhouette": {
    id: "leadership-skyline-silhouette",
    category: "leadership",
    replacementKey: "SAMVAD_LEADERSHIP_SILHOUETTE_01",
    title: "Executive Horizon at Blue Hour",
    caption: "Contemplative leadership overlooking the modern Mumbai commercial skyline at dusk.",
    description: "Silhouette of a senior corporate advisor overlooking the city lights at twilight from a high-rise executive suite.",
    alt: "Silhouette of a senior corporate leader in a dark suit looking out through floor-to-ceiling windows at the city skyline at twilight.",
    src: "/images/leadership/skyline-silhouette.jpg",
    width: 1376,
    height: 768,
    aspectRatio: "16:9",
    blurDataURL: DEFAULT_BLUR,
    tags: ["leadership", "silhouette", "governance", "bkc", "skyline", "horizon"],
    isAiGenerated: true,
    personnelRuleCompliant: true,
    realPhotoSlot: {
      recommendedDimensions: "1920x1080 or 2560x1440",
      recommendedAspect: "16:9",
      artDirection: "Capture genuine SAMVAD advisory partners in contemplative silhouette against Mumbai BKC or New Delhi skyline during blue hour.",
      status: "ai-placeholder",
      productionNotes: "Keep human silhouette natural, avoiding stiff staged posture.",
    },
  },

  "meetings-briefing-table": {
    id: "meetings-briefing-table",
    category: "business-meetings",
    replacementKey: "SAMVAD_MEETINGS_BRIEFING_TABLE_01",
    title: "Strategic Council Deliberation",
    caption: "High-stakes advisory consultation over leather briefing dossiers and teak wood.",
    description: "Documentary detail of an executive consultation table, showing hands beside a leather portfolio and water glass.",
    alt: "Close-up of hands resting on a conference table next to a leather-bound folder, fountain pen, and crystal glass, with meeting participants blurred in the background.",
    src: "/images/business-meetings/briefing-table.jpg",
    width: 1376,
    height: 768,
    aspectRatio: "16:9",
    blurDataURL: DEFAULT_BLUR,
    tags: ["meetings", "boardroom", "dossier", "strategy", "deliberation"],
    isAiGenerated: true,
    personnelRuleCompliant: true,
    realPhotoSlot: {
      recommendedDimensions: "1920x1080",
      recommendedAspect: "16:9",
      artDirection: "Macro documentary focus on genuine SAMVAD leather dossiers, fountain pens, and crystal glassware on rich teak or walnut meeting tables.",
      status: "ai-placeholder",
      productionNotes: "Ensure no confidential client text is legible in the final capture.",
    },
  },

  "media-press-briefing-room": {
    id: "media-press-briefing-room",
    category: "media-interaction",
    replacementKey: "SAMVAD_MEDIA_BRIEFING_ROOM_01",
    title: "Press Corps Briefing Hall",
    caption: "Broadcast camera positions aligned before an illuminated media announcement stage.",
    description: "Documentary view of broadcast cameras and media operators facing an illuminated timber briefing stage.",
    alt: "View from behind professional broadcast cameras on tripods facing an illuminated modern auditorium stage with a podium.",
    src: "/images/media-interaction/press-briefing-room.jpg",
    width: 1376,
    height: 768,
    aspectRatio: "16:9",
    blurDataURL: DEFAULT_BLUR,
    tags: ["media", "press-corps", "broadcast", "cameras", "journalism"],
    isAiGenerated: true,
    personnelRuleCompliant: true,
    realPhotoSlot: {
      recommendedDimensions: "1920x1080",
      recommendedAspect: "16:9",
      artDirection: "Shoot live press briefings orchestrated by SAMVAD with genuine press corps camera arrays and professional studio lighting.",
      status: "ai-placeholder",
      productionNotes: "Depict authentic press interaction without showing fake network logos.",
    },
  },

  "tech-datacenter-optical-core": {
    id: "tech-datacenter-optical-core",
    category: "technology",
    replacementKey: "SAMVAD_TECH_DATACORE_01",
    title: "High-Integrity Infrastructure Core",
    caption: "Symmetrical tier-4 enterprise data center and optical network exchange.",
    description: "Monolithic obsidian server racks with status telemetry reflected across mirror-polished access tiles.",
    alt: "Symmetrical corridor of dark server racks in an enterprise data center with subtle amber and blue indicator lights.",
    src: "/images/technology/datacenter-optical-core.jpg",
    width: 1376,
    height: 768,
    aspectRatio: "16:9",
    blurDataURL: DEFAULT_BLUR,
    tags: ["technology", "datacenter", "servers", "cloud", "security"],
    isAiGenerated: true,
    personnelRuleCompliant: true,
    realPhotoSlot: {
      recommendedDimensions: "1920x1080",
      recommendedAspect: "16:9",
      artDirection: "Commission high-end architectural photography inside certified Indian tier-4 data centers or telecom optical exchanges.",
      status: "ai-placeholder",
      productionNotes: "Ensure security clearance and NDA compliance for any server room photography.",
    },
  },

  "infra-highspeed-viaduct": {
    id: "infra-highspeed-viaduct",
    category: "infrastructure",
    replacementKey: "SAMVAD_INFRA_VIADUCT_01",
    title: "National Arterial Connectivity",
    caption: "High-speed viaduct traversing mist at sunrise, symbolizing modernization and scale.",
    description: "Elevated concrete rail corridor curving into morning mist, capturing infrastructural transformation.",
    alt: "Aerial view of an elevated concrete railway bridge carrying a train across a misty morning landscape bathed in sunrise light.",
    src: "/images/infrastructure/highspeed-viaduct.jpg",
    width: 1376,
    height: 768,
    aspectRatio: "16:9",
    blurDataURL: DEFAULT_BLUR,
    tags: ["infrastructure", "viaduct", "rail", "connectivity", "modernization"],
    isAiGenerated: true,
    personnelRuleCompliant: true,
    realPhotoSlot: {
      recommendedDimensions: "2560x1440 or 1920x1080",
      recommendedAspect: "16:9",
      artDirection: "High-resolution drone or helicopter photography of major infrastructure advisory client milestones (expressways, freight corridors, ports).",
      status: "ai-placeholder",
      productionNotes: "Capture at golden hour dawn or dusk for cinematic editorial quality.",
    },
  },

  "health-biotech-cleanroom": {
    id: "health-biotech-cleanroom",
    category: "healthcare",
    replacementKey: "SAMVAD_HEALTH_BIOTECH_01",
    title: "Biopharmaceutical Precision & Inquiry",
    caption: "High-precision optical microscopy and analytical cleanroom instrumentation.",
    description: "Life sciences researcher operating advanced optical microscopy equipment in a certified pharmaceutical laboratory.",
    alt: "Scientist in laboratory coat and mask focusing through an advanced high-precision microscope in a sterile laboratory environment.",
    src: "/images/healthcare/biotech-cleanroom-microscopy.jpg",
    width: 1376,
    height: 768,
    aspectRatio: "16:9",
    blurDataURL: DEFAULT_BLUR,
    tags: ["healthcare", "biotechnology", "microscopy", "cleanroom", "pharma"],
    isAiGenerated: true,
    personnelRuleCompliant: true,
    realPhotoSlot: {
      recommendedDimensions: "1920x1080",
      recommendedAspect: "16:9",
      artDirection: "Documentary photography in partner pharmaceutical R&D labs focusing on analytical instruments and cleanroom environments.",
      status: "ai-placeholder",
      productionNotes: "Strictly adhere to laboratory safety protocol gear during shoots.",
    },
  },

  "finance-atrium-architecture": {
    id: "finance-atrium-architecture",
    category: "finance",
    replacementKey: "SAMVAD_FINANCE_ATRIUM_01",
    title: "Institutional Financial Atrium",
    caption: "Soaring multi-level timber and glass financial gallery with purposeful motion blur.",
    description: "Monumental architectural atrium of a premier financial institution, balancing transparency and permanence.",
    alt: "Expansive architectural interior of a modern multi-story financial building with glass galleries, marble floors, and professionals walking.",
    src: "/images/finance/financial-center-atrium.jpg",
    width: 1376,
    height: 768,
    aspectRatio: "16:9",
    blurDataURL: DEFAULT_BLUR,
    tags: ["finance", "atrium", "architecture", "institutional", "capital"],
    isAiGenerated: true,
    personnelRuleCompliant: true,
    realPhotoSlot: {
      recommendedDimensions: "1920x1080",
      recommendedAspect: "16:9",
      artDirection: "Architectural photography of premier financial headquarters in BKC Mumbai or DIFC with long-exposure motion blur.",
      status: "ai-placeholder",
      productionNotes: "Focus on vertical symmetry, natural skylight, and marble reflections.",
    },
  },

  "startup-innovation-loft": {
    id: "startup-innovation-loft",
    category: "startup-ecosystem",
    replacementKey: "SAMVAD_STARTUP_LOFT_01",
    title: "Founders Collaboration & Architecture",
    caption: "High-ceilinged industrial innovation hub with architectural system whiteboards.",
    description: "Multidisciplinary founding team whiteboarding system diagrams and scaling strategies in a converted loft space.",
    alt: "Startup team collaborating around a long wooden table with laptops in a bright industrial studio with whiteboards on the wall.",
    src: "/images/startup-ecosystem/innovation-loft.jpg",
    width: 1376,
    height: 768,
    aspectRatio: "16:9",
    blurDataURL: DEFAULT_BLUR,
    tags: ["startups", "founders", "bengaluru", "venture", "innovation"],
    isAiGenerated: true,
    personnelRuleCompliant: true,
    realPhotoSlot: {
      recommendedDimensions: "1920x1080",
      recommendedAspect: "16:9",
      artDirection: "Authentic documentary shoot inside leading Bengaluru or Gurugram venture accelerators during founder strategy sessions.",
      status: "ai-placeholder",
      productionNotes: "Capture spontaneous authentic energy, avoid cliché high-fives or synthetic tech props.",
    },
  },

  "reputation-crisis-monitoring": {
    id: "reputation-crisis-monitoring",
    category: "reputation",
    replacementKey: "SAMVAD_REPUTATION_WARROOM_01",
    title: "Strategic Crisis Command & Sentiment Intelligence",
    caption: "Late-night sentiment telemetry monitoring and calm analytical crisis leadership.",
    description: "Communications director overseeing dynamic sentiment telemetry displays and risk analysis in an advisory operations room.",
    alt: "Executive at a desk with a confidential dossier in front of a large panoramic digital screen showing global analytics and sentiment maps.",
    src: "/images/reputation/crisis-monitoring-center.jpg",
    width: 1376,
    height: 768,
    aspectRatio: "16:9",
    blurDataURL: DEFAULT_BLUR,
    tags: ["reputation", "crisis", "command-center", "sentiment", "warroom"],
    isAiGenerated: true,
    personnelRuleCompliant: true,
    realPhotoSlot: {
      recommendedDimensions: "1920x1080",
      recommendedAspect: "16:9",
      artDirection: "Staged photography inside SAMVAD's proprietary crisis monitoring room displaying real SAMVAD sentiment dashboards.",
      status: "ai-placeholder",
      productionNotes: "Atmospheric low-key lighting with focused brass desk lamp illumination.",
    },
  },

  "comm-strategic-dialogue": {
    id: "comm-strategic-dialogue",
    category: "communication",
    replacementKey: "SAMVAD_COMM_DIALOGUE_01",
    title: "Strategic Narrative & Discourse Transmission",
    caption: "Refracted illumination through crystal optics representing clarity in discourse.",
    description: "Tactile optical prism scattering warm light beams across dark slate, symbolizing narrative clarity distilled from complex conversation.",
    alt: "Minimalist crystal prism on dark stone creating sharp angled beams of amber light across the surface.",
    src: "/images/communication/strategic-dialogue-prism.jpg",
    width: 1376,
    height: 768,
    aspectRatio: "16:9",
    blurDataURL: DEFAULT_BLUR,
    tags: ["communication", "dialogue", "optics", "narrative", "clarity"],
    isAiGenerated: true,
    personnelRuleCompliant: true,
    realPhotoSlot: {
      recommendedDimensions: "1920x1080",
      recommendedAspect: "16:9",
      artDirection: "Fine art studio photograph of custom glass or brass SAMVAD brand motif with natural directional sunlight.",
      status: "ai-placeholder",
      productionNotes: "Capture pure caustics and sharp refractive lines against dark tactile background.",
    },
  },

  "abstract-prism-refraction": {
    id: "abstract-prism-refraction",
    category: "abstract-perception",
    replacementKey: "SAMVAD_ABSTRACT_PRISM_01",
    title: "Perception Geometry & Caustics",
    caption: "Interlocking light angles and caustics emerging from geometric optical refraction.",
    description: "Macro fine art study of pure crystal geometry refracting natural light rays into structured geometric beams.",
    alt: "Detailed photograph of a glass prism reflecting and bending bright sunlight onto a dark textured stone background.",
    src: "/images/abstract-perception/optical-prism-refraction.jpg",
    width: 1376,
    height: 768,
    aspectRatio: "16:9",
    blurDataURL: DEFAULT_BLUR,
    tags: ["perception", "refraction", "optics", "geometry", "abstract"],
    isAiGenerated: true,
    personnelRuleCompliant: true,
    realPhotoSlot: {
      recommendedDimensions: "1920x1080",
      recommendedAspect: "16:9",
      artDirection: "Studio macro capture of optical prisms, lenses, or hand-blown art glass on charcoal stone slabs.",
      status: "ai-placeholder",
      productionNotes: "Highlight the contrast between solid obsidian slate and crisp amber light caustics.",
    },
  },

  "editorial-limestone-monolith": {
    id: "editorial-limestone-monolith",
    category: "editorial-backgrounds",
    replacementKey: "SAMVAD_EDITORIAL_MONOLITH_01",
    title: "Architectural Limestone & Fluted Concrete",
    caption: "Curved stone surfaces and brushed bronze seams under slanting morning sunlight.",
    description: "Serene architectural study of intersecting limestone curves and fluted concrete with generous negative space.",
    alt: "Architectural detail of curved textured limestone and fluted grey walls joined by a polished brass band under natural sunlight.",
    src: "/images/editorial-backgrounds/limestone-monolith-light.jpg",
    width: 1376,
    height: 768,
    aspectRatio: "16:9",
    blurDataURL: DEFAULT_BLUR,
    tags: ["architecture", "limestone", "concrete", "texture", "editorial-background"],
    isAiGenerated: true,
    personnelRuleCompliant: true,
    realPhotoSlot: {
      recommendedDimensions: "2560x1440 or 1920x1080",
      recommendedAspect: "16:9",
      artDirection: "Architectural material detail shots of SAMVAD's physical office interiors (limestone walls, fluted acoustic panelling, brass inlay).",
      status: "ai-placeholder",
      productionNotes: "Ensure generous negative space for typography and headline overlays.",
    },
  },

  "case-study-briefing-binder": {
    id: "case-study-briefing-binder",
    category: "case-study-placeholders",
    replacementKey: "SAMVAD_CASE_STUDY_BINDER_01",
    title: "Confidential Advisory Portfolio Dossier",
    caption: "Textured linen-bound strategic advisory dossier on fluted walnut and glass.",
    description: "Tactile still-life of a heavy navy-charcoal linen case study portfolio resting on an executive credenza beside a warm reading lamp.",
    alt: "Heavy dark linen-bound portfolio with geometric debossing resting on a fluted wood desk beside a brass lamp and crystal tumbler.",
    src: "/images/case-study-placeholders/confidential-briefing-binder.jpg",
    width: 1376,
    height: 768,
    aspectRatio: "16:9",
    blurDataURL: DEFAULT_BLUR,
    tags: ["case-study", "dossier", "portfolio", "confidential", "linen"],
    isAiGenerated: true,
    personnelRuleCompliant: true,
    realPhotoSlot: {
      recommendedDimensions: "1920x1080",
      recommendedAspect: "16:9",
      artDirection: "Studio still-life of genuine published SAMVAD perception whitepapers, annual reports, and bound case dossiers.",
      status: "ai-placeholder",
      productionNotes: "Subtle blind debossing on heavy cloth or leather bindings.",
    },
  },
};

/**
 * In-memory override store allowing dynamic or build-time replacement
 * of any image asset via replacement key or asset id.
 */
const dynamicOverrides = new Map<string, Partial<SamvadImageAsset>>();

/**
 * Register a replacement or override for an asset (e.g. when real company photography is ready).
 */
export function registerImageOverride(
  keyOrId: string,
  override: Partial<SamvadImageAsset>
): void {
  dynamicOverrides.set(keyOrId, override);
}

/**
 * Retrieve an asset by ID or replacement key, with any dynamic overrides merged.
 */
export function getImageAsset(idOrKey: string): SamvadImageAsset | undefined {
  let baseAsset: SamvadImageAsset | undefined = SAMVAD_IMAGE_REGISTRY[idOrKey];

  if (!baseAsset) {
    baseAsset = Object.values(SAMVAD_IMAGE_REGISTRY).find(
      (a) => a.replacementKey === idOrKey
    );
  }

  if (!baseAsset) return undefined;

  const override = dynamicOverrides.get(baseAsset.id) || dynamicOverrides.get(baseAsset.replacementKey);
  if (!override) return baseAsset;

  return {
    ...baseAsset,
    ...override,
    realPhotoSlot: {
      ...baseAsset.realPhotoSlot,
      ...(override.realPhotoSlot || {}),
    },
  };
}

/**
 * Get all assets belonging to a specific category.
 */
export function getImagesByCategory(category: SamvadImageCategory): SamvadImageAsset[] {
  return Object.values(SAMVAD_IMAGE_REGISTRY)
    .filter((a) => a.category === category)
    .map((a) => getImageAsset(a.id) as SamvadImageAsset);
}

/**
 * Get all assets in the registry.
 */
export function getAllImageAssets(): SamvadImageAsset[] {
  return Object.values(SAMVAD_IMAGE_REGISTRY).map(
    (a) => getImageAsset(a.id) as SamvadImageAsset
  );
}

/**
 * Get summary stats and metadata for all 14 categories.
 */
export function getAllImageCategories(): Array<
  CategoryMeta & { count: number; sampleAsset?: SamvadImageAsset }
> {
  const allAssets = getAllImageAssets();
  return (Object.keys(SAMVAD_IMAGE_CATEGORIES) as SamvadImageCategory[]).map((catKey) => {
    const meta = SAMVAD_IMAGE_CATEGORIES[catKey];
    const matching = allAssets.filter((a) => a.category === catKey);
    return {
      ...meta,
      count: matching.length,
      sampleAsset: matching[0],
    };
  });
}
