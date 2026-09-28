"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { mainNav, site } from "@/data/site";
import { whatsappHref } from "@/lib/links";
import { cn } from "@/lib/cn";
import { isActivePath } from "@/lib/nav";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

/** Routes that open with a full-bleed dark image, where the navbar starts transparent. */
const IMAGE_HERO_ROUTES = [/^\/$/, /^\/about$/, /^\/careers$/, /^\/outlets\/[^/]+$/];


export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const overImage = IMAGE_HERO_ROUTES.some((r) => r.test(pathname));
  const transparent = overImage && !scrolled && !open;

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] rounded-full bg-ink px-4 py-2 font-ui text-sm text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-[var(--ease-premium)]",
          transparent
            ? "border-b border-transparent bg-transparent"
            : "border-b border-line bg-white/85 shadow-[0_6px_24px_-18px_rgba(21,24,29,0.25)] backdrop-blur-xl",
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between gap-6 px-4 sm:px-8 lg:h-20 lg:px-12">
          <Logo tone={transparent ? "light" : "dark"} className="relative z-[60]" />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative block px-4 py-2 font-ui text-[15px] transition-colors duration-300",
                        transparent ? "text-white/85 hover:text-white" : "text-ink-soft hover:text-ink",
                        active && (transparent ? "text-white" : "text-ink"),
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappHref(site.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Smile on WhatsApp"
              className={cn(
                "hidden size-11 items-center justify-center rounded-full border transition-colors duration-300 lg:inline-flex",
                transparent ? "border-white/30 text-white hover:bg-white/10" : "border-line text-ink-soft hover:border-smile-green hover:text-smile-green",
              )}
            >
              <WhatsAppIcon className="size-[18px]" />
            </a>
            <ButtonLink
              href="/outlets"
              variant={transparent ? "light" : "primary"}
              size="sm"
              className="h-11 max-[400px]:hidden"
              icon={<MapPin aria-hidden className="size-4" />}
            >
              Find an Outlet
            </ButtonLink>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "relative z-[60] inline-flex size-11 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden",
                transparent ? "border-white/30 text-white" : "border-line text-ink",
              )}
            >
              <span className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 h-[1.5px] w-5 bg-current transition-all duration-300 ease-[var(--ease-premium)]",
                    open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-[1.5px] w-5 bg-current transition-all duration-300 ease-[var(--ease-premium)]",
                    open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>{open && <MobileMenu pathname={pathname} onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}
