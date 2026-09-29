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
  const allCategories = React.useMemo(() => getAllImageCategories(), []);
  // Live swap simulator state
  const [simulatorSlot, setSimulatorSlot] = React.useState<string>("corp-comm-press-podium");
  const [customUrl, setCustomUrl] = React.useState<string>("");
  const [swapApplied, setSwapApplied] = React.useState<boolean>(false);
  const [refreshKey, setRefreshKey] = React.useState<number>(0);

  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const masterAssets = React.useMemo(() => getAllImageAssets(), [refreshKey]);

  const filteredAssets = React.useMemo(() => {
    return masterAssets.filter((asset) => {
      const matchesCategory =
        selectedCategory === "all" || asset.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        asset.title.toLowerCase().includes(q) ||
        asset.replacementKey.toLowerCase().includes(q) ||
        asset.category.toLowerCase().includes(q) ||
        asset.tags.some((t) => t.toLowerCase().includes(q)) ||
        asset.alt.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [masterAssets, selectedCategory, searchQuery]);

  const handleCopyKey = (key: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
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
        artDirection: "Custom Real Photo Asset Swapped via Simulator",
        recommendedAspect: "16:9",
        status: "real-asset-ready",
      },
    });
    setSwapApplied(true);
    setRefreshKey((prev) => prev + 1);
  };

  const handleResetSwap = () => {
    registerImageOverride(simulatorSlot, {
      src: masterAssets.find((a) => a.id === simulatorSlot)?.src,
      isAiGenerated: true,
    });
    setCustomUrl("");
    setSwapApplied(false);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen bg-obsidian-950 text-sand-100 selection:bg-gold-500/20 selection:text-gold-200">
      {/* Background Ambience */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.04),transparent_50%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.03),transparent_50%)]" />

      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-50 border-b border-obsidian-800/80 bg-obsidian-950/90 backdrop-blur-md">
        <Container size="xl" className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <BrandMark size="sm" tone="gold" className="transition-transform group-hover:scale-105" />
              <span className="font-serif text-sm font-semibold tracking-wider text-sand-100">
                SAMVAD
              </span>
            </Link>
            <span className="text-obsidian-600">/</span>
            <span className="font-mono text-xs uppercase tracking-widest text-gold-400">
              AI Asset System & Registry
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/brand-identity">
              <Button variant="ghost" size="sm" className="font-mono text-xs text-sand-300">
                Brand Identity
              </Button>
            </Link>
            <Link href="/design-system">
              <Button variant="ghost" size="sm" className="font-mono text-xs text-sand-300">
                Design System
              </Button>
            </Link>
            <Link href="#simulator">
              <Button variant="outline" size="sm" className="border-gold-500/30 text-gold-400 hover:bg-gold-500/10">
                <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                Swap Simulator
              </Button>
            </Link>
          </div>
        </Container>
      </header>

      {/* Hero Section */}
      <section className="relative border-b border-obsidian-800/80 py-16 lg:py-24">
        <Container size="xl">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="outline" className="border-gold-500/30 font-mono text-[11px] text-gold-400">
                  <Sparkles className="mr-1.5 h-3 w-3" />
                  Asset System v1.0
                </Badge>
                <Badge variant="outline" className="border-obsidian-700 font-mono text-[11px] text-sand-400">
                  14 Editorial Categories
                </Badge>
                <Badge variant="outline" className="border-emerald-500/30 font-mono text-[11px] text-emerald-400">
                  <ShieldCheck className="mr-1.5 h-3 w-3" />
                  Zero Stock Clichés
                </Badge>
              </div>

              <Heading level={1} size="display-xl" className="font-serif font-light text-sand-100 tracking-tight">
                Architectural & Editorial <br />
                <span className="font-normal italic text-gold-300">Visual Asset System</span>
              </Heading>

              <Text variant="lead" className="mt-4 text-sand-400 font-serif leading-relaxed max-w-2xl">
                A decoupled image intelligence layer engineered for high-stakes perception advisory.
                Combines cinematic, Indian business context editorial photography with uncompromised
                replacement slot keys—enabling real commercial photography to swap in seamlessly with zero layout shift.
              </Text>
            </div>

            {/* Architecture Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
              <div className="rounded border border-obsidian-800 bg-obsidian-900/60 p-4">
                <span className="font-mono text-2xl font-light text-gold-400">14/14</span>
                <p className="mt-1 font-sans text-xs text-sand-400">Categories Defined</p>
              </div>
              <div className="rounded border border-obsidian-800 bg-obsidian-900/60 p-4">
                <span className="font-mono text-2xl font-light text-sand-100">1376px</span>
                <p className="mt-1 font-sans text-xs text-sand-400">16:9 Master Width</p>
              </div>
              <div className="rounded border border-obsidian-800 bg-obsidian-900/60 p-4 col-span-2 sm:col-span-1">
                <span className="font-mono text-2xl font-light text-emerald-400">100%</span>
                <p className="mt-1 font-sans text-xs text-sand-400">Personnel Compliant</p>
              </div>
            </div>
          </div>

          {/* Strict Negative Constraints Callout */}
          <div className="mt-10 rounded-sm border border-gold-500/20 bg-obsidian-900/40 p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-gold-500/10 p-2 text-gold-400 shrink-0 mt-0.5">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-sans text-xs uppercase tracking-wider font-semibold text-sand-200">
                    Enterprise Visual Governance & Negative Constraints Enforced
                  </h3>
                  <p className="font-serif text-xs text-sand-400 mt-1">
                    Every asset strictly forbids fake corporate logos, synthetic client identities, awards fabrication,
                    and stock-photo clichés. AI humans are photographed only as atmospheric silhouettes, hands over dossiers,
                    or contextual press corps—never depicted as SAMVAD employees or client executives.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-[11px] text-gold-400/80 bg-obsidian-800/80 px-2.5 py-1 rounded">
                  ISO / Brand Safe
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Filter and Search Bar */}
      <section className="border-b border-obsidian-800/80 bg-obsidian-950/60 py-4">
        <Container size="xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-obsidian-400" />
              <input
                type="text"
                placeholder="Search by title, key, category, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded bg-obsidian-900 border border-obsidian-800 pl-9 pr-4 py-2 font-sans text-xs text-sand-100 placeholder:text-obsidian-400 focus:outline-none focus:border-gold-500/50"
              />
            </div>

            {/* Quick Summary Pill */}
            <div className="flex items-center gap-2 text-xs font-mono text-sand-400">
              <Filter className="h-3.5 w-3.5 text-gold-400" />
              <span>Showing</span>
              <span className="font-semibold text-sand-100">{filteredAssets.length}</span>
              <span>of</span>
              <span className="font-semibold text-sand-100">{masterAssets.length}</span>
              <span>assets</span>
            </div>
          </div>

          {/* Category Tabs Scroll */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`shrink-0 rounded px-3 py-1.5 font-mono text-xs transition-colors ${
                selectedCategory === "all"
                  ? "bg-gold-500/20 text-gold-300 border border-gold-500/40"
                  : "bg-obsidian-900 text-sand-400 border border-obsidian-800 hover:text-sand-200"
              }`}
            >
              All Categories ({masterAssets.length})
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`shrink-0 rounded px-3 py-1.5 font-mono text-xs transition-colors flex items-center gap-1.5 ${
                  selectedCategory === cat.key
                    ? "bg-gold-500/20 text-gold-300 border border-gold-500/40"
                    : "bg-obsidian-900 text-sand-400 border border-obsidian-800 hover:text-sand-200"
                }`}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: cat.accentTone }}
                />
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Main Asset Gallery Grid */}
      <section className="py-12 lg:py-16">
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
            {filteredAssets.map((asset) => {
              const isCopied = copiedKey === asset.replacementKey;
              return (
                <Card
                  key={asset.id}
                  className="group overflow-hidden rounded-xs border-obsidian-800 bg-obsidian-900/60 p-0 transition-all hover:border-obsidian-700"
                >
                  {/* Image Component with Hover Zoom & Key Badge */}
                  <div className="relative">
                    <SamvadImage
                      assetId={asset.id}
                      zoomOnHover
                      showKeyBadge
                      className="w-full"
                    />
                  </div>

                  {/* Metadata & Replacement Slot Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <Badge
                            variant="outline"
                            className="border-obsidian-700 font-mono text-[10px] uppercase text-sand-300"
                          >
                            {asset.category.replace("-", " ")}
                          </Badge>
                          <span className="font-mono text-[11px] text-obsidian-400">
                            {asset.width} × {asset.height} ({asset.aspectRatio})
                          </span>
                        </div>
                        <h3 className="font-serif text-lg text-sand-100 font-normal">
                          {asset.title}
                        </h3>
                      </div>

                      {/* Click to Copy Replacement Key */}
                      <button
                        onClick={() => handleCopyKey(asset.replacementKey)}
                        title="Copy replacement key for code or CMS"
                        className="flex items-center gap-1.5 rounded border border-obsidian-700 bg-obsidian-800/80 px-2.5 py-1.5 font-mono text-[11px] text-gold-400 hover:border-gold-500/50 hover:bg-obsidian-800 transition-colors shrink-0"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" />
                            <span className="text-emerald-400 font-semibold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 text-gold-400" />
                            <span>{asset.replacementKey}</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="mt-3 font-serif text-xs text-sand-400 leading-relaxed">
                      {asset.description}
                    </p>

                    {/* Accessibility Alt Text Preview */}
                    <div className="mt-4 rounded bg-obsidian-950/60 border border-obsidian-850 p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[10px] tracking-wider uppercase text-obsidian-400">
                          Accessibility Alt Text
                        </span>
                        <span className="font-mono text-[9px] text-emerald-400/80">WCAG 2.1 AA</span>
                      </div>
                      <p className="font-sans text-[11px] text-sand-300 italic">
                        &ldquo;{asset.alt}&rdquo;
                      </p>
                    </div>

                    {/* Real Photography Shoot Direction */}
                    <div className="mt-3 rounded bg-obsidian-950/40 border border-obsidian-850/80 p-3">
                      <div className="flex items-center gap-1.5 mb-1 text-gold-400/90 font-mono text-[10px] uppercase tracking-wider">
                        <Camera className="h-3 w-3" />
                        <span>Real Shoot Brief for Replacement</span>
                      </div>
                      <p className="font-serif text-xs text-sand-400">
                        {asset.realPhotoSlot.artDirection}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {asset.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] text-obsidian-400 bg-obsidian-850 px-2 py-0.5 rounded"
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
              <p className="font-serif text-lg text-sand-400">
                No visual assets matched your criteria.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 font-mono text-xs border-obsidian-700"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* Live Real-Photo Swap Simulator */}
      <section id="simulator" className="border-t border-obsidian-800/80 bg-obsidian-900/40 py-16 lg:py-24">
        <Container size="xl">
          <div className="max-w-3xl mb-12">
            <Badge variant="outline" className="border-gold-500/30 font-mono text-[11px] text-gold-400 mb-3">
              <RefreshCw className="mr-1.5 h-3 w-3" />
              Runtime Swap Architecture
            </Badge>
            <Heading level={2} size="display-lg" className="font-serif font-light text-sand-100">
              Live Photography <span className="font-normal italic text-gold-300">Replacement Simulator</span>
            </Heading>
            <Text variant="lead" className="mt-3 text-sand-400 font-serif leading-relaxed">
              Demonstrates how the SAMVAD decoupled registry replaces AI placeholders with real company photography.
              Select an asset slot, input a replacement URL, and watch the entire component update instantaneously
              without altering page layout or causing reflow.
            </Text>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Controls Form */}
            <div className="lg:col-span-5 rounded border border-obsidian-800 bg-obsidian-900/90 p-6">
              <form onSubmit={handleApplySwap} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs text-sand-300 uppercase tracking-wider mb-2">
                    Target Slot Key
                  </label>
                  <select
                    value={simulatorSlot}
                    onChange={(e) => {
                      setSimulatorSlot(e.target.value);
                      setSwapApplied(false);
                      setCustomUrl("");
                    }}
                    className="w-full rounded bg-obsidian-950 border border-obsidian-700 px-3 py-2 font-mono text-xs text-gold-400 focus:outline-none focus:border-gold-500"
                  >
                    {masterAssets.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.replacementKey} ({a.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-sand-300 uppercase tracking-wider mb-2">
                    Replacement Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-... or /images/..."
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    className="w-full rounded bg-obsidian-950 border border-obsidian-700 px-3 py-2 font-sans text-xs text-sand-100 placeholder:text-obsidian-400 focus:outline-none focus:border-gold-500"
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setCustomUrl(
                          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop"
                        )
                      }
                      className="font-mono text-[10px] text-obsidian-400 hover:text-gold-400 underline"
                    >
                      Sample Real Architecture
                    </button>
                    <span className="text-obsidian-600">·</span>
                    <button
                      type="button"
                      onClick={() =>
                        setCustomUrl(
                          "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1471&auto=format&fit=crop"
                        )
                      }
                      className="font-mono text-[10px] text-obsidian-400 hover:text-gold-400 underline"
                    >
                      Sample Real Executive
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
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
                      className="font-mono text-xs border-obsidian-700 text-sand-400"
                    >
                      Reset Slot
                    </Button>
                  )}
                </div>

                {swapApplied && (
                  <div className="rounded bg-emerald-950/40 border border-emerald-500/30 p-3 mt-4">
                    <p className="font-mono text-xs text-emerald-400">
                      ✓ Slot {simulatorSlot} overridden in registry. Any component referencing this slot now renders the real asset automatically.
                    </p>
                  </div>
                )}
              </form>
            </div>

            {/* Live Preview Render */}
            <div className="lg:col-span-7 rounded border border-obsidian-800 bg-obsidian-900/60 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-obsidian-400">
                  Live Component Rendering
                </span>
                <span className="font-mono text-[11px] text-gold-400">
                  {swapApplied ? "STATUS: REAL PHOTO ACTIVE" : "STATUS: AI PLACEHOLDER ACTIVE"}
                </span>
              </div>

              <SamvadImage
                key={`${simulatorSlot}-${refreshKey}`}
                assetId={simulatorSlot}
                showKeyBadge
                zoomOnHover
                caption="Live rendered test asset demonstrating zero layout shift across dynamic state switches."
                credit="SAMVAD Asset Pipeline"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Photographic Direction Guide & Taxonomy */}
      <section className="border-t border-obsidian-800/80 py-16">
        <Container size="xl">
          <Heading level={2} size="xl" className="font-serif font-light text-sand-100 mb-8">
            Commercial Photography <span className="font-normal italic text-gold-300">Shooting Guide</span>
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded border border-obsidian-800 bg-obsidian-900/40 p-6">
              <h4 className="font-sans text-xs uppercase tracking-wider font-semibold text-gold-400 mb-2">
                1. Lighting & Atmosphere
              </h4>
              <p className="font-serif text-xs text-sand-400 leading-relaxed">
                Rely predominantly on natural ambient light: blue hour twilight, angled morning raking sunlight, and warm tungsten reading lamps. Never use clinical, flat studio flashboxes or over-saturated HDR.
              </p>
            </div>

            <div className="rounded border border-obsidian-800 bg-obsidian-900/40 p-6">
              <h4 className="font-sans text-xs uppercase tracking-wider font-semibold text-gold-400 mb-2">
                2. Indian Business Context
              </h4>
              <p className="font-serif text-xs text-sand-400 leading-relaxed">
                Reflect high-end Indian executive hubs: Mumbai Bandra-Kurla Complex (BKC), Nariman Point, New Delhi diplomatic enclaves, and Bengaluru technology campuses. Modern, architectural, authoritative.
              </p>
            </div>

            <div className="rounded border border-obsidian-800 bg-obsidian-900/40 p-6">
              <h4 className="font-sans text-xs uppercase tracking-wider font-semibold text-gold-400 mb-2">
                3. Negative Constraints
              </h4>
              <p className="font-serif text-xs text-sand-400 leading-relaxed">
                Zero fake brand logos or synthetic client names. Avoid staged corporate handshakes and beaming stock models. Focus on tactile materials: leather binders, teak desks, optical prisms, and monumental architecture.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-obsidian-800 bg-obsidian-950 py-12">
        <Container size="xl" className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-serif text-xs text-obsidian-400">
            © 2026 SAMVAD PERCEPTION ADVISORY PRIVATE LIMITED. Proprietary Asset Architecture.
          </p>
          <div className="flex items-center gap-4 font-mono text-xs text-obsidian-400">
            <Link href="/" className="hover:text-gold-400 transition-colors">
              Platform Home
            </Link>
            <span>·</span>
            <Link href="/brand-identity" className="hover:text-gold-400 transition-colors">
              Visual Identity
            </Link>
            <span>·</span>
            <Link href="/design-system" className="hover:text-gold-400 transition-colors">
              Design Tokens
            </Link>
          </div>
        </Container>
      </footer>
    </main>
  );
}
