import * as React from "react";
import Link from "next/link";
import { Shield, Lock } from "lucide-react";
import { BrandLockup } from "@samvad/ui";
import { NewsletterSubscribeForm } from "@/components/newsletter/newsletter-subscribe-form";

export function Footer() {
  return (
    <footer className="border-t border-[#d8d1c5] bg-[#f3f0e8] py-16 text-xs text-[#626760]">
      <div className="container mx-auto px-6 md:px-12">

        {/* Executive Newsletter Dispatch Section */}
        <div className="mb-14 grid grid-cols-1 items-center gap-8 border-b border-[#d8d1c5] pb-12 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-6">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a67c45]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#a67c45]">
                Executive Dispatch
              </span>
            </div>

            <h3 className="max-w-lg font-serif text-2xl font-normal leading-snug text-[#1d2529] sm:text-3xl">
              Perspectives for decision-makers.
            </h3>

            <p className="max-w-md text-sm leading-relaxed text-[#626760]">
              Strategic insights on reputation, policy and institutional affairs.
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

        {/* Footer Navigation */}
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">

          {/* Col 1: Brand & Charter */}
          <div className="space-y-5 md:col-span-2">
            <Link href="/" className="group inline-block">
              <BrandLockup
                layout="horizontal"
                size="md"
                markTone="gradient"
              />
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-[#626760]">
              Independent strategic communications, reputation and
              perception advisory for institutions and leadership.
            </p>

            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] text-[#626760]">
              <span className="flex items-center gap-1.5 text-[#987243]">
                <Shield className="h-3.5 w-3.5" />
                ISO 27001 Aligned
              </span>

              <span className="text-[#bcb4a8]">/</span>

              <span className="flex items-center gap-1.5 text-[#626760]">
                <Lock className="h-3.5 w-3.5" />
                NDA Protocol
              </span>
            </div>
          </div>

          {/* Col 2: Core Practices */}
          <div className="space-y-5">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1d2529]">
              Advisory Practices
            </h4>

            <ul className="space-y-3 text-sm text-[#626760]">
              <li>
                <Link
                  href="#services"
                  className="transition-colors hover:text-[#a67c45]"
                >
                  Perception Intelligence
                </Link>
              </li>

              <li>
                <Link
                  href="#services"
                  className="transition-colors hover:text-[#a67c45]"
                >
                  Crisis Architecture
                </Link>
              </li>

              <li>
                <Link
                  href="#services"
                  className="transition-colors hover:text-[#a67c45]"
                >
                  Strategic Communications
                </Link>
              </li>

              <li>
                <Link
                  href="#services"
                  className="transition-colors hover:text-[#a67c45]"
                >
                  Public Affairs & Policy
                </Link>
              </li>

              <li>
                <Link
                  href="#services"
                  className="transition-colors hover:text-[#a67c45]"
                >
                  Executive Positioning
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Sectors */}
          <div className="space-y-5">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1d2529]">
              Sectors
            </h4>

            <ul className="space-y-3 text-sm text-[#626760]">
              <li>
                <Link
                  href="#industries"
                  className="transition-colors hover:text-[#a67c45]"
                >
                  Defense & Aerospace
                </Link>
              </li>

              <li>
                <Link
                  href="#industries"
                  className="transition-colors hover:text-[#a67c45]"
                >
                  Banking & FinTech
                </Link>
              </li>

              <li>
                <Link
                  href="#industries"
                  className="transition-colors hover:text-[#a67c45]"
                >
                  Infrastructure & Energy
                </Link>
              </li>

              <li>
                <Link
                  href="#industries"
                  className="transition-colors hover:text-[#a67c45]"
                >
                  Healthcare
                </Link>
              </li>

              <li>
                <Link
                  href="#industries"
                  className="transition-colors hover:text-[#a67c45]"
                >
                  Family Offices
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-[#d8d1c5] pt-8 text-[11px] text-[#777970] md:flex-row">
          <p>
            © {new Date().getFullYear()} SAMVAD PERCEPTION ADVISORY.
            All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            <span className="cursor-pointer transition-colors hover:text-[#a67c45]">
              Confidentiality
            </span>

            <span className="cursor-pointer transition-colors hover:text-[#a67c45]">
              Disclosures
            </span>

            <span className="cursor-pointer transition-colors hover:text-[#a67c45]">
              Security
            </span>

            <Link
              href="/unsubscribe"
              className="transition-colors hover:text-[#a67c45]"
            >
              Dispatch Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}