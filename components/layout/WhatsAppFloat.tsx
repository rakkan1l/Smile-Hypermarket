"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import type { Outlet } from "@/lib/types";
import { whatsappHref } from "@/lib/links";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/** Global floating WhatsApp button with an outlet picker. */
export function WhatsAppFloat({ outlets: openOutlets }: { outlets: Outlet[] }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const groups = (["India", "UAE"] as const).map((country) => ({
    country,
    items: openOutlets.filter((o) => o.country === country),
  }));

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="whatsapp-picker"
            role="dialog"
            aria-label="Choose a Smile outlet to chat with"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-[min(340px,calc(100vw-2rem))] origin-bottom-right overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white shadow-[0_24px_60px_-20px_rgba(21,24,29,0.35)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-line p-5">
              <p className="font-display text-lg leading-snug">Which Smile outlet would you like to contact?</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close outlet picker"
                className="-mr-1 -mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-soft-grey"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {groups.map((g) => (
                <div key={g.country} className="py-1">
                  <p className="px-3 pb-1 pt-2 font-ui text-[11px] uppercase tracking-[0.2em] text-ink-muted">{g.country}</p>
                  <ul>
                    {g.items.map((o) => (
                      <li key={o.slug}>
                        <a
                          href={whatsappHref(o.whatsapp, `Hello Smile ${o.shortName}, `)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between rounded-[var(--radius)] px-3 py-3 transition-colors hover:bg-light-green focus-visible:bg-light-green"
                        >
                          <span className="font-ui text-[15px] text-ink">{o.shortName}</span>
                          <ArrowUpRight
                            aria-hidden
                            className="size-4 text-ink-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-smile-green"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="whatsapp-picker"
        aria-label="Chat With Smile on WhatsApp"
        className="group relative flex h-14 items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-10px_rgba(37,211,102,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
      >
        <span className="absolute inset-0 animate-soft-pulse rounded-full" aria-hidden />
        <span className="grid size-14 place-items-center">
          {open ? <X className="size-6" aria-hidden /> : <WhatsAppIcon className="size-7" />}
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap font-ui text-[15px] transition-all duration-500 ease-[var(--ease-premium)] group-hover:max-w-[160px] group-hover:pr-5 group-focus-visible:max-w-[160px] group-focus-visible:pr-5">
          Chat With Smile
        </span>
      </button>
    </div>
  );
}
