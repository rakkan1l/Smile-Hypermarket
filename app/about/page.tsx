import type { Metadata } from "next";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/metadata";
import { ImageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Timeline } from "@/components/about/Timeline";
import { ValuesSection } from "@/components/about/ValuesSection";
import { LeadershipSection } from "@/components/about/LeadershipSection";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "Our Story",
  description: "From serving local communities in Kannur to expanding into the UAE — discover the story, values and people behind Smile Hypermarket.",
  path: "/about",
  image: images.supermarketWide,
});

export default function AboutPage() {
  return (
    <>
      <ImageHero
        eyebrow="Our Story"
        title="A Journey Built on Trust"
        description="From serving local communities in Kannur to expanding into the UAE, Smile continues to grow with the same promise of quality, value and care."
        image={images.supermarketWide}
        imageAlt="Wide view of a Smile hypermarket shop floor"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our Story" }]}
      />

      <section aria-label="Introduction" className="py-20 sm:py-28">
        <Container>
          <Reveal className="grid gap-10 lg:grid-cols-12">
            <p className="font-ui text-xs uppercase tracking-[0.24em] text-ink-muted lg:col-span-3 lg:pt-3">Since the beginning</p>
            <p className="text-balance font-display text-3xl leading-[1.18] tracking-[-0.025em] text-ink sm:text-4xl lg:col-span-9 lg:text-[44px]">
              Smile was built on a simple idea: that the families of Kannur deserved a modern hypermarket that still felt like their own.
              <span className="text-ink-muted"> Today, that same idea welcomes families in the UAE — many of whom first knew Smile back home.</span>
            </p>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="story-heading" className="pb-20 sm:pb-28">
        <Container>
          <SectionHeading id="story-heading" eyebrow="Milestones" title="The Story Behind Every Smile" align="center" className="mb-16 lg:mb-24" />
          <Timeline />
        </Container>
      </section>

      <ValuesSection />
      <LeadershipSection />

      <section aria-label="Visit Smile" className="py-20 sm:py-28">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <h2 className="max-w-2xl text-balance text-4xl leading-[1.05] tracking-[-0.035em] sm:text-5xl">Come and see what the Smile promise feels like.</h2>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/outlets" arrow>
              Find an Outlet
            </ButtonLink>
            <ButtonLink href="/careers" variant="outline">
              Join the Team
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
