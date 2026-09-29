import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

export interface TimelineItem {
  id: string;
  dateOrPeriod: string;
  title: string;
  description: string;
  tag?: string;
  badge?: string;
  isPlaceholder?: boolean;
  details?: string[];
}

export const timelineVariants = cva("relative space-y-8", {
  variants: {
    layout: {
      left: "border-l border-obsidian-800 ml-4 pl-6 sm:ml-6 sm:pl-8",
      alternating: "relative",
    },
    tone: {
      gold: "[&_.timeline-node]:border-gold-500/60 [&_.timeline-node-active]:bg-gold-400",
      subtle: "[&_.timeline-node]:border-obsidian-600 [&_.timeline-node-active]:bg-paper-300",
    },
  },
  defaultVariants: {
    layout: "left",
    tone: "gold",
  },
});

export interface TimelineProps
  extends React.HTMLAttributes<HTMLOListElement>,
    VariantProps<typeof timelineVariants> {
  items: TimelineItem[];
  showPlaceholderNotice?: boolean;
  placeholderNoticeText?: string;
}

export const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  (
    {
      items,
      layout = "left",
      tone = "gold",
      showPlaceholderNotice = false,
      placeholderNoticeText = "Items marked with [PLACEHOLDER] will be updated with verified corporate milestones.",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full space-y-6">
        {showPlaceholderNotice && (
          <div className="rounded-xs border border-dashed border-gold-500/30 bg-gold-500/5 p-4 text-xs font-mono text-gold-300/90">
            <span className="font-semibold text-gold-400">[EDITORIAL NOTICE]: </span>
            {placeholderNoticeText}
          </div>
        )}

        <ol
          ref={ref}
          className={cn(timelineVariants({ layout, tone }), className)}
          role="list"
          aria-label="Company History Timeline"
          {...props}
        >
          {items.map((item, index) => {
            const isPlaceholder = Boolean(item.isPlaceholder);

            return (
              <li
                key={item.id || index}
                className={cn(
                  "group relative transition-all duration-300",
                  isPlaceholder && "opacity-90"
                )}
              >
                {/* Visual node pin on line */}
                <div
                  className={cn(
                    "timeline-node absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 bg-obsidian-950 transition-colors",
                    isPlaceholder
                      ? "border-dashed border-gold-500/40"
                      : "border-gold-500 group-hover:border-gold-400"
                  )}
                  aria-hidden="true"
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      isPlaceholder
                        ? "bg-gold-500/50"
                        : "timeline-node-active bg-gold-400 group-hover:scale-125 transition-transform"
                    )}
                  />
                </div>

                {/* Timeline Card */}
                <div
                  className={cn(
                    "rounded-xs border p-5 sm:p-6 transition-all duration-300",
                    isPlaceholder
                      ? "border-dashed border-obsidian-750 bg-obsidian-950/70 hover:border-gold-500/40"
                      : "border-obsidian-800 bg-obsidian-950 hover:border-gold-500/40 hover:bg-obsidian-900/60 shadow-elevation-1"
                  )}
                >
                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-gold-400">
                        {item.dateOrPeriod}
                      </span>
                      {isPlaceholder && (
                        <span className="rounded-xs border border-gold-500/30 bg-gold-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-gold-300">
                          Placeholder
                        </span>
                      )}
                    </div>

                    {item.tag && (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-obsidian-400">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h4 className="font-serif text-lg sm:text-xl font-normal text-sand-100 group-hover:text-gold-200 transition-colors">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm font-light leading-relaxed text-sand-400">
                    {item.description}
                  </p>

                  {/* Additional Bullet Details if present */}
                  {item.details && item.details.length > 0 && (
                    <ul className="mt-4 space-y-1.5 border-t border-obsidian-800/80 pt-3">
                      {item.details.map((detail, dIdx) => (
                        <li
                          key={dIdx}
                          className="flex items-start gap-2 text-xs font-light text-sand-400"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-400" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
);

Timeline.displayName = "Timeline";
