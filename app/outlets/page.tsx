import type { Metadata } from "next";
import { comingSoonOutlets, openOutlets } from "@/data/outlets";
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

export default function OutletsPage() {
  const india = openOutlets.filter((o) => o.country === "India").length;
  const uae = openOutlets.filter((o) => o.country === "UAE").length;
  return (
    <>
      <EditorialHero
        eyebrow="Outlets"
        title="Find Your Nearest Smile"
        description="Discover Smile Hypermarket locations across India and the UAE."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Outlets" }]}
        aside={
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line">
            {[
              { label: "India", value: india, note: "Kannur district" },
              { label: "UAE", value: uae, note: "Ajman" },
            ].map((s) => (
              <div key={s.label} className="bg-white p-6">
                <dt className="font-ui text-xs uppercase tracking-[0.2em] text-ink-muted">{s.label}</dt>
                <dd className="mt-2 font-display text-5xl tracking-[-0.04em]">{String(s.value).padStart(2, "0")}</dd>
                <dd className="mt-1 text-sm text-ink-soft">{s.note}</dd>
              </div>
            ))}
          </dl>
        }
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
