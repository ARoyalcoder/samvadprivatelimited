"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Container } from "../layout/container";

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode;
  actions?: React.ReactNode;
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ brand, actions, className, children, ...props }, ref) => {
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 20);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "bg-obsidian-950/85 border-obsidian-700/60 shadow-elevation-1 border-b py-3 backdrop-blur-md"
            : "border-b border-transparent bg-transparent py-5",
          className
        )}
        {...props}
      >
        <Container size="xl">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-8">
              {brand}
              <nav className="hidden items-center gap-6 md:flex">{children}</nav>
            </div>
            {actions && <div className="flex items-center gap-4">{actions}</div>}
          </div>
        </Container>
      </header>
    );
  }
);
Navbar.displayName = "Navbar";

export interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

export const NavItem = React.forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ active = false, className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          "group relative py-1 font-mono text-xs uppercase tracking-[0.16em] transition-colors",
          active ? "text-paper-100 font-semibold" : "text-paper-400 hover:text-gold-300",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <span
          className={cn(
            "bg-gold-400 absolute bottom-0 left-0 h-[1px] transition-all duration-300",
            active ? "w-full" : "w-0 group-hover:w-full"
          )}
        />
      </a>
    );
  }
);
NavItem.displayName = "NavItem";
