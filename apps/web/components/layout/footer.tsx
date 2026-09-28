import * as React from "react";
import Link from "next/link";
import { Shield, Lock } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 text-zinc-400 py-16 text-xs">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Col 1: Brand & Charter */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-sm bg-gradient-to-br from-gold-400 to-gold-700 flex items-center justify-center text-zinc-950 font-bold">
                <span className="font-serif text-sm">S</span>
              </div>
              <span className="font-serif text-base tracking-[0.2em] text-zinc-100 font-bold">
                SAMVAD
              </span>
            </div>
            <p className="text-zinc-400 max-w-md leading-relaxed text-xs">
              SAMVAD PERCEPTION ADVISORY is an institutional-grade strategic communications,
              reputation management, and perception intelligence advisory. We serve sovereign
              entities, defense conglomerates, multinational corporations, and high-consequence
              leadership.
            </p>
            <div className="flex items-center gap-3 text-[11px] text-zinc-400 font-mono">
              <span className="flex items-center gap-1 text-gold-400">
                <Shield className="w-3.5 h-3.5" /> ISO 27001 Aligned
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-zinc-300">
                <Lock className="w-3.5 h-3.5" /> Strict NDA Protocol
              </span>
            </div>
          </div>

          {/* Col 2: Core Practices */}
          <div className="space-y-3">
            <h4 className="text-zinc-200 font-semibold uppercase tracking-widest text-[11px]">
              Advisory Practices
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <Link href="#services" className="hover:text-gold-400 transition-colors">
                  Perception Intelligence
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-gold-400 transition-colors">
                  Crisis Architecture
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-gold-400 transition-colors">
                  Strategic Communications
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-gold-400 transition-colors">
                  Public Affairs & Policy
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-gold-400 transition-colors">
                  Executive Shield Protocol
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Sectors */}
          <div className="space-y-3">
            <h4 className="text-zinc-200 font-semibold uppercase tracking-widest text-[11px]">
              Sectors & Arenas
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <Link href="#industries" className="hover:text-gold-400 transition-colors">
                  Defense & Aerospace
                </Link>
              </li>
              <li>
                <Link href="#industries" className="hover:text-gold-400 transition-colors">
                  Banking & FinTech
                </Link>
              </li>
              <li>
                <Link href="#industries" className="hover:text-gold-400 transition-colors">
                  Critical Infrastructure & Energy
                </Link>
              </li>
              <li>
                <Link href="#industries" className="hover:text-gold-400 transition-colors">
                  Healthcare & Life Sciences
                </Link>
              </li>
              <li>
                <Link href="#industries" className="hover:text-gold-400 transition-colors">
                  Family Offices & UHNW
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between text-zinc-400 text-[11px] gap-4">
          <p>© {new Date().getFullYear()} SAMVAD PERCEPTION ADVISORY. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <span className="hover:text-zinc-400 cursor-pointer">Confidentiality Protocol</span>
            <span className="hover:text-zinc-400 cursor-pointer">Institutional Disclosures</span>
            <span className="hover:text-zinc-400 cursor-pointer">Security Safeguards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
