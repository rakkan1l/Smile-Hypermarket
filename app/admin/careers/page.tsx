import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { JobsManager } from "@/components/admin/JobsManager";

export const dynamic = "force-dynamic";

export default async function AdminCareersPage() {
  const supabase = await createClient();
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .order("status", { ascending: true })
    .order("sort_order", { ascending: true });

  return (
    <>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl tracking-[-0.03em] text-ink">Vacancies</h1>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Advertised roles appear on the careers page. Close a role to take it down
            without deleting it — you can reopen it later.
          </p>
        </div>
        <Link
          href="/admin/careers/new"
          className="inline-flex items-center gap-2 rounded-full bg-smile-blue px-5 py-2.5 font-ui text-[15px] text-white transition hover:bg-smile-blue-dark"
        >
          <Plus aria-hidden className="size-4" /> Post a vacancy
        </Link>
      </header>

      <JobsManager initial={jobs ?? []} />
    </>
  );
}
