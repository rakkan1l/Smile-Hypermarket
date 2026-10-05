import type { Metadata } from "next";
import { getComingSoonOutlets, getOpenOutlets } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { EditorialHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OutletsExplorer } from "@/components/outlets/OutletsExplorer";
import { ComingSoonCard } from "@/components/outlets/ComingSoonCard";

export const metadata: Metadata = buildMetadata({
  title: "Outlets",
  description: "Discover Smile Hypermarket locations across India and the UAE — addresses, opening hours, directions and contact details for every outlet.",
  path: "/outlets",
});

export default async function OutletsPage() {
  const [openOutlets, comingSoonOutlets] = await Promise.all([getOpenOutlets(), getComingSoonOutlets()]);
  return (
    <>
      <EditorialHero
        eyebrow="Outlets"
        title="Find Your Nearest Smile"
        description="Discover Smile Hypermarket locations across India and the UAE."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Outlets" }]}
      />

      <OutletsExplorer outlets={openOutlets} />

      {comingSoonOutlets.length > 0 && (
        <section aria-labelledby="coming-soon-heading" className="py-20 sm:py-28">
          <Container>
            <SectionHeading id="coming-soon-heading" eyebrow="Coming Soon" title="The next Smile is on its way" className="mb-12" />
            <div className="space-y-6">
              {comingSoonOutlets.map((o) => (
                <ComingSoonCard key={o.slug} outlet={o} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
