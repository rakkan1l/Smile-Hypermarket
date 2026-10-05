import type { Metadata } from "next";
import { getLeadership } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { EditorialHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { LeadershipProfile } from "@/components/about/LeadershipProfile";

export const metadata: Metadata = buildMetadata({
  title: "Leadership",
  description: "Meet the Chairman, Managing Director, Executive Director and Managing Partners leading Smile Hypermarket across India and the UAE.",
  path: "/leadership",
});

export default async function LeadershipPage() {
  const leadership = await getLeadership();
  return (
    <>
      <EditorialHero
        eyebrow="Leadership"
        title="The People Behind Smile"
        description="A leadership team rooted in Kannur, guiding Smile's growth across India and the UAE with the same values that built the first store."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our Story", href: "/about" }, { label: "Leadership" }]}
      />
      <section aria-label="Leadership profiles" className="border-t border-line pb-24 pt-16 sm:pb-32 sm:pt-24">
        <Container className="space-y-24 lg:space-y-36">
          {leadership.map((l, i) => (
            <LeadershipProfile key={l.id} leader={l} flip={i % 2 === 1} />
          ))}
        </Container>
      </section>
    </>
  );
}
