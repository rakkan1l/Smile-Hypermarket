import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LeaderEditor } from "@/components/admin/LeaderEditor";

export const dynamic = "force-dynamic";

export default async function EditLeaderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("leadership").select("*").eq("id", id).single();

  if (!data) notFound();

  return (
    <>
      <header className="mb-8">
        <h1 className="font-display text-4xl tracking-[-0.03em] text-ink">{data.name}</h1>
        <p className="mt-3 text-ink-soft">{data.position}</p>
      </header>
      <LeaderEditor initial={data} />
    </>
  );
}
