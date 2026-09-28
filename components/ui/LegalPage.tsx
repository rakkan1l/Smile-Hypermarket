import { EditorialHero } from "./PageHero";
import { Container } from "./Container";

export interface LegalSection {
  heading: string;
  body: string[];
}

/** Shared layout for policy pages. */
export function LegalPage({ title, intro, updated, sections }: { title: string; intro: string; updated: string; sections: LegalSection[] }) {
  return (
    <>
      <EditorialHero eyebrow="Legal" title={title} description={intro} breadcrumbs={[{ label: "Home", href: "/" }, { label: title }]} />
      <Container className="border-t border-line pb-24 pt-14">
        <div className="grid gap-12 lg:grid-cols-12">
          <p className="font-ui text-sm text-ink-muted lg:col-span-3">Last updated {updated}</p>
          <div className="max-w-2xl space-y-12 lg:col-span-9">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-2xl tracking-[-0.025em]">{s.heading}</h2>
                {s.body.map((p) => (
                  <p key={p} className="mt-4 leading-relaxed text-ink-soft">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
