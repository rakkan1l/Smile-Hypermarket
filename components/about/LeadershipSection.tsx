import { getLeadership } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadershipProfile } from "./LeadershipProfile";

/**
 * About-page leadership: all leaders shown as full editorial profiles.
 */
export async function LeadershipSection() {
  const leadership = await getLeadership();
  return (
    <section aria-labelledby="leadership-heading" className="bg-off-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="leadership-heading"
          eyebrow="Leadership"
          title="The People Behind Smile"
          description="The leadership team guiding Smile's growth from Kannur to the UAE."
        />
        <div className="mt-16 space-y-24 lg:mt-24 lg:space-y-32">
          {leadership.map((l, i) => (
            <LeadershipProfile key={l.id} leader={l} flip={i % 2 === 1} showStory={false} />
          ))}
        </div>
      </Container>
    </section>
  );
}
