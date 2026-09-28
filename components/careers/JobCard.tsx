import Link from "next/link";
import { ArrowRight, Briefcase, CalendarDays, MapPin } from "lucide-react";
import type { Job } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { CountryBadge } from "@/components/ui/Badge";

/** Row-style vacancy card — reads like a listing, not a tile. */
export function JobCard({ job }: { job: Job }) {
  return (
    <article className="group relative grid gap-5 border-b border-line py-8 transition-colors duration-500 hover:bg-off-white md:grid-cols-12 md:items-center md:gap-6 md:px-6">
      <div className="md:col-span-5">
        <p className="font-ui text-xs uppercase tracking-[0.2em] text-smile-blue">{job.department}</p>
        <h3 className="mt-2 text-2xl tracking-[-0.025em] sm:text-3xl">
          <Link href={`/careers/${job.slug}`} className="after:absolute after:inset-0">
            {job.position}
          </Link>
        </h3>
      </div>
      <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft md:col-span-5">
        <div className="flex items-center gap-2">
          <dt className="sr-only">Branch</dt>
          <MapPin aria-hidden className="size-4 text-ink-muted" />
          <dd>{job.branch}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="sr-only">Country</dt>
          <dd>
            <CountryBadge country={job.country} />
          </dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="sr-only">Employment type</dt>
          <Briefcase aria-hidden className="size-4 text-ink-muted" />
          <dd>{job.employmentType}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="sr-only">Posted</dt>
          <CalendarDays aria-hidden className="size-4 text-ink-muted" />
          <dd>
            Posted <time dateTime={job.postedDate}>{formatDate(job.postedDate)}</time>
          </dd>
        </div>
      </dl>
      <span className="inline-flex items-center gap-2 font-ui text-[15px] text-smile-blue md:col-span-2 md:justify-self-end">
        View Vacancy
        <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </article>
  );
}
