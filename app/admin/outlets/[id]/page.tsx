import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { OutletEditor } from "@/components/admin/OutletEditor";

export const dynamic = "force-dynamic";

export default async function EditOutletPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("outlets").select("*").eq("id", id).single();

  if (!data) notFound();

  return (
    <>
      <header className="mb-8">
        <h1 className="font-display text-4xl tracking-[-0.03em] text-ink">{data.name}</h1>
        <p className="mt-3 text-ink-soft">{data.city}, {data.country}</p>
      </header>
      <OutletEditor initial={data} />
    </>
  );
}
