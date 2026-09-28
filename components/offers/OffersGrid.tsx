"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ResolvedOffer } from "@/data/offers";
import { CountryFilter } from "@/components/outlets/CountryFilter";
import { OfferCard } from "./OfferCard";

type Filter = "All" | "On now" | "Coming soon" | "Past";
const match: Record<Filter, (o: ResolvedOffer) => boolean> = {
  All: () => true,
  "On now": (o) => o.status === "active",
  "Coming soon": (o) => o.status === "upcoming",
  Past: (o) => o.status === "expired",
};

export function OffersGrid({ offers }: { offers: ResolvedOffer[] }) {
  const options = (["All", "On now", "Coming soon", "Past"] as Filter[]).filter((f) => offers.some(match[f]));
  const [filter, setFilter] = useState<Filter>("All");
  const visible = useMemo(() => offers.filter(match[filter]), [filter, offers]);
  const counts = Object.fromEntries(options.map((f) => [f, offers.filter(match[f]).length])) as Partial<Record<Filter, number>>;

  return (
    <>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="all-offers-heading" className="text-3xl tracking-[-0.03em] sm:text-4xl">
          All campaigns
        </h2>
        <CountryFilter<Filter> id="offer-filter" label="Filter offers" value={filter} onChange={setFilter} options={options} counts={counts} />
      </div>
      <motion.ul layout className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((o) => (
            <motion.li
              key={o.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <OfferCard offer={o} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
