import { CalendarDays, MapPin } from "lucide-react";
import type { ResolvedOffer } from "@/data/offers";
import { formatDateRange } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { OfferPoster } from "./OfferPoster";
import { OfferStatusBadge } from "./OfferStatusBadge";
import { outletSummary } from "./OfferCard";

/** Large featured campaign block — used on the homepage and the Offers page. */
export function FeaturedOffer({
  offer,
  cta = { label: "View All Offers", href: "/offers" },
  headingLevel = "h3",
}: {
  offer: ResolvedOffer;
  cta?: { label: string; href: string };
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  return (
    <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-14">
      <Reveal className="group lg:col-span-7">
        <OfferPoster
          offer={offer}
          priority={false}
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="aspect-[4/5] rounded-[var(--radius-lg)] sm:aspect-[16/13] lg:aspect-auto lg:h-full lg:min-h-[560px]"
        />
      </Reveal>
      <Reveal delay={0.1} className="flex flex-col justify-center lg:col-span-5">
        <div className="flex items-center gap-3">
          <Eyebrow>Featured Campaign</Eyebrow>
          <OfferStatusBadge status={offer.status} />
        </div>
        <H className="mt-6 text-4xl leading-[1.02] tracking-[-0.035em] sm:text-5xl">{offer.title}</H>
        <p className="mt-3 font-display text-xl text-ink-soft">{offer.tagline}</p>
        <p className="mt-6 max-w-md leading-relaxed text-ink-soft">{offer.description}</p>

        <dl className="mt-8 divide-y divide-line border-y border-line text-[15px]">
          <div className="flex items-center gap-4 py-4">
            <dt className="flex w-28 shrink-0 items-center gap-2 font-ui text-ink-muted">
              <CalendarDays aria-hidden className="size-4" /> Dates
            </dt>
            <dd>{formatDateRange(offer.startDate, offer.endDate)}</dd>
          </div>
          <div className="flex items-center gap-4 py-4">
            <dt className="flex w-28 shrink-0 items-center gap-2 font-ui text-ink-muted">
              <MapPin aria-hidden className="size-4" /> Where
            </dt>
            <dd>{outletSummary(offer)}</dd>
          </div>
        </dl>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={cta.href} arrow>
            {cta.label}
          </ButtonLink>
        </div>
      </Reveal>
    </div>
  );
}
