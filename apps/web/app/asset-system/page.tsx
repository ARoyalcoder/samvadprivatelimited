"use client";

import * as React from "react";
import Link from "next/link";

import {
  Container,
  Heading,
  Text,
  Badge,
  Button,
  Card,
  SamvadImage,
  getAllImageAssets,
  getAllImageCategories,
  registerImageOverride,
  BrandMark,
} from "@samvad/ui";

import {
  Check,
  Copy,
  Filter,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Camera,
} from "lucide-react";

export default function AssetSystemPage() {
  const allCategories = React.useMemo(
    () => getAllImageCategories(),
    [],
  );

  const [simulatorSlot, setSimulatorSlot] =
    React.useState<string>("corp-comm-press-podium");

  const [customUrl, setCustomUrl] = React.useState<string>("");

  const [swapApplied, setSwapApplied] =
    React.useState<boolean>(false);

  const [refreshKey, setRefreshKey] =
    React.useState<number>(0);

  const [selectedCategory, setSelectedCategory] =
    React.useState<string>("all");

  const [searchQuery, setSearchQuery] =
    React.useState<string>("");

  const [copiedKey, setCopiedKey] =
    React.useState<string | null>(null);

  const masterAssets = React.useMemo(
    () => getAllImageAssets(),
    [refreshKey],
  );

  const filteredAssets = React.useMemo(() => {
    return masterAssets.filter((asset) => {
      const matchesCategory =
        selectedCategory === "all" ||
        asset.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !q ||
        asset.title.toLowerCase().includes(q) ||
        asset.replacementKey.toLowerCase().includes(q) ||
        asset.category.toLowerCase().includes(q) ||
        asset.tags.some((t) =>
          t.toLowerCase().includes(q),
        ) ||
        asset.alt.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [masterAssets, selectedCategory, searchQuery]);

  const handleCopyKey = (key: string) => {
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard
    ) {
      navigator.clipboard.writeText(key);
      setCopiedKey(key);

      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const handleApplySwap = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customUrl.trim()) return;

    registerImageOverride(simulatorSlot, {
      src: customUrl.trim(),
      isAiGenerated: false,
      realPhotoSlot: {
        recommendedDimensions: "User Provided",
        artDirection:
          "Custom Real Photo Asset Swapped via Simulator",
        recommendedAspect: "16:9",
        status: "real-asset-ready",
      },
    });

    setSwapApplied(true);
    setRefreshKey((prev) => prev + 1);
  };

  const handleResetSwap = () => {
    registerImageOverride(simulatorSlot, {
      src: masterAssets.find(
        (a) => a.id === simulatorSlot,
      )?.src,
      isAiGenerated: true,
    });

    setCustomUrl("");
    setSwapApplied(false);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-[#1d2529] selection:bg-[#a67c45]/20 selection:text-[#8d683d]">
      {/* Background Ambience */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(166,124,69,0.05),transparent_50%)]" />

      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-[#d8d1c5]/80 bg-[#f3f0e8]/90 backdrop-blur-md">
        <Container
          size="xl"
          className="flex h-16 items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group flex items-center gap-2"
            >
              <BrandMark
                size="sm"
                tone="gold"
                className="transition-transform group-hover:scale-105"
              />

              <span className="font-serif text-sm font-semibold tracking-wider text-[#1d2529]">
                SAMVAD
              </span>
            </Link>

            <span className="text-[#c5beb2]">/</span>

            <span className="font-mono text-xs uppercase tracking-widest text-[#a67c45]">
              Asset Registry
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/brand-identity">
              <Button
                variant="ghost"
                size="sm"
                className="font-mono text-xs text-[#626760]"
              >
                Brand Identity
              </Button>
            </Link>

            <Link href="/design-system">
              <Button
                variant="ghost"
                size="sm"
                className="font-mono text-xs text-[#626760]"
              >
                Design System
              </Button>
            </Link>

            <Link href="#simulator">
              <Button
                variant="outline"
                size="sm"
                className="border-[#a67c45]/30 text-[#8d683d] hover:bg-[#a67c45]/10"
              >
                <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                Swap
              </Button>
            </Link>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <section className="relative border-b border-[#d8d1c5] py-16 lg:py-24">
        <Container size="xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-[#a67c45]/30 font-mono text-[11px] text-[#a67c45]"
                >
                  <Sparkles className="mr-1.5 h-3 w-3" />
                  Asset System
                </Badge>

                <Badge
                  variant="outline"
                  className="border-[#d0c9bd] font-mono text-[11px] text-[#626760]"
                >
                  14 Categories
                </Badge>

                <Badge
                  variant="outline"
                  className="border-[#66816d]/30 font-mono text-[11px] text-[#66816d]"
                >
                  <ShieldCheck className="mr-1.5 h-3 w-3" />
                  Brand Safe
                </Badge>
              </div>

              <Heading
                level={1}
                size="display-xl"
                className="font-serif font-light tracking-tight text-[#1d2529]"
              >
                Architectural &amp; Editorial
                <br />
                <span className="font-normal italic text-[#a67c45]">
                  Visual Asset System
                </span>
              </Heading>

              <Text
                variant="lead"
                className="mt-4 max-w-2xl font-serif leading-relaxed text-[#626760]"
              >
                A modular image registry built for editorial,
                advisory, and real-photo replacement.
              </Text>
            </div>

            {/* Metrics */}
            <div className="grid shrink-0 grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded border border-[#d0c9bd] bg-[#ebe7de] p-4">
                <span className="font-mono text-2xl font-light text-[#a67c45]">
                  14/14
                </span>

                <p className="mt-1 font-sans text-xs text-[#777970]">
                  Categories
                </p>
              </div>

              <div className="rounded border border-[#d0c9bd] bg-[#ebe7de] p-4">
                <span className="font-mono text-2xl font-light text-[#1d2529]">
                  1376px
                </span>

                <p className="mt-1 font-sans text-xs text-[#777970]">
                  Master Width
                </p>
              </div>

              <div className="col-span-2 rounded border border-[#d0c9bd] bg-[#ebe7de] p-4 sm:col-span-1">
                <span className="font-mono text-2xl font-light text-[#66816d]">
                  100%
                </span>

                <p className="mt-1 font-sans text-xs text-[#777970]">
                  Compliant
                </p>
              </div>
            </div>
          </div>

          {/* Governance */}
          <div className="mt-10 rounded-sm border border-[#a67c45]/20 bg-[#ebe7de] p-5">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 rounded-full bg-[#a67c45]/10 p-2 text-[#a67c45]">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#3f4847]">
                    Visual Governance
                  </h3>

                  <p className="mt-1 font-serif text-xs text-[#626760]">
                    No fake logos, identities, awards, or stock clichés.
                    AI humans remain atmospheric only.
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <span className="rounded bg-[#f3f0e8] px-2.5 py-1 font-mono text-[11px] text-[#a67c45]">
                  Brand Safe
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Search & Filters */}
      <section className="border-b border-[#d8d1c5] bg-[#ebe7de] py-4">
        <Container size="xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#aaa398]" />

              <input
                type="text"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                className="w-full rounded border border-[#d0c9bd] bg-[#f3f0e8] py-2 pl-9 pr-4 font-sans text-xs text-[#1d2529] placeholder:text-[#aaa398] focus:border-[#a67c45]/50 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-[#777970]">
              <Filter className="h-3.5 w-3.5 text-[#a67c45]" />

              <span>Showing</span>

              <span className="font-semibold text-[#1d2529]">
                {filteredAssets.length}
              </span>

              <span>of</span>

              <span className="font-semibold text-[#1d2529]">
                {masterAssets.length}
              </span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="scrollbar-none mt-4 flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`shrink-0 rounded px-3 py-1.5 font-mono text-xs transition-colors ${
                selectedCategory === "all"
                  ? "border border-[#a67c45]/40 bg-[#a67c45]/10 text-[#8d683d]"
                  : "border border-[#d0c9bd] bg-[#f3f0e8] text-[#777970] hover:text-[#3f4847]"
              }`}
            >
              All ({masterAssets.length})
            </button>

            {allCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() =>
                  setSelectedCategory(cat.key)
                }
                className={`flex shrink-0 items-center gap-1.5 rounded px-3 py-1.5 font-mono text-xs transition-colors ${
                  selectedCategory === cat.key
                    ? "border border-[#a67c45]/40 bg-[#a67c45]/10 text-[#8d683d]"
                    : "border border-[#d0c9bd] bg-[#f3f0e8] text-[#777970] hover:text-[#3f4847]"
                }`}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: cat.accentTone,
                  }}
                />

                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Main Asset Gallery */}
      <section className="py-12 lg:py-16">
        <Container size="xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {filteredAssets.map((asset) => {
              const isCopied =
                copiedKey === asset.replacementKey;

              return (
                <Card
                  key={asset.id}
                  className="group overflow-hidden rounded-xs border-[#d0c9bd] bg-[#ebe7de] p-0 shadow-sm transition-all hover:border-[#a67c45]/40"
                >
                  {/* Image */}
                  <div className="relative">
                    <SamvadImage
                      assetId={asset.id}
                      zoomOnHover
                      showKeyBadge
                      className="w-full"
                    />
                  </div>

                  {/* Metadata */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="mb-1.5 flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="border-[#c9c2b6] font-mono text-[10px] uppercase text-[#626760]"
                          >
                            {asset.category.replace(
                              "-",
                              " ",
                            )}
                          </Badge>

                          <span className="font-mono text-[11px] text-[#aaa398]">
                            {asset.width} × {asset.height} (
                            {asset.aspectRatio})
                          </span>
                        </div>

                        <h3 className="font-serif text-lg font-normal text-[#1d2529]">
                          {asset.title}
                        </h3>
                      </div>

                      {/* Copy Key */}
                      <button
                        onClick={() =>
                          handleCopyKey(
                            asset.replacementKey,
                          )
                        }
                        title="Copy replacement key"
                        className="flex shrink-0 items-center gap-1.5 rounded border border-[#c9c2b6] bg-[#f3f0e8] px-2.5 py-1.5 font-mono text-[11px] text-[#8d683d] transition-colors hover:border-[#a67c45]/50 hover:bg-[#ebe7de]"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3 w-3 text-[#66816d]" />

                            <span className="font-semibold text-[#66816d]">
                              Copied
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 text-[#a67c45]" />

                            <span>
                              {asset.replacementKey}
                            </span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="mt-3 font-serif text-xs leading-relaxed text-[#626760]">
                      {asset.description}
                    </p>

                    {/* Alt Text */}
                    <div className="mt-4 rounded border border-[#d8d1c5] bg-[#f3f0e8] p-3">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#aaa398]">
                          Alt Text
                        </span>

                        <span className="font-mono text-[9px] text-[#66816d]">
                          WCAG 2.1 AA
                        </span>
                      </div>

                      <p className="font-sans text-[11px] italic text-[#626760]">
                        &ldquo;{asset.alt}&rdquo;
                      </p>
                    </div>

                    {/* Real Photo Direction */}
                    <div className="mt-3 rounded border border-[#d8d1c5] bg-[#f3f0e8] p-3">
                      <div className="mb-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#a67c45]">
                        <Camera className="h-3 w-3" />
                        <span>Photo Brief</span>
                      </div>

                      <p className="font-serif text-xs text-[#626760]">
                        {asset.realPhotoSlot.artDirection}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {asset.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-[#f3f0e8] px-2 py-0.5 font-mono text-[10px] text-[#aaa398]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredAssets.length === 0 && (
            <div className="py-24 text-center">
              <p className="font-serif text-lg text-[#626760]">
                No matching assets.
              </p>

              <Button
                variant="outline"
                size="sm"
                className="mt-4 border-[#c9c2b6] font-mono text-xs"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
              >
                Reset
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* Live Real-Photo Swap Simulator */}
      <section
        id="simulator"
        className="border-t border-[#d8d1c5] bg-[#ebe7de] py-16 lg:py-24"
      >
        <Container size="xl">
          <div className="mb-12 max-w-3xl">
            <Badge
              variant="outline"
              className="mb-3 border-[#a67c45]/30 font-mono text-[11px] text-[#a67c45]"
            >
              <RefreshCw className="mr-1.5 h-3 w-3" />
              Runtime Swap
            </Badge>

            <Heading
              level={2}
              size="display-lg"
              className="font-serif font-light text-[#1d2529]"
            >
              Live Photography
              <span className="font-normal italic text-[#a67c45]">
                {" "}
                Replacement
              </span>
            </Heading>

            <Text
              variant="lead"
              className="mt-3 max-w-2xl font-serif leading-relaxed text-[#626760]"
            >
              Replace a registry asset with real photography without
              changing layout or component references.
            </Text>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Controls */}
            <div className="rounded border border-[#d0c9bd] bg-[#f3f0e8] p-6 lg:col-span-5">
              <form
                onSubmit={handleApplySwap}
                className="space-y-4"
              >
                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-[#626760]">
                    Target Slot
                  </label>

                  <select
                    value={simulatorSlot}
                    onChange={(e) => {
                      setSimulatorSlot(e.target.value);
                      setSwapApplied(false);
                      setCustomUrl("");
                    }}
                    className="w-full rounded border border-[#c9c2b6] bg-[#ebe7de] px-3 py-2 font-mono text-xs text-[#8d683d] focus:border-[#a67c45] focus:outline-none"
                  >
                    {masterAssets.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.replacementKey} ({a.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-[#626760]">
                    Replacement URL
                  </label>

                  <input
                    type="url"
                    placeholder="https://..."
                    value={customUrl}
                    onChange={(e) =>
                      setCustomUrl(e.target.value)
                    }
                    className="w-full rounded border border-[#c9c2b6] bg-[#ebe7de] px-3 py-2 font-sans text-xs text-[#1d2529] placeholder:text-[#aaa398] focus:border-[#a67c45] focus:outline-none"
                  />

                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setCustomUrl(
                          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop",
                        )
                      }
                      className="font-mono text-[10px] text-[#aaa398] underline hover:text-[#a67c45]"
                    >
                      Sample Architecture
                    </button>

                    <span className="text-[#c5beb2]">
                      ·
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setCustomUrl(
                          "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1471&auto=format&fit=crop",
                        )
                      }
                      className="font-mono text-[10px] text-[#aaa398] underline hover:text-[#a67c45]"
                    >
                      Sample Executive
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    className="flex-1 font-mono text-xs"
                    disabled={!customUrl.trim()}
                  >
                    Apply Replacement
                  </Button>

                  {swapApplied && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleResetSwap}
                      className="border-[#c9c2b6] font-mono text-xs text-[#626760]"
                    >
                      Reset
                    </Button>
                  )}
                </div>

                {swapApplied && (
                  <div className="mt-4 rounded border border-[#66816d]/30 bg-[#66816d]/10 p-3">
                    <p className="font-mono text-xs text-[#66816d]">
                      ✓ {simulatorSlot} updated in registry.
                    </p>
                  </div>
                )}
              </form>
            </div>

            {/* Live Preview */}
            <div className="rounded border border-[#d0c9bd] bg-[#f3f0e8] p-6 lg:col-span-7">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#aaa398]">
                  Live Preview
                </span>

                <span className="font-mono text-[11px] text-[#a67c45]">
                  {swapApplied
                    ? "REAL PHOTO ACTIVE"
                    : "AI PLACEHOLDER ACTIVE"}
                </span>
              </div>

              <SamvadImage
                key={`${simulatorSlot}-${refreshKey}`}
                assetId={simulatorSlot}
                showKeyBadge
                zoomOnHover
                caption="Live asset replacement preview."
                credit="SAMVAD Asset Pipeline"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Photography Guide */}
      <section className="border-t border-[#d8d1c5] py-16">
        <Container size="xl">
          <Heading
            level={2}
            size="xl"
            className="mb-8 font-serif font-light text-[#1d2529]"
          >
            Commercial Photography{" "}
            <span className="font-normal italic text-[#a67c45]">
              Guide
            </span>
          </Heading>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded border border-[#d0c9bd] bg-[#ebe7de] p-6">
              <h4 className="mb-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#a67c45]">
                01 · Lighting
              </h4>

              <p className="font-serif text-xs leading-relaxed text-[#626760]">
                Natural light, blue hour, directional sun, and warm
                interior light. Avoid flat studio flash.
              </p>
            </div>

            <div className="rounded border border-[#d0c9bd] bg-[#ebe7de] p-6">
              <h4 className="mb-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#a67c45]">
                02 · Indian Context
              </h4>

              <p className="font-serif text-xs leading-relaxed text-[#626760]">
                Mumbai, New Delhi, and Bengaluru executive environments.
                Modern, architectural, authoritative.
              </p>
            </div>

            <div className="rounded border border-[#d0c9bd] bg-[#ebe7de] p-6">
              <h4 className="mb-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#a67c45]">
                03 · Constraints
              </h4>

              <p className="font-serif text-xs leading-relaxed text-[#626760]">
                No fake logos, synthetic identities, staged handshakes,
                or generic stock imagery.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#d8d1c5] bg-[#ebe7de] py-12">
        <Container
          size="xl"
          className="flex flex-col items-center justify-between gap-4 sm:flex-row"
        >
          <p className="font-serif text-xs text-[#aaa398]">
            © 2026 SAMVAD PERCEPTION ADVISORY — ASSET ARCHITECTURE
          </p>

          <div className="flex items-center gap-4 font-mono text-xs text-[#aaa398]">
            <Link
              href="/"
              className="transition-colors hover:text-[#a67c45]"
            >
              Home
            </Link>

            <span>·</span>

            <Link
              href="/brand-identity"
              className="transition-colors hover:text-[#a67c45]"
            >
              Identity
            </Link>

            <span>·</span>

            <Link
              href="/design-system"
              className="transition-colors hover:text-[#a67c45]"
            >
              Design System
            </Link>
          </div>
        </Container>
      </footer>
    </main>
  );
}