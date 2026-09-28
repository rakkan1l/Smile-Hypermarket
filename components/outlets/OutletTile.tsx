import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Outlet } from "@/lib/types";
import { CountryBadge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

/** Compact image-led outlet preview used on the homepage. */
export function OutletTile({ outlet, className }: { outlet: Outlet; className?: string }) {
  return (
    <article className={cn("group relative", className)}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-lg)] bg-soft-grey">
        <Image
          src={outlet.image}
          alt={`Inside Smile ${outlet.name}`}
          fill
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 80vw"
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-premium)] group-hover:scale-[1.05]"
        />
        <CountryBadge country={outlet.country} onImage className="absolute left-4 top-4" />
      </div>
      <div className="pt-5">
        <h3 className="text-2xl tracking-[-0.025em]">{outlet.name}</h3>
        <p className="mt-1 text-sm text-ink-soft">
          {outlet.area}, {outlet.city}
        </p>
        <Link
          href={`/outlets/${outlet.slug}`}
          className="mt-4 inline-flex items-center gap-2 font-ui text-[15px] text-smile-blue after:absolute after:inset-0"
        >
          View location
          <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
