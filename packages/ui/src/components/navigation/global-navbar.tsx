"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Container } from "../layout/container";
import { BrandLockup } from "../brand/brand-mark";
import { MagneticButton } from "../buttons/magnetic-button";
import { MegaMenu } from "./mega-menu";
import { MobileDrawer } from "./mobile-drawer";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Search,
} from "lucide-react";
import { NavLinkComponent } from "./nav-data";

const DefaultLink: NavLinkComponent = ({ href, children, ...props }) => (
  <a href={href} {...props}>
    {children}
  </a>
);

export interface GlobalNavbarProps extends React.HTMLAttributes<HTMLElement> {
  ctaHref?: string;
  ctaText?: string;
  enableScrollAwareHide?: boolean;
  linkComponent?: NavLinkComponent;
  onSearchClick?: () => void;
}

export const GlobalNavbar = React.forwardRef<HTMLElement, GlobalNavbarProps>(
  (
    {
      ctaHref = "/#contact",
      ctaText = "Let's Talk",
      enableScrollAwareHide = true,
      linkComponent: LinkComp = DefaultLink,
      onSearchClick,
      className,
      ...props
    },
    ref
  ) => {
    const [scrolled, setScrolled] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);
    const [lastScrollY, setLastScrollY] = React.useState(0);

    // Active mega menu state ('services' | 'industries' | null)
    const [activeMegaMenu, setActiveMegaMenu] = React.useState<"services" | "industries" | null>(null);
    const hoverTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    // Mobile drawer state
    const [mobileOpen, setMobileOpen] = React.useState(false);

    // Scroll awareness and sticky transition
    React.useEffect(() => {
      const handleScroll = () => {
        const currentY = window.scrollY;

        // Determine if scrolled past top hero zone
        setScrolled(currentY > 30);

        // Scroll-aware hide/reveal logic
        if (enableScrollAwareHide && !activeMegaMenu && !mobileOpen) {
          if (currentY > 120 && currentY > lastScrollY + 8) {
            // Scrolling down -> hide navbar
            setHidden(true);
          } else if (currentY < lastScrollY - 5) {
            // Scrolling up -> reveal navbar
            setHidden(false);
          }
        } else {
          setHidden(false);
        }

        setLastScrollY(currentY);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY, enableScrollAwareHide, activeMegaMenu, mobileOpen]);

    // Hover intent handlers for mega menu with debounce
    const handleTriggerEnter = (type: "services" | "industries") => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      setActiveMegaMenu(type);
    };

    const handleTriggerLeave = () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      hoverTimeoutRef.current = setTimeout(() => {
        setActiveMegaMenu(null);
      }, 180);
    };

    const handleMenuEnter = () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };

    const handleMenuLeave = () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      hoverTimeoutRef.current = setTimeout(() => {
        setActiveMegaMenu(null);
      }, 150);
    };

    const handleToggleClick = (type: "services" | "industries") => {
      setActiveMegaMenu((prev) => (prev === type ? null : type));
    };

    return (
      <>
        <header
          ref={ref}
          className={cn(
            "fixed left-0 right-0 top-0 z-50 transition-all duration-300 ease-out",
            scrolled
              ? "border-b border-obsidian-800/80 bg-obsidian-950/85 py-3.5 shadow-2xl backdrop-blur-md"
              : "border-b border-transparent bg-transparent py-5",
            hidden ? "-translate-y-full" : "translate-y-0",
            className
          )}
          role="navigation"
          aria-label="Global Navigation"
          {...props}
        >
          {/* Subtle top reflection accent on scroll */}
          {scrolled && (
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/25 to-transparent pointer-events-none" />
          )}

          <Container size="xl">
            <div className="flex items-center justify-between gap-6">
              {/* 1. SAMVAD Brand Logo */}
              <LinkComp href="/" className="group shrink-0 focus:outline-none focus:ring-1 focus:ring-gold-500 rounded">
                <BrandLockup layout="horizontal" size="md" markTone="gradient" />
              </LinkComp>

              {/* 2. Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-xs font-mono uppercase tracking-[0.14em] text-sand-300">
                {/* About Link */}
                <LinkComp
                  href="/#about"
                  className="group relative px-3 py-2 text-sand-300 hover:text-gold-300 transition-colors focus:outline-none focus:ring-1 focus:ring-gold-500/50 rounded"
                >
                  <span>About</span>
                  <span className="absolute bottom-1 left-3 right-3 h-[1px] bg-gold-400 scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
                </LinkComp>

                {/* Services Trigger (Mega Menu) */}
                <div
                  className="relative"
                  onMouseEnter={() => handleTriggerEnter("services")}
                  onMouseLeave={handleTriggerLeave}
                >
                  <button
                    onClick={() => handleToggleClick("services")}
                    aria-expanded={activeMegaMenu === "services"}
                    aria-haspopup="true"
                    aria-controls="services-mega-menu"
                    className={cn(
                      "group flex items-center gap-1.5 px-3 py-2 transition-colors focus:outline-none focus:ring-1 focus:ring-gold-500/50 rounded",
                      activeMegaMenu === "services"
                        ? "text-gold-300"
                        : "text-sand-300 hover:text-gold-300"
                    )}
                  >
                    <span>Services</span>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200 text-obsidian-400 group-hover:text-gold-400",
                        activeMegaMenu === "services" && "rotate-180 text-gold-400"
                      )}
                    />
                  </button>
                </div>

                {/* Industries Trigger (Mega Menu) */}
                <div
                  className="relative"
                  onMouseEnter={() => handleTriggerEnter("industries")}
                  onMouseLeave={handleTriggerLeave}
                >
                  <button
                    onClick={() => handleToggleClick("industries")}
                    aria-expanded={activeMegaMenu === "industries"}
                    aria-haspopup="true"
                    aria-controls="industries-mega-menu"
                    className={cn(
                      "group flex items-center gap-1.5 px-3 py-2 transition-colors focus:outline-none focus:ring-1 focus:ring-gold-500/50 rounded",
                      activeMegaMenu === "industries"
                        ? "text-gold-300"
                        : "text-sand-300 hover:text-gold-300"
                    )}
                  >
                    <span>Industries</span>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200 text-obsidian-400 group-hover:text-gold-400",
                        activeMegaMenu === "industries" && "rotate-180 text-gold-400"
                      )}
                    />
                  </button>
                </div>

                {/* Work Link */}
                <LinkComp
                  href="/#case-studies"
                  className="group relative px-3 py-2 text-sand-300 hover:text-gold-300 transition-colors focus:outline-none focus:ring-1 focus:ring-gold-500/50 rounded"
                >
                  <span>Work</span>
                  <span className="absolute bottom-1 left-3 right-3 h-[1px] bg-gold-400 scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
                </LinkComp>

                {/* Insights Link */}
                <LinkComp
                  href="/#intelligence"
                  className="group relative px-3 py-2 text-sand-300 hover:text-gold-300 transition-colors focus:outline-none focus:ring-1 focus:ring-gold-500/50 rounded"
                >
                  <span>Insights</span>
                  <span className="absolute bottom-1 left-3 right-3 h-[1px] bg-gold-400 scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
                </LinkComp>

                {/* Newsroom Link */}
                <LinkComp
                  href="/#newsroom"
                  className="group relative px-3 py-2 text-sand-300 hover:text-gold-300 transition-colors focus:outline-none focus:ring-1 focus:ring-gold-500/50 rounded"
                >
                  <span>Newsroom</span>
                  <span className="absolute bottom-1 left-3 right-3 h-[1px] bg-gold-400 scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
                </LinkComp>
              </nav>

              {/* 3. Desktop Actions & Magnetic CTA */}
              <div className="hidden lg:flex items-center gap-3 shrink-0">
                {/* Search Dialog Trigger */}
                {onSearchClick && (
                  <button
                    type="button"
                    onClick={onSearchClick}
                    className="group flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-obsidian-800 bg-obsidian-900/60 hover:border-gold-500/40 hover:bg-obsidian-850 text-obsidian-400 hover:text-sand-100 transition-all text-xs font-mono"
                    aria-label="Open global search (Cmd+K)"
                  >
                    <Search className="h-3.5 w-3.5 text-gold-400 group-hover:scale-110 transition-transform" />
                    <span className="hidden xl:inline text-[11px] text-sand-300">Search</span>
                    <kbd className="text-[10px] px-1 py-0.2 rounded bg-obsidian-800 border border-obsidian-700 text-obsidian-400 group-hover:text-gold-300">
                      ⌘K
                    </kbd>
                  </button>
                )}

                <LinkComp
                  href="/asset-system"
                  className="font-mono text-[11px] uppercase tracking-wider text-obsidian-400 hover:text-gold-300 transition-colors"
                >
                  Asset System
                </LinkComp>

                {/* Magnetic CTA Button */}
                <LinkComp href={ctaHref}>
                  <MagneticButton
                    variant="gold"
                    size="sm"
                    className="font-mono text-xs uppercase tracking-widest px-4 py-2 shadow-elevation-1"
                  >
                    <span>{ctaText}</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </MagneticButton>
                </LinkComp>
              </div>

              {/* 4. Mobile Actions & Hamburger */}
              <div className="flex items-center gap-2 lg:hidden">
                {onSearchClick && (
                  <button
                    type="button"
                    onClick={onSearchClick}
                    className="flex h-10 w-10 items-center justify-center rounded-sm border border-obsidian-800 text-sand-300 hover:border-gold-500/50 hover:text-gold-300 transition-colors"
                    aria-label="Open search dialog"
                  >
                    <Search className="h-4 w-4 text-gold-400" />
                  </button>
                )}

                <LinkComp href={ctaHref} className="sm:inline-block hidden">
                  <MagneticButton variant="gold" size="sm" className="font-mono text-[11px] uppercase tracking-wider px-3 py-1.5">
                    <span>{ctaText}</span>
                  </MagneticButton>
                </LinkComp>

                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-obsidian-800 text-sand-200 hover:border-gold-500/50 hover:text-gold-300 transition-colors focus:outline-none focus:ring-1 focus:ring-gold-500"
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileOpen}
                >
                  {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </Container>

          {/* Desktop Mega Menu Dropdown */}
          <MegaMenu
            isOpen={activeMegaMenu !== null}
            activeType={activeMegaMenu}
            onClose={() => setActiveMegaMenu(null)}
            onMouseEnter={handleMenuEnter}
            onMouseLeave={handleMenuLeave}
            linkComponent={LinkComp}
          />
        </header>

        {/* Mobile Slide-Over Drawer */}
        <MobileDrawer
          isOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
          linkComponent={LinkComp}
          onSearchClick={onSearchClick}
        />
      </>
    );
  }
);
GlobalNavbar.displayName = "GlobalNavbar";
