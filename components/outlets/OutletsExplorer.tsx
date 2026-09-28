"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import type { Outlet } from "@/lib/types";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CountryBadge } from "@/components/ui/Badge";
import { CountryFilter, type CountryFilterValue } from "./CountryFilter";
import { OutletCard } from "./OutletCard";
import { MapPanel } from "./MapPanel";
import { OutletActions } from "./OutletActions";
import { OutletMeta } from "./OutletMeta";

/** Filterable outlet grid + list/map explorer. All outlet logic is data-driven. */
export function OutletsExplorer({ outlets }: { outlets: Outlet[] }) {
  const [filter, setFilter] = useState<CountryFilterValue>("All");
  const visible = useMemo(() => (filter === "All" ? outlets : outlets.filter((o) => o.country === filter)), [filter, outlets]);
  const [selectedSlug, setSelectedSlug] = useState(outlets[0]?.slug);
  const selected = visible.find((o) => o.slug === selectedSlug) ?? visible[0];

  const counts = {
    All: outlets.length,
    India: outlets.filter((o) => o.country === "India").length,
    UAE: outlets.filter((o) => o.country === "UAE").length,
  };

  return (
    <>
      <section aria-labelledby="outlet-list-heading" className="pb-20 sm:pb-28">
        <Container>
          <div className="flex flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
            <h2 id="outlet-list-heading" className="text-2xl tracking-[-0.025em]">
              {filter === "All" ? "All outlets" : `Outlets in ${filter}`}
              <span className="ml-3 font-ui text-base text-ink-muted" aria-live="polite">
                {visible.length} {visible.length === 1 ? "location" : "locations"}
              </span>
            </h2>
            <CountryFilter value={filter} onChange={setFilter} counts={counts} />
          </div>

          <motion.ul layout className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((o) => (
                <motion.li
                  key={o.slug}
                  layout
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <OutletCard outlet={o} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </Container>
      </section>

      <section aria-labelledby="map-heading" className="border-t border-line bg-off-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            id="map-heading"
            eyebrow="Map"
            title="Explore Smile on the map"
            description="Select an outlet to see where it is, then get directions straight from your phone."
          />

          <div className="mt-12 grid overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white lg:h-[640px] lg:grid-cols-[minmax(320px,400px)_1fr]">
            <ul className="no-scrollbar flex gap-2 overflow-x-auto border-b border-line p-3 lg:block lg:space-y-1 lg:overflow-y-auto lg:border-b-0 lg:border-r lg:p-3" aria-label="Outlets on the map">
              {visible.map((o) => {
                const active = o.slug === selected?.slug;
                return (
                  <li key={o.slug} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setSelectedSlug(o.slug)}
                      aria-pressed={active}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-[var(--radius)] p-4 text-left transition-colors duration-300",
                        active ? "bg-light-blue" : "hover:bg-off-white",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors",
                          active ? "border-smile-blue bg-smile-blue text-white" : "border-line text-ink-muted",
                        )}
                      >
                        <MapPin aria-hidden className="size-3.5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block whitespace-nowrap font-display text-lg leading-tight tracking-[-0.02em] lg:whitespace-normal">{o.name}</span>
                        <span className="mt-1 hidden text-sm text-ink-soft lg:block">
                          {o.area}, {o.city} · {o.country}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {selected && (
              <div className="relative flex flex-col">
                <MapPanel outlet={selected} className="h-[360px] sm:h-[440px] lg:h-auto lg:flex-1" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selected.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="border-t border-line bg-white p-5 sm:p-6 lg:absolute lg:bottom-5 lg:left-5 lg:w-[380px] lg:rounded-[var(--radius-lg)] lg:border lg:shadow-[var(--shadow-soft)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CountryBadge country={selected.country} />
                        <p className="mt-3 font-display text-2xl tracking-[-0.025em]">{selected.name}</p>
                      </div>
                      <Link href={`/outlets/${selected.slug}`} aria-label={`View ${selected.name} outlet page`} className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink-soft hover:border-ink hover:text-ink">
                        <ArrowUpRight aria-hidden className="size-4" />
                      </Link>
                    </div>
                    <OutletMeta outlet={selected} className="mt-4 text-sm" />
                    <OutletActions outlet={selected} layout="stacked" className="mt-5" labels={{ call: "Call" }} />
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
