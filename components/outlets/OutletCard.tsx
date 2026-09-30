import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Outlet } from "@/lib/types";
import { CountryBadge, Badge } from "@/components/ui/Badge";
import { OutletActions } from "./OutletActions";
import { OutletMeta } from "./OutletMeta";

/** Full outlet card used on the Outlets page. */
export function OutletCard({ outlet }: { outlet: Outlet }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white transition-colors duration-500 hover:border-line-strong">
      <Link href={`/outlets/${outlet.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-soft-grey" tabIndex={-1} aria-hidden>
        <Image
          src={outlet.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-premium)] group-hover:scale-[1.05]"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          <CountryBadge country={outlet.country} onImage />
          {outlet.format === "Xpress" && <Badge tone="dark">Xpress</Badge>}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-ui text-xs uppercase tracking-[0.2em] text-ink-muted">{outlet.city}</p>
            <h3 className="mt-1.5 text-2xl tracking-[-0.025em]">
              <Link href={`/outlets/${outlet.slug}`} className="hover:text-smile-blue">
                {outlet.name}
              </Link>
            </h3>
          </div>
          <ArrowUpRight aria-hidden className="mt-1 size-5 shrink-0 text-ink-muted transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
        <OutletMeta outlet={outlet} className="mt-5 flex-1" />
        <OutletActions outlet={outlet} layout="stacked" labels={{ call: "Call" }} className="mt-6 border-t border-line pt-5" />
      </div>
    </article>
  );
}
