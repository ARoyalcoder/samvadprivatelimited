"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import {
  getImageAsset,
  SamvadAspectRatio,
  SamvadImageAsset,
  createShimmerBlurDataURL,
} from "./image-registry";

export interface SamvadImageProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Registry asset ID or replacement key (e.g. 'corp-comm-press-podium' or 'SAMVAD_CORP_COMM_PODIUM_01').
   * If provided, defaults for src, alt, width, height, aspect ratio, and blurDataURL are loaded automatically.
   */
  assetId?: string;

  /**
   * Explicit image source URL. Overrides registry src if both are provided.
   */
  src?: string;

  /**
   * Descriptive accessibility text. Required if assetId is not provided.
   */
  alt?: string;

  /**
   * Aspect ratio to enforce. Defaults to asset aspect ratio or '16:9'.
   */
  aspectRatio?: SamvadAspectRatio;

  /**
   * Low-resolution blur placeholder data URL or SVG shimmer.
   */
  blurDataURL?: string;

  /**
   * When true, disables lazy loading and prioritizes decoding for Above-the-Fold hero images.
   */
  priority?: boolean;

  /**
   * Apply luxury subtle zoom on hover (requires wrapper hover or group hover).
   */
  zoomOnHover?: boolean;

  /**
   * Subtle editorial visual overlay for contrast and filmic atmosphere.
   */
  editorialOverlay?: boolean | "vignette" | "gradient" | "none";

  /**
   * Editorial caption rendered beneath the image.
   */
  caption?: string;

  /**
   * Optional credit or sub-label for the caption.
   */
  credit?: string;

  /**
   * Show developer/editorial badge indicating replacement key and category.
   */
  showKeyBadge?: boolean;

  /**
   * Additional classes applied directly to the inner <img> element.
   */
  imageClassName?: string;

  /**
   * Object fit style ('cover' | 'contain'). Defaults to 'cover'.
   */
  objectFit?: "cover" | "contain";

  /**
   * Intrinsic or expected width in pixels.
   */
  width?: number;

  /**
   * Intrinsic or expected height in pixels.
   */
  height?: number;
}

const ASPECT_RATIO_CLASSES: Record<SamvadAspectRatio, string> = {
  "16:9": "aspect-video",
  "3:2": "aspect-[3/2]",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
  "21:9": "aspect-[21/9]",
  "4:5": "aspect-[4/5]",
  "9:16": "aspect-[9/16]",
};

export function SamvadImage({
  assetId,
  src: explicitSrc,
  alt: explicitAlt,
  aspectRatio: explicitAspect,
  blurDataURL: explicitBlur,
  priority = false,
  zoomOnHover = false,
  editorialOverlay = "gradient",
  caption,
  credit,
  showKeyBadge = false,
  imageClassName,
  objectFit = "cover",
  width: explicitWidth,
  height: explicitHeight,
  className,
  ...props
}: SamvadImageProps) {
  const registeredAsset: SamvadImageAsset | undefined = assetId
    ? getImageAsset(assetId)
    : undefined;

  const src = explicitSrc || registeredAsset?.src || "";
  const alt = explicitAlt || registeredAsset?.alt || registeredAsset?.title || "SAMVAD Editorial Asset";
  const aspectRatio = explicitAspect || registeredAsset?.aspectRatio || "16:9";
  const blurDataURL = explicitBlur || registeredAsset?.blurDataURL || createShimmerBlurDataURL();
  const width = explicitWidth || registeredAsset?.width || 1376;
  const height = explicitHeight || registeredAsset?.height || 768;
  const replacementKey = registeredAsset?.replacementKey;

  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const aspectClass = ASPECT_RATIO_CLASSES[aspectRatio] || "aspect-video";

  return (
    <figure className={cn("group flex flex-col", className)} {...props}>
      <div
        className={cn(
          "relative overflow-hidden rounded-xs bg-obsidian-900",
          aspectClass
        )}
        data-replacement-key={replacementKey}
        data-category={registeredAsset?.category}
        data-ai-generated={registeredAsset?.isAiGenerated ? "true" : "false"}
      >
        {/* Shimmer / Blur Placeholder */}
        {!isLoaded && !hasError && (
          <div
            className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-700 ease-out"
            style={{
              backgroundImage: blurDataURL ? `url("${blurDataURL}")` : undefined,
              filter: "blur(20px)",
              transform: "scale(1.08)",
            }}
            aria-hidden="true"
          />
        )}

        {/* Shimmer loader pulse */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 z-10 animate-pulse bg-obsidian-850/60" />
        )}

        {/* Main Editorial Image */}
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={cn(
              "h-full w-full transition-all duration-700 ease-out",
              objectFit === "cover" ? "object-cover" : "object-contain",
              "object-center",
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
              zoomOnHover && "group-hover:scale-105",
              imageClassName
            )}
          />
        ) : (
          /* Graceful Editorial Fallback */
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center bg-obsidian-900 border border-obsidian-800">
            <div className="h-10 w-10 rounded-full border border-gold-500/30 flex items-center justify-center mb-3">
              <span className="font-mono text-xs text-gold-400">§</span>
            </div>
            <p className="font-sans text-xs font-medium tracking-widest uppercase text-obsidian-400">
              {registeredAsset?.category?.replace("-", " ") || "Editorial Asset"}
            </p>
            <p className="font-serif text-sm text-sand-300 mt-1 max-w-sm">
              {registeredAsset?.title || alt}
            </p>
            {replacementKey && (
              <span className="mt-3 font-mono text-[10px] tracking-wider text-obsidian-400 bg-obsidian-800/80 px-2.5 py-1 rounded">
                SLOT: {replacementKey}
              </span>
            )}
          </div>
        )}

        {/* Editorial Filmic Overlays */}
        {editorialOverlay === "gradient" && (
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-obsidian-950/70 via-obsidian-950/20 to-transparent" />
        )}

        {editorialOverlay === "vignette" && (
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              boxShadow: "inset 0 0 80px rgba(10, 10, 11, 0.7)",
            }}
          />
        )}

        {/* Developer / Replacement Slot Badge */}
        {showKeyBadge && replacementKey && (
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 rounded-full bg-obsidian-950/85 px-2.5 py-1 backdrop-blur-md border border-gold-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="font-mono text-[10px] tracking-wider uppercase text-sand-200">
              {replacementKey}
            </span>
          </div>
        )}
      </div>

      {/* Editorial Caption & Metadata */}
      {(caption || registeredAsset?.caption || credit) && (
        <figcaption className="mt-2.5 flex items-baseline justify-between gap-4 px-0.5">
          <p className="font-serif text-xs text-sand-400 leading-relaxed max-w-2xl">
            {caption || registeredAsset?.caption}
          </p>
          {(credit || replacementKey) && (
            <span className="font-mono text-[10px] tracking-widest uppercase text-obsidian-400 shrink-0">
              {credit || (registeredAsset?.isAiGenerated ? "AI Editorial Study" : "SAMVAD Archive")}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
