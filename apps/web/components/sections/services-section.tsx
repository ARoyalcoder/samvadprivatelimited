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
      accent: "text-[#647b8a]",
      borderAccent: "hover:border-[#647b8a]/40",
      description:
        "Early signal detection, sentiment intelligence, and media mapping to identify perception risks before escalation.",
      deliverables: [
        "Adversarial discourse mapping",
        "Opinion leader network analysis",
        "Search & feed vulnerability audits",
      ],
      sla: "Continuous horizon scanning",
    },
    {
      id: "crisis-architecture",
      icon: ShieldAlert,
      title: "Crisis Architecture & Litigation Defense",
      eyebrow: "Rapid Response",
      category: "defense",
      badge: "24/7 War Room",
      accent: "text-[#9a4b45]",
      borderAccent: "hover:border-[#9a4b45]/40",
      description:
        "Rapid response for investigations, regulatory scrutiny, litigation, and high-exposure communications.",
      deliverables: [
        "Senior crisis response",
        "Regulatory & legal messaging",
        "Disinformation containment",
      ],
      sla: "< 15 minute mobilization",
    },
    {
      id: "strategic-communications",
      icon: Compass,
      title: "Strategic Communications & M&A Genesis",
      eyebrow: "Capital Markets",
      category: "capital",
      badge: "Value Creation",
      accent: "text-[#a67c45]",
      borderAccent: "hover:border-[#a67c45]/40",
      description:
        "Strategic communications for major transactions, acquisitions, public offerings, and shareholder decisions.",
      deliverables: [
        "Transaction value framing",
        "Regulatory & antitrust alignment",
        "Investor communications",
      ],
      sla: "Multi-jurisdictional coordination",
    },
    {
      id: "public-affairs",
      icon: Landmark,
      title: "Public Affairs & Sovereign Statecraft",
      eyebrow: "Institutional Accord",
      category: "policy",
      badge: "Statecraft",
      accent: "text-[#587b69]",
      borderAccent: "hover:border-[#587b69]/40",
      description:
        "Policy and stakeholder engagement where public interest, regulation, and commercial priorities intersect.",
      deliverables: [
        "Government briefing materials",
        "Policy stakeholder alignment",
        "Trade & regulatory advisory",
      ],
      sla: "Direct institutional engagement",
    },
    {
      id: "executive-positioning",
      icon: ShieldCheck,
      title: "Executive Positioning & Leadership",
      eyebrow: "Reputation Stewardship",
      category: "defense",
      badge: "Confidential",
      accent: "text-[#596267]",
      borderAccent: "hover:border-[#596267]/40",
      description:
        "Reputation stewardship for leaders navigating public scrutiny, transitions, and long-term legacy.",
      deliverables: [
        "Executive narrative strategy",
        "Media & editorial alignment",
        "Reputation & legacy protection",
      ],
      sla: "Confidential stewardship",
    },
    {
      id: "digital-sovereignty",
      icon: Sparkles,
      title: "Digital Sovereignty & Algorithm Defense",
      eyebrow: "Information Integrity",
      category: "intelligence",
      badge: "Frontier Tech",
      accent: "text-[#796c82]",
      borderAccent: "hover:border-[#796c82]/40",
      description:
        "Protecting organizations from AI misinformation, search bias, and knowledge-graph distortion.",
      deliverables: [
        "AI knowledge-graph corrections",
        "Search reputation restoration",
        "Coordinated misinformation response",
      ],
      sla: "Algorithmic integrity defense",
    },
  ];

  const filteredServices =
    activeTab === "all"
      ? services
      : services.filter((s) => s.category === activeTab);

  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-[#d8d1c5] bg-[#f3f0e8] py-24 lg:py-32"
    >
      {/* Background radial accent */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#a67c45]/[0.035] blur-[140px]" />

      <Container size="xl" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a67c45]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a67c45]" />
              Advisory Disciplines
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1d2529] leading-tight">
              Strategic disciplines for
              <br />
              <span className="font-normal italic text-[#a67c45]">
                complex environments
              </span>
            </h2>

            <p className="text-[#697176] text-sm sm:text-base font-light leading-relaxed">
              Intelligence, communications, policy, and reputation strategy
              for high-stakes institutional challenges.
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
                    ? "border-[#a67c45]/45 bg-[#a67c45]/10 text-[#8c6537]"
                    : "border-[#d0c9bd] bg-[#ebe7de] text-[#8a8f91] hover:text-[#596267] hover:border-[#bdb5a8]"
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
                className={`group relative flex flex-col justify-between rounded-xs border border-[#d0c9bd] bg-[#ebe7de]/75 p-8 transition-all duration-300 ${service.borderAccent} hover:bg-[#e7e2d8] shadow-[0_12px_35px_rgba(29,37,41,0.06)] hover:shadow-[0_20px_50px_rgba(29,37,41,0.1)]`}
              >
                {/* Hairline top accent */}
                <div className="absolute top-0 left-6 right-6 h-px bg-[#a67c45]/40 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-6">
                  {/* Top Bar with Icon and Badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`h-10 w-10 rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] flex items-center justify-center ${service.accent}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <Badge
                      variant="outline"
                      className="border-[#d0c9bd] bg-[#f3f0e8] font-mono text-[9px] uppercase tracking-widest text-[#8c6537]"
                    >
                      {service.badge}
                    </Badge>
                  </div>

                  {/* Service Title & Eyebrow */}
                  <div className="space-y-1.5">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#8a8f91]">
                      {service.eyebrow}
                    </div>

                    <h3 className="font-serif text-xl font-normal text-[#1d2529] group-hover:text-[#8c6537] transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs leading-relaxed text-[#697176] font-light">
                    {service.description}
                  </p>

                  {/* Core Deliverables */}
                  <div className="space-y-2 pt-2 border-t border-[#d8d1c5]">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#596267]">
                      Key Capabilities
                    </div>

                    <ul className="space-y-1.5">
                      {service.deliverables.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-[#697176] font-light"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#a67c45] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom SLA & Action */}
                <div className="mt-8 pt-4 border-t border-[#d8d1c5] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#8a8f91]">
                    <Clock className="h-3 w-3 text-[#a67c45]" />
                    <span>{service.sla}</span>
                  </div>

                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-[#a67c45] hover:text-[#7f5c32]"
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