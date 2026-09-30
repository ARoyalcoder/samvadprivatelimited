"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import {
  GLOBAL_NAV_DATA,
  NavServiceItem,
  NavIndustryItem,
  NavLinkComponent,
} from "./nav-data";
import {
  ChevronDown,
  X,
  ArrowRight,
  Search,
} from "lucide-react";
import { BrandLockup } from "../brand/brand-mark";
import { MagneticButton } from "../buttons/magnetic-button";

const DefaultLink: NavLinkComponent = ({ href, children, ...props }) => (
  <a href={href} {...props}>
    {children}
  </a>
);

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  linkComponent?: NavLinkComponent;
  onSearchClick?: () => void;
}

export function MobileDrawer({
  isOpen,
  onClose,
  linkComponent: LinkComp = DefaultLink,
  onSearchClick,
}: MobileDrawerProps) {
  const [openSection, setOpenSection] = React.useState<"services" | "industries" | null>(null);

  // Lock body scroll when drawer is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setOpenSection(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const toggleSection = (section: "services" | "industries") => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-obsidian-950/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Drawer Content Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-obsidian-950 border-l border-obsidian-800 shadow-2xl overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="sticky top-0 z-20 flex h-18 items-center justify-between border-b border-obsidian-850 bg-obsidian-950/95 px-6 backdrop-blur-md">
              <LinkComp href="/" onClick={onClose} className="group">
                <BrandLockup layout="horizontal" size="sm" markTone="gradient" />
              </LinkComp>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-obsidian-800 text-sand-300 hover:border-gold-500/50 hover:text-gold-300 transition-colors focus:outline-none focus:ring-1 focus:ring-gold-500"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Links Body */}
            <div className="flex-1 px-6 py-6 space-y-6">
              {/* Quick Search Button */}
              {onSearchClick && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSearchClick();
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border border-obsidian-800 bg-obsidian-900/70 text-obsidian-300 hover:text-sand-100 hover:border-gold-500/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Search className="h-4 w-4 text-gold-400" />
                    <span className="text-xs font-mono">Search website...</span>
                  </div>
                  <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-obsidian-850 text-obsidian-400 border border-obsidian-750">
                    ⌘K
                  </kbd>
                </button>
              )}

              {/* Primary Nav List */}
              <nav className="space-y-1">
                {/* 1. About Link */}
                <LinkComp
                  href="/#about"
                  onClick={onClose}
                  className="flex h-12 items-center justify-between rounded px-3 font-serif text-lg text-sand-100 hover:bg-obsidian-900 hover:text-gold-300 transition-colors"
                >
                  <span>About</span>
                  <span className="font-mono text-[10px] text-obsidian-400 uppercase tracking-widest">01</span>
                </LinkComp>

                {/* 2. Services Accordion */}
                <div>
                  <button
                    onClick={() => toggleSection("services")}
                    className="flex h-12 w-full items-center justify-between rounded px-3 font-serif text-lg text-sand-100 hover:bg-obsidian-900 transition-colors"
                    aria-expanded={openSection === "services"}
                  >
                    <div className="flex items-center gap-2">
                      <span className={cn(openSection === "services" && "text-gold-300 font-medium")}>
                        Services
                      </span>
                      <span className="rounded bg-obsidian-850 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-gold-400">
                        Mega Menu
                      </span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-obsidian-400 transition-transform duration-200",
                        openSection === "services" && "rotate-180 text-gold-400"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {openSection === "services" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden pl-4 pr-1 py-2 space-y-2 border-l border-gold-500/20 ml-3"
                      >
                        {GLOBAL_NAV_DATA.services.map((item: NavServiceItem) => (
                          <LinkComp
                            key={item.id}
                            href={item.href}
                            onClick={onClose}
                            className="block rounded p-2.5 hover:bg-obsidian-900 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-serif text-sm text-sand-200 font-medium">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span className="font-mono text-[8px] uppercase tracking-wider text-gold-400 bg-obsidian-850 px-1.5 py-0.5 rounded">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="mt-1 font-serif text-xs text-sand-400 line-clamp-1">
                              {item.description}
                            </p>
                          </LinkComp>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Industries Accordion */}
                <div>
                  <button
                    onClick={() => toggleSection("industries")}
                    className="flex h-12 w-full items-center justify-between rounded px-3 font-serif text-lg text-sand-100 hover:bg-obsidian-900 transition-colors"
                    aria-expanded={openSection === "industries"}
                  >
                    <div className="flex items-center gap-2">
                      <span className={cn(openSection === "industries" && "text-gold-300 font-medium")}>
                        Industries
                      </span>
                      <span className="rounded bg-obsidian-850 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-sand-300">
                        6 Sectors
                      </span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-obsidian-400 transition-transform duration-200",
                        openSection === "industries" && "rotate-180 text-gold-400"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {openSection === "industries" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden pl-4 pr-1 py-2 space-y-2 border-l border-obsidian-700 ml-3"
                      >
                        {GLOBAL_NAV_DATA.industries.map((ind: NavIndustryItem) => (
                          <LinkComp
                            key={ind.id}
                            href={ind.href}
                            onClick={onClose}
                            className="block rounded p-2.5 hover:bg-obsidian-900 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] text-gold-400 font-semibold">
                                [{ind.code}]
                              </span>
                              <span className="font-serif text-sm text-sand-200 font-medium">
                                {ind.title}
                              </span>
                            </div>
                            <p className="mt-1 font-serif text-xs text-sand-400 line-clamp-1">
                              {ind.description}
                            </p>
                          </LinkComp>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 4. Work Link */}
                <LinkComp
                  href="/#case-studies"
                  onClick={onClose}
                  className="flex h-12 items-center justify-between rounded px-3 font-serif text-lg text-sand-100 hover:bg-obsidian-900 hover:text-gold-300 transition-colors"
                >
                  <span>Work</span>
                  <span className="font-mono text-[10px] text-gold-400 bg-obsidian-850 px-1.5 py-0.5 rounded">
                    Case #8104
                  </span>
                </LinkComp>

                {/* 5. Insights Link */}
                <LinkComp
                  href="/#intelligence"
                  onClick={onClose}
                  className="flex h-12 items-center justify-between rounded px-3 font-serif text-lg text-sand-100 hover:bg-obsidian-900 hover:text-gold-300 transition-colors"
                >
                  <span>Insights</span>
                  <span className="font-mono text-[10px] text-obsidian-400 uppercase tracking-widest">Dossiers</span>
                </LinkComp>

                {/* 6. Newsroom Link */}
                <LinkComp
                  href="/#newsroom"
                  onClick={onClose}
                  className="flex h-12 items-center justify-between rounded px-3 font-serif text-lg text-sand-100 hover:bg-obsidian-900 hover:text-gold-300 transition-colors"
                >
                  <span>Newsroom</span>
                  <span className="font-mono text-[10px] text-obsidian-400 uppercase tracking-widest">Media</span>
                </LinkComp>
              </nav>

              {/* System Architecture Quick Links */}
              <div className="rounded border border-obsidian-850 bg-obsidian-900/40 p-4 space-y-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-obsidian-400 block">
                  Design & Intelligence System
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <LinkComp
                    href="/brand-identity"
                    onClick={onClose}
                    className="rounded border border-obsidian-800 bg-obsidian-950 p-2 text-center hover:border-gold-500/40 transition-colors"
                  >
                    <span className="block font-mono text-[10px] text-sand-300">Identity</span>
                  </LinkComp>
                  <LinkComp
                    href="/design-system"
                    onClick={onClose}
                    className="rounded border border-obsidian-800 bg-obsidian-950 p-2 text-center hover:border-gold-500/40 transition-colors"
                  >
                    <span className="block font-mono text-[10px] text-sand-300">Tokens</span>
                  </LinkComp>
                  <LinkComp
                    href="/asset-system"
                    onClick={onClose}
                    className="rounded border border-gold-500/30 bg-gold-500/10 p-2 text-center hover:bg-gold-500/20 transition-colors"
                  >
                    <span className="block font-mono text-[10px] text-gold-300 font-medium">Assets</span>
                  </LinkComp>
                </div>
              </div>

              {/* 24/7 Crisis Advisory Badge */}
              <div className="flex items-center gap-3 rounded border border-red-500/20 bg-red-950/20 p-3">
                <div className="h-2 w-2 rounded-full bg-red-400 animate-ping" />
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-red-400 font-semibold block">
                    Immediate Crisis Response
                  </span>
                  <p className="font-serif text-[11px] text-sand-400">
                    Partner war-room mobilized in &lt;15 minutes.
                  </p>
                </div>
              </div>
            </div>

            {/* Drawer Footer CTA */}
            <div className="sticky bottom-0 z-20 border-t border-obsidian-850 bg-obsidian-950/98 p-6 backdrop-blur-md">
              <LinkComp href="/#contact" onClick={onClose} className="block w-full">
                <MagneticButton
                  variant="gold"
                  size="lg"
                  className="w-full justify-center font-mono text-xs uppercase tracking-widest shadow-elevation-2"
                >
                  <span>Let&apos;s Talk</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </MagneticButton>
              </LinkComp>
              <p className="mt-3 text-center font-serif text-[11px] text-obsidian-400">
                Strict Non-Disclosure Agreement Protected
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
