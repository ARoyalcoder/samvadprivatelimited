"use client";

import * as React from "react";
import {
  // Tokens
  colors,
  // Typography
  Display,
  Heading,
  Eyebrow,
  SectionHeading,
  Text,
  Lead,
  Quote,
  MetricNumber,
  AnimatedText,
  RevealText,
  AnimatedCounter,
  // Layout
  Container,
  Grid,
  GridCol,
  Section,
  SectionHeader,
  SectionDivider,
  // Buttons
  Button,
  MagneticButton,
  // Cards
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  GlassCard,
  DossierCard,
  MetricCard,
  // Inputs
  Input,
  Textarea,
  Field,
  FieldLabel,
  FieldDescription,
  // Navigation
  Navbar,
  NavItem,
  Breadcrumbs,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  ScrollProgress,
  // Overlays
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  // Data Display
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Marquee,
  // Media
  ImageReveal,
  HoverImage,
  // Feedback
  Spinner,
  ShimmerBar,
  OrbitLoader,
  Skeleton,
  CardSkeleton,
  TextSkeleton,
  MetricSkeleton,
  EmptyState,
  ErrorState,
  ErrorCard,
  // Motion
  CustomCursor,
} from "@samvad/ui";
import { Mail, ArrowRight, ShieldCheck, SlidersHorizontal } from "lucide-react";

