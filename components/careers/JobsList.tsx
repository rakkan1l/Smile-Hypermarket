"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Job } from "@/lib/types";
import { CountryFilter, type CountryFilterValue } from "@/components/outlets/CountryFilter";
import { JobCard } from "./JobCard";

export function JobsList({ jobs }: { jobs: Job[] }) {
  const [filter, setFilter] = useState<CountryFilterValue>("All");
  const visible = useMemo(() => (filter === "All" ? jobs : jobs.filter((j) => j.country === filter)), [filter, jobs]);
  const counts = {
    All: jobs.length,
    India: jobs.filter((j) => j.country === "India").length,
    UAE: jobs.filter((j) => j.country === "UAE").length,
  };

  return (
    <>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-ui text-ink-soft" aria-live="polite">
          {visible.length} open {visible.length === 1 ? "position" : "positions"}
        </p>
        <CountryFilter id="job-filter" label="Filter vacancies by country" value={filter} onChange={setFilter} counts={counts} />
      </div>
      <ul className="mt-8 border-t border-line">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((j) => (
            <motion.li
              key={j.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <JobCard job={j} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {visible.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg font-semibold text-ink">No Roles Available at the Moment</p>
          <p className="mt-2 text-ink-soft">Check Back Soon</p>
        </div>
      )}
    </>
  );
}
