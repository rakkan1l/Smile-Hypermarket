"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { Outlet } from "@/lib/types";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge, CountryBadge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { MapPanel } from "@/components/outlets/MapPanel";
import { OutletActions } from "@/components/outlets/OutletActions";
import { OutletMeta } from "@/components/outlets/OutletMeta";
import { ContactForm } from "./ContactForm";

export function ContactExplorer({ outlets }: { outlets: Outlet[] }) {
  const [slug, setSlug] = useState(outlets[0]?.slug);
  const selected = outlets.find((o) => o.slug === slug) ?? outlets[0];
  const groups = [
    { label: "India", items: outlets.filter((o) => o.country === "India" && o.status === "open") },
    { label: "UAE", items: outlets.filter((o) => o.country === "UAE" && o.status === "open") },
    { label: "Coming Soon", items: outlets.filter((o) => o.status === "coming-soon") },
  ].filter((g) => g.items.length);
  const comingSoon = selected.status === "coming-soon";

  return (
    <>
      <section aria-labelledby="branch-heading" className="pb-20 sm:pb-28">
        <Container>
          <div className="grid gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <h2 id="branch-heading" className="text-2xl tracking-[-0.025em]">
                Choose an outlet
              </h2>
              <div className="mt-6 space-y-6">
                {groups.map((g) => (
                  <div key={g.label} role="group" aria-label={g.label}>
                    <p className="font-ui text-xs uppercase tracking-[0.22em] text-ink-muted">{g.label}</p>
                    <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                      {g.items.map((o) => {
                        const active = o.slug === selected.slug;
                        return (
                          <li key={o.slug}>
                            <button
                              type="button"
                              onClick={() => setSlug(o.slug)}
                              aria-pressed={active}
                              className={cn(
                                "flex w-full items-center justify-between gap-3 rounded-full border px-4 py-2.5 text-left font-ui text-[15px] transition-colors duration-300 lg:rounded-[var(--radius)] lg:border-transparent lg:px-4 lg:py-3",
                                active ? "border-ink bg-ink text-white lg:bg-light-blue lg:text-ink" : "border-line text-ink-soft hover:text-ink lg:hover:bg-off-white",
                              )}
                            >
                              {o.name}
                              {active && <span aria-hidden className="hidden size-1.5 rounded-full bg-smile-green lg:block" />}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid overflow-hidden rounded-[var(--radius-lg)] border border-line lg:col-span-8 xl:grid-cols-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col p-6 sm:p-8"
                  aria-live="polite"
                >
                  <div className="flex flex-wrap gap-2">
                    <CountryBadge country={selected.country} />
                    {comingSoon && (
                      <Badge tone="amber">
                        <Sparkles aria-hidden className="size-3.5" /> Coming Soon
                      </Badge>
                    )}
                  </div>
                  <p className="mt-5 font-display text-3xl tracking-[-0.03em] sm:text-4xl">{selected.name}</p>
                  {comingSoon ? (
                    <p className="mt-4 leading-relaxed text-ink-soft">
                      This outlet is not open yet. For opening updates, please use the form below or contact our main team.
                    </p>
                  ) : (
                    <OutletMeta outlet={selected} fields={["address", "phone", "whatsapp", "email", "hours"]} className="mt-6" />
                  )}
                  <div className="mt-auto pt-8">
                    {comingSoon ? (
                      <ButtonLink href={`/outlets/${selected.slug}`} variant="outline" arrow>
                        About this outlet
                      </ButtonLink>
                    ) : (
                      <OutletActions outlet={selected} layout="stacked" labels={{ call: "Call" }} />
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
              <MapPanel outlet={selected} className="min-h-[340px] border-t border-line xl:border-l xl:border-t-0" />
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="form-heading" className="border-t border-line bg-off-white py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading
                id="form-heading"
                eyebrow="Write to us"
                title="Send us a message"
                description="Questions, feedback or product requests — our team reads every message."
              />
            </div>
            <div className="rounded-[var(--radius-lg)] border border-line bg-white p-6 sm:p-10 lg:col-span-8">
              <ContactForm outletSlug={selected.slug} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
