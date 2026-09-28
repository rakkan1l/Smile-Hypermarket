import Image from "next/image";
import type { ResolvedOffer } from "@/data/offers";
import { formatDateRange } from "@/lib/format";
import { cn } from "@/lib/cn";

/**
 * Campaign poster. If the offer has finished artwork (`posterIsArtwork`),
 * the artwork is shown untouched; otherwise a typographic poster is composed
 * over the campaign photo so every offer looks designed from day one.
 */
export function OfferPoster({
  offer,
  sizes,
  priority,
  className,
  compact,
}: {
  offer: ResolvedOffer;
  sizes: string;
  priority?: boolean;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-soft-grey", className)}>
      <Image
        src={offer.poster}
        alt={offer.posterIsArtwork ? `${offer.title} campaign poster` : ""}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-premium)] group-hover:scale-[1.04]"
      />
      {!offer.posterIsArtwork && (
        <>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
          <div className={cn("absolute inset-0 flex flex-col justify-between text-white", compact ? "p-5 sm:p-6" : "p-6 sm:p-10")}>
            <div className="flex items-center justify-between font-ui text-[11px] uppercase tracking-[0.24em] text-white/85">
              <span>Smile {offer.category}</span>
              <span>{new Date(`${offer.startDate}T00:00:00`).getFullYear()}</span>
            </div>
            <div>
              <p
                aria-hidden
                className={cn(
                  "text-balance font-display leading-[0.95] tracking-[-0.04em]",
                  compact ? "text-3xl sm:text-[34px]" : "text-4xl sm:text-6xl lg:text-7xl",
                )}
              >
                {offer.title}
              </p>
              {!compact && <p className="mt-4 max-w-md text-white/80 sm:text-lg">{offer.tagline}</p>}
              <p className="mt-4 inline-flex rounded-full border border-white/35 px-3 py-1 font-ui text-xs tracking-wide text-white/90 backdrop-blur-sm">
                {formatDateRange(offer.startDate, offer.endDate)}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
