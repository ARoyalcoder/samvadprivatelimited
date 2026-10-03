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

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
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
    <div className="flex min-h-screen w-full flex-col overflow-hidden bg-[#f3f0e8] text-[#1d2529]">
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO / MASTHEAD */}
      <section className="relative overflow-hidden border-b border-[#d8d1c5] pb-16 pt-32 lg:pb-20 lg:pt-36">
        <div className="pointer-events-none absolute -top-40 left-1/3 h-[500px] w-[800px] rounded-full bg-[#a67c45]/5 blur-[160px]" />

        <Container size="xl" className="relative z-10 space-y-6">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-[#777970]"
          >
            <Link
              href="/"
              className="transition-colors hover:text-[#3f4847]"
            >
              Home
            </Link>

            <ChevronRight className="h-3 w-3" />

            <Link
              href="/leadership"
              className="transition-colors hover:text-[#3f4847]"
            >
              Leadership
            </Link>

            <ChevronRight className="h-3 w-3" />

            <span className="max-w-xs truncate text-[#a67c45]">
              {profile.designation}
            </span>
          </nav>

          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className="border-[#a67c45]/40 bg-[#ebe7de] font-mono text-[10px] uppercase tracking-wider text-[#8d683d]"
              >
                {profile.roleCategory}
              </Badge>

              <span className="text-[#c5beb2]">·</span>

              <span className="font-mono text-xs uppercase tracking-wider text-[#777970]">
                {profile.advisoryPractice}
              </span>
            </div>

            <h1 className="font-serif text-3xl font-light leading-tight tracking-tight text-[#1d2529] sm:text-4xl lg:text-5xl">
              {profile.designation}
            </h1>

            <div className="font-mono text-base font-normal text-[#a67c45] sm:text-lg">
              {profile.name}
            </div>
          </div>
        </Container>
      </section>

      {/* 2. EDITORIAL DOSSIER BODY */}
      <section className="flex-1 bg-[#f3f0e8] py-16 lg:py-24">
        <Container size="xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            {/* LEFT COLUMN: PORTRAIT & PRACTICE SNAPSHOT */}
            <aside className="space-y-8 lg:sticky lg:top-28 lg:col-span-5">
              {/* Photo Frame */}
              <div className="group relative aspect-[4/5] overflow-hidden rounded-xs border border-[#d0c9bd] bg-[#ebe7de] shadow-sm">
                <Image
                  src={profile.photoUrl}
                  alt={profile.photoAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover contrast-110 grayscale transition-all duration-700 group-hover:grayscale-0"
                />

                <div className="pointer-events-none absolute inset-0 border border-[#a67c45]/20" />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1d2529]/80 via-[#1d2529]/30 to-transparent" />

                {/* Status Badges */}
                <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="border-[#c9c2b6] bg-[#f3f0e8]/90 font-mono text-[9px] uppercase tracking-wider text-[#8d683d] backdrop-blur-md"
                  >
                    {profile.statusBadge || profile.roleCategory}
                  </Badge>

                  {profile.isPlaceholder && (
                    <Badge
                      variant="outline"
                      className="border-[#66816d]/40 bg-[#66816d]/10 font-mono text-[9px] uppercase tracking-wider text-[#66816d] backdrop-blur-md"
                    >
                      CMS Verified
                    </Badge>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between border-t border-[#f3f0e8]/20 pt-2 font-mono text-[10px] text-[#e5dfd4]">
                  <span className="uppercase tracking-widest text-[#d4b98d]">
                    {profile.primaryOffice}
                  </span>

                  <span>REF: {profile.id.toUpperCase()}</span>
                </div>
              </div>

              {/* Factual Integrity & Privacy Protocol Notice */}
              <div className="space-y-2 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-4 font-mono text-xs">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-[#a67c45]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Governance Protocol</span>
                </div>

                <p className="font-sans text-xs font-light leading-relaxed text-[#626760]">
                  Profiles use standardized placeholders until formal
                  clearance. Credentials are verified during confidential
                  engagements.
                </p>
              </div>

              {/* Practice Metadata Card */}
              <div className="space-y-4 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6 font-mono text-xs">
                <div className="border-b border-[#d8d1c5] pb-2 text-[10px] uppercase tracking-wider text-[#aaa398]">
                  Dossier Intelligence
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="block text-[10px] uppercase text-[#aaa398]">
                      Practice
                    </span>

                    <span className="font-semibold text-[#3f4847]">
                      {profile.advisoryPractice}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase text-[#aaa398]">
                      Office
                    </span>

                    <div className="flex items-center gap-1.5 text-[#3f4847]">
                      <Building2 className="h-3 w-3 text-[#a67c45]" />
                      <span>{profile.primaryOffice}</span>
                    </div>
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase text-[#aaa398]">
                      Channel
                    </span>

                    <div className="flex items-center gap-1.5 text-[#3f4847]">
                      <Lock className="h-3 w-3 text-[#a67c45]" />
                      <span>{profile.contactProtocol}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Competencies Matrix */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#a67c45]">
                  <Award className="h-3.5 w-3.5" />
                  <span>Competencies</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {profile.expertise.map((exp, idx) => (
                    <span
                      key={idx}
                      className="rounded-xs border border-[#d0c9bd] bg-[#ebe7de] px-3 py-1 font-mono text-xs text-[#626760]"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Areas of Focus Matrix */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#a67c45]">
                  <Target className="h-3.5 w-3.5" />
                  <span>Areas of Focus</span>
                </div>

                <ul className="space-y-1.5 font-mono text-xs text-[#626760]">
                  {profile.areasOfFocus.map((focus, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-[#a67c45]">›</span>
                      <span>{focus}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* RIGHT COLUMN: EDITORIAL BIOGRAPHY & ADVISORY MILESTONES */}
            <main className="space-y-12 lg:col-span-7">
              {/* Leader Pull Quote */}
              {profile.quote && (
                <div className="relative rounded-r-xs border-l-2 border-[#a67c45] bg-[#ebe7de] p-6">
                  <blockquote className="font-serif text-xl font-light italic leading-relaxed text-[#3f4847] sm:text-2xl">
                    &ldquo;{profile.quote}&rdquo;
                  </blockquote>

                  <div className="mt-4 font-mono text-xs uppercase tracking-widest text-[#a67c45]">
                    — Practice Doctrine
                  </div>
                </div>
              )}

              {/* Biography Section */}
              <div className="space-y-4">
                <div className="font-mono text-xs uppercase tracking-widest text-[#a67c45]">
                  Background
                </div>

                <h2 className="font-serif text-2xl font-light text-[#1d2529] sm:text-3xl">
                  Biography
                </h2>

                <div className="space-y-4 pt-2 font-sans text-sm font-light leading-relaxed text-[#626760] sm:text-base">
                  <p>{profile.biography}</p>

                  <p>
                    SAMVAD partners maintain direct custody of strategy,
                    stakeholder engagement, and critical communications.
                  </p>
                </div>
              </div>

              {/* Chronological Experience Section */}
              <div className="space-y-6 border-t border-[#d8d1c5] pt-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-mono text-xs uppercase tracking-widest text-[#a67c45]">
                      Experience
                    </div>

                    <h2 className="font-serif text-2xl font-light text-[#1d2529] sm:text-3xl">
                      Career Appointments
                    </h2>
                  </div>

                  <Briefcase className="h-5 w-5 text-[#a67c45]" />
                </div>

                <div className="relative ml-3 space-y-8 border-l border-[#d8d1c5] pl-8">
                  {profile.experience.map((exp, idx) => (
                    <div key={idx} className="group relative">
                      <div className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-[#a67c45] bg-[#f3f0e8] transition-colors group-hover:bg-[#a67c45]" />

                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="font-serif text-lg font-normal text-[#1d2529]">
                            {exp.title}
                          </h3>

                          {exp.period && (
                            <span className="font-mono text-xs text-[#a67c45]">
                              {exp.period}
                            </span>
                          )}
                        </div>

                        <div className="font-mono text-xs text-[#777970]">
                          {exp.organization}
                        </div>

                        {exp.description && (
                          <p className="pt-1 font-sans text-xs font-light leading-relaxed text-[#626760] sm:text-sm">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Monographs & Publications */}
              {profile.relatedMonographs &&
                profile.relatedMonographs.length > 0 && (
                  <div className="space-y-6 border-t border-[#d8d1c5] pt-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-mono text-xs uppercase tracking-widest text-[#a67c45]">
                          Research
                        </div>

                        <h2 className="font-serif text-2xl font-light text-[#1d2529] sm:text-3xl">
                          Monographs &amp; Research
                        </h2>
                      </div>

                      <FileText className="h-5 w-5 text-[#a67c45]" />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {profile.relatedMonographs.map((mono, idx) => (
                        <Link
                          key={idx}
                          href={`/insights/${mono.slug}`}
                          className="group flex flex-col justify-between space-y-3 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-5 transition-all hover:border-[#a67c45]/40 hover:bg-[#e5dfd4]"
                        >
                          <div className="space-y-1">
                            <span className="font-mono text-[10px] uppercase text-[#a67c45]">
                              Research
                            </span>

                            <h4 className="font-serif text-base font-light text-[#1d2529] transition-colors group-hover:text-[#8d683d]">
                              {mono.title}
                            </h4>
                          </div>

                          <div className="flex items-center justify-between border-t border-[#d8d1c5] pt-2 font-mono text-[10px] text-[#777970]">
                            <span>{mono.date || "SAMVAD Press"}</span>

                            <span className="flex items-center gap-1 group-hover:text-[#8d683d]">
                              Read
                              <ExternalLink className="h-3 w-3" />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              {/* Related Practice Areas */}
              {profile.relatedServices &&
                profile.relatedServices.length > 0 && (
                  <div className="space-y-4 border-t border-[#d8d1c5] pt-6">
                    <div className="font-mono text-xs uppercase tracking-widest text-[#a67c45]">
                      Practice Areas
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {profile.relatedServices.map((srv, idx) => (
                        <Link
                          key={idx}
                          href={`/services/${srv.slug}`}
                          className="flex items-center gap-1.5 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] px-4 py-2 font-mono text-xs uppercase tracking-wider text-[#626760] transition-all hover:border-[#a67c45]/40 hover:text-[#8d683d]"
                        >
                          <span>{srv.title}</span>
                          <ChevronRight className="h-3 w-3 text-[#a67c45]" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              {/* Confidential Mandate Initiation Box */}
              <div className="space-y-4 rounded-xs border border-[#d0c9bd] bg-[#ebe7de] p-6 sm:p-8">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#a67c45]">
                  <AlertCircle className="h-4 w-4 text-[#a67c45]" />
                  <span>Confidential Inquiry</span>
                </div>

                <h3 className="font-serif text-xl font-light text-[#1d2529] sm:text-2xl">
                  Retain Practice Leadership
                </h3>

                <p className="font-sans text-xs font-light leading-relaxed text-[#626760] sm:text-sm">
                  Request direct consultation under mutual NDA.
                </p>

                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 rounded-xs border border-[#a67c45]/50 bg-[#a67c45]/10 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#8d683d] transition-all hover:border-[#a67c45] hover:bg-[#a67c45]/15"
                  >
                    <span>Request Briefing</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </Container>
      </section>

      {/* 3. DOSSIER PAGINATION & BOTTOM NAVIGATION */}
      <section className="border-t border-[#d8d1c5] bg-[#ebe7de] py-8">
        <Container size="xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            {prev ? (
              <Link
                href={`/leadership/${prev.slug}`}
                className="group flex items-center gap-3 text-left font-mono text-xs text-[#777970] transition-colors hover:text-[#8d683d]"
              >
                <ChevronLeft className="h-4 w-4 text-[#a67c45] transition-transform group-hover:-translate-x-1" />

                <div>
                  <span className="block text-[10px] uppercase text-[#aaa398]">
                    Previous
                  </span>

                  <span className="font-serif text-sm text-[#3f4847]">
                    {prev.designation}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/leadership"
              className="rounded-xs border border-[#d0c9bd] bg-[#f3f0e8] px-4 py-2 font-mono text-xs uppercase tracking-wider text-[#626760] transition-all hover:border-[#a67c45]/40 hover:text-[#8d683d]"
            >
              All Advisors
            </Link>

            {next ? (
              <Link
                href={`/leadership/${next.slug}`}
                className="group flex items-center gap-3 text-right font-mono text-xs text-[#777970] transition-colors hover:text-[#8d683d]"
              >
                <div>
                  <span className="block text-[10px] uppercase text-[#aaa398]">
                    Next
                  </span>

                  <span className="font-serif text-sm text-[#3f4847]">
                    {next.designation}
                  </span>
                </div>

                <ChevronRight className="h-4 w-4 text-[#a67c45] transition-transform group-hover:translate-x-1" />
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