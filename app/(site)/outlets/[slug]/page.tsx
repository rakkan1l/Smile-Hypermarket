import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Sparkles } from "lucide-react";
import { getOutlet, openOutlets, outlets } from "@/data/outlets";
import { buildMetadata } from "@/lib/metadata";
import { ImageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge, CountryBadge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { OutletActions } from "@/components/outlets/OutletActions";
import { OutletMeta } from "@/components/outlets/OutletMeta";
import { MapPanel } from "@/components/outlets/MapPanel";
import { OutletGallery } from "@/components/outlets/OutletGallery";
import { OutletTile } from "@/components/outlets/OutletTile";

export const dynamicParams = false;

export function generateStaticParams() {
  return outlets.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: PageProps<"/outlets/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const outlet = getOutlet(slug);
  if (!outlet) return {};
  return buildMetadata({
    title: `${outlet.name} — ${outlet.city}, ${outlet.country}`,
    description:
      outlet.status === "coming-soon"
        ? `Smile Hypermarket ${outlet.name} is coming soon to ${outlet.city}, ${outlet.country}.`
        : `Smile ${outlet.name}, ${outlet.city}: address, phone, WhatsApp, opening hours, directions and departments.`,
    path: `/outlets/${outlet.slug}`,
    image: outlet.image,
  });
}

export default async function OutletPage({ params }: PageProps<"/outlets/[slug]">) {
  const { slug } = await params;
  const outlet = getOutlet(slug);
  if (!outlet) notFound();

  const comingSoon = outlet.status === "coming-soon";
  const nearby = openOutlets.filter((o) => o.slug !== outlet.slug && o.country === outlet.country).slice(0, 3);

  return (
    <>
      <ImageHero
        eyebrow={comingSoon ? "Coming Soon" : `${outlet.format} · ${outlet.city}`}
        title={outlet.name}
        description={outlet.intro}
        image={outlet.image}
        imageAlt={comingSoon ? `${outlet.area}, ${outlet.city}` : `Inside Smile ${outlet.name}`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Outlets", href: "/outlets" }, { label: outlet.shortName }]}
      >
        {comingSoon ? (
          <Badge tone="amber" className="px-4 py-2 text-sm">
            <Sparkles aria-hidden className="size-4" /> Opening soon in {outlet.area}
          </Badge>
        ) : (
          <OutletActions outlet={outlet} size="md" tone="light" labels={{ call: "Call Now" }} />
        )}
      </ImageHero>

      <section aria-labelledby="visit-heading" className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <CountryBadge country={outlet.country} />
                {outlet.format === "Xpress" && <Badge tone="neutral">Xpress format</Badge>}
              </div>
              <h2 id="visit-heading" className="mt-6 text-4xl leading-[1.05] tracking-[-0.035em] sm:text-5xl">
                {comingSoon ? "Opening soon" : "Visit this outlet"}
              </h2>
              {comingSoon ? (
                <p className="mt-6 max-w-md leading-relaxed text-ink-soft">
                  We&rsquo;re preparing to welcome families in {outlet.area}. Follow Smile on social media or contact our team for opening
                  updates.
                </p>
              ) : (
                <OutletMeta outlet={outlet} fields={["address"]} className="mt-8 text-base" />
              )}
              <div className="mt-10">
                {comingSoon ? (
                  <ButtonLink href="/contact" arrow>
                    Contact Smile
                  </ButtonLink>
                ) : (
                  <OutletActions outlet={outlet} size="md" labels={{ call: "Call Now" }} />
                )}
              </div>
            </div>
            <MapPanel outlet={outlet} className="min-h-[380px] rounded-[var(--radius-lg)] border border-line lg:col-span-7 lg:min-h-[520px]" />
          </div>
        </Container>
      </section>

      {!comingSoon && outlet.gallery.length > 0 && (
        <section aria-labelledby="gallery-heading" className="pb-20 sm:pb-28">
          <Container>
            <SectionHeading id="gallery-heading" eyebrow="Gallery" title={`Inside Smile ${outlet.shortName}`} className="mb-10" />
            <OutletGallery photos={outlet.gallery} name={outlet.shortName} />
          </Container>
        </section>
      )}

      <section aria-labelledby="departments-heading" className="border-t border-line bg-off-white py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading
                id="departments-heading"
                eyebrow="Departments"
                title={comingSoon ? "What to expect" : "Available departments"}
                description="Everything your family needs, under one roof."
              />
            </div>
            <ul className="grid gap-px self-start overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-2 lg:col-span-8">
              {outlet.departments.map((d) => (
                <li key={d} className="flex items-center gap-4 bg-white px-6 py-5">
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-light-green text-smile-green-dark">
                    <Check aria-hidden className="size-4" />
                  </span>
                  <span className="font-ui text-[15px] text-ink">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {nearby.length > 0 && (
        <section aria-labelledby="nearby-heading" className="py-20 sm:py-28">
          <Container>
            <SectionHeading
              id="nearby-heading"
              eyebrow={outlet.country}
              title={`More Smile outlets in ${outlet.country === "UAE" ? "the UAE" : "India"}`}
              action={
                <ButtonLink href="/outlets" variant="outline" arrow>
                  All outlets
                </ButtonLink>
              }
              className="mb-12"
            />
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {nearby.map((o) => (
                <li key={o.slug}>
                  <OutletTile outlet={o} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
