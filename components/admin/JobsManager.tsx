"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { publishChanges } from "@/app/admin/actions";
import { cn } from "@/lib/cn";

export type Job = {
  id: string;
  slug: string;
  position: string;
  department: string;
  branch: string;
  country: "India" | "UAE";
  employment_type: string;
  status: "open" | "closed";
};

export function JobsManager({ initial }: { initial: Job[] }) {
  const router = useRouter();
  const [jobs, setJobs] = useState(initial);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function toggle(job: Job) {
    setBusy(job.id);
    setError("");
    const next = job.status === "open" ? "closed" : "open";
    const { error } = await createClient().from("jobs").update({ status: next }).eq("id", job.id);
    if (error) { setError(error.message); setBusy(null); return; }
    setJobs((list) => list.map((j) => (j.id === job.id ? { ...j, status: next } : j)));
    await publishChanges(["/careers", `/careers/${job.slug}`]);
    setBusy(null);
    router.refresh();
  }

  async function remove(job: Job) {
    // Deleting loses the write-up, so make sure that is intended.
    if (!confirm(`Delete the "${job.position}" vacancy permanently?\n\nIf you just want it off the website, close it instead — that keeps the details so you can reopen it later.`)) return;
    setBusy(job.id);
    setError("");
    const { error } = await createClient().from("jobs").delete().eq("id", job.id);
    if (error) { setError(error.message); setBusy(null); return; }
    setJobs((list) => list.filter((j) => j.id !== job.id));
    await publishChanges(["/careers", `/careers/${job.slug}`]);
    setBusy(null);
    router.refresh();
  }

  if (jobs.length === 0) {
    return (
      <div className="rounded-[var(--radius-lg)] border border-dashed border-line-strong bg-background p-12 text-center">
        <p className="text-ink-soft">No vacancies yet.</p>
        <Link href="/admin/careers/new" className="mt-3 inline-block font-ui text-smile-blue">
          Post your first vacancy
        </Link>
      </div>
    );
  }

  const open = jobs.filter((j) => j.status === "open");

  return (
    <>
      {error && (
        <p role="alert" className="mb-5 rounded-[var(--radius)] bg-[#fdf2f2] px-4 py-3 text-sm text-[#c2410c] dark:bg-[#2a1618]">
          {error}
        </p>
      )}

      <p className="mb-4 font-ui text-sm text-ink-muted">
        {open.length} advertised on the website · {jobs.length - open.length} closed
      </p>

      <ul className="overflow-hidden rounded-[var(--radius-lg)] border border-line">
        {jobs.map((job) => (
          <li
            key={job.id}
            className="flex flex-wrap items-center gap-4 border-b border-line bg-background px-5 py-4 last:border-b-0"
          >
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2.5">
                <span className="truncate font-medium text-ink">{job.position}</span>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-0.5 font-ui text-[11px] uppercase tracking-wide",
                    job.status === "open"
                      ? "bg-light-green text-smile-green-dark"
                      : "bg-soft-grey text-ink-muted",
                  )}
                >
                  {job.status === "open" ? "Live" : "Closed"}
                </span>
              </p>
              <p className="mt-0.5 truncate text-sm text-ink-soft">
                {[job.branch, job.country, job.employment_type].filter(Boolean).join(" · ")}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => toggle(job)}
                disabled={busy === job.id}
                title={job.status === "open" ? "Take off the website" : "Put back on the website"}
                className="inline-flex items-center gap-2 rounded-full px-3 py-2 font-ui text-sm text-ink-soft transition hover:bg-off-white hover:text-ink disabled:opacity-50"
              >
                {job.status === "open"
                  ? <><EyeOff aria-hidden className="size-4" /> Close</>
                  : <><Eye aria-hidden className="size-4" /> Reopen</>}
              </button>
              <Link
                href={`/admin/careers/${job.id}`}
                className="inline-flex items-center gap-2 rounded-full px-3 py-2 font-ui text-sm text-ink-soft transition hover:bg-off-white hover:text-ink"
              >
                <Pencil aria-hidden className="size-4" /> Edit
              </Link>
              <button
                type="button"
                onClick={() => remove(job)}
                disabled={busy === job.id}
                aria-label={`Delete ${job.position}`}
                className="inline-flex size-9 items-center justify-center rounded-full text-ink-muted transition hover:bg-[#fdf2f2] hover:text-[#c2410c] disabled:opacity-50 dark:hover:bg-[#2a1618]"
              >
                <Trash2 aria-hidden className="size-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
