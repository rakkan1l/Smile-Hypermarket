import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ResolvedOffer } from "@/data/offers";
import { outletName } from "@/data/outlets";
import { formatDateRange } from "@/lib/format";
import { OfferPoster } from "./OfferPoster";
import { OfferStatusBadge } from "./OfferStatusBadge";

export function outletSummary(offer: ResolvedOffer) {
  if (offer.participatingOutlets === "all") return "All Smile outlets";
  const names = offer.participatingOutlets.map(outletName);
  return names.length > 3 ? `${names.slice(0, 3).join(", ")} +${names.length - 3} more` : names.join(", ");
}

export function OfferCard({ offer }: { offer: ResolvedOffer }) {
  return (
    <article className="group relative flex h-full flex-col">
      <OfferPoster
        offer={offer}
        compact
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="aspect-[4/5] rounded-[var(--radius-lg)]"
      />
      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-center justify-between gap-3">
          <OfferStatusBadge status={offer.status} />
          <span className="text-xs text-ink-muted">{formatDateRange(offer.startDate, offer.endDate)}</span>
        </div>
        <h3 className="mt-4 text-2xl tracking-[-0.025em]">
          <Link href={`/offers/${offer.slug}`} className="after:absolute after:inset-0">
            {offer.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-ink-soft">{offer.description}</p>
        <p className="mt-3 text-sm text-ink-muted">{outletSummary(offer)}</p>
        <span className="mt-5 inline-flex items-center gap-2 font-ui text-[15px] text-smile-blue">
          View Offer
          <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
