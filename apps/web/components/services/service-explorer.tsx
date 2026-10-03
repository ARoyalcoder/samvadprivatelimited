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
    <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-20 lg:py-28">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-[#a67c45]/[0.035] blur-[150px]" />
      <div className="pointer-events-none absolute right-10 bottom-10 h-[400px] w-[400px] rounded-full bg-[#5d7180]/[0.035] blur-[130px]" />

      <Container size="xl" className="relative z-10 space-y-12">
        {/* Explorer Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              <Layers className="h-3 w-3 text-[#a67c45]" />
              Service Portfolio
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1d2529] leading-tight">
              Our Services
            </h2>

            <p className="text-[#697176] text-xs sm:text-sm font-light leading-relaxed">
              Explore our core advisory capabilities and areas of practice.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#8a8f91]">
            <Sparkles className="h-3.5 w-3.5 text-[#a67c45]" />
            <span>6 Primary Practices</span>
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
                      ? "border-[#a67c45]/55 bg-[#ebe7de] shadow-[0_14px_40px_rgba(29,37,41,0.08)]"
                      : "border-[#d8d1c5] bg-[#f3f0e8]/80 hover:border-[#bdb5a8] hover:bg-[#ebe7de]/70"
                  )}
                >
                  {/* Left Active Glow Indicator */}
                  {isHovered && (
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#a67c45] rounded-l-xs" />
                  )}

                  {/* Header Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={cn(
                          "h-10 w-10 rounded-xs border flex items-center justify-center transition-colors shrink-0",
                          isHovered
                            ? "border-[#a67c45]/40 bg-[#a67c45]/10 text-[#a67c45]"
                            : "border-[#d0c9bd] bg-[#ebe7de] text-[#8a8f91] group-hover:text-[#3d474c]"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-wider text-[#8a8f91]">
                          0{idx + 1} · {service.eyebrow}
                        </div>

                        <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1d2529] group-hover:text-[#8c6537] transition-colors">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/services/${service.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[#a67c45] hover:text-[#7f5c32] p-2"
                      >
                        <span className="hidden sm:inline">View</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Expanded Content on Active / Hovered */}
                  {isHovered && (
                    <div className="mt-5 pt-4 border-t border-[#d8d1c5] space-y-4 animate-in fade-in duration-200">
                      <p className="text-xs sm:text-sm text-[#596267] font-light leading-relaxed">
                        {service.shortDescription}
                      </p>

                      <div className="space-y-2">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-[#a67c45] font-semibold">
                          Capabilities
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.capabilities.slice(0, 4).map((cap, cIdx) => (
                            <div
                              key={cIdx}
                              className="flex items-start gap-2 text-xs text-[#697176] font-light"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#a67c45] shrink-0 mt-0.5" />
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
            <div className="rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-5 shadow-[0_20px_60px_rgba(29,37,41,0.08)] space-y-5">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between text-xs font-mono border-b border-[#d8d1c5] pb-3">
                <span className="text-[#a67c45] font-semibold">
                  {activeService.eyebrow}
                </span>

                <Badge
                  variant="outline"
                  className="border-[#a67c45]/30 bg-[#a67c45]/[0.07] text-[#8c6537] font-mono text-[9px] uppercase tracking-wider"
                >
                  Active
                </Badge>
              </div>

              {/* Supporting Visual Asset with Smooth Zoom */}
              <div className="relative overflow-hidden rounded-xs aspect-[16/10] border border-[#d8d1c5] bg-[#dcd7cd]">
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
                <h4 className="font-serif text-2xl font-light text-[#1d2529]">
                  {activeService.title}
                </h4>

                <p className="font-mono text-xs text-[#a67c45] font-light">
                  {activeService.tagline}
                </p>

                <p className="text-xs text-[#697176] font-light leading-relaxed">
                  {activeService.shortDescription}
                </p>
              </div>

              {/* Deliverables Snippet */}
              <div className="pt-3 border-t border-[#d8d1c5] space-y-2">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#8a8f91]">
                  Key Deliverable
                </div>

                <div className="flex items-center gap-2 text-xs text-[#596267] font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#a67c45]" />
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
                    <span>View {activeService.title}</span>
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