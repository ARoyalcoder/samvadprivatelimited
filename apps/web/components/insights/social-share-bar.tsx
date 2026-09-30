"use client";

import * as React from "react";
import { Link2, Check, Share2, Mail } from "lucide-react";

interface SocialShareBarProps {
  title: string;
  url?: string;
  className?: string;
}

export function SocialShareBar({ title, url, className = "" }: SocialShareBarProps) {
  const [copied, setCopied] = React.useState(false);
  const [currentUrl, setCurrentUrl] = React.useState(url || "");

  React.useEffect(() => {
    if (!url && typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, [url]);

  const handleCopyLink = async () => {
    try {
      if (typeof window !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  const shareLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=600");
  };

  const shareTwitter = () => {
    const text = `Read "${title}" by @SAMVAD_Advisory:`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(currentUrl)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=450");
  };

  const shareEmail = () => {
    const subject = `Executive Intelligence: ${title}`;
    const body = `I recommend reviewing this strategic insight published by SAMVAD Perception Advisory:\n\n${title}\n\nRead here: ${currentUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div
      className={`flex items-center gap-2 border-y border-obsidian-800 py-3 font-mono text-xs text-obsidian-400 ${className}`}
      aria-label="Share article"
    >
      <span className="flex items-center gap-1.5 uppercase tracking-widest text-[10px] text-sand-400 mr-2">
        <Share2 className="h-3 w-3 text-gold-400" />
        <span>Share Analysis</span>
      </span>

      {/* Copy Link Button */}
      <button
        type="button"
        onClick={handleCopyLink}
        title="Copy article link"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs border transition-all ${
          copied
            ? "border-gold-500 bg-gold-500/10 text-gold-300"
            : "border-obsidian-750 bg-obsidian-900/60 hover:border-gold-500/40 hover:text-sand-200"
        }`}
      >
        {copied ? (
          <>
            <Check className="h-3 w-3 text-gold-400" />
            <span className="text-[10px]">Copied</span>
          </>
        ) : (
          <>
            <Link2 className="h-3 w-3 text-gold-400" />
            <span className="text-[10px]">Copy Link</span>
          </>
        )}
      </button>

      {/* LinkedIn Share */}
      <button
        type="button"
        onClick={shareLinkedIn}
        title="Share to LinkedIn"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-obsidian-750 bg-obsidian-900/60 hover:border-gold-500/40 hover:text-sand-200 transition-all text-[10px]"
      >
        <span>LinkedIn</span>
      </button>

      {/* X / Twitter Share */}
      <button
        type="button"
        onClick={shareTwitter}
        title="Share to X"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-obsidian-750 bg-obsidian-900/60 hover:border-gold-500/40 hover:text-sand-200 transition-all text-[10px]"
      >
        <span>X / Twitter</span>
      </button>

      {/* Email Share */}
      <button
        type="button"
        onClick={shareEmail}
        title="Share via confidential email"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-obsidian-750 bg-obsidian-900/60 hover:border-gold-500/40 hover:text-sand-200 transition-all text-[10px]"
      >
        <Mail className="h-3 w-3 text-gold-400" />
        <span>Email Dispatch</span>
      </button>
    </div>
  );
}
