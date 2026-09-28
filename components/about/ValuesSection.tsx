import { Award, HeartHandshake, Scale, Sprout, Users } from "lucide-react";
import { values } from "@/data/story";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = { Trust: HeartHandshake, Quality: Award, Value: Scale, Community: Users, Growth: Sprout } as const;

export function ValuesSection() {
  return (
    <section aria-labelledby="values-heading" className="border-t border-line py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                id="values-heading"
                eyebrow="Our Values"
                title="What every Smile stands for"
                description="Five values that guide how we choose products, set prices, treat our people and grow."
              />
            </div>
          </div>
          <ul className="lg:col-span-8">
            {values.map((v, i) => {
              const Icon = icons[v.title as keyof typeof icons];
              return (
                <li key={v.title} className="group grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-line py-8 last:border-b sm:grid-cols-[64px_1fr_auto] sm:items-center sm:py-10">
                  <span className="font-ui text-sm text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                  <div className="sm:flex sm:items-baseline sm:gap-10">
                    <h3 className="text-4xl tracking-[-0.035em] transition-colors duration-500 group-hover:text-smile-blue sm:w-56 sm:shrink-0 sm:text-5xl">{v.title}</h3>
                    <p className="mt-3 max-w-sm leading-relaxed text-ink-soft sm:mt-0">{v.body}</p>
                  </div>
                  <Icon aria-hidden strokeWidth={1.3} className="hidden size-7 text-ink-muted transition-all duration-500 group-hover:text-smile-green sm:block" />
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
