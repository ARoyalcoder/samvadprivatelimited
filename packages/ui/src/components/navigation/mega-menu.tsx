"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../layout/container";
import { Badge } from "../data-display/badge";
import {
  GLOBAL_NAV_DATA,
  NavServiceItem,
  NavIndustryItem,
  NavLinkComponent,
} from "./nav-data";
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  ShieldAlert,
  Compass,
  Landmark,
  ShieldCheck,
  Sparkles,
  Layers,
} from "lucide-react";

const DefaultLink: NavLinkComponent = ({ href, children, ...props }) => (
  <a href={href} {...props}>
    {children}
  </a>
);

export interface MegaMenuProps {
  isOpen: boolean;
  activeType: "services" | "industries" | null;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  linkComponent?: NavLinkComponent;
}

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  ShieldAlert,
  Compass,
  Landmark,
  ShieldCheck,
  Sparkles,
};

export function MegaMenu({
  isOpen,
  activeType,
  onClose,
  onMouseEnter,
  onMouseLeave,
  linkComponent: LinkComp = DefaultLink,
}: MegaMenuProps) {
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Keyboard accessibility: Escape closes the mega menu
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && activeType && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="absolute left-0 right-0 top-full z-40 border-b border-obsidian-800/90 bg-obsidian-950/95 shadow-2xl backdrop-blur-2xl"
          role="region"
          aria-label={`${activeType === "services" ? "Services" : "Industries"} Mega Menu`}
        >
          {/* Subtle top gold reflection line */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

          <Container size="xl" className="py-8 lg:py-10">
            {activeType === "services" ? (
              /* SERVICES MEGA MENU LAYOUT */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* 6 Core Practices Grid (8 cols) */}
                <div className="lg:col-span-8">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-obsidian-850">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
                        Advisory Disciplines
                      </span>
                      <span className="text-obsidian-600">/</span>
                      <span className="font-sans text-xs text-sand-400">
                        6 Strategic Practices
                      </span>
                    </div>
                    <LinkComp
                      href="/#services"
                      onClick={onClose}
                      className="group inline-flex items-center gap-1 font-mono text-[11px] text-sand-400 hover:text-gold-300 transition-colors"
                    >
                      <span>Explore all practices</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 text-gold-400" />
                    </LinkComp>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {GLOBAL_NAV_DATA.services.map((service: NavServiceItem) => {
                      const IconComponent = SERVICE_ICONS[service.iconName] || Layers;
                      return (
                        <LinkComp
                          key={service.id}
                          href={service.href}
                          onClick={onClose}
                          className="group relative rounded-sm border border-obsidian-850/80 bg-obsidian-900/40 p-4 transition-all duration-200 hover:border-gold-500/40 hover:bg-obsidian-900/80 focus:outline-none focus:ring-1 focus:ring-gold-500/50"
                        >
                          <div className="flex items-start gap-3.5">
                            <div
                              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded border border-obsidian-750 bg-obsidian-950 text-sand-200 transition-colors group-hover:border-gold-500/40 group-hover:text-gold-300"
                              style={{ color: service.accent }}
                            >
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[9px] uppercase tracking-wider text-sand-400">
                                  {service.eyebrow}
                                </span>
                                {service.badge && (
                                  <Badge
                                    variant="outline"
                                    className="font-mono text-[9px] py-0 px-1.5 border-obsidian-700 text-gold-400/90"
                                  >
                                    {service.badge}
                                  </Badge>
                                )}
                              </div>
                              <h4 className="font-serif text-sm text-sand-100 font-medium group-hover:text-gold-200 transition-colors">
                                {service.title}
                              </h4>
                              <p className="font-serif text-xs text-sand-400 leading-relaxed line-clamp-2">
                                {service.description}
                              </p>
                            </div>
                          </div>
                        </LinkComp>
                      );
                    })}
                  </div>
                </div>

                {/* Featured Practice Spotlight Dossier (4 cols) */}
                <div className="lg:col-span-4 flex flex-col justify-between rounded-sm border border-gold-500/30 bg-gradient-to-br from-obsidian-900 via-obsidian-950 to-obsidian-950 p-6 relative overflow-hidden">
                  <div className="pointer-events-none absolute -right-12 -bottom-12 h-48 w-48 rounded-full bg-gold-500/5 blur-3xl" />
                  
                  <div className="space-y-4 relative z-10">
                    <Badge variant="outline" className="border-gold-500/40 font-mono text-[10px] text-gold-400 uppercase tracking-widest">
                      {GLOBAL_NAV_DATA.featuredService.tag}
                    </Badge>

                    <div>
                      <h4 className="font-serif text-lg text-sand-100 font-medium leading-snug">
                        {GLOBAL_NAV_DATA.featuredService.title}
                      </h4>
                      <p className="mt-2 font-serif text-xs text-sand-400 leading-relaxed">
                        {GLOBAL_NAV_DATA.featuredService.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-obsidian-800">
                      <span className="font-serif text-3xl font-light text-gold-400">
                        {GLOBAL_NAV_DATA.featuredService.metric}
                      </span>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-sand-400 mt-0.5">
                        {GLOBAL_NAV_DATA.featuredService.metricLabel}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 relative z-10">
                    <LinkComp
                      href={GLOBAL_NAV_DATA.featuredService.href}
                      onClick={onClose}
                      className="group inline-flex items-center justify-between w-full rounded border border-gold-500/30 bg-gold-500/10 px-4 py-2.5 font-mono text-xs text-gold-300 hover:bg-gold-500/20 transition-all"
                    >
                      <span>{GLOBAL_NAV_DATA.featuredService.cta}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </LinkComp>
                  </div>
                </div>
              </div>
            ) : (
              /* INDUSTRIES MEGA MENU LAYOUT */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* 6 Industry Sectors Grid (8 cols) */}
                <div className="lg:col-span-8">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-obsidian-850">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
                        Operating Sectors
                      </span>
                      <span className="text-obsidian-600">/</span>
                      <span className="font-sans text-xs text-sand-400">
                        High-Stakes Arenas
                      </span>
                    </div>
                    <LinkComp
                      href="/#industries"
                      onClick={onClose}
                      className="group inline-flex items-center gap-1 font-mono text-[11px] text-sand-400 hover:text-gold-300 transition-colors"
                    >
                      <span>View all sectors</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 text-gold-400" />
                    </LinkComp>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {GLOBAL_NAV_DATA.industries.map((ind: NavIndustryItem) => (
                      <LinkComp
                        key={ind.id}
                        href={ind.href}
                        onClick={onClose}
                        className="group relative rounded-sm border border-obsidian-850/80 bg-obsidian-900/40 p-4 transition-all duration-200 hover:border-gold-500/40 hover:bg-obsidian-900/80 focus:outline-none focus:ring-1 focus:ring-gold-500/50"
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-mono text-xs text-gold-400 font-semibold mt-0.5 shrink-0">
                            [{ind.code}]
                          </span>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-serif text-sm text-sand-100 font-medium group-hover:text-gold-200 transition-colors">
                                {ind.title}
                              </h4>
                              {ind.badge && (
                                <span className="font-mono text-[9px] uppercase tracking-wider text-obsidian-400 bg-obsidian-800/80 px-1.5 py-0.5 rounded">
                                  {ind.badge}
                                </span>
                              )}
                            </div>
                            <p className="font-serif text-xs text-sand-400 leading-relaxed line-clamp-2">
                              {ind.description}
                            </p>
                          </div>
                        </div>
                      </LinkComp>
                    ))}
                  </div>
                </div>

                {/* Featured Sector Scale Card (4 cols) */}
                <div className="lg:col-span-4 flex flex-col justify-between rounded-sm border border-obsidian-800 bg-gradient-to-br from-obsidian-900 via-obsidian-950 to-obsidian-950 p-6 relative overflow-hidden">
                  <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-blue-500/5 blur-3xl" />

                  <div className="space-y-4 relative z-10">
                    <Badge variant="outline" className="border-obsidian-700 font-mono text-[10px] text-sand-300 uppercase tracking-widest">
                      {GLOBAL_NAV_DATA.featuredIndustry.tag}
                    </Badge>

                    <div>
                      <h4 className="font-serif text-lg text-sand-100 font-medium leading-snug">
                        {GLOBAL_NAV_DATA.featuredIndustry.title}
                      </h4>
                      <p className="mt-2 font-serif text-xs text-sand-400 leading-relaxed">
                        {GLOBAL_NAV_DATA.featuredIndustry.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-obsidian-800">
                      <span className="font-serif text-3xl font-light text-sand-100">
                        {GLOBAL_NAV_DATA.featuredIndustry.metric}
                      </span>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-sand-400 mt-0.5">
                        {GLOBAL_NAV_DATA.featuredIndustry.metricLabel}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 relative z-10">
                    <LinkComp
                      href={GLOBAL_NAV_DATA.featuredIndustry.href}
                      onClick={onClose}
                      className="group inline-flex items-center justify-between w-full rounded border border-obsidian-700 bg-obsidian-900 px-4 py-2.5 font-mono text-xs text-sand-200 hover:border-gold-500/40 hover:text-gold-300 transition-all"
                    >
                      <span>{GLOBAL_NAV_DATA.featuredIndustry.cta}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </LinkComp>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Links Sub-bar */}
            <div className="mt-6 pt-4 border-t border-obsidian-850/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <span className="font-mono text-[10px] uppercase tracking-wider text-obsidian-400">
                  Quick Access:
                </span>
                <LinkComp
                  href="/#case-studies"
                  onClick={onClose}
                  className="font-mono text-xs text-sand-400 hover:text-gold-300 transition-colors"
                >
                  Case Records #8104
                </LinkComp>
                <LinkComp
                  href="/#intelligence"
                  onClick={onClose}
                  className="font-mono text-xs text-sand-400 hover:text-gold-300 transition-colors"
                >
                  Perception Dossiers
                </LinkComp>
                <LinkComp
                  href="/asset-system"
                  onClick={onClose}
                  className="font-mono text-xs text-gold-400 hover:text-gold-300 transition-colors"
                >
                  AI Image Asset Catalog
                </LinkComp>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[11px] text-emerald-400/90 tracking-wider">
                  Active Crisis Desk 24/7 Available
                </span>
              </div>
            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
