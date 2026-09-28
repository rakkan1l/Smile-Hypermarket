import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items, tone = "dark", className }: { items: Crumb[]; tone?: "dark" | "light"; className?: string }) {
  const muted = tone === "light" ? "text-white/70 hover:text-white" : "text-ink-soft hover:text-ink";
  const current = tone === "light" ? "text-white" : "text-ink";
  return (
    <nav aria-label="Breadcrumb" className={cn("font-ui text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link href={item.href} className={cn("transition-colors", muted)}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={current}>
                  {item.label}
                </span>
              )}
              {!last && <ChevronRight aria-hidden className={cn("size-3.5", tone === "light" ? "text-white/50" : "text-ink-muted")} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
