import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { JobEditor } from "@/components/admin/JobEditor";

export const dynamic = "force-dynamic";

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("jobs").select("*").eq("id", id).single();

  if (!data) notFound();

  return (
    <>
      <header className="mb-8">
        <h1 className="font-display text-4xl tracking-[-0.03em] text-ink">{data.position}</h1>
        <p className="mt-3 text-ink-soft">Edit this vacancy.</p>
      </header>
      <JobEditor initial={data} isNew={false} />
    </>
  );
}
