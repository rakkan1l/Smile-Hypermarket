"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { mainNav } from "@/data/site";
import { openOutlets } from "@/data/outlets";
import { cn } from "@/lib/cn";
import { isActivePath } from "@/lib/nav";
import { ButtonLink } from "@/components/ui/Button";
import { SocialIconLinks } from "@/components/ui/SocialIconLinks";


export function MobileMenu({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-[45] flex flex-col overflow-y-auto bg-white px-4 pb-8 pt-[96px] sm:px-8 lg:hidden"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav aria-label="Mobile">
        <ul className="border-t border-line">
          {mainNav.map((item, i) => {
            const active = isActivePath(pathname, item.href);
            return (
              <motion.li
                key={item.href}
                className="border-b border-line"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className="flex items-center justify-between py-4"
                >
                  <span className={cn("font-display text-[34px] leading-none tracking-[-0.03em]", active ? "text-ink" : "text-ink-soft")}>
                    {item.label}
                  </span>
                  {active ? (
                    <span className="size-2 rounded-full bg-smile-green" aria-hidden />
                  ) : (
                    <ArrowUpRight aria-hidden className="size-5 text-ink-muted" />
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      <motion.div
        className="mt-10 flex flex-col gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.5 }}
      >
        <ButtonLink href="/outlets" onClick={onClose} size="lg" icon={<MapPin aria-hidden className="size-4" />}>
          Find an Outlet
        </ButtonLink>

        <div>
          <p className="font-ui text-xs uppercase tracking-[0.22em] text-ink-muted">Our outlets</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{openOutlets.map((o) => o.shortName).join(" · ")}</p>
        </div>

        <SocialIconLinks />
      </motion.div>
    </motion.div>
  );
}
