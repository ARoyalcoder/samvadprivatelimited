import * as React from "react";

import type { Metadata } from "next";

import Link from "next/link";

import { Container, Button, MagneticButton } from "@samvad/ui";

import { ServiceExplorer } from "@/components/services/service-explorer";

import { PRIMARY_SERVICES } from "@/lib/services-data";

import { ArrowRight, ShieldCheck, Lock, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Advisory Services | SAMVAD Perception Advisory",
  description:
    "Explore SAMVAD's six primary advisory disciplines: Public Relations, Strategic Communications, Reputation Management, Digital Communications, Crisis Communications, and Strategic Advisory.",
};

export default function ServicesPage() {
  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#f3f0e8] text-[#1d2529]">
      {/* 1. Hero Section */}
      <section className="relative flex min-h-[60vh] flex-col justify-center overflow-hidden border-b border-[#d8d1c5] pb-16 pt-32 lg:pb-20 lg:pt-40">
        {/* Background ambient lighting */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#a67c45]/5 blur-[140px]" />

        <Container size="xl" className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#a67c45]/30 bg-[#ebe7de] px-3.5 py-1.5">
            <Layers className="h-3.5 w-3.5 text-[#a67c45]" />

            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#a67c45]">
              Practice Architecture
            </span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="font-serif text-4xl font-light leading-[1.08] tracking-tight text-[#1d2529] sm:text-5xl lg:text-6xl">
              Primary Advisory <br />
              <span className="font-normal italic text-[#a67c45]">
                Disciplines &amp; Capabilities
              </span>
            </h1>

            <p className="font-serif text-lg font-light leading-relaxed text-[#626760] sm:text-xl">
              Six integrated practices for situations where narrative,
              reputation, regulation, and institutional value intersect.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/#contact">
              <MagneticButton
                variant="gold"
                size="md"
                className="px-6 py-3 font-mono text-xs uppercase tracking-wider"
              >
                <span>Engage Practice Partners</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </MagneticButton>
            </Link>
          </div>

          <div className="flex items-center gap-4 border-t border-[#d8d1c5] pt-4 font-mono text-xs text-[#777970]">
            <div className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-[#a67c45]" />
              <span>Direct Partner Stewardship</span>
            </div>

            <span className="text-[#c5beb2]">·</span>

            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#66816d]" />
              <span>Confidentiality Guaranteed</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Interactive Service Explorer Visual System */}
      <ServiceExplorer />

      {/* 3. Fast Index Grid */}
      <section className="border-t border-[#d8d1c5] bg-[#ebe7de] py-20">
        <Container size="xl" className="space-y-12">
          <div className="space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              Practice Index
            </div>

            <h2 className="font-serif text-3xl font-light text-[#1d2529]">
              Complete Practice Catalog
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PRIMARY_SERVICES.map((service, idx) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col justify-between rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-6 transition-all duration-300 hover:border-[#a67c45]/40 hover:bg-[#eee9df]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#777970]">
                    <span>0{idx + 1}</span>

                    <span className="text-[#a67c45]">
                      {service.eyebrow}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-normal text-[#1d2529] transition-colors group-hover:text-[#8d683d]">
                    {service.title}
                  </h3>

                  <p className="font-light leading-relaxed text-[#626760] text-xs">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#d8d1c5] pt-4 font-mono text-xs text-[#a67c45]">
                  <span>View Dossier</span>

                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Advisory CTA */}
      <section className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-20 text-center">
        <Container size="xl" className="mx-auto max-w-2xl space-y-6">
          <h2 className="font-serif text-3xl font-light text-[#1d2529] sm:text-4xl">
            Require Multi-Disciplinary Counsel?
          </h2>

          <p className="font-light leading-relaxed text-[#626760] text-xs sm:text-sm">
            Complex mandates often require synchronized execution across
            crisis communications, digital sovereignty, public affairs, and
            strategic advisory.
          </p>

          <div className="pt-2">
            <Link href="/#contact">
              <Button
                variant="gold"
                size="lg"
                className="font-mono text-xs uppercase tracking-wider"
              >
                <span>Request Cross-Practice Assessment</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}