"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export type CountryFilterValue = "All" | "India" | "UAE";

/** Pill filter tabs with a sliding indicator. Reused on Outlets and Careers. */
export function CountryFilter<T extends string = CountryFilterValue>({
  value,
  onChange,
  options = ["All", "India", "UAE"] as unknown as T[],
  counts,
  id = "country-filter",
  label = "Filter by country",
}: {
  value: T;
  onChange: (value: T) => void;
  options?: T[];
  counts?: Partial<Record<T, number>>;
  id?: string;
  label?: string;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex max-w-full overflow-x-auto no-scrollbar rounded-full border border-line bg-white p-1">
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            aria-pressed={active}
            className={cn(
              "relative inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-5 font-ui text-[15px] transition-colors duration-300",
              active ? "text-white" : "text-ink-soft hover:text-ink",
            )}
          >
            {active && (
              <motion.span
                layoutId={`${id}-pill`}
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative">{opt}</span>
            {counts?.[opt] !== undefined && (
              <span className={cn("relative text-xs", active ? "text-white/60" : "text-ink-muted")}>{counts[opt]}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
