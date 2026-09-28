import { getFeaturedOffer } from "@/data/offers";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeaturedOffer } from "@/components/offers/FeaturedOffer";

export function OfferPreview() {
  const offer = getFeaturedOffer();
  return (
    <section aria-labelledby="offers-heading" className="py-20 sm:py-28">
      <Container>
        <SectionHeading id="offers-heading" eyebrow="Offers" title="Offers Worth Smiling About" className="mb-12 sm:mb-16" />
        <FeaturedOffer offer={offer} />
      </Container>
    </section>
  );
}
