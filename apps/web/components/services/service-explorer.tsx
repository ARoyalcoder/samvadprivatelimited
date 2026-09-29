"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Container,
  Badge,
  MagneticButton,
  SamvadImage,
  cn,
} from "@samvad/ui";
import {
  PRIMARY_SERVICES,
  type ServiceRecord,
} from "@/lib/services-data";
import {
  Newspaper,
  Compass,
  ShieldCheck,
  Cpu,
  ShieldAlert,
  Landmark,
  ArrowRight,
  CheckCircle2,
  Layers,
  Sparkles,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Newspaper,
  Compass,
  ShieldCheck,
  Cpu,
  ShieldAlert,
  Landmark,
};

export function ServiceExplorer() {
  const router = useRouter();
  const [activeSlug, setActiveSlug] = React.useState<string>(PRIMARY_SERVICES[0]!.slug);

  const activeService: ServiceRecord =
    PRIMARY_SERVICES.find((s) => s.slug === activeSlug) ?? PRIMARY_SERVICES[0]!;

  const handleCardClick = (slug: string) => {
    router.push(`/services/${slug}`);
  };

  return (
    <section className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-950 py-20 lg:py-28">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-gold-500/5 blur-[150px]" />
      <div className="pointer-events-none absolute right-10 bottom-10 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[130px]" />

      <Container size="xl" className="relative z-10 space-y-12">
        {/* Explorer Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              <Layers className="h-3 w-3 text-gold-400" />
              Interactive Practice Topology
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-sand-100 leading-tight">
              Interactive Service Explorer
            </h2>
            <p className="text-sand-400 text-xs sm:text-sm font-light leading-relaxed">
              Hover to examine core capabilities, operational methodology, and supporting visual intelligence.
              Click any discipline to inspect the comprehensive practice dossier.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-obsidian-400">
            <Sparkles className="h-3.5 w-3.5 text-gold-400" />
            <span>Interactive Visual System · 6 Primary Practices</span>
          </div>
        </div>

        {/* Visual System Split Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Service Stack (7 Cols) */}
          <div className="lg:col-span-7 space-y-3" role="tablist" aria-label="Services List">
            {PRIMARY_SERVICES.map((service, idx) => {
              const isHovered = activeSlug === service.slug;
              const Icon = ICON_MAP[service.iconName] ?? Compass;

              return (
                <div
                  key={service.slug}
                  role="tab"
                  tabIndex={0}
                  aria-selected={isHovered}
                  onMouseEnter={() => setActiveSlug(service.slug)}
                  onFocus={() => setActiveSlug(service.slug)}
                  onClick={() => handleCardClick(service.slug)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleCardClick(service.slug);
                    }
                  }}
                  className={cn(
                    "group relative cursor-pointer rounded-xs border p-6 transition-all duration-300 outline-none",
                    isHovered
                      ? "border-gold-500/60 bg-obsidian-900/90 shadow-elevation-2"
                      : "border-obsidian-800 bg-obsidian-950/70 hover:border-obsidian-700 hover:bg-obsidian-900/40"
                  )}
                >
                  {/* Left Active Glow Indicator */}
                  {isHovered && (
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-gold-400 to-gold-600 rounded-l-xs" />
                  )}

                  {/* Header Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={cn(
                          "h-10 w-10 rounded-xs border flex items-center justify-center transition-colors shrink-0",
                          isHovered
                            ? "border-gold-500/40 bg-gold-500/10 text-gold-400"
                            : "border-obsidian-750 bg-obsidian-900 text-obsidian-400 group-hover:text-sand-300"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-wider text-obsidian-400">
                          0{idx + 1} · {service.eyebrow}
                        </div>
                        <h3 className="font-serif text-xl sm:text-2xl font-normal text-sand-100 group-hover:text-gold-200 transition-colors">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/services/${service.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-gold-400 hover:text-gold-300 p-2"
                      >
                        <span className="hidden sm:inline">Inspect</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Expanded Content on Active / Hovered */}
                  {isHovered && (
                    <div className="mt-5 pt-4 border-t border-obsidian-800/80 space-y-4 animate-in fade-in duration-200">
                      <p className="text-xs sm:text-sm text-sand-300 font-light leading-relaxed">
                        {service.shortDescription}
                      </p>

                      <div className="space-y-2">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-gold-400 font-semibold">
                          Core Capabilities:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.capabilities.slice(0, 4).map((cap, cIdx) => (
                            <div key={cIdx} className="flex items-start gap-2 text-xs text-sand-400 font-light">
                              <CheckCircle2 className="h-3.5 w-3.5 text-gold-400 shrink-0 mt-0.5" />
                              <span>{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Supporting Visual & Dossier Preview (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="rounded-xs border border-obsidian-750 bg-obsidian-900/80 p-5 shadow-2xl backdrop-blur-md space-y-5">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between text-xs font-mono border-b border-obsidian-800 pb-3">
                <span className="text-gold-400 font-semibold">{activeService.eyebrow}</span>
                <Badge variant="outline" className="border-gold-500/30 bg-gold-500/10 text-gold-300 font-mono text-[9px] uppercase tracking-wider">
                  Live Visual Sync
                </Badge>
              </div>

              {/* Supporting Visual Asset with Smooth Zoom */}
              <div className="relative overflow-hidden rounded-xs aspect-[16/10] border border-obsidian-800 bg-obsidian-950">
                <SamvadImage
                  key={activeService.supportingAssetId}
                  assetId={activeService.supportingAssetId}
                  aspectRatio="16:9"
                  zoomOnHover
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              </div>

              {/* Service Headline & Action */}
              <div className="space-y-3">
                <h4 className="font-serif text-2xl font-light text-sand-100">
                  {activeService.title}
                </h4>
                <p className="font-mono text-xs text-gold-400/90 font-light">
                  {activeService.tagline}
                </p>
                <p className="text-xs text-sand-400 font-light leading-relaxed">
                  {activeService.shortDescription}
                </p>
              </div>

              {/* Deliverables Snippet */}
              <div className="pt-3 border-t border-obsidian-800 space-y-2">
                <div className="font-mono text-[10px] uppercase tracking-wider text-obsidian-400">
                  Key Operational Deliverable:
                </div>
                <div className="flex items-center gap-2 text-xs text-sand-300 font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                  <span>{activeService.deliverables[0]}</span>
                </div>
              </div>

              {/* Click-through Action Button */}
              <div className="pt-2">
                <Link href={`/services/${activeService.slug}`} className="block">
                  <MagneticButton
                    variant="gold"
                    size="md"
                    className="w-full justify-center font-mono text-xs uppercase tracking-wider py-3"
                  >
                    <span>Open Full {activeService.title} Dossier</span>
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </MagneticButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
