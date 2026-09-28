import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Temporary Smile Hypermarket logo lock-up.
 * Replace the <svg> mark with the official logo file (e.g. /images/logo.svg) when available.
 */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <Link href="/" aria-label="Smile Hypermarket — Home" className={cn("group inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 40 40" className="size-9 shrink-0" aria-hidden>
        <circle cx="20" cy="20" r="19" fill={light ? "#ffffff" : "var(--smile-blue)"} />
        <path d="M11.5 21.5c2 4.6 5.1 6.9 8.5 6.9s6.5-2.3 8.5-6.9" fill="none" stroke={light ? "var(--smile-blue)" : "#ffffff"} strokeWidth="3" strokeLinecap="round" />
        <circle cx="29" cy="12.5" r="3.2" fill="var(--smile-green)" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[22px] tracking-[-0.03em] transition-colors duration-500", light ? "text-white" : "text-ink")}>smile</span>
        <span className={cn("mt-1 font-ui text-[9px] uppercase tracking-[0.34em] transition-colors duration-500", light ? "text-white/75" : "text-ink-soft")}>
          Hypermarket
        </span>
      </span>
    </Link>
  );
}
