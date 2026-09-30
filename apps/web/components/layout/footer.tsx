import * as React from "react";
import Link from "next/link";
import { Shield, Lock } from "lucide-react";
import { BrandLockup } from "@samvad/ui";
import { NewsletterSubscribeForm } from "@/components/newsletter/newsletter-subscribe-form";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 py-16 text-xs text-zinc-400">
      <div className="container mx-auto px-6 md:px-12">
        {/* Executive Newsletter Dispatch Section */}
        <div className="mb-14 pb-12 border-b border-zinc-900 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-gold-400">
                Institutional Intel
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-zinc-100 font-normal">
              Subscribe to SAMVAD Executive Dispatches
            </h3>
            <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
              Curated strategic counsel, perception telemetry, crisis casebooks, and sovereign communication doctrine delivered fortnightly to boardrooms and senior counsel.
            </p>
          </div>
          <div className="lg:col-span-6">
            <NewsletterSubscribeForm
              source="FOOTER_PRIMARY"
              title=""
              description=""
              variant="footer"
            />
          </div>
        </div>
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Col 1: Brand & Charter */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="group inline-block">
              <BrandLockup layout="horizontal" size="md" markTone="gradient" />
            </Link>
            <p className="max-w-md text-xs leading-relaxed text-zinc-400">
              SAMVAD PERCEPTION ADVISORY is an institutional-grade strategic communications,
              reputation management, and perception intelligence advisory. We serve sovereign
              entities, defense conglomerates, multinational corporations, and high-consequence
              leadership.
            </p>
            <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-400">
              <span className="flex items-center gap-1 text-gold-400">
                <Shield className="h-3.5 w-3.5" /> ISO 27001 Aligned
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-zinc-300">
                <Lock className="h-3.5 w-3.5" /> Strict NDA Protocol
              </span>
            </div>
          </div>

          {/* Col 2: Core Practices */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-zinc-200">
              Advisory Practices
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <Link href="#services" className="transition-colors hover:text-gold-400">
                  Perception Intelligence
                </Link>
              </li>
              <li>
                <Link href="#services" className="transition-colors hover:text-gold-400">
                  Crisis Architecture
                </Link>
              </li>
              <li>
                <Link href="#services" className="transition-colors hover:text-gold-400">
                  Strategic Communications
                </Link>
              </li>
              <li>
                <Link href="#services" className="transition-colors hover:text-gold-400">
                  Public Affairs & Policy
                </Link>
              </li>
              <li>
                <Link href="#services" className="transition-colors hover:text-gold-400">
                  Executive Shield Protocol
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Sectors */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-zinc-200">
              Sectors & Arenas
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <Link href="#industries" className="transition-colors hover:text-gold-400">
                  Defense & Aerospace
                </Link>
              </li>
              <li>
                <Link href="#industries" className="transition-colors hover:text-gold-400">
                  Banking & FinTech
                </Link>
              </li>
              <li>
                <Link href="#industries" className="transition-colors hover:text-gold-400">
                  Critical Infrastructure & Energy
                </Link>
              </li>
              <li>
                <Link href="#industries" className="transition-colors hover:text-gold-400">
                  Healthcare & Life Sciences
                </Link>
              </li>
              <li>
                <Link href="#industries" className="transition-colors hover:text-gold-400">
                  Family Offices & UHNW
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-900 pt-8 text-[11px] text-zinc-400 md:flex-row">
          <p>© {new Date().getFullYear()} SAMVAD PERCEPTION ADVISORY. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <span className="cursor-pointer hover:text-zinc-400">Confidentiality Protocol</span>
            <span className="cursor-pointer hover:text-zinc-400">Institutional Disclosures</span>
            <span className="cursor-pointer hover:text-zinc-400">Security Safeguards</span>
            <Link href="/unsubscribe" className="text-zinc-500 hover:text-zinc-300 transition-colors">
              Dispatch Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
