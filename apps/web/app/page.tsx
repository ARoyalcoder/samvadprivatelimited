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
} from "@samvad/ui";
import { PerceptionGlobe } from "@/components/canvas/perception-globe";
import { LeadForm } from "@/components/sections/lead-form";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 bg-grain">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gold-500/5 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[250px] bg-blue-500/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Executive Framing */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold-300">
                  Institutional Perception & Narrative Advisory
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-100 leading-[1.08]">
                Perception is <br />
                <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 bg-clip-text text-transparent">
                  Sovereign Capital.
                </span>
              </h1>

              <p className="text-zinc-400 text-base md:text-lg max-w-2xl font-normal leading-relaxed">
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
              <div className="pt-8 border-t border-zinc-800/80 grid grid-cols-3 gap-6">
                <div>
                  <div className="text-xl md:text-2xl font-serif font-bold text-zinc-100">
                    $40B+
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    Transaction Narrative Guided
                  </div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-serif font-bold text-gold-400">
                    &lt; 15 Min
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    Rapid Crisis Mobilization
                  </div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-serif font-bold text-zinc-100">100%</div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    Zero Information Leakage
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Perception Network Sphere */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="w-full relative">
                <PerceptionGlobe />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                  <span className="text-[9px] uppercase font-mono tracking-[0.25em] text-gold-400/80 bg-zinc-950/80 px-3 py-1 rounded-full border border-gold-500/20">
                    Active Discourse Matrix • Global Node Sync
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ADVISORY PRACTICES */}
      <section id="services" className="py-28 border-t border-zinc-900 bg-zinc-950">
        <div className="container mx-auto px-6 md:px-12 space-y-16">
          <div className="max-w-2xl space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400">
              Core Capabilities
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-zinc-100 tracking-tight">
              Disciplines of Narrative Dominance
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              We operate at the intersection of quantitative sentiment intelligence, institutional
              statecraft, and executive positioning to insulate enterprise valuation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Practice 1 */}
            <Card className="group hover:border-gold-500/40 transition-all duration-300">
              <CardHeader>
                <div className="w-10 h-10 rounded-sm bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-3">
                  <Cpu className="w-5 h-5" />
                </div>
                <Badge variant="gold" className="w-fit mb-2">
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
                <ul className="text-xs text-zinc-400 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    Continuous Discourse Threat Mapping
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    Key Opinion Leader (KOL) Network Arbitration
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    Algorithmic Feed Vulnerability Audit
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Practice 2 */}
            <Card className="group hover:border-gold-500/40 transition-all duration-300">
              <CardHeader>
                <div className="w-10 h-10 rounded-sm bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-3">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="w-fit mb-2">
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
                <ul className="text-xs text-zinc-400 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    Immediate 24/7 Command Center Activation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    Judicial & Regulatory Perception Management
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    Adversarial Counter-Briefing Protocols
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Practice 3 */}
            <Card className="group hover:border-gold-500/40 transition-all duration-300">
              <CardHeader>
                <div className="w-10 h-10 rounded-sm bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3">
                  <Compass className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="w-fit mb-2">
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
                <ul className="text-xs text-zinc-400 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    Transaction Valuation Framing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    Multinational Regulatory Narrative Alignment
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    Investor & Shareholder Trust Preservation
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Practice 4 */}
            <Card className="group hover:border-gold-500/40 transition-all duration-300">
              <CardHeader>
                <div className="w-10 h-10 rounded-sm bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200 mb-3">
                  <Landmark className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="w-fit mb-2">
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
                <ul className="text-xs text-zinc-400 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                    Sovereign Priority Alignment Dossiers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                    Parliamentary & Legislative Briefings
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                    Cross-Jurisdictional Sanctions & Trade Advisory
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. SECTOR EXCELLENCE */}
      <section id="industries" className="py-24 border-t border-zinc-900 bg-zinc-950/70">
        <div className="container mx-auto px-6 md:px-12 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400">
                Operating Sectors
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-zinc-100">
                High-Stakes Arenas
              </h2>
            </div>
            <p className="text-zinc-400 text-xs md:text-sm max-w-md">
              Specialized industry experience ensuring deep context, jurisdictional awareness, and
              immediate tactical effectiveness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="p-6 rounded-lg border border-zinc-800/80 bg-zinc-950/50 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300 space-y-3"
              >
                <div className="text-gold-400 text-xs font-mono">0{idx + 1}</div>
                <h3 className="font-serif text-lg font-semibold text-zinc-100">{sector.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CASE RECORD HIGHLIGHT */}
      <section id="case-studies" className="py-24 border-t border-zinc-900 bg-zinc-950">
        <div className="container mx-auto px-6 md:px-12">
          <div className="p-8 md:p-14 rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-zinc-950 relative overflow-hidden">
            <div className="max-w-3xl space-y-6">
              <Badge variant="gold">Case Record #8104</Badge>
              <h2 className="font-serif text-2xl md:text-4xl font-bold text-zinc-100 leading-tight">
                Cross-Border FinTech Consortium: Sovereign De-escalation & $1.8B Deal Preservation
              </h2>
              <p className="text-zinc-300 text-xs md:text-sm leading-relaxed">
                Facing sudden regulatory blockades and an aggressive adversarial disinformation
                campaign in Southeast Asia, SAMVAD executed an 18-week perception restructuring
                protocol. Forensic source identification coupled with legislative briefing pacified
                parliamentary hostility, securing full regulatory green-light.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-zinc-800">
                <div>
                  <div className="text-2xl font-serif font-bold text-gold-400">100%</div>
                  <div className="text-[11px] text-zinc-400">Regulatory Approval Attained</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-zinc-100">+74%</div>
                  <div className="text-[11px] text-zinc-400">
                    Institutional Sentiment Turnaround
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-zinc-100">$1.8 Billion</div>
                  <div className="text-[11px] text-zinc-400">Transaction Valuation Preserved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THOUGHT LEADERSHIP & INTELLIGENCE */}
      <section id="intelligence" className="py-24 border-t border-zinc-900 bg-zinc-950/70">
        <div className="container mx-auto px-6 md:px-12 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400">
                Perception Intelligence
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-zinc-100">
                Executive Thought Leadership
              </h2>
            </div>
            <Link
              href="#contact"
              className="text-xs font-semibold uppercase tracking-widest text-gold-400 hover:text-gold-300 flex items-center gap-1"
            >
              Request Briefing Dossier <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title:
                  "The Death of Reactive PR: Why Sovereign Brands Need Perception Architecture",
                category: "Thought Leadership",
                readTime: "7 min read",
                author: "Vikramaditya Sharma, Managing Principal",
              },
              {
                title: "Algorithmic Asymmetry: How Disinformation Weaponizes Search Indexing",
                category: "Intelligence Dossier",
                readTime: "11 min read",
                author: "SAMVAD Intelligence Unit",
              },
              {
                title:
                  "Crisis in the Boardroom: 10 Operational Rules for Hostile Activist Campaigns",
                category: "Crisis Casebook",
                readTime: "9 min read",
                author: "Senior Advisory Practice",
              },
            ].map((article, i) => (
              <div
                key={i}
                className="p-6 rounded-lg border border-zinc-800 bg-zinc-950 flex flex-col justify-between space-y-4 hover:border-gold-500/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span className="text-gold-400">{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-zinc-100 leading-snug">
                    {article.title}
                  </h3>
                </div>
                <div className="text-[11px] text-zinc-400 border-t border-zinc-900 pt-3">
                  {article.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONFIDENTIAL ENGAGEMENT SECTION */}
      <section id="contact" className="py-28 border-t border-zinc-900 bg-zinc-950 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400">
                Confidential Dialogue
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-zinc-100 leading-tight">
                Engage Our Advisory Group
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Strategic counsel begins with a confidential assessment. Every communication is
                bound by our non-disclosure framework and routed exclusively to senior partners.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-sm bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-gold-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
                      Uncompromising Discretion
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Zero attribution without explicit written consent. Our clients include
                      entities whose names never appear on public rosters.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-sm bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-gold-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
                      Rapid Response War-Room
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
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
