import type { Metadata } from "next";
import { openJobs } from "@/data/jobs";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/metadata";
import { ImageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { JobsList } from "@/components/careers/JobsList";
import { ApplicationForm } from "@/components/careers/ApplicationForm";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description: "Join a growing team building better retail experiences across India and the UAE. View open positions at Smile Hypermarket.",
  path: "/careers",
  image: images.checkout,
});

export default function CareersPage() {
  return (
    <>
      <ImageHero
        eyebrow="Careers"
        title="Build Your Future With Smile"
        description="Join a growing team building better retail experiences across India and the UAE."
        image={images.checkout}
        imageAlt="Smile team member serving a customer at the checkout"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      >
        <ButtonLink href="#positions" variant="light" size="lg" arrow>
          View Open Positions
        </ButtonLink>
      </ImageHero>

      <section id="positions" aria-labelledby="positions-heading" className="scroll-mt-24 bg-off-white py-20 sm:py-28">
        <Container>
          <SectionHeading id="positions-heading" eyebrow="Vacancies" title="Career Opportunities" className="mb-10" />
          <JobsList jobs={openJobs} />
        </Container>
      </section>

      <section id="apply" aria-labelledby="apply-heading" className="scroll-mt-24 py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading
                id="apply-heading"
                eyebrow="Apply"
                title="Don't see the right role?"
                description="Send us a general application and we'll keep your details on file for future openings."
              />
            </div>
            <div className="lg:col-span-8">
              <ApplicationForm defaultPosition="General application" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
