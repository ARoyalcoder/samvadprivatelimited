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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand identity */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-gold-400 to-gold-700 flex items-center justify-center text-zinc-950 font-bold shadow-md shadow-gold-500/20 group-hover:scale-105 transition-transform duration-300">
            <span className="font-serif text-base tracking-tighter">S</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm md:text-base font-serif font-bold tracking-[0.18em] text-zinc-100 uppercase group-hover:text-gold-300 transition-colors">
              SAMVAD
            </span>
            <span className="text-[9px] tracking-[0.25em] text-zinc-400 uppercase font-mono">
              Perception Advisory
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-medium uppercase tracking-widest text-zinc-300">
          <Link href="#services" className="hover:text-gold-400 transition-colors duration-200">
            Advisory Practices
          </Link>
          <Link href="#industries" className="hover:text-gold-400 transition-colors duration-200">
            Sectors
          </Link>
          <Link href="#case-studies" className="hover:text-gold-400 transition-colors duration-200">
            Case Records
          </Link>
          <Link href="#intelligence" className="hover:text-gold-400 transition-colors duration-200">
            Insights
          </Link>
          <Link
            href="#confidentiality"
            className="hover:text-gold-400 transition-colors duration-200 flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
            Security & Trust
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          <Button variant="gold" size="sm" asChild>
            <Link href="#contact">Engage Advisory</Link>
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-zinc-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-zinc-950/95 border-b border-zinc-800 px-6 py-6 backdrop-blur-xl">
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
