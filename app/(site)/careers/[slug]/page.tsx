import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { getJob, getJobs } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/format";
import { EditorialHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { CountryBadge } from "@/components/ui/Badge";
import { ApplicationForm } from "@/components/careers/ApplicationForm";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getJobs()).map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) return {};
  return buildMetadata({
    title: `${job.position} — ${job.branch}`,
    description: `${job.employmentType} ${job.position} role at Smile Hypermarket ${job.branch}, ${job.country}. ${job.description}`,
    path: `/careers/${job.slug}`,
  });
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="border-t border-line py-10">
      <h2 className="text-2xl tracking-[-0.025em] sm:text-3xl">{title}</h2>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-4 leading-relaxed text-ink-soft">
            <Check aria-hidden className="mt-1 size-4 shrink-0 text-smile-green" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function JobPage({ params }: PageProps<"/careers/[slug]">) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) notFound();

  const facts = [
    { label: "Branch", value: job.branch },
    { label: "Country", value: <CountryBadge country={job.country} /> },
    { label: "Employment type", value: job.employmentType },
    { label: "Department", value: job.department },
    { label: "Experience", value: job.experience },
    { label: "Posted", value: formatDate(job.postedDate) },
  ];

  return (
    <>
      <EditorialHero
        eyebrow={job.department}
        title={job.position}
        description={job.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Careers", href: "/careers" }, { label: job.position }]}
      >
        <ButtonLink href="#apply" size="lg" arrow>
          Apply Now
        </ButtonLink>
      </EditorialHero>

      <div className="border-t border-line">
        <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <aside className="lg:col-span-4 lg:order-2">
            <div className="rounded-[var(--radius-lg)] border border-line p-6 lg:sticky lg:top-28 sm:p-8">
              <h2 className="font-ui text-xs uppercase tracking-[0.2em] text-ink-muted">Role summary</h2>
              <dl className="mt-4 divide-y divide-line">
                {facts.map((f) => (
                  <div key={f.label} className="flex items-start justify-between gap-6 py-4 text-[15px]">
                    <dt className="shrink-0 text-ink-muted">{f.label}</dt>
                    <dd className="text-right text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <ButtonLink href="#apply" className="mt-6 w-full" arrow>
                Apply Now
              </ButtonLink>
            </div>
          </aside>

          <div className="lg:col-span-8 lg:order-1">
            <section className="pb-10">
              <h2 className="text-2xl tracking-[-0.025em] sm:text-3xl">Job description</h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">{job.description}</p>
            </section>
            <ListBlock title="Responsibilities" items={job.responsibilities} />
            <ListBlock title="Requirements" items={job.requirements} />
            <section className="border-t border-line py-10">
              <h2 className="text-2xl tracking-[-0.025em] sm:text-3xl">Experience</h2>
              <p className="mt-6 leading-relaxed text-ink-soft">{job.experience}</p>
            </section>

            <section id="apply" aria-labelledby="apply-heading" className="scroll-mt-28 border-t border-line pt-12">
              <h2 id="apply-heading" className="text-3xl tracking-[-0.03em] sm:text-4xl">
                Apply for this role
              </h2>
              <p className="mb-10 mt-3 text-ink-soft">
                {job.position} · {job.branch}, {job.country}
              </p>
              <ApplicationForm defaultPosition={`${job.position} — ${job.branch}`} />
            </section>
          </div>
        </Container>
      </div>
    </>
  );
}
