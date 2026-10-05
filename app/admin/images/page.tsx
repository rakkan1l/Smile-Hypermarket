import { createClient } from "@/lib/supabase/server";
import { SiteImagesEditor } from "@/components/admin/SiteImagesEditor";

export const dynamic = "force-dynamic";

export default async function AdminImagesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("hero_image").single();

  return (
    <>
      <header className="mb-8">
        <h1 className="font-display text-4xl tracking-[-0.03em] text-ink">Site images</h1>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Brand-wide photography. Outlet and leadership photos are edited on their own pages.
        </p>
      </header>
      <SiteImagesEditor initial={{ hero_image: data?.hero_image ?? "" }} />
    </>
  );
}
