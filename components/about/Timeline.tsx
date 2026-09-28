"use client";

import { milestones } from "@/data/story";

/** Compact horizontal milestone strip */
export function Timeline() {
  return (
    <div className="relative">
      {/* Connecting line */}
      <div className="absolute left-4 top-3 hidden h-px w-[calc(100%-2rem)] bg-line sm:block" aria-hidden />

      <ol className="grid gap-8 sm:grid-cols-3 lg:grid-cols-6">
        {milestones.map((m, i) => (
          <li key={m.label} className="relative flex gap-4 sm:flex-col sm:gap-3">
            {/* Dot */}
            <span
              aria-hidden
              className="relative z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-white bg-smile-green ring-1 ring-line sm:mt-0"
            >
              <span className="font-ui text-[9px] font-semibold text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
            </span>

            {/* Text */}
            <div>
              <p className="font-ui text-[10px] uppercase tracking-[0.18em] text-smile-green-dark">{m.label}</p>
              <h3 className="mt-1 text-sm font-semibold leading-snug tracking-[-0.01em] text-ink">{m.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{m.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
