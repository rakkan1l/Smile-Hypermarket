import type { Metadata } from "next";
import Image from "next/image";
import { GraduationCap, HeartHandshake, TrendingUp } from "lucide-react";
import { openJobs } from "@/data/jobs";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/metadata";
import { ImageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JobsList } from "@/components/careers/JobsList";
import { ApplicationForm } from "@/components/careers/ApplicationForm";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description: "Join a growing team building better retail experiences across India and the UAE. View open positions at Smile Hypermarket.",
  path: "/careers",
  image: images.checkout,
});

const perks = [
  { Icon: TrendingUp, title: "Grow with us", body: "As Smile expands across India and the UAE, so do the opportunities for our people." },
  { Icon: GraduationCap, title: "Learn on the floor", body: "Hands-on training from experienced retail leaders, from your first day onwards." },
  { Icon: HeartHandshake, title: "A family culture", body: "Respect, teamwork and genuine care — for customers and for each other." },
];

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

      <section aria-labelledby="why-work-heading" className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                id="why-work-heading"
                eyebrow="Life at Smile"
                title="More than a job — a place to grow"
                description="From store teams to head office, Smile people share one goal: making every family's shopping trip a little better."
              />
              <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] lg:block">
                <Image src={images.shopper} alt="Customer shopping in a bright Smile aisle" fill sizes="40vw" className="object-cover" />
              </div>
            </div>
            <ul className="self-end lg:col-span-7">
              {perks.map(({ Icon, title, body }, i) => (
                <Reveal as="li" key={title} delay={i * 0.06} className="flex gap-6 border-t border-line py-8 last:border-b">
                  <Icon aria-hidden strokeWidth={1.4} className="mt-1 size-7 shrink-0 text-smile-green" />
                  <div>
                    <h3 className="text-2xl tracking-[-0.025em] sm:text-3xl">{title}</h3>
                    <p className="mt-2 max-w-md leading-relaxed text-ink-soft">{body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section id="positions" aria-labelledby="positions-heading" className="scroll-mt-24 bg-off-white py-20 sm:py-28">
        <Container>
          <SectionHeading id="positions-heading" eyebrow="Vacancies" title="Open positions" className="mb-10" />
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
