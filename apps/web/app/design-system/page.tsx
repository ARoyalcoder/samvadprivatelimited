"use client";

import * as React from "react";

import {
  colors,
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
  Container,
  Grid,
  GridCol,
  Section,
  SectionHeader,
  SectionDivider,
  Button,
  MagneticButton,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  GlassCard,
  DossierCard,
  MetricCard,
  Input,
  Textarea,
  Field,
  FieldLabel,
  FieldDescription,
  Navbar,
  NavItem,
  Breadcrumbs,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  ScrollProgress,
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
  ImageReveal,
  HoverImage,
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
  CustomCursor,
} from "@samvad/ui";

import {
  Mail,
  ArrowRight,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

export default function DesignSystemPage() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#f3f0e8] text-[#1d2529] selection:bg-[#a67c45]/20 selection:text-[#8d683d]">
        <ScrollProgress />
        <CustomCursor />

        {/* Global Showcase Navbar */}
        <Navbar
          brand={
            <div className="flex items-center gap-3">
              <span className="font-serif text-lg font-light tracking-wider text-[#1d2529]">
                SAMVAD
              </span>

              <span className="rounded-xs border border-[#a67c45]/30 bg-[#ebe7de] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                Design System
              </span>
            </div>
          }
          actions={
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <a href="/">← Portal</a>
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
              <Eyebrow index={1}>Brand Foundation</Eyebrow>

              <RevealText>
                <Display size="display-2xl">
                  Strategic Perception
                  <br />
                  <span className="font-light italic text-[#a67c45]">
                    Design System
                  </span>
                </Display>
              </RevealText>

              <Lead className="max-w-2xl text-[#626760]">
                A restrained visual language for institutional communications
                and advisory work.
              </Lead>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <MagneticButton strength={0.4} variant="gold" size="lg">
                  Explore Components
                </MagneticButton>

                <Button variant="luxury" size="lg">
                  Design Spec
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* Breadcrumbs */}
        <div className="border-y border-[#d8d1c5] bg-[#ebe7de] py-3">
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
                <BreadcrumbPage>Design System</BreadcrumbPage>
              </BreadcrumbItem>
            </Breadcrumbs>
          </Container>
        </div>

        {/* 1. COLOR TOKENS */}
        <Section id="tokens" padding="normal" tone="obsidian">
          <SectionHeader
            index="01"
            eyebrow="Visual System"
            title="Color Tokens"
            lead="Warm paper, structural tones, and restrained bronze accents."
          />

          <div className="space-y-12">
            {/* Structural Colors */}
            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-[#777970]">
                Structural Tones
              </h3>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7">
                {Object.entries(colors.obsidian).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex h-24 flex-col justify-between rounded-xs border border-[#d0c9bd] p-3"
                    style={{ backgroundColor: val }}
                  >
                    <span className="font-mono text-[10px] text-[#777970]">
                      obsidian-{key}
                    </span>

                    <span className="font-mono text-xs font-bold text-[#3f4847]">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Paper */}
            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-[#777970]">
                Paper & Typography
              </h3>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
                {Object.entries(colors.paper).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex h-24 flex-col justify-between rounded-xs border border-[#d0c9bd] p-3"
                    style={{ backgroundColor: val }}
                  >
                    <span className="font-mono text-[10px] font-semibold text-[#1d2529]">
                      paper-{key}
                    </span>

                    <span className="font-mono text-xs font-bold text-[#3f4847]">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Accents */}
            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-[#777970]">
                Strategic Accents
              </h3>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
                <div className="flex h-24 flex-col justify-between rounded-xs border border-[#a67c45]/40 bg-[#a67c45] p-3 text-[#f3f0e8]">
                  <span className="font-mono text-[10px] font-bold">
                    Bronze
                  </span>

                  <span className="font-mono text-xs font-bold">
                    #A67C45
                  </span>
                </div>

                <div className="flex h-24 flex-col justify-between rounded-xs border border-[#c9b995]/40 bg-[#c9b995] p-3 text-[#1d2529]">
                  <span className="font-mono text-[10px] font-bold">
                    Champagne
                  </span>

                  <span className="font-mono text-xs font-bold">
                    #C9B995
                  </span>
                </div>

                <div className="flex h-24 flex-col justify-between rounded-xs border border-[#66816d]/30 bg-[#66816d]/10 p-3 text-[#66816d]">
                  <span className="font-mono text-[10px] font-bold">
                    Positive
                  </span>

                  <span className="font-mono text-xs font-bold">
                    #66816D
                  </span>
                </div>

                <div className="flex h-24 flex-col justify-between rounded-xs border border-[#a67c45]/30 bg-[#a67c45]/10 p-3 text-[#a67c45]">
                  <span className="font-mono text-[10px] font-bold">
                    Alert
                  </span>

                  <span className="font-mono text-xs font-bold">
                    #A67C45
                  </span>
                </div>

                <div className="flex h-24 flex-col justify-between rounded-xs border border-[#9b5b52]/30 bg-[#9b5b52]/10 p-3 text-[#9b5b52]">
                  <span className="font-mono text-[10px] font-bold">
                    Crisis
                  </span>

                  <span className="font-mono text-xs font-bold">
                    #9B5B52
                  </span>
                </div>

                <div className="flex h-24 flex-col justify-between rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-3 text-[#626760]">
                  <span className="font-mono text-[10px] font-bold">
                    Neutral
                  </span>

                  <span className="font-mono text-xs font-bold">
                    #626760
                  </span>
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
            eyebrow="Typography"
            title="Type & Motion"
            lead="Serif display, sans body, mono metadata, and restrained motion."
          />

          <Grid cols={1} gap="lg" className="space-y-8">
            <div className="space-y-6 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#777970]">
                  Display Serif
                </span>

                <Heading size="display-lg">
                  Perception shapes outcomes.
                </Heading>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#777970]">
                  Section Heading
                </span>

                <SectionHeading
                  index="08"
                  eyebrow="Reputation Defense"
                  title="Crisis Intervention"
                  description="Containment strategy for asymmetric narrative risk."
                />
              </div>

              <div className="grid grid-cols-1 gap-6 border-t border-[#d8d1c5] pt-4 md:grid-cols-2">
                <div>
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-[#777970]">
                    Text Split
                  </span>

                  <AnimatedText
                    text="Protecting reputation across volatile markets."
                    className="font-serif text-lg text-[#3f4847]"
                    splitBy="words"
                  />
                </div>

                <div>
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-[#777970]">
                    Numeric Counter
                  </span>

                  <div className="flex items-baseline gap-2">
                    <AnimatedCounter
                      value={99.4}
                      decimals={1}
                      suffix="%"
                      className="font-serif text-4xl font-light text-[#a67c45]"
                    />

                    <span className="font-mono text-xs uppercase tracking-widest text-[#777970]">
                      Containment Index
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#d8d1c5] pt-4">
                <Grid cols={12} gap="sm">
                  <GridCol span={6}>
                    <MetricNumber
                      value="94.8"
                      label="Narrative Resonance"
                      change="+3.4%"
                      changeType="positive"
                    />
                  </GridCol>

                  <GridCol span={6}>
                    <MetricNumber
                      value="0.12"
                      label="Adverse Sentiment"
                      change="-18.2%"
                      changeType="positive"
                    />
                  </GridCol>
                </Grid>
              </div>

              <div className="border-t border-[#d8d1c5] pt-4">
                <Quote
                  author="Advisory Director"
                  role="Strategic Communications"
                >
                  In high-stakes environments, narrative is shaped before
                  headlines set.
                </Quote>
              </div>
            </div>
          </Grid>
        </Section>

        <SectionDivider />

        {/* 3. BUTTONS */}
        <Section id="buttons" padding="normal" tone="obsidian">
          <SectionHeader
            index="03"
            eyebrow="Interaction"
            title="Buttons & Magnetic Motion"
            lead="Action variants, loading states, and magnetic interaction."
          />

          <div className="space-y-8">
            <div className="space-y-4 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-[#777970]">
                Button Variants
              </span>

              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="gold">Strategic</Button>
                <Button variant="luxury">Executive</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Abort</Button>

                <Button variant="gold" isLoading>
                  Submitting
                </Button>
              </div>
            </div>

            <div className="space-y-4 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-[#777970]">
                Magnetic Buttons
              </span>

              <div className="flex flex-wrap items-center gap-6">
                <MagneticButton strength={0.4} variant="gold">
                  Magnetic Strategic
                </MagneticButton>

                <MagneticButton strength={0.3} variant="luxury">
                  Magnetic Executive
                </MagneticButton>

                <MagneticButton strength={0.25} variant="outline">
                  Magnetic Outline
                </MagneticButton>
              </div>
            </div>
          </div>
        </Section>

        <SectionDivider />

        {/* 4. CARDS */}
        <Section id="cards" padding="normal" tone="carbon">
          <SectionHeader
            index="04"
            eyebrow="Surfaces"
            title="Cards & Dossiers"
            lead="Cards, glass surfaces, and dossier layouts."
          />

          <Grid cols={3} gap="md">
            <Card variant="default">
              <CardHeader>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                  Standard
                </div>

                <CardTitle>Perception Intelligence</CardTitle>

                <CardDescription>
                  Continuous reputation monitoring.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Text variant="small">
                  Tracks narrative shifts across financial and regulatory
                  feeds.
                </Text>
              </CardContent>

              <CardFooter className="justify-between font-mono text-xs text-[#777970]">
                <span>Daily</span>
                <span className="text-[#a67c45]">Active →</span>
              </CardFooter>
            </Card>

            <GlassCard interactive glow>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                Glass Surface
              </div>

              <h3 className="mb-2 font-serif text-2xl font-normal text-[#1d2529]">
                Interactive Surface
              </h3>

              <p className="mb-6 font-sans text-sm font-light leading-relaxed text-[#626760]">
                Cursor-reactive surface with subtle light response.
              </p>

              <div className="flex items-center gap-2 font-mono text-xs text-[#a67c45]">
                <ShieldCheck className="h-4 w-4" />
                <span>Protected</span>
              </div>
            </GlassCard>

            <DossierCard
              index="04"
              classification="STRICTLY CONFIDENTIAL"
              category="Cross-Border M&A"
              title="Hostile Takeover Defense"
              excerpt="Strategic containment during a cross-border acquisition."
              date="SEPTEMBER 2026"
            />
          </Grid>

          <div className="mt-8">
            <Grid cols={4} gap="md">
              <MetricCard
                label="Global Reach"
                value="28+"
                change="+4"
                trend="up"
                description="Active jurisdictions"
              />

              <MetricCard
                label="Crisis Containment"
                value="99.2%"
                change="+0.8%"
                trend="up"
                description="Favorable outcomes"
              />

              <MetricCard
                label="Advisory Retainers"
                value="$4.8B"
                change="Sustained"
                trend="neutral"
                description="Assets safeguarded"
              />

              <MetricCard
                label="Narrative Mitigation"
                value="-84%"
                change="-84%"
                trend="down"
                description="Lower adverse velocity"
              />
            </Grid>
          </div>
        </Section>

        <SectionDivider />

        {/* 5. INPUTS */}
        <Section id="inputs" padding="normal" tone="obsidian">
          <SectionHeader
            index="05"
            eyebrow="Data Capture"
            title="Inputs & Forms"
            lead="Accessible fields with restrained borders and clear focus states."
          />

          <div className="mx-auto max-w-2xl space-y-6 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-8">
            <Field>
              <FieldLabel required>Contact Name</FieldLabel>

              <Input placeholder="Name" />

              <FieldDescription>
                Name for confidential engagement.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel required>Institutional Email</FieldLabel>

              <Input
                type="email"
                placeholder="c-suite@organization.com"
                startIcon={<Mail className="h-4 w-4" />}
              />
            </Field>

            <Field error="Please provide at least 20 characters.">
              <FieldLabel required>Mandate Brief</FieldLabel>

              <Textarea placeholder="Outline the mandate requiring counsel..." />
            </Field>

            <div className="pt-2">
              <Button variant="gold" size="lg" className="w-full">
                Submit Briefing
              </Button>
            </div>
          </div>
        </Section>

        <SectionDivider />

        {/* 6. OVERLAYS */}
        <Section id="overlays" padding="normal" tone="carbon">
          <SectionHeader
            index="06"
            eyebrow="Overlays"
            title="Modals, Drawers & Tooltips"
            lead="Accessible dialogs, drawers, and tooltips."
          />

          <div className="flex flex-wrap items-center justify-center gap-6 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-12">
            <Modal open={modalOpen} onOpenChange={setModalOpen}>
              <ModalTrigger asChild>
                <Button variant="luxury">Open Modal</Button>
              </ModalTrigger>

              <ModalContent size="md">
                <ModalHeader>
                  <ModalTitle>Confidential Engagement</ModalTitle>

                  <ModalDescription>
                    PROTOCOL // GLOBAL
                  </ModalDescription>
                </ModalHeader>

                <div className="space-y-4 py-4 text-sm font-light text-[#626760]">
                  <p>
                    Transmissions are encrypted and logged in the audit
                    registry.
                  </p>

                  <Field>
                    <FieldLabel>Clearance Code</FieldLabel>

                    <Input placeholder="Enter 6-digit PIN" />
                  </Field>
                </div>

                <ModalFooter>
                  <ModalClose asChild>
                    <Button variant="ghost">Abort</Button>
                  </ModalClose>

                  <Button
                    variant="gold"
                    onClick={() => setModalOpen(false)}
                  >
                    Confirm
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline">Open Drawer</Button>
              </DrawerTrigger>

              <DrawerContent side="right" size="md">
                <DrawerHeader>
                  <DrawerTitle>Intelligence Filters</DrawerTitle>

                  <DrawerDescription>
                    FILTER MATRIX
                  </DrawerDescription>
                </DrawerHeader>

                <div className="space-y-6 text-sm text-[#626760]">
                  <p>Select regions and sentiment thresholds.</p>

                  <div className="space-y-3">
                    <Badge variant="gold">Asia-Pacific</Badge>
                    <Badge variant="outline">North America</Badge>
                    <Badge variant="outline">European Union</Badge>
                  </div>
                </div>

                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>

                  <Button variant="gold">Apply</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="icon">
                  <SlidersHorizontal className="h-4 w-4 text-[#a67c45]" />
                </Button>
              </TooltipTrigger>

              <TooltipContent side="top">
                Configure Telemetry
              </TooltipContent>
            </Tooltip>
          </div>
        </Section>

        <SectionDivider />

        {/* 7. DATA DISPLAY */}
        <Section padding="normal" tone="obsidian">
          <SectionHeader
            index="07"
            eyebrow="Data Display"
            title="Badges, Tabs & Disclosures"
            lead="Status indicators, disclosures, and editorial tickers."
          />

          <div className="space-y-12">
            {/* Badges */}
            <div className="space-y-4 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-[#777970]">
                Status Badges
              </span>

              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>

                <Badge variant="gold" dot>
                  Strategic
                </Badge>

                <Badge variant="positive" dot>
                  Favorable
                </Badge>

                <Badge variant="neutral" dot>
                  Neutral
                </Badge>

                <Badge variant="alert" dot>
                  Divergence
                </Badge>

                <Badge variant="crisis" dot>
                  Hostile
                </Badge>
              </div>
            </div>

            {/* Tabs */}
            <div className="space-y-6 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-[#777970]">
                Tabs
              </span>

              <Tabs defaultValue="overview">
                <TabsList variant="underline">
                  <TabsTrigger value="overview">
                    Overview
                  </TabsTrigger>

                  <TabsTrigger value="intelligence">
                    Perception Feed
                  </TabsTrigger>

                  <TabsTrigger value="audit">
                    Audit
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <p className="max-w-2xl font-sans leading-relaxed text-[#626760]">
                    Overview of reputation, analyst sentiment, and shareholder
                    signals.
                  </p>
                </TabsContent>

                <TabsContent value="intelligence">
                  <p className="max-w-2xl font-sans leading-relaxed text-[#626760]">
                    Real-time narrative velocity and sentiment signals.
                  </p>
                </TabsContent>

                <TabsContent value="audit">
                  <p className="max-w-2xl font-sans leading-relaxed text-[#626760]">
                    Sealed logs of consultations, briefings, and mandate
                    changes.
                  </p>
                </TabsContent>
              </Tabs>
            </div>

            {/* Accordion */}
            <div className="space-y-4 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-[#777970]">
                FAQ Disclosures
              </span>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger index={1}>
                    How does SAMVAD manage narrative escalation?
                  </AccordionTrigger>

                  <AccordionContent>
                    We use coordinated briefings, stakeholder reassurance,
                    and search visibility controls.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger index={2}>
                    What distinguishes SAMVAD from conventional PR?
                  </AccordionTrigger>

                  <AccordionContent>
                    SAMVAD combines intelligence, strategic communications,
                    and discreet senior advisory.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger index={3}>
                    How are engagements kept confidential?
                  </AccordionTrigger>

                  <AccordionContent>
                    Access is restricted through role-based controls,
                    isolated data, and confidentiality covenants.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Marquee */}
            <div className="space-y-4">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-[#777970]">
                Editorial Marquee
              </span>

              <div className="border-y border-[#d0c9bd] bg-[#ebe7de] py-4">
                <Marquee speed="normal">
                  <span className="mx-6 font-serif text-lg text-[#626760]">
                    M&A Communications
                  </span>

                  <span className="font-mono text-xs text-[#a67c45]">
                    ◆
                  </span>

                  <span className="mx-6 font-serif text-lg text-[#626760]">
                    Crisis & Litigation
                  </span>

                  <span className="font-mono text-xs text-[#a67c45]">
                    ◆
                  </span>

                  <span className="mx-6 font-serif text-lg text-[#626760]">
                    Geopolitical Intelligence
                  </span>

                  <span className="font-mono text-xs text-[#a67c45]">
                    ◆
                  </span>

                  <span className="mx-6 font-serif text-lg text-[#626760]">
                    Executive Reputation
                  </span>

                  <span className="font-mono text-xs text-[#a67c45]">
                    ◆
                  </span>
                </Marquee>
              </div>
            </div>
          </div>
        </Section>

        <SectionDivider />

        {/* 8. MEDIA */}
        <Section padding="normal" tone="carbon">
          <SectionHeader
            index="08"
            eyebrow="Media"
            title="Image Reveals & Hover Preview"
            lead="Image reveals and cursor-reactive previews."
          />

          <Grid cols={2} gap="lg">
            <div>
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-[#777970]">
                Image Reveal
              </span>

              <ImageReveal
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                alt="Architectural monolithic headquarters"
                aspectRatio="landscape"
                direction="up"
              />
            </div>

            <div className="flex flex-col justify-center space-y-6">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-[#777970]">
                Hover Preview
              </span>

              <div className="space-y-4">
                <HoverImage
                  imageSrc="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
                  imageAlt="Boardroom Advisory"
                >
                  <div className="flex items-center justify-between border-b border-[#d8d1c5] pb-3 font-serif text-xl text-[#1d2529] transition-colors hover:text-[#8d683d] sm:text-2xl">
                    <span>01 / Executive Counsel</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </HoverImage>

                <HoverImage
                  imageSrc="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
                  imageAlt="Global Geopolitical Data"
                >
                  <div className="flex items-center justify-between border-b border-[#d8d1c5] pb-3 font-serif text-xl text-[#1d2529] transition-colors hover:text-[#8d683d] sm:text-2xl">
                    <span>02 / Geopolitical Intelligence</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </HoverImage>

                <HoverImage
                  imageSrc="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
                  imageAlt="Crisis Communications War Room"
                >
                  <div className="flex items-center justify-between border-b border-[#d8d1c5] pb-3 font-serif text-xl text-[#1d2529] transition-colors hover:text-[#8d683d] sm:text-2xl">
                    <span>03 / Crisis Response</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </HoverImage>
              </div>
            </div>
          </Grid>
        </Section>

        <SectionDivider />

        {/* 9. FEEDBACK */}
        <Section id="feedback" padding="normal" tone="obsidian">
          <SectionHeader
            index="09"
            eyebrow="Feedback"
            title="Loading, Empty & Error States"
            lead="Clear states for loading, empty, and error conditions."
          />

          <Grid cols={3} gap="lg">
            {/* Loaders */}
            <div className="space-y-6 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-[#777970]">
                Loaders
              </span>

              <div className="flex items-center justify-center gap-6 py-4">
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
              </div>

              <ShimmerBar />

              <OrbitLoader label="Synthesizing..." />
            </div>

            {/* Skeletons */}
            <div className="space-y-4 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-[#777970]">
                Skeletons
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
            <div className="space-y-4 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-[#777970]">
                Error & Empty
              </span>

              <ErrorCard
                title="Telemetry Timeout"
                message="Perception gateway did not respond within 3000ms."
              />

              <EmptyState
                code="NO_DOSSIERS_FOUND"
                title="No Dossiers"
                description="Adjust filters to find records."
                action={
                  <Button variant="outline" size="sm">
                    Reset Filters
                  </Button>
                }
              />
            </div>
          </Grid>

          <div className="mt-8">
            <ErrorState
              code="ERR_CIRCUIT_BREAKER_TRIGGERED"
              title="Automated Isolation"
              message="Anomalous query activity detected. Rate limiting engaged."
              onRetry={() => alert("Diagnostic retry initiated")}
              retryText="Retry Session"
            />
          </div>
        </Section>

        {/* Footer */}
        <footer className="border-t border-[#d8d1c5] bg-[#ebe7de] py-12 text-center font-mono text-xs text-[#aaa398]">
          <Container size="xl">
            <p>SAMVAD PERCEPTION ADVISORY — DESIGN SYSTEM</p>

            <p className="mt-1 text-[#777970]">
              PROPRIETARY &amp; CONFIDENTIAL
            </p>
          </Container>
        </footer>
      </div>
    </TooltipProvider>
  );
}