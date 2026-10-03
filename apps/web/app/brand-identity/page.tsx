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
  const [lockupLayout, setLockupLayout] =
    React.useState<"horizontal" | "stacked">("horizontal");

  const [networkDensity, setNetworkDensity] =
    React.useState<"sparse" | "medium" | "dense">("medium");

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f3f0e8] text-[#1d2529] selection:bg-[#a67c45]/20 selection:text-[#8d683d]">
      <ScrollProgress />
      <CustomCursor />

      <BrandWatermark
        opacity={0.02}
        size={800}
        className="-right-48 top-24"
      />

      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-[#d8d1c5] bg-[#f3f0e8]/90 py-4 backdrop-blur-md">
        <Container size="xl">
          <div className="flex items-center justify-between">
            <Link href="/" className="group inline-block">
              <BrandLockup
                layout="horizontal"
                size="sm"
                markTone="gradient"
              />
            </Link>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link
                  href="/design-system"
                  className="flex items-center gap-1.5"
                >
                  Design System
                </Link>
              </Button>

              <Button variant="ghost" size="sm" asChild>
                <Link href="/" className="flex items-center gap-1.5">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Portal
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* 1. HERO */}
      <Section
        padding="hero"
        tone="obsidian"
        className="relative"
      >
        <InfluenceGridLines />

        <Container size="xl">
          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <Eyebrow index={1}>Brand Identity</Eyebrow>

              <Badge variant="gold">Official</Badge>
            </div>

            <Display size="display-2xl">
              Dialogue as <br />
              <span className="font-light italic text-[#a67c45]">
                Strategic Statecraft
              </span>
            </Display>

            <Lead className="max-w-2xl text-[#626760]">
              SAMVAD&apos;s identity draws from{" "}
              <strong>संवाद</strong> — deliberate, structured dialogue.
              A visual language built for authority, discretion, and trust.
            </Lead>

            <div className="flex items-center gap-4 pt-4">
              <AcousticWaveform bars={32} height={40} tone="gold" />

              <span className="font-mono text-[10px] uppercase tracking-widest text-[#777970]">
                Dialogue Frequency // Active
              </span>
            </div>
          </div>
        </Container>
      </Section>

      <SectionDivider metallic />

      {/* 2. MONOLOGUE VS DIALOGUE */}
      <Section padding="normal" tone="carbon">
        <SectionHeader
          index="01"
          eyebrow="Concept"
          title="Monologue → Dialogue"
          lead="From broadcast messaging to structured dialogue."
        />

        <Grid cols={2} gap="lg">
          {/* Conventional PR */}
          <Card
            variant="bordered"
            className="border-[#d0c9bd] bg-[#ebe7de] opacity-80"
          >
            <CardHeader>
              <div className="mb-2 flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[#9b5b52]">
                <X className="h-3.5 w-3.5" />
                Conventional PR
              </div>

              <CardTitle className="text-xl">
                Monologue Model
              </CardTitle>

              <CardDescription>
                One-way, reactive communication.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 text-sm text-[#626760]">
              <p>• Treats perception as passive.</p>

              <p>• Reacts after narratives form.</p>

              <p>• Weakens trust through corporate jargon.</p>
            </CardContent>
          </Card>

          {/* SAMVAD */}
          <GlassCard glow interactive>
            <div className="mb-3 flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[#a67c45]">
              <Check className="h-3.5 w-3.5 text-[#66816d]" />
              SAMVAD Dialogue
            </div>

            <h3 className="mb-2 font-serif text-2xl font-normal text-[#1d2529]">
              Dialogue Model
            </h3>

            <p className="mb-4 font-sans text-sm font-light leading-relaxed text-[#626760]">
              Perception emerges through structured dialogue between
              leadership, regulators, media, and capital.
            </p>

            <div className="space-y-2 font-mono text-xs text-[#626760]">
              <div className="flex items-center gap-2">
                <span className="text-[#a67c45]">01</span>
                <span>Preemptive Listening</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#a67c45]">02</span>
                <span>Targeted Narrative Channels</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#a67c45]">03</span>
                <span>Institutional Trust</span>
              </div>
            </div>
          </GlassCard>
        </Grid>

        <div className="mt-12">
          <Quote
            author="Senior Managing Director"
            role="Strategic Communications Council"
          >
            Dialogue reshapes consensus when broadcast messaging cannot.
          </Quote>
        </div>
      </Section>

      <SectionDivider />

      {/* 3. LOGO GEOMETRY */}
      <Section padding="normal" tone="obsidian">
        <SectionHeader
          index="02"
          eyebrow="Geometry"
          title="Brand Mark Anatomy"
          lead="Two dialogue arcs converge around a central node."
        />

        <div className="space-y-12">
          <EditorialFrame
            classification="BRAND IDENTITY ASSET"
            referenceId="SMV-GEO-001"
          >
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="relative flex flex-col items-center justify-center rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-8 lg:col-span-5">
                <div className="pointer-events-none absolute inset-4 border border-dashed border-[#a67c45]/20" />

                <span className="absolute left-2 top-1 font-mono text-[8px] text-[#a67c45]/60">
                  1.5X CLEAR SPACE
                </span>

                <BrandMark size="xl" tone="gradient" />

                <div className="mt-6 text-center">
                  <span className="block font-mono text-xs font-semibold uppercase tracking-widest text-[#a67c45]">
                    Dialogue Convergence Mark
                  </span>

                  <span className="mt-1 block font-mono text-[10px] text-[#aaa398]">
                    Grid: 48×48 // Tangent: 32°
                  </span>
                </div>
              </div>

              <div className="space-y-6 lg:col-span-7">
                <div>
                  <h4 className="mb-2 font-serif text-xl font-normal text-[#1d2529]">
                    Symbolic Elements
                  </h4>

                  <ul className="space-y-3 text-sm font-light leading-relaxed text-[#626760]">
                    <li className="flex items-start gap-2.5">
                      <span className="font-mono text-xs text-[#a67c45]">
                        ◆
                      </span>

                      <span>
                        <strong>Upper Arc</strong>: Leadership and
                        strategic intent.
                      </span>
                    </li>

                    <li className="flex items-start gap-2.5">
                      <span className="font-mono text-xs text-[#a67c45]">
                        ◆
                      </span>

                      <span>
                        <strong>Lower Arc</strong>: Society, regulators,
                        markets, and public opinion.
                      </span>
                    </li>

                    <li className="flex items-start gap-2.5">
                      <span className="font-mono text-xs text-[#a67c45]">
                        ◆
                      </span>

                      <span>
                        <strong>Central Node</strong>: Convergence for
                        shared perception and trust.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Lockup Format Switcher */}
                <div className="space-y-4 border-t border-[#d8d1c5] pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#777970]">
                      Lockup
                    </span>

                    <div className="flex gap-2">
                      <Button
                        variant={
                          lockupLayout === "horizontal"
                            ? "gold"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => setLockupLayout("horizontal")}
                      >
                        Horizontal
                      </Button>

                      <Button
                        variant={
                          lockupLayout === "stacked"
                            ? "gold"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => setLockupLayout("stacked")}
                      >
                        Stacked
                      </Button>
                    </div>
                  </div>

                  <div className="flex min-h-[100px] items-center justify-center rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] p-6">
                    <BrandLockup
                      layout={lockupLayout}
                      size="lg"
                      markTone="gradient"
                    />
                  </div>
                </div>
              </div>
            </div>
          </EditorialFrame>
        </div>
      </Section>

      <SectionDivider />

      {/* 4. COLOR ARCHITECTURE */}
      <Section padding="normal" tone="carbon">
        <SectionHeader
          index="03"
          eyebrow="Color"
          title="60–30–10 Color System"
          lead="Controlled ratios for authority and legibility."
        />

        <div className="mb-10 space-y-4">
          <div className="flex h-12 w-full overflow-hidden rounded-xs border border-[#d0c9bd]">
            <div className="flex w-[60%] items-center justify-center border-r border-[#d0c9bd] bg-[#ebe7de] font-mono text-xs text-[#626760]">
              60% Ivory Canvas
            </div>

            <div className="flex w-[30%] items-center justify-center border-r border-[#d0c9bd] bg-[#f3f0e8] font-mono text-xs font-bold text-[#1d2529]">
              30% Ink &amp; Paper
            </div>

            <div className="flex w-[10%] items-center justify-center bg-[#a67c45] font-mono text-xs font-bold text-[#f3f0e8]">
              10% Bronze
            </div>
          </div>
        </div>

        <Grid cols={3} gap="md">
          <Card variant="default">
            <CardHeader>
              <div className="font-mono text-xs uppercase tracking-widest text-[#777970]">
                Dominant Surface
              </div>

              <CardTitle className="text-xl">
                60% Ivory
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 font-mono text-xs text-[#777970]">
              <p>• #F3F0E8</p>
              <p>• #EBE7DE</p>
              <p>• #E5DFD4</p>

              <p className="pt-2 font-sans font-light text-[#626760]">
                Primary canvas for calm and discretion.
              </p>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader>
              <div className="font-mono text-xs uppercase tracking-widest text-[#777970]">
                Structural Contrast
              </div>

              <CardTitle className="text-xl">
                30% Paper
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 font-mono text-xs text-[#777970]">
              <p>• #F3F0E8</p>
              <p>• #1D2529</p>
              <p>• #626760</p>

              <p className="pt-2 font-sans font-light text-[#626760]">
                Editorial clarity and readable hierarchy.
              </p>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader>
              <div className="font-mono text-xs uppercase tracking-widest text-[#a67c45]">
                Strategic Accent
              </div>

              <CardTitle className="text-xl">
                10% Bronze
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 font-mono text-xs text-[#777970]">
              <p>• #A67C45</p>
              <p>• #8D683D</p>
              <p>• #C9B995</p>

              <p className="pt-2 font-sans font-light text-[#626760]">
                Reserved for actions, states, and key metrics.
              </p>
            </CardContent>
          </Card>
        </Grid>
      </Section>

      <SectionDivider />

      {/* 5. DIALOGUE NETWORK */}
      <Section padding="normal" tone="obsidian">
        <SectionHeader
          index="04"
          eyebrow="Visual Motif"
          title="Dialogue Network"
          lead="Interactive map of leadership, capital, and society."
        />

        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#777970]">
                Node Density:
              </span>

              <div className="flex gap-2">
                {(["sparse", "medium", "dense"] as const).map((d) => (
                  <Button
                    key={d}
                    variant={
                      networkDensity === d ? "gold" : "outline"
                    }
                    size="sm"
                    onClick={() => setNetworkDensity(d)}
                  >
                    {d}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-[#a67c45]">
              <span className="h-2 w-2 animate-ping rounded-full bg-[#a67c45]" />

              <span>Hover to explore influence vectors</span>
            </div>
          </div>

          <div className="relative h-[480px] w-full overflow-hidden rounded-xs border border-[#d0c9bd] shadow-sm">
            <DialogueNetwork
              density={networkDensity}
              interactive
              showLabels
            />
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* 6. ICONOGRAPHY */}
      <Section padding="normal" tone="carbon">
        <SectionHeader
          index="05"
          eyebrow="Visual System"
          title="Iconography Suite"
          lead="Eight symbols for core perception disciplines."
        />

        <Grid cols={4} gap="md">
          {[
            {
              icon: (
                <IconDialogue
                  size={28}
                  className="text-[#a67c45]"
                />
              ),
              name: "IconDialogue",
              concept: "Mutual Discourse",
              desc: "Converging dialogue.",
            },
            {
              icon: (
                <IconPerceptionShield
                  size={28}
                  className="text-[#a67c45]"
                />
              ),
              name: "IconPerceptionShield",
              concept: "Reputational Defense",
              desc: "Protects executive integrity.",
            },
            {
              icon: (
                <IconInfluenceNodes
                  size={28}
                  className="text-[#a67c45]"
                />
              ),
              name: "IconInfluenceNodes",
              concept: "Network Vectors",
              desc: "Stakeholder transmission network.",
            },
            {
              icon: (
                <IconCrisisContainment
                  size={28}
                  className="text-[#a67c45]"
                />
              ),
              name: "IconCrisisContainment",
              concept: "Crisis Containment",
              desc: "Contains narrative volatility.",
            },
            {
              icon: (
                <IconSovereignBrief
                  size={28}
                  className="text-[#a67c45]"
                />
              ),
              name: "IconSovereignBrief",
              concept: "Sovereign Brief",
              desc: "Verified advisory record.",
            },
            {
              icon: (
                <IconSentimentRadar
                  size={28}
                  className="text-[#a67c45]"
                />
              ),
              name: "IconSentimentRadar",
              concept: "Sentiment Radar",
              desc: "Media sentiment monitoring.",
            },
            {
              icon: (
                <IconNarrativeVector
                  size={28}
                  className="text-[#a67c45]"
                />
              ),
              name: "IconNarrativeVector",
              concept: "Narrative Vector",
              desc: "Tracks narrative movement.",
            },
            {
              icon: (
                <IconInstitutionalTrust
                  size={28}
                  className="text-[#a67c45]"
                />
              ),
              name: "IconInstitutionalTrust",
              concept: "Institutional Trust",
              desc: "Verified institutional authority.",
            },
          ].map((item, idx) => (
            <Card
              key={idx}
              variant="interactive"
              className="group space-y-4 border-[#d0c9bd] bg-[#f3f0e8] p-6"
            >
              <div className="w-fit rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-3 transition-colors group-hover:border-[#a67c45]/40">
                {item.icon}
              </div>

              <div>
                <span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-[#a67c45]">
                  {item.concept}
                </span>

                <h4 className="mb-1 font-mono text-sm font-semibold text-[#1d2529]">
                  {item.name}
                </h4>

                <p className="font-sans text-xs font-light leading-relaxed text-[#626760]">
                  {item.desc}
                </p>
              </div>
            </Card>
          ))}
        </Grid>
      </Section>

      <SectionDivider />

      {/* 7. PHOTOGRAPHY */}
      <Section padding="normal" tone="obsidian">
        <SectionHeader
          index="06"
          eyebrow="Art Direction"
          title="Photography Direction"
          lead="Chiaroscuro, architecture, and authentic deliberation."
        />

        <Grid cols={3} gap="md">
          <div className="space-y-3">
            <div className="group relative aspect-[3/4] overflow-hidden rounded-xs border border-[#d0c9bd] bg-[#ebe7de]">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                alt="Architecture of Power"
                className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1d2529]/80 via-[#1d2529]/10 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-[#a67c45]">
                  Category 01
                </span>

                <span className="font-serif text-lg text-[#f3f0e8]">
                  Architecture of Power
                </span>
              </div>
            </div>

            <p className="font-sans text-xs font-light leading-relaxed text-[#626760]">
              Monumental architecture and institutional authority.
            </p>
          </div>

          <div className="space-y-3">
            <div className="group relative aspect-[3/4] overflow-hidden rounded-xs border border-[#d0c9bd] bg-[#ebe7de]">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
                alt="Deliberation in Dialogue"
                className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1d2529]/80 via-[#1d2529]/10 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-[#a67c45]">
                  Category 02
                </span>

                <span className="font-serif text-lg text-[#f3f0e8]">
                  Deliberation
                </span>
              </div>
            </div>

            <p className="font-sans text-xs font-light leading-relaxed text-[#626760]">
              Conversation, contemplation, and shadow.
            </p>
          </div>

          <div className="space-y-3">
            <div className="group relative aspect-[3/4] overflow-hidden rounded-xs border border-[#d0c9bd] bg-[#ebe7de]">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
                alt="Global Intelligence"
                className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1d2529]/80 via-[#1d2529]/10 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-[#a67c45]">
                  Category 03
                </span>

                <span className="font-serif text-lg text-[#f3f0e8]">
                  Global Intelligence
                </span>
              </div>
            </div>

            <p className="font-sans text-xs font-light leading-relaxed text-[#626760]">
              City grids, telemetry, and global reach.
            </p>
          </div>
        </Grid>
      </Section>

      {/* Footer */}
      <footer className="border-t border-[#d8d1c5] bg-[#ebe7de] py-12 text-center font-mono text-xs text-[#aaa398]">
        <Container size="xl">
          <div className="flex flex-col items-center justify-center space-y-4">
            <BrandLockup
              layout="stacked"
              size="md"
              markTone="gradient"
            />

            <p className="text-[#777970]">
              SAMVAD PERCEPTION ADVISORY — VISUAL IDENTITY
            </p>

            <p className="text-[10px] text-[#aaa398]">
              ALL RIGHTS RESERVED // RESTRICTED
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}