import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminOutletsPage() {
  const supabase = await createClient();
  const { data: outlets } = await supabase
    .from("outlets")
    .select("id, slug, name, city, country, image, gallery, status")
    .order("sort_order");

  return (
    <>
      <header className="mb-8">
        <h1 className="font-display text-4xl tracking-[-0.03em] text-ink">Outlets</h1>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Choose an outlet to change its photos, phone number, address or departments.
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(outlets ?? []).map((o) => (
          <li key={o.id}>
            <Link
              href={`/admin/outlets/${o.id}`}
              className="group block overflow-hidden rounded-[var(--radius-lg)] border border-line bg-background transition hover:border-smile-blue"
            >
              <span className="relative block aspect-[16/10] bg-soft-grey">
                {o.image
                  ? <Image src={o.image} alt="" fill sizes="33vw" className="object-cover" />
                  : <span className="absolute inset-0 grid place-content-center text-sm text-ink-muted">No photo</span>}
                {o.status === "coming-soon" && (
                  <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 font-ui text-[11px] uppercase tracking-wide text-ink-soft">
                    Coming soon
                  </span>
                )}
              </span>
              <span className="flex items-center justify-between gap-3 p-5">
                <span>
                  <span className="block font-medium text-ink">{o.name}</span>
                  <span className="mt-0.5 block text-sm text-ink-soft">
                    {o.city}, {o.country} · {(o.gallery as string[]).length} gallery photos
                  </span>
                </span>
                <ChevronRight aria-hidden className="size-5 shrink-0 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-smile-blue" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
