import { createClient } from "@/lib/supabase/server";
import { ContactEditor } from "@/components/admin/ContactEditor";

export const dynamic = "force-dynamic";

export default async function AdminContactPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_settings").select("*").single();

  if (error || !data) {
    return (
      <p className="rounded-[var(--radius-lg)] border border-line bg-background p-8 text-ink-soft">
        Could not load your contact details. Please refresh the page.
      </p>
    );
  }

  return (
    <>
      <header className="mb-8">
        <h1 className="font-display text-4xl tracking-[-0.03em] text-ink">Contact details</h1>
        <p className="mt-3 max-w-2xl text-ink-soft">
          These appear on the contact page, in the footer, and behind the WhatsApp button.
        </p>
      </header>
      <ContactEditor initial={data} />
    </>
  );
}
