import { featuredOutlets, openOutlets } from "@/data/outlets";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { OutletTile } from "@/components/outlets/OutletTile";
import { cn } from "@/lib/cn";

export function OutletPreview() {
  const countries = new Set(openOutlets.map((o) => o.country)).size;
  return (
    <section aria-labelledby="outlets-heading" className="overflow-hidden border-t border-line py-20 sm:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              id="outlets-heading"
              eyebrow="Our Outlets"
              title="Smile Across Borders"
              description="From the neighbourhoods of Kannur to the heart of Ajman — find a Smile close to home."
            />
          </div>
          <dl className="flex gap-10 lg:col-span-5 lg:justify-end">
            <div>
              <dt className="font-ui text-xs uppercase tracking-[0.2em] text-ink-muted">Outlets</dt>
              <dd className="mt-1 font-display text-5xl tracking-[-0.04em]">{String(openOutlets.length).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt className="font-ui text-xs uppercase tracking-[0.2em] text-ink-muted">Countries</dt>
              <dd className="mt-1 font-display text-5xl tracking-[-0.04em]">{String(countries).padStart(2, "0")}</dd>
            </div>
          </dl>
        </div>

        <ul className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:mt-16 lg:grid-cols-4">
          {featuredOutlets.map((o, i) => (
            <Reveal as="li" key={o.slug} delay={i * 0.08} className={cn("w-[78%] shrink-0 snap-start sm:w-auto", i % 2 === 1 && "lg:mt-16")}>
              <OutletTile outlet={o} />
            </Reveal>
          ))}
        </ul>

        <div className="mt-12 flex justify-start lg:mt-4 lg:justify-end">
          <ButtonLink href="/outlets" variant="outline" arrow>
            Explore All Outlets
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
