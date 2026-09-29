"use client";

import * as React from "react";
import Link from "next/link";
import { Container, Badge } from "@samvad/ui";
import {
  Cpu,
  ShieldAlert,
  Compass,
  Landmark,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";

export function ServicesSection() {
  const [activeTab, setActiveTab] = React.useState<string>("all");

  const services = [
    {
      id: "perception-intelligence",
      icon: Cpu,
      title: "Perception Intelligence & Sentiment Topology",
      eyebrow: "Predictive Defense",
      category: "intelligence",
      badge: "Horizon Radar",
      accent: "text-blue-400",
      borderAccent: "hover:border-blue-500/40",
      description:
        "Algorithmic listening, early adversary signal detection, and media graph modeling to detect and neutralize perception hazards 60–90 days before public escalation.",
      deliverables: [
        "Continuous adversarial discourse & vector threat mapping",
        "Key Opinion Leader (KOL) network arbitration & resonance",
        "Algorithmic search index & feed vulnerability audit",
      ],
      sla: "Continuous 24/7 horizon scanning",
    },
    {
      id: "crisis-architecture",
      icon: ShieldAlert,
      title: "Crisis Architecture & Litigation Defense",
      eyebrow: "Rapid Response",
      category: "defense",
      badge: "24/7 War Room",
      accent: "text-red-400",
      borderAccent: "hover:border-red-500/40",
      description:
        "Decisive war-room management for active investigations, hostile regulatory probes, high-exposure litigation, and coordinated adversarial smear campaigns.",
      deliverables: [
        "Immediate 24/7 Senior Command Center activation",
        "Judicial, regulatory & cross-jurisdiction narrative alignment",
        "Forensic disinformation containment & counter-briefings",
      ],
      sla: "< 15 minute mobilization SLA",
    },
    {
      id: "strategic-communications",
      icon: Compass,
      title: "Strategic Communications & M&A Genesis",
      eyebrow: "Capital Markets",
      category: "capital",
      badge: "Value Creation",
      accent: "text-gold-400",
      borderAccent: "hover:border-gold-500/40",
      description:
        "Architecting sovereign and capital-market narratives for landmark mergers, cross-border acquisitions, private-to-public transformations, and shareholder votes.",
      deliverables: [
        "Transaction valuation & enterprise thesis framing",
        "Multinational regulatory & antitrust narrative alignment",
        "Institutional investor & proxy advisory trust defense",
      ],
      sla: "Multi-jurisdictional synchronization",
    },
    {
      id: "public-affairs",
      icon: Landmark,
      title: "Public Affairs & Sovereign Statecraft",
      eyebrow: "Institutional Accord",
      category: "policy",
      badge: "Statecraft",
      accent: "text-emerald-400",
      borderAccent: "hover:border-emerald-500/40",
      description:
        "Building bi-partisan policy consensus and sovereign credibility in complex, highly-regulated corridors where public interest meets commercial necessity.",
      deliverables: [
        "Sovereign priority & national capability dossiers",
        "Ministerial, parliamentary & legislative briefings",
        "Cross-jurisdictional trade & regulatory advisory",
      ],
      sla: "Direct sovereign corridor access",
    },
    {
      id: "executive-positioning",
      icon: ShieldCheck,
      title: "Executive Positioning & Leadership",
      eyebrow: "Reputation Stewardship",
      category: "defense",
      badge: "Confidential",
      accent: "text-sand-200",
      borderAccent: "hover:border-sand-400/40",
      description:
        "Stewardship for sovereign leaders, founders, and managing principals navigating high-visibility public scrutiny, leadership transitions, and legacy preservation.",
      deliverables: [
        "Executive narrative doctrine & keynote architecture",
        "Discreet peer-level media & editorial alignment",
        "Personal reputational moat & legacy insulation",
      ],
      sla: "Zero-attribution stewardship",
    },
    {
      id: "digital-sovereignty",
      icon: Sparkles,
      title: "Digital Sovereignty & Algorithm Defense",
      eyebrow: "Information Integrity",
      category: "intelligence",
      badge: "Frontier Tech",
      accent: "text-purple-400",
      borderAccent: "hover:border-purple-500/40",
      description:
        "Protecting organizations from AI-generated hallucinations, automated search bias, algorithmic misinformation indexing, and knowledge-graph distortion.",
      deliverables: [
        "LLM & generative AI knowledge-graph corrections",
        "Algorithmic search reputation restoration",
        "Automated botnet & coordinated smear neutralization",
      ],
      sla: "Algorithmic telemetry defense",
    },
  ];

  const filteredServices =
    activeTab === "all"
      ? services
      : services.filter((s) => s.category === activeTab);

  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-obsidian-800 bg-obsidian-900/60 py-24 lg:py-32"
    >
      {/* Background radial accent */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-gold-500/5 blur-[140px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Advisory Disciplines
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-sand-100 leading-tight">
              Disciplines of Narrative Dominance & <br />
              <span className="font-normal italic text-gold-300">
                Institutional Statecraft
              </span>
            </h2>
            <p className="text-sand-400 text-sm sm:text-base font-light leading-relaxed">
              We operate at the intersection of quantitative sentiment intelligence, institutional
              diplomacy, and strategic positioning to insulate enterprise valuation.
            </p>
          </div>

          {/* Practice Category Filter */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Disciplines" },
              { id: "intelligence", label: "Intelligence & AI" },
              { id: "defense", label: "Crisis & Defense" },
              { id: "capital", label: "Capital Markets" },
              { id: "policy", label: "Policy & Sovereign" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-all ${
                  activeTab === tab.id
                    ? "border-gold-500/40 bg-gold-500/10 text-gold-300"
                    : "border-obsidian-750 bg-obsidian-850 text-obsidian-400 hover:text-sand-300 hover:border-obsidian-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`group relative flex flex-col justify-between rounded-xs border border-obsidian-800 bg-obsidian-950 p-8 transition-all duration-300 ${service.borderAccent} hover:bg-obsidian-900 shadow-elevation-1 hover:shadow-elevation-2`}
              >
                {/* Hairline top glow */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-6">
                  {/* Top Bar with Icon and Badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`h-10 w-10 rounded-xs border border-obsidian-750 bg-obsidian-900 flex items-center justify-center ${service.accent}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge
                      variant="outline"
                      className="border-obsidian-750 bg-obsidian-850 font-mono text-[9px] uppercase tracking-widest text-gold-300"
                    >
                      {service.badge}
                    </Badge>
                  </div>

                  {/* Service Title & Eyebrow */}
                  <div className="space-y-1.5">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-obsidian-400">
                      {service.eyebrow}
                    </div>
                    <h3 className="font-serif text-xl font-normal text-sand-100 group-hover:text-gold-200 transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs leading-relaxed text-sand-400 font-light">
                    {service.description}
                  </p>

                  {/* Core Deliverables */}
                  <div className="space-y-2 pt-2 border-t border-obsidian-850">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-sand-300">
                      Core Deliverables
                    </div>
                    <ul className="space-y-1.5">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-sand-400 font-light">
                          <CheckCircle2 className="h-3.5 w-3.5 text-gold-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom SLA & Action */}
                <div className="mt-8 pt-4 border-t border-obsidian-850 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-obsidian-400">
                    <Clock className="h-3 w-3 text-gold-400" />
                    <span>{service.sla}</span>
                  </div>
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-gold-400 hover:text-gold-300"
                  >
                    <span>Engage</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
