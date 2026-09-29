"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@samvad/ui";
import { ShieldCheck, Menu, X } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-zinc-800/80 bg-zinc-950/85 py-3.5 shadow-2xl backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 md:px-12">
        {/* Brand identity */}
        <Link href="/" className="group flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-gradient-to-br from-gold-400 to-gold-700 font-bold text-zinc-950 shadow-md shadow-gold-500/20 transition-transform duration-300 group-hover:scale-105">
            <span className="font-serif text-base tracking-tighter">S</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-sm font-bold uppercase tracking-[0.18em] text-zinc-100 transition-colors group-hover:text-gold-300 md:text-base">
              SAMVAD
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-400">
              Perception Advisory
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-8 text-xs font-medium uppercase tracking-widest text-zinc-300 lg:flex">
          <Link href="#services" className="transition-colors duration-200 hover:text-gold-400">
            Advisory Practices
          </Link>
          <Link href="#industries" className="transition-colors duration-200 hover:text-gold-400">
            Sectors
          </Link>
          <Link href="#case-studies" className="transition-colors duration-200 hover:text-gold-400">
            Case Records
          </Link>
          <Link href="#intelligence" className="transition-colors duration-200 hover:text-gold-400">
            Insights
          </Link>
          <Link
            href="#confidentiality"
            className="flex items-center gap-1.5 transition-colors duration-200 hover:text-gold-400"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-gold-400" />
            Security & Trust
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden items-center space-x-4 lg:flex">
          <Button variant="gold" size="sm" asChild>
            <Link href="#contact">Engage Advisory</Link>
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-zinc-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="border-b border-zinc-800 bg-zinc-950/95 px-6 py-6 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col space-y-4 text-xs font-semibold uppercase tracking-widest text-zinc-300">
            <Link
              href="#services"
              onClick={() => setIsOpen(false)}
              className="py-2 hover:text-gold-400"
            >
              Advisory Practices
            </Link>
            <Link
              href="#industries"
              onClick={() => setIsOpen(false)}
              className="py-2 hover:text-gold-400"
            >
              Sectors
            </Link>
            <Link
              href="#case-studies"
              onClick={() => setIsOpen(false)}
              className="py-2 hover:text-gold-400"
            >
              Case Records
            </Link>
            <Link
              href="#intelligence"
              onClick={() => setIsOpen(false)}
              className="py-2 hover:text-gold-400"
            >
              Insights
            </Link>
            <div className="pt-2">
              <Button
                variant="gold"
                size="sm"
                className="w-full"
                asChild
                onClick={() => setIsOpen(false)}
              >
                <Link href="#contact">Engage Advisory</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
