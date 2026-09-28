import Image from "next/image";
import { images } from "@/data/images";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";

export function StoryPreview() {
  return (
    <section aria-labelledby="story-heading" className="py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-7">
            <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] sm:aspect-[5/4] lg:aspect-[6/7]">
              <Image
                src={images.freshMarket}
                alt="Fresh vegetables at a Smile market counter"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
            <div className="absolute -bottom-8 right-4 hidden w-[38%] overflow-hidden rounded-[var(--radius-lg)] border-[6px] border-white sm:block lg:-right-10">
              <div className="relative aspect-square">
                <Image src={images.kerala} alt="Kerala landscape, where the Smile story began" fill sizes="20vw" className="object-cover" />
              </div>
            </div>
          </div>

          <Reveal className="lg:col-span-5 lg:pl-6">
            <Eyebrow>Our Journey</Eyebrow>
            <h2 id="story-heading" className="mt-6 text-4xl leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
              From Kannur to the UAE
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Smile began as a promise to the families of Kannur: fresh food, fair prices and people who care. That promise travelled with
              the families we serve — and today it welcomes shoppers in Ajman just as warmly as it does at home in Kerala.
            </p>
            <div className="mt-10">
              <ButtonLink href="/about" arrow>
                Discover Our Story
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
