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
    <div className="flex w-full flex-col overflow-hidden bg-obsidian-950 text-sand-100">
      {/* 1. Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
        {/* Background ambient lighting */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gold-500/5 blur-[140px]" />

        <Container size="xl" className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1.5 backdrop-blur-md">
            <Layers className="h-3.5 w-3.5 text-gold-400" />
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-300 font-semibold">
              Practice Architecture
            </span>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-sand-100 leading-[1.08]">
              Primary Advisory <br />
              <span className="font-normal italic text-gold-300">
                Disciplines &amp; Capabilities
              </span>
            </h1>
            <p className="font-serif text-lg sm:text-xl text-sand-300 font-light leading-relaxed">
              We operate where narrative directly impacts balance-sheet valuation, regulatory liberty,
              and sovereign mandate. Explore our six integrated practices below.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/#contact">
              <MagneticButton
                variant="gold"
                size="md"
                className="font-mono text-xs uppercase tracking-wider px-6 py-3"
              >
                <span>Engage Practice Partners</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </MagneticButton>
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-obsidian-400 pt-4 border-t border-obsidian-850">
            <div className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-gold-400" />
              <span>Direct Partner Stewardship</span>
            </div>
            <span className="text-obsidian-700">·</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Confidentiality Guaranteed</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Interactive Service Explorer Visual System */}
      <ServiceExplorer />

      {/* 3. Fast Index Grid */}
      <section className="border-t border-obsidian-800 bg-obsidian-900/40 py-20">
        <Container size="xl" className="space-y-12">
          <div className="space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              Practice Index
            </div>
            <h2 className="font-serif text-3xl font-light text-sand-100">
              Complete Practice Catalog
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRIMARY_SERVICES.map((service, idx) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group rounded-xs border border-obsidian-800 bg-obsidian-950 p-6 transition-all duration-300 hover:border-gold-500/40 hover:bg-obsidian-900 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-[10px] text-obsidian-400">
                    <span>0{idx + 1}</span>
                    <span className="text-gold-400">{service.eyebrow}</span>
                  </div>
                  <h3 className="font-serif text-xl font-normal text-sand-100 group-hover:text-gold-200 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-sand-400 font-light leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-obsidian-850 mt-4 flex items-center justify-between text-xs font-mono text-gold-400">
                  <span>View Dossier</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Advisory CTA */}
      <section className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-950 py-20 text-center">
        <Container size="xl" className="space-y-6 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-sand-100">
            Require Multi-Disciplinary Counsel?
          </h2>
          <p className="text-xs sm:text-sm text-sand-400 font-light leading-relaxed">
            Most institutional mandates require the synchronized execution of multiple practices—such
            as combining Crisis Communications with Digital Sovereignty and Public Affairs.
          </p>
          <div className="pt-2">
            <Link href="/#contact">
              <Button variant="gold" size="lg" className="font-mono text-xs uppercase tracking-wider">
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
