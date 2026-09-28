import type { Metadata } from "next";
import { getFeaturedOffer, getOffers } from "@/data/offers";
import { buildMetadata } from "@/lib/metadata";
import { EditorialHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { FeaturedOffer } from "@/components/offers/FeaturedOffer";
import { OffersGrid } from "@/components/offers/OffersGrid";

export const metadata: Metadata = buildMetadata({
  title: "Offers",
  description: "Discover the latest Smile Hypermarket campaigns, seasonal offers and special promotions across India and the UAE.",
  path: "/offers",
});

export const revalidate = 86400;

export default function OffersPage() {
  const featured = getFeaturedOffer();
  const offers = getOffers();
  return (
    <>
      <EditorialHero
        eyebrow="Offers"
        title="Smile More. Save More."
        description="Discover the latest Smile campaigns, seasonal offers and special promotions."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Offers" }]}
      />
      <section aria-label="Featured campaign" className="pb-20 sm:pb-28">
        <Container>
          <FeaturedOffer offer={featured} cta={{ label: "View Offer", href: `/offers/${featured.slug}` }} headingLevel="h2" />
        </Container>
      </section>
      <section aria-labelledby="all-offers-heading" className="border-t border-line py-20 sm:py-28">
        <Container>
          <OffersGrid offers={offers} />
        </Container>
      </section>
    </>
  );
}