export default function DesignSystemPage() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-obsidian-950 text-paper-100 selection:bg-gold-500/30 selection:text-gold-200">
        <ScrollProgress />
        <CustomCursor />

        {/* Global Showcase Navbar */}
        <Navbar
          brand={
            <div className="flex items-center gap-3">
              <span className="font-serif text-lg font-light tracking-wider text-paper-100">
                SAMVAD
              </span>
              <span className="rounded-xs border border-gold-500/30 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-gold-400">
                Design System v1.0
              </span>
            </div>
          }
          actions={
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <a href="/">← Return to Portal</a>
              </Button>
            </div>
          }
        >
          <NavItem href="#tokens">Tokens</NavItem>
          <NavItem href="#typography">Typography</NavItem>
          <NavItem href="#buttons">Buttons</NavItem>
          <NavItem href="#cards">Cards</NavItem>
          <NavItem href="#inputs">Inputs</NavItem>
          <NavItem href="#overlays">Overlays</NavItem>
          <NavItem href="#feedback">Feedback</NavItem>
        </Navbar>

        {/* Hero Section */}
        <Section padding="hero" tone="obsidian">
          <Container size="xl">
            <div className="max-w-4xl space-y-6">
              <Eyebrow index={1}>Brand Foundation & Visual Language</Eyebrow>
              <RevealText>
                <Display size="display-2xl">
                  Strategic Perception <br />
                  <span className="font-light italic text-gold-400">Design System</span>
                </Display>
              </RevealText>
              <Lead className="max-w-2xl text-paper-300">
                A restrained, high-authority digital language engineered for sovereign
                communications, geopolitical risk intelligence, and executive reputation management.
              </Lead>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <MagneticButton strength={0.4} variant="gold" size="lg">
                  Explore Components
                </MagneticButton>
                <Button variant="luxury" size="lg">
                  Read Design Spec
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* Breadcrumbs Component Demo */}
        <div className="border-y border-obsidian-700/60 bg-obsidian-900/60 py-3">
          <Container size="xl">
            <Breadcrumbs>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Architecture</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Design System Specification</BreadcrumbPage>
              </BreadcrumbItem>
            </Breadcrumbs>
          </Container>
        </div>

        {/* 1. COLOR TOKENS */}
        <Section id="tokens" padding="normal" tone="obsidian">
          <SectionHeader
            index="01"
            eyebrow="Visual Architecture"
            title="Color Token Matrix"
            lead="Obsidian depth, warm aged parchment, and strategic burnished gold accents designed to avoid generic SaaS blues."
          />

          <div className="space-y-12">
            {/* Obsidian Void */}
            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-paper-400">
                Obsidian Noir & Structural Elevation
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7">
                {Object.entries(colors.obsidian).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex h-24 flex-col justify-between rounded-xs border border-obsidian-700/80 p-3"
                    style={{ backgroundColor: val }}
                  >
                    <span className="font-mono text-[10px] text-paper-400">obsidian-{key}</span>
                    <span className="font-mono text-xs font-bold text-paper-200">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Paper & Alabaster */}
            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-paper-400">
                Warm Paper & Typography High-Contrast
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
                {Object.entries(colors.paper).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex h-24 flex-col justify-between rounded-xs border border-obsidian-700/80 p-3"
                    style={{ backgroundColor: val }}
                  >
                    <span className="font-mono text-[10px] font-semibold text-obsidian-950">
                      paper-{key}
                    </span>
                    <span className="font-mono text-xs font-bold text-obsidian-900">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Gold & Champagne */}
            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-paper-400">
                Burnished Strategic Gold & Champagne Accents
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
                <div className="flex h-24 flex-col justify-between rounded-xs border border-gold-500/40 bg-gold-500 p-3 text-obsidian-950">
                  <span className="font-mono text-[10px] font-bold">gold-500 (Primary)</span>
                  <span className="font-mono text-xs font-bold">#C39651</span>
                </div>
                <div className="flex h-24 flex-col justify-between rounded-xs border border-gold-400/40 bg-gold-400 p-3 text-obsidian-950">
                  <span className="font-mono text-[10px] font-bold">gold-400</span>
                  <span className="font-mono text-xs font-bold">#D1AE74</span>
                </div>
                <div className="flex h-24 flex-col justify-between rounded-xs border border-champagne-500/40 bg-champagne-500 p-3 text-obsidian-950">
                  <span className="font-mono text-[10px] font-bold">champagne-500</span>
                  <span className="font-mono text-xs font-bold">#C5B38C</span>
                </div>
                <div className="flex h-24 flex-col justify-between rounded-xs border border-perception-positive/40 bg-perception-positive/20 p-3 text-perception-positive">
                  <span className="font-mono text-[10px] font-bold">Positive</span>
                  <span className="font-mono text-xs font-bold">#10B981</span>
                </div>
                <div className="flex h-24 flex-col justify-between rounded-xs border border-perception-alert/40 bg-perception-alert/20 p-3 text-perception-alert">
                  <span className="font-mono text-[10px] font-bold">Alert</span>
                  <span className="font-mono text-xs font-bold">#F59E0B</span>
                </div>
                <div className="flex h-24 flex-col justify-between rounded-xs border border-perception-crisis/40 bg-perception-crisis/20 p-3 text-perception-crisis">
                  <span className="font-mono text-[10px] font-bold">Crisis</span>
                  <span className="font-mono text-xs font-bold">#EF4444</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <SectionDivider metallic />

        {/* 2. TYPOGRAPHY SYSTEM */}
        <Section id="typography" padding="normal" tone="carbon">
          <SectionHeader
            index="02"
            eyebrow="Editorial Typography"
            title="Typographic Hierarchy & Motion"
            lead="Serif display paired with disciplined sans body typography, monospaced metadata, and kinematic text reveals."
          />

          <Grid cols={1} gap="lg" className="space-y-8">
            <div className="space-y-6 rounded-xs border border-obsidian-700/60 bg-obsidian-900 p-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-paper-500">
                  Display Serif
                </span>
                <Heading size="display-lg">Perception is the decisive currency of power.</Heading>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-paper-500">
                  Section Heading & Eyebrow
                </span>
                <SectionHeading
                  index="08"
                  eyebrow="Reputational Defense"
                  title="Cross-Jurisdictional Crisis Intervention"
                  description="When asymmetrical narratives threaten corporate autonomy, SAMVAD executes decisive perceptual containment."
                />
              </div>

              <div className="grid grid-cols-1 gap-6 border-t border-obsidian-700/40 pt-4 md:grid-cols-2">
                <div>
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-paper-500">
                    Kinematic Text Split
                  </span>
                  <AnimatedText
                    text="Defending enterprise reputation across turbulent capital markets and adversarial media cycles."
                    className="font-serif text-lg text-paper-200"
                    splitBy="words"
                  />
                </div>
                <div>
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-paper-500">
                    Spring Numeric Counter
                  </span>
                  <div className="flex items-baseline gap-2">
                    <AnimatedCounter
                      value={99.4}
                      decimals={1}
                      suffix="%"
                      className="font-serif text-4xl font-light text-gold-300"
                    />
                    <span className="font-mono text-xs uppercase tracking-widest text-paper-400">
                      Crisis Containment Index
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-obsidian-700/40 pt-4">
                <Grid cols={12} gap="sm">
                  <GridCol span={6}>
                    <MetricNumber
                      value="94.8"
                      label="Narrative Resonance Score"
                      change="+3.4%"
                      changeType="positive"
                    />
                  </GridCol>
                  <GridCol span={6}>
                    <MetricNumber
                      value="0.12"
                      label="Adverse Sentiment Index"
                      change="-18.2%"
                      changeType="positive"
                    />
                  </GridCol>
                </Grid>
              </div>

              <div className="border-t border-obsidian-700/40 pt-4">
                <Quote author="Advisory Director" role="Strategic Communications Division">
                  In high-stakes corporate warfare, the narrative is not merely observed—it is
                  shaped before the first public headline is set to print.
                </Quote>
              </div>
            </div>
          </Grid>
        </Section>

        <SectionDivider />

        {/* 3. BUTTONS & TRIGGERS */}
        <Section id="buttons" padding="normal" tone="obsidian">
          <SectionHeader
            index="03"
            eyebrow="Interactive Elements"
            title="Buttons & Magnetic Physics"
            lead="Multi-tier executive buttons with loading states, subtle gold metallic glows, and magnetic cursor attraction."
          />

          <div className="space-y-8">
            <div className="space-y-4 rounded-xs border border-obsidian-700/60 bg-obsidian-900 p-6">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-paper-400">
                Standard Button Variants
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Primary Action</Button>
                <Button variant="secondary">Secondary Action</Button>
                <Button variant="outline">Outline Hairline</Button>
                <Button variant="gold">Strategic Gold</Button>
                <Button variant="luxury">Luxury Executive</Button>
                <Button variant="ghost">Ghost Trigger</Button>
                <Button variant="destructive">Crisis Abort</Button>
                <Button variant="gold" isLoading>
                  Submitting
                </Button>
              </div>
            </div>

            <div className="space-y-4 rounded-xs border border-obsidian-700/60 bg-obsidian-900 p-6">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-paper-400">
                Magnetic Buttons (Move Cursor Nearby)
              </span>
              <div className="flex flex-wrap items-center gap-6">
                <MagneticButton strength={0.4} variant="gold">
                  Magnetic Gold Action
                </MagneticButton>
                <MagneticButton strength={0.3} variant="luxury">
                  Magnetic Luxury CTA
                </MagneticButton>
                <MagneticButton strength={0.25} variant="outline">
                  Magnetic Outline
                </MagneticButton>
              </div>
            </div>
          </div>
        </Section>

        <SectionDivider />

        {/* 4. CARDS & DOSSIERS */}
        <Section id="cards" padding="normal" tone="carbon">
          <SectionHeader
            index="04"
            eyebrow="Spatial Surfaces"
            title="Cards, Dossiers & Glass Surfaces"
            lead="Optical glass blur, cursor-tracking radial highlights, and classified advisory dossier layouts."
          />

          <Grid cols={3} gap="md">
            {/* Standard Card */}
            <Card variant="default">
              <CardHeader>
                <div className="font-mono text-[10px] uppercase tracking-widest text-gold-400">
                  Standard Surface
                </div>
                <CardTitle>Perception Intelligence</CardTitle>
                <CardDescription>
                  Continuous diagnostic monitoring of executive reputation vectors.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Text variant="small">
                  Identifies narrative shifts across 10,000+ global financial and regulatory feeds.
                </Text>
              </CardContent>
              <CardFooter className="justify-between font-mono text-xs text-paper-400">
                <span>Updated Daily</span>
                <span className="text-gold-400">Active Monitor →</span>
              </CardFooter>
            </Card>

            {/* GlassCard with interactive cursor illumination */}
            <GlassCard interactive glow>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-gold-400">
                Optical Glass Card
              </div>
              <h3 className="mb-2 font-serif text-2xl font-normal text-paper-100">
                Interactive Specular Rim
              </h3>
              <p className="mb-6 font-sans text-sm font-light leading-relaxed text-paper-300">
                Hover over this surface. A subtle radial light source tracks your cursor across the
                glass plane.
              </p>
              <div className="flex items-center gap-2 font-mono text-xs text-gold-300">
                <ShieldCheck className="h-4 w-4" />
                <span>Protected Encryption</span>
              </div>
            </GlassCard>

            {/* DossierCard */}
            <DossierCard
              index="04"
              classification="STRICTLY CONFIDENTIAL"
              category="Cross-Border M&A"
              title="Sovereign Fund Hostile Takeover Defense"
              excerpt="Strategic containment of public sentiment during an unsolicited $12B cross-border acquisition."
              date="SEPTEMBER 2026"
            />
          </Grid>

          {/* Metric Cards Row */}
          <div className="mt-8">
            <Grid cols={4} gap="md">
              <MetricCard
                label="Global Footprint"
                value="28+"
                change="+4"
                trend="up"
                description="Jurisdictions with active advisory presence"
              />
              <MetricCard
                label="Crisis Containment"
                value="99.2%"
                change="+0.8%"
                trend="up"
                description="Favorable outcome across 150+ major incidents"
              />
              <MetricCard
                label="Advisory Retainers"
                value="$4.8B"
                change="Sustained"
                trend="neutral"
                description="Client asset volume safeguarded"
              />
              <MetricCard
                label="Hostile Narrative Mitigation"
                value="-84%"
                change="-84%"
                trend="down"
                description="Reduction in adverse press velocity"
              />
            </Grid>
          </div>
        </Section>

        <SectionDivider />

        {/* 5. FORM INPUTS & DATA CAPTURE */}
        <Section id="inputs" padding="normal" tone="obsidian">
          <SectionHeader
            index="05"
            eyebrow="Data Capture"
            title="Inputs, Fields & Editorial Forms"
            lead="Accessible inputs with high-contrast obsidian backgrounds, micro-borders, and gold focus states."
          />

          <div className="mx-auto max-w-2xl space-y-6 rounded-xs border border-obsidian-700/80 bg-obsidian-900 p-8">
            <Field>
              <FieldLabel required>Executive Contact Name</FieldLabel>
              <Input placeholder="Lord / Ambassador / Dr. / Ms." />
              <FieldDescription>Full formal address for confidential engagement.</FieldDescription>
            </Field>

            <Field>
              <FieldLabel required>Institutional Email Address</FieldLabel>
              <Input
                type="email"
                placeholder="c-suite@organization.com"
                startIcon={<Mail className="h-4 w-4" />}
              />
            </Field>

            <Field error="Please enter at least 20 characters detailing the strategic mandate.">
              <FieldLabel required>Advisory Mandate Brief</FieldLabel>
              <Textarea placeholder="Outline the crisis, transaction, or reputation challenge requiring counsel..." />
            </Field>

            <div className="pt-2">
              <Button variant="gold" size="lg" className="w-full">
                Transmit Confidential Briefing
              </Button>
            </div>
          </div>
        </Section>

        <SectionDivider />

        {/* 6. OVERLAYS & DIALOGS */}
        <Section id="overlays" padding="normal" tone="carbon">
          <SectionHeader
            index="06"
            eyebrow="Layering & Overlays"
            title="Modals, Drawers & Tooltips"
            lead="Fully accessible dialogs and slide-over sheets styled in deep obsidian with backdrop blur."
          />

          <div className="flex flex-wrap items-center justify-center gap-6 rounded-xs border border-obsidian-700/60 bg-obsidian-900 p-12">
            {/* Modal Demo */}
            <Modal open={modalOpen} onOpenChange={setModalOpen}>
              <ModalTrigger asChild>
                <Button variant="luxury">Trigger Advisory Modal</Button>
              </ModalTrigger>
              <ModalContent size="md">
                <ModalHeader>
                  <ModalTitle>Confidential Advisory Engagement</ModalTitle>
                  <ModalDescription>PROTOCOL ID: 0x992B // JURISDICTION: GLOBAL</ModalDescription>
                </ModalHeader>
                <div className="space-y-4 py-4 text-sm font-light text-paper-300">
                  <p>
                    All transmissions through the SAMVAD intelligence layer are encrypted using
                    end-to-end cryptographic keys and logged in the immutable audit registry.
                  </p>
                  <Field>
                    <FieldLabel>Security Clearance Code</FieldLabel>
                    <Input placeholder="Enter 6-digit cryptographic PIN" />
                  </Field>
                </div>
                <ModalFooter>
                  <ModalClose asChild>
                    <Button variant="ghost">Abort</Button>
                  </ModalClose>
                  <Button variant="gold" onClick={() => setModalOpen(false)}>
                    Confirm Protocol
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            {/* Drawer Demo */}
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline">Trigger Slide-In Drawer</Button>
              </DrawerTrigger>
              <DrawerContent side="right" size="md">
                <DrawerHeader>
                  <DrawerTitle>Perception Intelligence Filters</DrawerTitle>
                  <DrawerDescription>FILTER MATRIX // REALTIME FEED</DrawerDescription>
                </DrawerHeader>
                <div className="space-y-6 text-sm text-paper-300">
                  <p>
                    Select geographic regions and sentiment thresholds to focus live intelligence
                    streams.
                  </p>
                  <div className="space-y-3">
                    <Badge variant="gold">Asia-Pacific (APAC)</Badge>
                    <Badge variant="outline">North America (NA)</Badge>
                    <Badge variant="outline">European Union (EU)</Badge>
                  </div>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close Drawer</Button>
                  </DrawerClose>
                  <Button variant="gold">Apply Parameters</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

            {/* Tooltip Demo */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="icon">
                  <SlidersHorizontal className="h-4 w-4 text-gold-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Configure Diagnostic Telemetry</TooltipContent>
            </Tooltip>
          </div>
        </Section>

        <SectionDivider />

        {/* 7. DATA DISPLAY & DISCLOSURES */}
        <Section padding="normal" tone="obsidian">
          <SectionHeader
            index="07"
            eyebrow="Data Display"
            title="Badges, Tabs, Accordions & Marquee"
            lead="Multi-tier status indicators, smooth disclosures, and continuous marquee tickers."
          />

          <div className="space-y-12">
            {/* Badges */}
            <div className="space-y-4 rounded-xs border border-obsidian-700/60 bg-obsidian-900 p-6">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-paper-400">
                Severity & Strategic Status Badges
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="default">Default Tag</Badge>
                <Badge variant="secondary">Secondary Tag</Badge>
                <Badge variant="gold" dot>
                  Gold Strategic
                </Badge>
                <Badge variant="positive" dot>
                  Favorable Coverage
                </Badge>
                <Badge variant="neutral" dot>
                  Equilibrium
                </Badge>
                <Badge variant="alert" dot>
                  Emerging Divergence
                </Badge>
                <Badge variant="crisis" dot>
                  Hostile Narrative
                </Badge>
              </div>
            </div>

            {/* Tabs */}
            <div className="space-y-6 rounded-xs border border-obsidian-700/60 bg-obsidian-900 p-6">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-paper-400">
                Underline & Segmented Tabs
              </span>

              <Tabs defaultValue="overview">
                <TabsList variant="underline">
                  <TabsTrigger value="overview">Executive Overview</TabsTrigger>
                  <TabsTrigger value="intelligence">Perception Feed</TabsTrigger>
                  <TabsTrigger value="audit">Immutable Audit</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <p className="max-w-2xl font-sans leading-relaxed text-paper-300">
                    Executive overview synthesizes macro-reputational indices across corporate
                    boards, analyst sentiment, and institutional shareholder commentary.
                  </p>
                </TabsContent>
                <TabsContent value="intelligence">
                  <p className="max-w-2xl font-sans leading-relaxed text-paper-300">
                    Perception Feed scans 250,000+ digital publications per hour, calculating
                    narrative velocity and sentiment shift probabilities in real time.
                  </p>
                </TabsContent>
                <TabsContent value="audit">
                  <p className="max-w-2xl font-sans leading-relaxed text-paper-300">
                    Cryptographically sealed audit logs recording every advisory consultation, press
                    briefing, and client mandate adjustment.
                  </p>
                </TabsContent>
              </Tabs>
            </div>

            {/* Accordion */}
            <div className="space-y-4 rounded-xs border border-obsidian-700/60 bg-obsidian-900 p-6">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-paper-400">
                Editorial Accordion Disclosures
              </span>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger index={1}>
                    How does SAMVAD manage hostile narrative escalation?
                  </AccordionTrigger>
                  <AccordionContent>
                    We deploy immediate multi-channel containment: counter-briefings to primary
                    financial journalists, stakeholder reassurance protocols, and search-engine
                    equilibrium balancing to ensure corporate facts preempt speculative narratives.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger index={2}>
                    What distinguishes SAMVAD from conventional PR agencies?
                  </AccordionTrigger>
                  <AccordionContent>
                    Conventional PR issues reactive press statements. SAMVAD operates as an
                    intelligence-first strategic advisory firm—using predictive sentiment
                    algorithms, sovereign diplomacy methodology, and discreet back-channel advisory
                    to neutralize risks before they surface.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger index={3}>
                    How are client engagements kept strictly confidential?
                  </AccordionTrigger>
                  <AccordionContent>
                    All advisory data is isolated within cryptographically fortified enclaves with
                    strict role-based access control, zero third-party telemetry, and contractual
                    confidentiality covenants governed by Swiss and Delaware jurisdictions.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Marquee Ticker */}
            <div className="space-y-4">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-paper-400">
                Infinite Editorial Marquee Ticker
              </span>
              <div className="border-y border-obsidian-700/80 bg-obsidian-900/60 py-4">
                <Marquee speed="normal">
                  <span className="mx-6 font-serif text-lg text-paper-300">
                    M&A Communications Advisory
                  </span>
                  <span className="font-mono text-xs text-gold-500">◆</span>
                  <span className="mx-6 font-serif text-lg text-paper-300">
                    Crisis & Litigation Containment
                  </span>
                  <span className="font-mono text-xs text-gold-500">◆</span>
                  <span className="mx-6 font-serif text-lg text-paper-300">
                    Sovereign & Geopolitical Intelligence
                  </span>
                  <span className="font-mono text-xs text-gold-500">◆</span>
                  <span className="mx-6 font-serif text-lg text-paper-300">
                    Executive Reputation Architecture
                  </span>
                  <span className="font-mono text-xs text-gold-500">◆</span>
                </Marquee>
              </div>
            </div>
          </div>
        </Section>

        <SectionDivider />

        {/* 8. MEDIA & REVEAL */}
        <Section padding="normal" tone="carbon">
          <SectionHeader
            index="08"
            eyebrow="Media Choreography"
            title="Image Reveals & Interactive Hover Preview"
            lead="Curtain clip-path image unveils and cursor-following interactive media previews."
          />

          <Grid cols={2} gap="lg">
            <div>
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-paper-400">
                Curtain Image Reveal on Viewport
              </span>
              <ImageReveal
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                alt="Architectural monolithic headquarters"
                aspectRatio="landscape"
                direction="up"
              />
            </div>

            <div className="flex flex-col justify-center space-y-6">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-paper-400">
                Hover Image Preview (Hover Over Links)
              </span>
              <div className="space-y-4">
                <HoverImage
                  imageSrc="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
                  imageAlt="Boardroom Advisory"
                >
                  <div className="flex items-center justify-between border-b border-obsidian-700/60 pb-3 font-serif text-xl text-paper-100 transition-colors hover:text-gold-300 sm:text-2xl">
                    <span>01 / Executive Counsel & Board Strategy</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </HoverImage>

                <HoverImage
                  imageSrc="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
                  imageAlt="Global Geopolitical Data"
                >
                  <div className="flex items-center justify-between border-b border-obsidian-700/60 pb-3 font-serif text-xl text-paper-100 transition-colors hover:text-gold-300 sm:text-2xl">
                    <span>02 / Geopolitical Intelligence Operations</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </HoverImage>

                <HoverImage
                  imageSrc="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
                  imageAlt="Crisis Communications War Room"
                >
                  <div className="flex items-center justify-between border-b border-obsidian-700/60 pb-3 font-serif text-xl text-paper-100 transition-colors hover:text-gold-300 sm:text-2xl">
                    <span>03 / Rapid Litigation Response Enclave</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </HoverImage>
              </div>
            </div>
          </Grid>
        </Section>

        <SectionDivider />

        {/* 9. FEEDBACK & DIAGNOSTICS */}
        <Section id="feedback" padding="normal" tone="obsidian">
          <SectionHeader
            index="09"
            eyebrow="Feedback States"
            title="Loading, Skeletons, Empty & Error States"
            lead="Diagnostic precision when operations are pending, unpopulated, or encounter exceptions."
          />

          <Grid cols={3} gap="lg">
            {/* Loaders */}
            <div className="space-y-6 rounded-xs border border-obsidian-700/60 bg-obsidian-900 p-6">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-paper-400">
                Active Loaders & Shimmer
              </span>
              <div className="flex items-center justify-center gap-6 py-4">
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
              </div>
              <ShimmerBar />
              <OrbitLoader label="Synthesizing Perception Stream..." />
            </div>

            {/* Skeletons */}
            <div className="space-y-4 rounded-xs border border-obsidian-700/60 bg-obsidian-900 p-6">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-paper-400">
                Card, Text & Metric Skeletons
              </span>
              <CardSkeleton />
              <div className="pt-2">
                <TextSkeleton lines={2} />
              </div>
              <div className="pt-2">
                <MetricSkeleton />
              </div>
              <Skeleton className="h-8 w-full" />
            </div>

            {/* Empty & Error */}
            <div className="space-y-4 rounded-xs border border-obsidian-700/60 bg-obsidian-900 p-6">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-paper-400">
                Error & Empty Diagnostic
              </span>
              <ErrorCard
                title="Telemetry Link Timeout"
                message="WebSocket connection to Asia-Pacific perception gateway failed to respond within 3000ms."
              />
              <EmptyState
                code="NO_DOSSIERS_FOUND"
                title="No Dossiers Found"
                description="Adjust classification filters to locate relevant records."
                action={
                  <Button variant="outline" size="sm">
                    Reset Filter Parameters
                  </Button>
                }
              />
            </div>
          </Grid>

          <div className="mt-8">
            <ErrorState
              code="ERR_CIRCUIT_BREAKER_TRIGGERED"
              title="Crisis Enclave Automated Isolation"
              message="The perception advisory gateway detected an anomalous surge in adversarial automated queries. Tactical rate-limiting engaged."
              onRetry={() => alert("Diagnostic retry initiated")}
              retryText="Re-authenticate Session"
            />
          </div>
        </Section>

        {/* Footer */}
        <footer className="border-t border-obsidian-700/60 bg-obsidian-950 py-12 text-center font-mono text-xs text-paper-500">
          <Container size="xl">
            <p>SAMVAD PERCEPTION ADVISORY PRIVATE LIMITED — DESIGN SYSTEM v1.0</p>
            <p className="mt-1 text-paper-400">
              STRICTLY PROPRIETARY & CONFIDENTIAL // ALL RIGHTS RESERVED
            </p>
          </Container>
        </footer>
      </div>
    </TooltipProvider>
  );
}
