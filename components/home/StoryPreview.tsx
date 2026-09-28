import Image from "next/image";
import { images } from "@/data/images";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";

export function StoryPreview() {
  return (
    <section aria-labelledby="story-heading" className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="relative lg:col-span-6">
            <ImageReveal className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] sm:aspect-[3/2] lg:aspect-[4/3]">
              <Image
                src={images.freshMarket}
                alt="Fresh vegetables at a Smile market counter"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
            <div className="absolute -bottom-6 right-4 hidden w-[30%] overflow-hidden rounded-[var(--radius)] border-4 border-background sm:block lg:-right-6">
              <div className="relative aspect-square">
                <Image src={images.kerala} alt="Kerala landscape, where the Smile story began" fill sizes="15vw" className="object-cover" />
              </div>
            </div>
          </div>

          <Reveal className="lg:col-span-6 lg:pl-4">
            <Eyebrow>Our Journey</Eyebrow>
            <h2 id="story-heading" className="mt-4 text-3xl leading-[1.06] tracking-[-0.03em] sm:text-4xl">
              From Kannur to the UAE
            </h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Smile began as a promise to the families of Kannur: fresh food, fair prices and people who care. That promise travelled with
              the families we serve — and today it welcomes shoppers in Ajman just as warmly as it does at home in Kerala.
            </p>
            <div className="mt-7">
              <ButtonLink href="/about" size="sm" arrow>
                Discover Our Story
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
