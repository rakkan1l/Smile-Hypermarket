"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Quote } from "lucide-react";
import type { Leader } from "@/lib/types";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { LeaderPortrait } from "./LeaderPortrait";

/**
 * Large editorial profile: 45% portrait / 55% story, alternating sides.
 *
 * `showStory` controls the expandable Background / Journey / Contribution
 * panel. Our Story shows the short version; the dedicated Leadership page
 * keeps the full read, so that copy still has somewhere to live.
 */
export function LeadershipProfile({
  leader, flip, defaultOpen = false, showStory = true,
}: { leader: Leader; flip?: boolean; defaultOpen?: boolean; showStory?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  // Only the sections that actually have copy — an expander that opens onto
  // three empty rows is worse than no expander at all.
  const story = [
    { label: "Personal history", text: leader.personalHistory },
    { label: "The journey", text: leader.journey },
    { label: "Contribution to Smile", text: leader.contribution },
  ].filter((s) => s.text?.trim());

  const hasStory = showStory && story.length > 0;

  return (
    <article className={cn("group grid gap-10 lg:gap-20", flip ? "lg:grid-cols-[55fr_45fr]" : "lg:grid-cols-[45fr_55fr]")}>
      <LeaderPortrait
        leader={leader}
        sizes="(min-width: 1024px) 40vw, 100vw"
        className={cn("aspect-[4/5] rounded-[var(--radius-lg)] lg:sticky lg:top-28 lg:self-start", flip && "lg:order-2")}
      />
      <div className={cn("flex flex-col lg:py-6", flip && "lg:order-1")}>
        <Eyebrow tone="blue">{leader.position}</Eyebrow>
        <h3 className="mt-5 text-4xl leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-6xl">{leader.name}</h3>
        <p className="mt-6 font-display text-xl leading-snug text-ink sm:text-2xl">{leader.summary}</p>
        <p className="mt-5 max-w-xl leading-relaxed text-ink-soft">{leader.biography}</p>

        {leader.quote && (
          <figure className="mt-8 border-l-2 border-smile-green pl-5">
            <Quote aria-hidden className="size-5 text-smile-green" />
            <blockquote className="mt-2 font-display text-xl leading-snug tracking-[-0.01em] text-ink">&ldquo;{leader.quote}&rdquo;</blockquote>
          </figure>
        )}

        {hasStory && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-10 inline-flex items-center gap-3 self-start font-ui text-[15px] text-smile-blue"
          >
            <span className="inline-flex size-9 items-center justify-center rounded-full border border-smile-blue/30 transition-colors group-hover:border-smile-blue">
              {open ? <Minus aria-hidden className="size-4" /> : <Plus aria-hidden className="size-4" />}
            </span>
            {open ? "Close Story" : "Read Story"}
          </button>
        )}

        <AnimatePresence initial={false}>
          {hasStory && open && (
            <motion.div
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <dl className="mt-8 divide-y divide-line border-y border-line">
                {story.map((s) => (
                  <div key={s.label} className="grid gap-2 py-6 sm:grid-cols-[180px_1fr] sm:gap-8">
                    <dt className="font-ui text-xs uppercase tracking-[0.2em] text-ink-muted">{s.label}</dt>
                    <dd className="leading-relaxed text-ink-soft">{s.text}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}
