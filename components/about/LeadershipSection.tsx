import { leadership } from "@/data/leadership";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { LeadershipProfile } from "./LeadershipProfile";
import { LeaderPortrait } from "./LeaderPortrait";

/**
 * About-page leadership: the first two leaders as full editorial profiles,
 * the rest as a quieter row that links to the full /leadership page.
 */
export function LeadershipSection() {
  const [first, second, ...rest] = leadership;
  return (
    <section aria-labelledby="leadership-heading" className="bg-off-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="leadership-heading"
          eyebrow="Leadership"
          title="The People Behind Smile"
          description="The leadership team guiding Smile's growth from Kannur to the UAE."
          action={
            <ButtonLink href="/leadership" variant="outline" arrow>
              Meet the full team
            </ButtonLink>
          }
        />
        <div className="mt-16 space-y-24 lg:mt-24 lg:space-y-32">
          {[first, second].filter(Boolean).map((l, i) => (
            <LeadershipProfile key={l.id} leader={l} flip={i % 2 === 1} />
          ))}
        </div>

        {rest.length > 0 && (
          <ul className="mt-24 grid gap-8 border-t border-line pt-16 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((l) => (
              <li key={l.id} className="group">
                <LeaderPortrait leader={l} sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw" className="aspect-[4/5] rounded-[var(--radius-lg)]" />
                <p className="mt-5 font-ui text-xs uppercase tracking-[0.2em] text-smile-blue">{l.position}</p>
                <h3 className="mt-2 text-2xl tracking-[-0.025em]">{l.name}</h3>
                <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-ink-soft">{l.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
