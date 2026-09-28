import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CalendarDays, Check } from "lucide-react";
import { getOffer, getOffers, offers } from "@/data/offers";
import { getOutlet, openOutlets } from "@/data/outlets";
import { buildMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/format";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { CountryBadge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OfferPoster } from "@/components/offers/OfferPoster";
import { OfferStatusBadge } from "@/components/offers/OfferStatusBadge";
import { OfferCard } from "@/components/offers/OfferCard";

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return offers.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: PageProps<"/offers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const offer = getOffer(slug);
  if (!offer) return {};
  return buildMetadata({ title: offer.title, description: `${offer.tagline}. ${offer.description}`, path: `/offers/${offer.slug}`, image: offer.poster });
}

export default async function OfferPage({ params }: PageProps<"/offers/[slug]">) {
  const { slug } = await params;
  const offer = getOffer(slug);
  if (!offer) notFound();

  const branches =
    offer.participatingOutlets === "all"
      ? openOutlets
      : offer.participatingOutlets.map(getOutlet).filter((o): o is NonNullable<typeof o> => Boolean(o));
  const more = getOffers()
    .filter((o) => o.slug !== offer.slug && o.status !== "expired")
    .slice(0, 3);

  return (
    <>
      <section className="pb-20 pt-28 sm:pb-28 sm:pt-36">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Offers", href: "/offers" }, { label: offer.title }]} className="mb-10" />
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="group lg:col-span-6">
              <OfferPoster
                offer={offer}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[4/5] rounded-[var(--radius-lg)] lg:sticky lg:top-28"
              />
            </div>

            <div className="animate-[rise_1s_0.1s_cubic-bezier(0.22,1,0.36,1)_both] lg:col-span-6 lg:pt-4">
              <div className="flex flex-wrap items-center gap-3">
                <OfferStatusBadge status={offer.status} />
                <span className="font-ui text-xs uppercase tracking-[0.2em] text-ink-muted">{offer.category}</span>
              </div>
              <h1 className="mt-6 text-balance text-5xl leading-[1] tracking-[-0.04em] sm:text-6xl lg:text-7xl">{offer.title}</h1>
              <p className="mt-4 font-display text-xl text-ink-soft sm:text-2xl">{offer.tagline}</p>

              <div className="mt-8 flex items-center gap-4 rounded-[var(--radius-lg)] border border-line p-5">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-light-blue text-smile-blue">
                  <CalendarDays aria-hidden className="size-5" />
                </span>
                <div>
                  <p className="font-ui text-xs uppercase tracking-[0.2em] text-ink-muted">Valid</p>
                  <p className="mt-1 text-ink">
                    <time dateTime={offer.startDate}>{formatDate(offer.startDate)}</time> –{" "}
                    <time dateTime={offer.endDate}>{formatDate(offer.endDate)}</time>
                  </p>
                </div>
              </div>

              <p className="mt-8 text-lg leading-relaxed text-ink-soft">{offer.description}</p>

              <ul className="mt-8 space-y-3">
                {offer.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-smile-green" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                <h2 className="font-ui text-xs uppercase tracking-[0.2em] text-ink-muted">Available at</h2>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {branches.map((b) => (
                    <li key={b.slug}>
                      <Link href={`/outlets/${b.slug}`} className="group/row flex items-center justify-between gap-4 py-4">
                        <span className="flex items-center gap-3">
                          <span className="font-display text-lg tracking-[-0.02em] transition-colors group-hover/row:text-smile-blue">{b.name}</span>
                          <CountryBadge country={b.country} />
                        </span>
                        <ArrowUpRight aria-hidden className="size-4 text-ink-muted transition-transform group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <details className="group/terms mt-10 rounded-[var(--radius-lg)] border border-line bg-off-white">
                <summary className="flex cursor-pointer list-none items-center justify-between p-5 font-ui text-[15px] [&::-webkit-details-marker]:hidden">
                  Terms &amp; conditions
                  <span aria-hidden className="text-xl leading-none text-ink-muted transition-transform group-open/terms:rotate-45">+</span>
                </summary>
                <ul className="list-disc space-y-2 px-10 pb-6 text-sm leading-relaxed text-ink-soft">
                  {offer.terms.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </details>

              <div className="mt-10">
                <ButtonLink href="/outlets" size="lg" arrow>
                  Find Nearest Outlet
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {more.length > 0 && (
        <section aria-labelledby="more-offers-heading" className="border-t border-line py-20 sm:py-28">
          <Container>
            <SectionHeading
              id="more-offers-heading"
              title="More offers"
              action={
                <ButtonLink href="/offers" variant="outline" arrow>
                  View All Offers
                </ButtonLink>
              }
              className="mb-12"
            />
            <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((o) => (
                <li key={o.slug}>
                  <OfferCard offer={o} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
