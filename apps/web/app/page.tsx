import * as React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Compass,
  Cpu,
  Landmark,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  Lock,
} from "lucide-react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  SamvadImage,
} from "@samvad/ui";
import { PerceptionGlobe } from "@/components/canvas/perception-globe";
import { LeadForm } from "@/components/sections/lead-form";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="bg-grain relative flex min-h-[92vh] items-center justify-center pb-20 pt-28">
        {/* Ambient atmospheric glows */}
        <div className="pointer-events-none absolute left-1/2 top-1/4 h-[350px] w-[600px] -translate-x-1/2 rounded-full bg-gold-500/5 blur-[140px]" />
        <div className="pointer-events-none absolute left-1/4 top-1/3 h-[250px] w-[400px] rounded-full bg-blue-500/5 blur-[120px]" />

        <div className="container relative z-10 mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Column: Executive Framing */}
            <div className="space-y-8 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-gold-400" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-300">
                  Institutional Perception & Narrative Advisory
                </span>
              </div>

              <h1 className="font-serif text-4xl font-bold leading-[1.08] tracking-tight text-zinc-100 sm:text-5xl md:text-6xl lg:text-7xl">
                Perception is <br />
                <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 bg-clip-text text-transparent">
                  Sovereign Capital.
                </span>
              </h1>

              <p className="max-w-2xl text-base font-normal leading-relaxed text-zinc-400 md:text-lg">
                SAMVAD orchestrates strategic communications, crisis architecture, and predictive
                perception intelligence for sovereign leadership, defense innovators, and
                multinational enterprises navigating high-consequence friction.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button variant="gold" size="lg" asChild>
                  <Link href="#contact">Engage Advisory</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#services">Advisory Practices</Link>
                </Button>
              </div>

              {/* Strategic Credential Grid */}
              <div className="grid grid-cols-3 gap-6 border-t border-zinc-800/80 pt-8">
                <div>
                  <div className="font-serif text-xl font-bold text-zinc-100 md:text-2xl">
                    $40B+
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                    Transaction Narrative Guided
                  </div>
                </div>
                <div>
                  <div className="font-serif text-xl font-bold text-gold-400 md:text-2xl">
                    &lt; 15 Min
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                    Rapid Crisis Mobilization
                  </div>
                </div>
                <div>
                  <div className="font-serif text-xl font-bold text-zinc-100 md:text-2xl">100%</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                    Zero Information Leakage
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Perception Network Sphere */}
            <div className="relative flex items-center justify-center lg:col-span-5">
              <div className="relative w-full">
                <PerceptionGlobe />
                <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
                  <span className="rounded-full border border-gold-500/20 bg-zinc-950/80 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-gold-400/80">
                    Active Discourse Matrix • Global Node Sync
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ADVISORY PRACTICES */}
      <section id="services" className="border-t border-zinc-900 bg-zinc-950 py-28">
        <div className="container mx-auto space-y-16 px-6 md:px-12">
          <div className="max-w-2xl space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
              Core Capabilities
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-zinc-100 md:text-5xl">
              Disciplines of Narrative Dominance
            </h2>
            <p className="text-sm leading-relaxed text-zinc-400 md:text-base">
              We operate at the intersection of quantitative sentiment intelligence, institutional
              statecraft, and executive positioning to insulate enterprise valuation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Practice 1 */}
            <Card className="group transition-all duration-300 hover:border-gold-500/40">
              <CardHeader>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-sm border border-gold-500/30 bg-gold-500/10 text-gold-400">
                  <Cpu className="h-5 w-5" />
                </div>
                <Badge variant="gold" className="mb-2 w-fit">
                  Predictive Defense
                </Badge>
                <CardTitle>Perception Intelligence & Sentiment Topology</CardTitle>
                <CardDescription>
                  Algorithmic listening, early adversary signal detection, and media graph modeling
                  to identify perception hazards 60–90 days before mainstream escalation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Core Deliverables
                </div>
                <ul className="space-y-2 text-xs text-zinc-400">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                    Continuous Discourse Threat Mapping
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                    Key Opinion Leader (KOL) Network Arbitration
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                    Algorithmic Feed Vulnerability Audit
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Practice 2 */}
            <Card className="group transition-all duration-300 hover:border-gold-500/40">
              <CardHeader>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-sm border border-red-500/30 bg-red-500/10 text-red-400">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <Badge variant="outline" className="mb-2 w-fit">
                  Rapid Response
                </Badge>
                <CardTitle>Crisis Architecture & Litigation Defense</CardTitle>
                <CardDescription>
                  Decisive war-room management for active investigations, hostile regulatory probes,
                  litigation exposure, and coordinated defamation campaigns.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Core Deliverables
                </div>
                <ul className="space-y-2 text-xs text-zinc-400">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    Immediate 24/7 Command Center Activation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    Judicial & Regulatory Perception Management
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    Adversarial Counter-Briefing Protocols
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Practice 3 */}
            <Card className="group transition-all duration-300 hover:border-gold-500/40">
              <CardHeader>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-sm border border-blue-500/30 bg-blue-500/10 text-blue-400">
                  <Compass className="h-5 w-5" />
                </div>
                <Badge variant="outline" className="mb-2 w-fit">
                  Value Creation
                </Badge>
                <CardTitle>Strategic Communications & M&A Genesis</CardTitle>
                <CardDescription>
                  Architecting sovereign and capital-market narratives for landmark mergers,
                  cross-border restructuring, and private-to-public transformations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Core Deliverables
                </div>
                <ul className="space-y-2 text-xs text-zinc-400">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    Transaction Valuation Framing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    Multinational Regulatory Narrative Alignment
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    Investor & Shareholder Trust Preservation
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Practice 4 */}
            <Card className="group transition-all duration-300 hover:border-gold-500/40">
              <CardHeader>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-sm border border-zinc-700 bg-zinc-800 text-zinc-200">
                  <Landmark className="h-5 w-5" />
                </div>
                <Badge variant="outline" className="mb-2 w-fit">
                  Institutional Accord
                </Badge>
                <CardTitle>Public Affairs & Geopolitical Policy Narrative</CardTitle>
                <CardDescription>
                  Building bi-partisan policy consensus and sovereign credibility in complex,
                  regulated corridors where public interest meets commercial necessity.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Core Deliverables
                </div>
                <ul className="space-y-2 text-xs text-zinc-400">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
                    Sovereign Priority Alignment Dossiers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
                    Parliamentary & Legislative Briefings
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
                    Cross-Jurisdictional Sanctions & Trade Advisory
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. SECTOR EXCELLENCE */}
      <section id="industries" className="border-t border-zinc-900 bg-zinc-950/70 py-24">
        <div className="container mx-auto space-y-12 px-6 md:px-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
                Operating Sectors
              </span>
              <h2 className="font-serif text-3xl font-bold text-zinc-100 md:text-5xl">
                High-Stakes Arenas
              </h2>
            </div>
            <p className="max-w-md text-xs text-zinc-400 md:text-sm">
              Specialized industry experience ensuring deep context, jurisdictional awareness, and
              immediate tactical effectiveness.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Defense & Strategic Aerospace",
                desc: "Sovereign capability positioning, offset agreements, and defense procurement transparency.",
              },
              {
                title: "Banking & Global FinTech",
                desc: "Solvency reassurance, central bank regulatory dialogue, and algorithmic risk framing.",
              },
              {
                title: "Critical Infrastructure & Energy",
                desc: "Transition credibility, grid security comms, and ESG polarization de-escalation.",
              },
              {
                title: "Healthcare & Life Sciences",
                desc: "Clinical trial perception management, patent litigation comms, and bio-ethics narrative.",
              },
              {
                title: "Enterprise DeepTech & AI",
                desc: "Algorithmic governance positioning, data sovereignty, and congressional scrutiny defense.",
              },
              {
                title: "Family Offices & Sovereign Funds",
                desc: "Confidential wealth stewardship, succession communications, and cross-border privacy shielding.",
              },
            ].map((sector, idx) => (
              <div
                key={idx}
                className="space-y-3 rounded-lg border border-zinc-800/80 bg-zinc-950/50 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/50"
              >
                <div className="font-mono text-xs text-gold-400">0{idx + 1}</div>
                <h3 className="font-serif text-lg font-semibold text-zinc-100">{sector.title}</h3>
                <p className="text-xs leading-relaxed text-zinc-400">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CASE RECORD HIGHLIGHT */}
      <section id="case-studies" className="border-t border-zinc-900 bg-zinc-950 py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-zinc-950 p-8 md:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <Badge variant="gold">Case Record #8104</Badge>
                <h2 className="font-serif text-2xl font-bold leading-tight text-zinc-100 md:text-4xl">
                  Cross-Border FinTech Consortium: Sovereign De-escalation & $1.8B Deal Preservation
                </h2>
                <p className="text-xs leading-relaxed text-zinc-300 md:text-sm">
                  Facing sudden regulatory blockades and an aggressive adversarial disinformation
                  campaign in Southeast Asia, SAMVAD executed an 18-week perception restructuring
                  protocol. Forensic source identification coupled with legislative briefing pacified
                  parliamentary hostility, securing full regulatory green-light.
                </p>

                <div className="grid grid-cols-1 gap-6 border-t border-zinc-800 pt-4 sm:grid-cols-3">
                  <div>
                    <div className="font-serif text-2xl font-bold text-gold-400">100%</div>
                    <div className="text-[11px] text-zinc-400">Regulatory Approval Attained</div>
                  </div>
                  <div>
                    <div className="font-serif text-2xl font-bold text-zinc-100">+74%</div>
                    <div className="text-[11px] text-zinc-400">
                      Institutional Sentiment Turnaround
                    </div>
                  </div>
                  <div>
                    <div className="font-serif text-2xl font-bold text-zinc-100">$1.8 Billion</div>
                    <div className="text-[11px] text-zinc-400">Transaction Valuation Preserved</div>
                  </div>
                </div>
              </div>

              {/* Case Record Visual Dossier */}
              <div className="lg:col-span-5">
                <SamvadImage
                  assetId="case-study-briefing-binder"
                  aspectRatio="16:9"
                  zoomOnHover
                  className="rounded-lg shadow-2xl border border-zinc-800/80"
                  caption="Confidential advisory dossier prepared for ministerial review."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THOUGHT LEADERSHIP & INTELLIGENCE */}
      <section id="intelligence" className="border-t border-zinc-900 bg-zinc-950/70 py-24">
        <div className="container mx-auto space-y-12 px-6 md:px-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
                Perception Intelligence
              </span>
              <h2 className="font-serif text-3xl font-bold text-zinc-100 md:text-5xl">
                Executive Thought Leadership
              </h2>
            </div>
            <Link
              href="#contact"
              className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-gold-400 hover:text-gold-300"
            >
              Request Briefing Dossier <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                assetId: "leadership-skyline-silhouette",
                title:
                  "The Death of Reactive PR: Why Sovereign Brands Need Perception Architecture",
                category: "Thought Leadership",
                readTime: "7 min read",
                author: "Vikramaditya Sharma, Managing Principal",
              },
              {
                assetId: "tech-datacenter-optical-core",
                title: "Algorithmic Asymmetry: How Disinformation Weaponizes Search Indexing",
                category: "Intelligence Dossier",
                readTime: "11 min read",
                author: "SAMVAD Intelligence Unit",
              },
              {
                assetId: "reputation-crisis-monitoring",
                title:
                  "Crisis in the Boardroom: 10 Operational Rules for Hostile Activist Campaigns",
                category: "Crisis Casebook",
                readTime: "9 min read",
                author: "Senior Advisory Practice",
              },
            ].map((article, i) => (
              <div
                key={i}
                className="group flex flex-col justify-between overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 transition-colors hover:border-gold-500/40"
              >
                <SamvadImage
                  assetId={article.assetId}
                  aspectRatio="16:9"
                  zoomOnHover
                  className="w-full"
                />
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400">
                      <span className="text-gold-400">{article.category}</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold leading-snug text-zinc-100 group-hover:text-gold-200 transition-colors">
                      {article.title}
                    </h3>
                  </div>
                  <div className="border-t border-zinc-900 pt-3 text-[11px] text-zinc-400">
                    {article.author}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONFIDENTIAL ENGAGEMENT SECTION */}
      <section id="contact" className="relative border-t border-zinc-900 bg-zinc-950 py-28">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">
                Confidential Dialogue
              </span>
              <h2 className="font-serif text-3xl font-bold leading-tight text-zinc-100 md:text-5xl">
                Engage Our Advisory Group
              </h2>
              <p className="text-sm leading-relaxed text-zinc-300">
                Strategic counsel begins with a confidential assessment. Every communication is
                bound by our non-disclosure framework and routed exclusively to senior partners.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-zinc-800 bg-zinc-900 text-gold-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
                      Uncompromising Discretion
                    </h4>
                    <p className="text-xs leading-relaxed text-zinc-400">
                      Zero attribution without explicit written consent. Our clients include
                      entities whose names never appear on public rosters.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-zinc-800 bg-zinc-900 text-gold-400">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
                      Rapid Response War-Room
                    </h4>
                    <p className="text-xs leading-relaxed text-zinc-400">
                      Active crisis deployment mobilized within minutes of initial briefing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
