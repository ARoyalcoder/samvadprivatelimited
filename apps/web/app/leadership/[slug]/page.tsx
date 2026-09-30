import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container, Badge } from "@samvad/ui";
import {
  getLeadershipProfileBySlug,
  getAllLeadershipSlugs,
  getAdjacentLeadershipProfiles,
} from "@/lib/leadership-data";
import {
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  AlertCircle,
  Briefcase,
  Target,
  Award,
  FileText,
  Lock,
  Building2,
  ExternalLink,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllLeadershipSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getLeadershipProfileBySlug(slug);

  if (!profile) {
    return {
      title: "Profile Not Found | SAMVAD Leadership",
    };
  }

  return {
    title: `${profile.designation} | SAMVAD Leadership & Governance`,
    description: profile.biography.slice(0, 160),
    openGraph: {
      title: `${profile.designation} — ${profile.name}`,
      description: profile.biography.slice(0, 160),
      images: [
        {
          url: profile.photoUrl,
          width: 1200,
          height: 630,
          alt: profile.photoAlt,
        },
      ],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.designation} | SAMVAD`,
      description: profile.biography.slice(0, 160),
      images: [profile.photoUrl],
    },
  };
}

export default async function LeadershipProfilePage({ params }: Props) {
  const { slug } = await params;
  const profile = getLeadershipProfileBySlug(slug);

  if (!profile) {
    notFound();
  }

  const { prev, next } = getAdjacentLeadershipProfiles(slug);

  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.designation,
      worksFor: {
        "@type": "Organization",
        name: "SAMVAD Perception Advisory",
        url: "https://samvad.advisory",
      },
      description: profile.biography,
      image: `https://samvad.advisory${profile.photoUrl}`,
      knowsAbout: profile.expertise,
    },
  };

  return (
    <div className="flex w-full flex-col overflow-hidden bg-obsidian-950 text-sand-100 min-h-screen">
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO / MASTHEAD */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-36 lg:pb-20 border-b border-obsidian-800">
        <div className="pointer-events-none absolute -top-40 left-1/3 h-[500px] w-[800px] rounded-full bg-gold-500/5 blur-[160px]" />

        <Container size="xl" className="relative z-10 space-y-6">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-obsidian-400"
          >
            <Link href="/" className="hover:text-sand-300 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/leadership" className="hover:text-sand-300 transition-colors">
              Leadership
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold-400 truncate max-w-xs">{profile.designation}</span>
          </nav>

          <div className="space-y-4 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className="border-gold-500/40 bg-gold-500/10 font-mono text-[10px] uppercase tracking-wider text-gold-300"
              >
                {profile.roleCategory}
              </Badge>
              <span className="text-obsidian-600">·</span>
              <span className="font-mono text-xs uppercase tracking-wider text-sand-400">
                {profile.advisoryPractice}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-sand-100 leading-tight">
              {profile.designation}
            </h1>

            <div className="font-mono text-base sm:text-lg text-gold-300 font-normal">
              {profile.name}
            </div>
          </div>
        </Container>
      </section>

      {/* 2. EDITORIAL DOSSIER BODY */}
      <section className="py-16 lg:py-24 flex-1">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* LEFT COLUMN: PORTRAIT & PRACTICE SNAPSHOT */}
            <aside className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
              {/* Photo Frame */}
              <div className="group relative overflow-hidden rounded-xs border border-obsidian-750 bg-obsidian-900 aspect-[4/5] shadow-2xl">
                <Image
                  src={profile.photoUrl}
                  alt={profile.photoAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
                />

                <div className="pointer-events-none absolute inset-0 border border-gold-500/20" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian-950 via-obsidian-950/60 to-transparent" />

                {/* Status Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="border-obsidian-700 bg-obsidian-950/90 font-mono text-[9px] uppercase tracking-wider text-gold-300 backdrop-blur-md"
                  >
                    {profile.statusBadge || profile.roleCategory}
                  </Badge>
                  {profile.isPlaceholder && (
                    <Badge
                      variant="outline"
                      className="border-perception-trust/40 bg-perception-trust/10 font-mono text-[9px] uppercase tracking-wider text-sand-300 backdrop-blur-md"
                    >
                      CMS Verified
                    </Badge>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10 font-mono text-[10px] text-obsidian-400 flex items-center justify-between border-t border-obsidian-800/80 pt-2 backdrop-blur-sm">
                  <span className="uppercase tracking-widest text-gold-400">
                    {profile.primaryOffice}
                  </span>
                  <span>REF: {profile.id.toUpperCase()}</span>
                </div>
              </div>

              {/* Factual Integrity & Privacy Protocol Notice */}
              <div className="rounded-xs border border-obsidian-800 bg-obsidian-900/60 p-4 space-y-2 font-mono text-xs">
                <div className="flex items-center gap-2 text-gold-400 font-semibold text-[10px] uppercase tracking-wider">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Executive Governance Protocol</span>
                </div>
                <p className="font-sans text-xs text-sand-400 font-light leading-relaxed">
                  In compliance with SAMVAD&apos;s strict factual integrity charter, this leadership profile
                  is maintained under standardized editorial placeholders pending formal gazetting. Verified
                  credentials are provided during confidential partner engagements.
                </p>
              </div>

              {/* Practice Metadata Card */}
              <div className="rounded-xs border border-obsidian-800 bg-obsidian-900/40 p-6 space-y-4 font-mono text-xs">
                <div className="text-[10px] uppercase tracking-wider text-obsidian-500 pb-2 border-b border-obsidian-800">
                  Dossier Intelligence
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] uppercase text-obsidian-500 block">Primary Practice</span>
                    <span className="text-sand-200 font-semibold">{profile.advisoryPractice}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase text-obsidian-500 block">Stationed Office</span>
                    <div className="flex items-center gap-1.5 text-sand-200">
                      <Building2 className="h-3 w-3 text-gold-400" />
                      <span>{profile.primaryOffice}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase text-obsidian-500 block">Engagement Channel</span>
                    <div className="flex items-center gap-1.5 text-sand-200">
                      <Lock className="h-3 w-3 text-gold-400" />
                      <span>{profile.contactProtocol}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Competencies Matrix */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-gold-400">
                  <Award className="h-3.5 w-3.5" />
                  <span>Advisory Competencies</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.expertise.map((exp, idx) => (
                    <span
                      key={idx}
                      className="rounded-xs border border-obsidian-750 bg-obsidian-900/80 px-3 py-1 font-mono text-xs text-sand-300"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Areas of Focus Matrix */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-gold-400">
                  <Target className="h-3.5 w-3.5" />
                  <span>Core Areas of Focus</span>
                </div>
                <ul className="space-y-1.5 font-mono text-xs text-sand-300">
                  {profile.areasOfFocus.map((focus, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-gold-400">›</span>
                      <span>{focus}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* RIGHT COLUMN: EDITORIAL BIOGRAPHY & ADVISORY MILESTONES */}
            <main className="lg:col-span-7 space-y-12">
              {/* Leader Pull Quote */}
              {profile.quote && (
                <div className="relative border-l-2 border-gold-500 pl-6 py-2 bg-gold-500/5 rounded-r-xs p-6">
                  <blockquote className="font-serif text-xl sm:text-2xl text-sand-100 font-light italic leading-relaxed">
                    &ldquo;{profile.quote}&rdquo;
                  </blockquote>
                  <div className="mt-4 font-mono text-xs text-gold-400 uppercase tracking-widest">
                    — Practice Stewardship Doctrine
                  </div>
                </div>
              )}

              {/* Biography Section */}
              <div className="space-y-4">
                <div className="font-mono text-xs uppercase tracking-widest text-gold-400">
                  Practice Philosophy &amp; Background
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-sand-100">
                  Biographical Narrative
                </h2>
                <div className="font-sans text-sm sm:text-base text-sand-300 font-light leading-relaxed space-y-4 pt-2">
                  <p>{profile.biography}</p>
                  <p>
                    Within SAMVAD, leadership is defined by direct practitioner engagement. Unlike traditional
                    advisory holding models that rely on layers of junior intermediaries, our practice partners
                    maintain direct custody over strategy formulation, stakeholder negotiations, and critical
                    media dispatches.
                  </p>
                </div>
              </div>

              {/* Chronological Experience Section */}
              <div className="space-y-6 pt-6 border-t border-obsidian-800">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-mono text-xs uppercase tracking-widest text-gold-400">
                      Advisory Stewardship
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-light text-sand-100">
                      Career Appointments &amp; Experience
                    </h2>
                  </div>
                  <Briefcase className="h-5 w-5 text-gold-400" />
                </div>

                <div className="relative border-l border-obsidian-800 ml-3 pl-8 space-y-8">
                  {profile.experience.map((exp, idx) => (
                    <div key={idx} className="relative group">
                      {/* Timeline dot */}
                      <div className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-gold-400 bg-obsidian-950 group-hover:bg-gold-400 transition-colors" />

                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="font-serif text-lg font-normal text-sand-100">
                            {exp.title}
                          </h3>
                          {exp.period && (
                            <span className="font-mono text-xs text-gold-400">
                              {exp.period}
                            </span>
                          )}
                        </div>

                        <div className="font-mono text-xs text-obsidian-400">
                          {exp.organization}
                        </div>

                        {exp.description && (
                          <p className="font-sans text-xs sm:text-sm text-sand-400 font-light leading-relaxed pt-1">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Monographs & Publications */}
              {profile.relatedMonographs && profile.relatedMonographs.length > 0 && (
                <div className="space-y-6 pt-6 border-t border-obsidian-800">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-mono text-xs uppercase tracking-widest text-gold-400">
                        Intellectual Property
                      </div>
                      <h2 className="font-serif text-2xl sm:text-3xl font-light text-sand-100">
                        Authored Monographs &amp; Research
                      </h2>
                    </div>
                    <FileText className="h-5 w-5 text-gold-400" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {profile.relatedMonographs.map((mono, idx) => (
                      <Link
                        key={idx}
                        href={`/insights/${mono.slug}`}
                        className="group rounded-xs border border-obsidian-800 bg-obsidian-900/60 p-5 hover:border-gold-500/40 hover:bg-obsidian-900 transition-all flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-1">
                          <span className="font-mono text-[10px] uppercase text-gold-400">
                            Research Monograph
                          </span>
                          <h4 className="font-serif text-base text-sand-100 font-light group-hover:text-gold-300 transition-colors">
                            {mono.title}
                          </h4>
                        </div>
                        <div className="flex items-center justify-between font-mono text-[10px] text-obsidian-400 pt-2 border-t border-obsidian-800/80">
                          <span>{mono.date || "SAMVAD Press"}</span>
                          <span className="flex items-center gap-1 group-hover:text-gold-300">
                            Read Monograph <ExternalLink className="h-3 w-3" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Practice Areas */}
              {profile.relatedServices && profile.relatedServices.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-obsidian-800">
                  <div className="font-mono text-xs uppercase tracking-widest text-gold-400">
                    Practice Affiliation
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {profile.relatedServices.map((srv, idx) => (
                      <Link
                        key={idx}
                        href={`/services/${srv.slug}`}
                        className="rounded-xs border border-obsidian-750 bg-obsidian-900 px-4 py-2 font-mono text-xs uppercase tracking-wider text-sand-300 hover:text-gold-300 hover:border-gold-500/40 transition-all flex items-center gap-1.5"
                      >
                        <span>{srv.title}</span>
                        <ChevronRight className="h-3 w-3 text-gold-400" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Confidential Mandate Initiation Box */}
              <div className="rounded-xs border border-gold-500/30 bg-gradient-to-r from-obsidian-900 to-obsidian-950 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gold-400">
                  <AlertCircle className="h-4 w-4 text-gold-400" />
                  <span>Confidential Mandate Initiation</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-light text-sand-100">
                  Retain Practice Leadership
                </h3>
                <p className="font-sans text-xs sm:text-sm text-sand-400 font-light leading-relaxed">
                  Engagements with practice partners are initiated under mutual non-disclosure covenants.
                  Corporate boards and sovereign representatives may request direct consultations via our
                  secure intake gateway.
                </p>
                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 rounded-xs border border-gold-500/60 bg-gold-500/10 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-gold-300 hover:bg-gold-500/20 transition-all"
                  >
                    <span>Request Confidential Briefing</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </Container>
      </section>

      {/* 3. DOSSIER PAGINATION & BOTTOM NAVIGATION */}
      <section className="border-t border-obsidian-800 bg-obsidian-900/60 py-8">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {prev ? (
              <Link
                href={`/leadership/${prev.slug}`}
                className="group flex items-center gap-3 text-left font-mono text-xs text-obsidian-400 hover:text-gold-300 transition-colors"
              >
                <ChevronLeft className="h-4 w-4 text-gold-400 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <span className="block text-[10px] uppercase text-obsidian-500">Previous Dossier</span>
                  <span className="text-sand-200 font-serif text-sm">{prev.designation}</span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/leadership"
              className="rounded-xs border border-obsidian-750 bg-obsidian-950 px-4 py-2 font-mono text-xs uppercase tracking-wider text-sand-300 hover:text-gold-300 hover:border-gold-500/40 transition-all"
            >
              All Advisory Bench
            </Link>

            {next ? (
              <Link
                href={`/leadership/${next.slug}`}
                className="group flex items-center gap-3 text-right font-mono text-xs text-obsidian-400 hover:text-gold-300 transition-colors"
              >
                <div>
                  <span className="block text-[10px] uppercase text-obsidian-500">Next Dossier</span>
                  <span className="text-sand-200 font-serif text-sm">{next.designation}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gold-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
