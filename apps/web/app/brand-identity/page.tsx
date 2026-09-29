"use client";

import * as React from "react";
import Link from "next/link";
import {
  // Brand Components
  BrandMark,
  BrandLockup,
  BrandWatermark,
  DialogueNetwork,
  AcousticWaveform,
  EditorialFrame,
  InfluenceGridLines,
  IconDialogue,
  IconPerceptionShield,
  IconInfluenceNodes,
  IconCrisisContainment,
  IconSovereignBrief,
  IconSentimentRadar,
  IconNarrativeVector,
  IconInstitutionalTrust,
  // Design System Primitives
  Container,
  Section,
  SectionHeader,
  SectionDivider,
  Display,
  Eyebrow,
  Lead,
  Quote,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  GlassCard,
  Badge,
  Grid,
  ScrollProgress,
  CustomCursor,
} from "@samvad/ui";
import { ArrowLeft, Check, X } from "lucide-react";

export default function BrandIdentityPage() {
  const [lockupLayout, setLockupLayout] = React.useState<"horizontal" | "stacked">("horizontal");
  const [networkDensity, setNetworkDensity] = React.useState<"sparse" | "medium" | "dense">(
    "medium"
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-obsidian-950 text-paper-100 selection:bg-gold-500/30 selection:text-gold-200">
      <ScrollProgress />
      <CustomCursor />
      <BrandWatermark opacity={0.02} size={800} className="-right-48 top-24" />

      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-obsidian-700/60 bg-obsidian-950/85 py-4 backdrop-blur-md">
        <Container size="xl">
          <div className="flex items-center justify-between">
            <Link href="/" className="group inline-block">
              <BrandLockup layout="horizontal" size="sm" markTone="gradient" />
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/design-system" className="flex items-center gap-1.5">
                  Design System Spec
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/" className="flex items-center gap-1.5">
                  <ArrowLeft className="h-3.5 w-3.5" /> Portal
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* 1. HERO — The Philosophy of Samvāda */}
      <Section padding="hero" tone="obsidian" className="relative">
        <InfluenceGridLines />
        <Container size="xl">
          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <Eyebrow index={1}>Brand Identity Architecture</Eyebrow>
              <Badge variant="gold">Official Specification</Badge>
            </div>

            <Display size="display-2xl">
              Dialogue as <br />
              <span className="font-light italic text-gold-400">Strategic Statecraft</span>
            </Display>

            <Lead className="max-w-2xl text-paper-300">
              The visual identity for SAMVAD is rooted in the classical principle of{" "}
              <strong>संवाद</strong> (*samvāda*)—deliberate, harmonious discourse. A design language
              calibrated for executive authority, sovereign diplomacy, and perception governance.
            </Lead>

            {/* Interactive Acoustic Waveform Header Accent */}
            <div className="flex items-center gap-4 pt-4">
              <AcousticWaveform bars={32} height={40} tone="gold" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-paper-400">
                Acoustic Frequency of Dialogue // Active
              </span>
            </div>
          </div>
        </Container>
      </Section>

      <SectionDivider metallic />

      {/* 2. THE CENTRAL CONCEPT: MONOLOGUE VS DIALOGUE */}
      <Section padding="normal" tone="carbon">
        <SectionHeader
          index="01"
          eyebrow="Conceptual Paradigm"
          title="The Shift from Monologue to Dialogue"
          lead="Why conventional PR fails in asymmetrical crisis environments, and how perception is governed through conversational resonance."
        />

        <Grid cols={2} gap="lg">
          {/* Column A: Conventional PR */}
          <Card variant="bordered" className="opacity-75">
            <CardHeader>
              <div className="mb-2 flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-perception-crisis">
                <X className="h-3.5 w-3.5" /> Conventional PR (Flawed Paradigm)
              </div>
              <CardTitle className="text-xl">The Monologue Model</CardTitle>
              <CardDescription>
                One-way broadcasting, reactive press releases, defensive corporate statements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-paper-400">
              <p>
                • Assumes public perception is passive and easily pacified by formal statements.
              </p>
              <p>• High latency: responds hours after hostile narratives take root in markets.</p>
              <p>• Erodes trust through defensive, sanitized corporate jargon.</p>
            </CardContent>
          </Card>

          {/* Column B: SAMVAD Paradigm */}
          <GlassCard glow interactive>
            <div className="mb-3 flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-gold-400">
              <Check className="h-3.5 w-3.5 text-perception-positive" /> SAMVAD (The Dialogue
              Architecture)
            </div>
            <h3 className="mb-2 font-serif text-2xl font-normal text-paper-100">
              The Multilateral Dialogue Model
            </h3>
            <p className="mb-4 font-sans text-sm font-light leading-relaxed text-paper-300">
              Perception is an emergent property negotiated across structured conversations between
              leadership, regulators, investigative press, and institutional capital.
            </p>
            <div className="space-y-2 font-mono text-xs text-paper-300">
              <div className="flex items-center gap-2">
                <span className="text-gold-400">01</span>
                <span>Preemptive Listening & Sentiment Diagnostics</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gold-400">02</span>
                <span>Targeted Counter-Narrative Diplomatic Channels</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gold-400">03</span>
                <span>Verifiable Institutional Trust & Narrative Hegemony</span>
              </div>
            </div>
          </GlassCard>
        </Grid>

        <div className="mt-12">
          <Quote author="Senior Managing Director" role="Strategic Communications Council">
            A corporate monologue convinces no one who has already doubted. Only nuanced,
            multi-lateral dialogue can reshape the consensus reality of capital markets.
          </Quote>
        </div>
      </Section>

      <SectionDivider />

      {/* 3. LOGO GEOMETRY & PLACEMENT RULES */}
      <Section padding="normal" tone="obsidian">
        <SectionHeader
          index="02"
          eyebrow="Geometric Construction"
          title="The Brand Mark & Mathematical Anatomy"
          lead="Two intersecting dialogue arcs converging at a singular focal node, forming an architectural 'S' monogram."
        />

        <div className="space-y-12">
          {/* Interactive Mark Demonstration */}
          <EditorialFrame
            classification="CLASSIFIED // BRAND IDENTITY ASSET"
            referenceId="SMV-GEO-001"
          >
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="relative flex flex-col items-center justify-center rounded-xs border border-obsidian-700/60 bg-obsidian-950 p-8 lg:col-span-5">
                {/* Clear Space Guide Lines */}
                <div className="pointer-events-none absolute inset-4 border border-dashed border-gold-500/20" />
                <span className="absolute left-2 top-1 font-mono text-[8px] text-gold-500/60">
                  1.5X CLEAR SPACE BOUNDARY
                </span>

                <BrandMark size="xl" tone="gradient" />

                <div className="mt-6 text-center">
                  <span className="block font-mono text-xs font-semibold uppercase tracking-widest text-gold-400">
                    The Dialogue Convergence Mark
                  </span>
                  <span className="mt-1 block font-mono text-[10px] text-paper-500">
                    Grid: 48×48 Units // Vector Tangent: 32°
                  </span>
                </div>
              </div>

              <div className="space-y-6 lg:col-span-7">
                <div>
                  <h4 className="mb-2 font-serif text-xl font-normal text-paper-100">
                    Symbolic Elements
                  </h4>
                  <ul className="space-y-3 text-sm font-light leading-relaxed text-paper-300">
                    <li className="flex items-start gap-2.5">
                      <span className="font-mono text-xs text-gold-400">◆</span>
                      <span>
                        <strong>Upper Arc (Entity A)</strong>: Represents leadership, corporate
                        counsel, and proactive strategic intent.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="font-mono text-xs text-gold-400">◆</span>
                      <span>
                        <strong>Lower Arc (Entity B)</strong>: Represents societal discourse,
                        regulators, capital markets, and public opinion.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="font-mono text-xs text-gold-400">◆</span>
                      <span>
                        <strong>Central Node</strong>: The point of convergence where dialogue
                        transforms divergence into shared perception and trust.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Lockup Format Switcher */}
                <div className="space-y-4 border-t border-obsidian-700/60 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-paper-400">
                      Lockup Variations
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant={lockupLayout === "horizontal" ? "gold" : "outline"}
                        size="sm"
                        onClick={() => setLockupLayout("horizontal")}
                      >
                        Horizontal
                      </Button>
                      <Button
                        variant={lockupLayout === "stacked" ? "gold" : "outline"}
                        size="sm"
                        onClick={() => setLockupLayout("stacked")}
                      >
                        Stacked
                      </Button>
                    </div>
                  </div>

                  <div className="flex min-h-[100px] items-center justify-center rounded-xs border border-obsidian-700/60 bg-obsidian-950 p-6">
                    <BrandLockup layout={lockupLayout} size="lg" markTone="gradient" />
                  </div>
                </div>
              </div>
            </div>
          </EditorialFrame>
        </div>
      </Section>

      <SectionDivider />

      {/* 4. THE 60-30-10 COLOR ARCHITECTURE */}
      <Section padding="normal" tone="carbon">
        <SectionHeader
          index="03"
          eyebrow="Color Discipline"
          title="The 60-30-10 Color Architecture"
          lead="Disciplined ratios engineered to command institutional reverence while ensuring crystal editorial legibility."
        />

        {/* Visual Proportional Bar */}
        <div className="mb-10 space-y-4">
          <div className="flex h-12 w-full overflow-hidden rounded-xs border border-obsidian-700/80">
            <div className="flex w-[60%] items-center justify-center border-r border-obsidian-700 bg-obsidian-900 font-mono text-xs text-paper-300">
              60% Obsidian Noir (Canvas)
            </div>
            <div className="flex w-[30%] items-center justify-center border-r border-obsidian-700 bg-paper-100 font-mono text-xs font-bold text-obsidian-950">
              30% Paper (Typography)
            </div>
            <div className="flex w-[10%] items-center justify-center bg-gold-500 font-mono text-xs font-bold text-obsidian-950">
              10% Gold
            </div>
          </div>
        </div>

        <Grid cols={3} gap="md">
          <Card variant="default">
            <CardHeader>
              <div className="font-mono text-xs uppercase tracking-widest text-paper-400">
                Dominant Canvas
              </div>
              <CardTitle className="text-xl">60% Obsidian Noir</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 font-mono text-xs text-paper-400">
              <p>• #050608 (Void Base)</p>
              <p>• #08090B (Primary Surface)</p>
              <p>• #0C0E12 (Card Elevation)</p>
              <p className="pt-2 font-sans font-light text-paper-300">
                Evokes discretion, executive gravity, and confidential intelligence enclaves.
              </p>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader>
              <div className="font-mono text-xs uppercase tracking-widest text-paper-400">
                Structural Clarity
              </div>
              <CardTitle className="text-xl">30% Warm Paper</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 font-mono text-xs text-paper-400">
              <p>• #FDFBF7 (Highest White)</p>
              <p>• #FBFBF9 (Primary Headlines)</p>
              <p>• #EAE8E1 (Body Prose)</p>
              <p className="pt-2 font-sans font-light text-paper-300">
                Delivers the tactile authority of classical financial broadsheets and legal folios.
              </p>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader>
              <div className="font-mono text-xs uppercase tracking-widest text-gold-400">
                Strategic Accent
              </div>
              <CardTitle className="text-xl">10% Burnished Gold</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 font-mono text-xs text-paper-400">
              <p>• #C39651 (Strategic Gold)</p>
              <p>• #D1AE74 (Hover Indicator)</p>
              <p>• #C5B38C (Champagne Specular)</p>
              <p className="pt-2 font-sans font-light text-paper-300">
                Reserved strictly for focal intent: decision buttons, active filters, and key
                metrics.
              </p>
            </CardContent>
          </Card>
        </Grid>
      </Section>

      <SectionDivider />

      {/* 5. ABSTRACT VISUAL MOTIF: THE DIALOGUE NETWORK */}
      <Section padding="normal" tone="obsidian">
        <SectionHeader
          index="04"
          eyebrow="Abstract Visual Motif"
          title="The Dialogue Network"
          lead="An interactive sociometric intelligence canvas modeling the interconnected discourse between leadership, capital, and society. Strictly non-crypto."
        />

        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xs border border-obsidian-700/60 bg-obsidian-900/60 p-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-paper-400">
                Interactive Node Density:
              </span>
              <div className="flex gap-2">
                {(["sparse", "medium", "dense"] as const).map((d) => (
                  <Button
                    key={d}
                    variant={networkDensity === d ? "gold" : "outline"}
                    size="sm"
                    onClick={() => setNetworkDensity(d)}
                  >
                    {d}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-gold-400">
              <span className="h-2 w-2 animate-ping rounded-full bg-gold-400" />
              <span>Hover canvas to interact with institutional influence vectors</span>
            </div>
          </div>

          <div className="relative h-[480px] w-full overflow-hidden rounded-xs border border-obsidian-700/80 shadow-elevation-2">
            <DialogueNetwork density={networkDensity} interactive showLabels />
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* 6. BESPOKE PERCEPTION ICONOGRAPHY */}
      <Section padding="normal" tone="carbon">
        <SectionHeader
          index="05"
          eyebrow="Visual System"
          title="Bespoke Iconography Suite"
          lead="8 canonical symbols engineered on a 24×24 grid with consistent 1.5px stroke weight, capturing the core disciplines of perception advisory."
        />

        <Grid cols={4} gap="md">
          {[
            {
              icon: <IconDialogue size={28} className="text-gold-400" />,
              name: "IconDialogue",
              concept: "Mutual Discourse",
              desc: "Two speech chambers converging at a central perception node.",
            },
            {
              icon: <IconPerceptionShield size={28} className="text-gold-400" />,
              name: "IconPerceptionShield",
              concept: "Reputational Armor",
              desc: "Strategic defense barrier safeguarding executive integrity.",
            },
            {
              icon: <IconInfluenceNodes size={28} className="text-gold-400" />,
              name: "IconInfluenceNodes",
              concept: "Network Vectors",
              desc: "Multi-point institutional stakeholder transmission network.",
            },
            {
              icon: <IconCrisisContainment size={28} className="text-gold-400" />,
              name: "IconCrisisContainment",
              concept: "Volatility Boundary",
              desc: "Rapid containment perimeter mitigating hostile press velocity.",
            },
            {
              icon: <IconSovereignBrief size={28} className="text-gold-400" />,
              name: "IconSovereignBrief",
              concept: "Diplomatic Record",
              desc: "Archival sealed advisory dossier with verification ribbon.",
            },
            {
              icon: <IconSentimentRadar size={28} className="text-gold-400" />,
              name: "IconSentimentRadar",
              concept: "Sentiment Diagnostic",
              desc: "Continuous quadrant monitoring across global media feeds.",
            },
            {
              icon: <IconNarrativeVector size={28} className="text-gold-400" />,
              name: "IconNarrativeVector",
              concept: "Narrative Velocity",
              desc: "Ascending trajectory vector aligning corporate milestones.",
            },
            {
              icon: <IconInstitutionalTrust size={28} className="text-gold-400" />,
              name: "IconInstitutionalTrust",
              concept: "Governance Authority",
              desc: "Classical architectural pediment rooted in verified trust.",
            },
          ].map((item, idx) => (
            <Card key={idx} variant="interactive" className="group space-y-4 p-6">
              <div className="w-fit rounded-xs border border-obsidian-700/60 bg-obsidian-800 p-3 transition-colors group-hover:border-gold-500/40">
                {item.icon}
              </div>
              <div>
                <span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-gold-400">
                  {item.concept}
                </span>
                <h4 className="mb-1 font-mono text-sm font-semibold text-paper-100">{item.name}</h4>
                <p className="font-sans text-xs font-light leading-relaxed text-paper-400">
                  {item.desc}
                </p>
              </div>
            </Card>
          ))}
        </Grid>
      </Section>

      <SectionDivider />

      {/* 7. PHOTOGRAPHY DIRECTION */}
      <Section padding="normal" tone="obsidian">
        <SectionHeader
          index="06"
          eyebrow="Art Direction"
          title="Photography Direction & Curation"
          lead="Cinematic chiaroscuro, monumental architectural framing, and authentic human deliberation. Zero artificial smiling models."
        />

        <Grid cols={3} gap="md">
          <div className="space-y-3">
            <div className="group relative aspect-[3/4] overflow-hidden rounded-xs border border-obsidian-700/80 bg-obsidian-900">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                alt="Architecture of Power"
                className="h-full w-full object-cover contrast-125 grayscale transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-gold-400">
                  Curation Category 01
                </span>
                <span className="font-serif text-lg text-paper-100">The Architecture of Power</span>
              </div>
            </div>
            <p className="font-sans text-xs font-light leading-relaxed text-paper-400">
              Monumental geometric perspective, monolithic stone and glass facades reflecting
              sovereign authority.
            </p>
          </div>

          <div className="space-y-3">
            <div className="group relative aspect-[3/4] overflow-hidden rounded-xs border border-obsidian-700/80 bg-obsidian-900">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
                alt="Deliberation & Strategic Counsel"
                className="h-full w-full object-cover contrast-125 grayscale transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-gold-400">
                  Curation Category 02
                </span>
                <span className="font-serif text-lg text-paper-100">Deliberation in Dialogue</span>
              </div>
            </div>
            <p className="font-sans text-xs font-light leading-relaxed text-paper-400">
              Figures captured in mid-conversation or quiet contemplation; chiaroscuro lighting and
              silhouettes.
            </p>
          </div>

          <div className="space-y-3">
            <div className="group relative aspect-[3/4] overflow-hidden rounded-xs border border-obsidian-700/80 bg-obsidian-900">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
                alt="Global Command & Intelligence"
                className="h-full w-full object-cover contrast-125 grayscale transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-gold-400">
                  Curation Category 03
                </span>
                <span className="font-serif text-lg text-paper-100">
                  Global Intelligence Topology
                </span>
              </div>
            </div>
            <p className="font-sans text-xs font-light leading-relaxed text-paper-400">
              Orbital views, nocturnal city grids, and geopolitical telemetry reflecting global
              advisory reach.
            </p>
          </div>
        </Grid>
      </Section>

      {/* Footer */}
      <footer className="border-t border-obsidian-700/60 bg-obsidian-950 py-12 text-center font-mono text-xs text-paper-500">
        <Container size="xl">
          <div className="flex flex-col items-center justify-center space-y-4">
            <BrandLockup layout="stacked" size="md" markTone="gradient" />
            <p className="text-paper-400">
              SAMVAD PERCEPTION ADVISORY PRIVATE LIMITED — VISUAL IDENTITY SPECIFICATION
            </p>
            <p className="text-[10px] text-paper-500">
              ALL RIGHTS RESERVED // RESTRICTED CIRCULATION
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
