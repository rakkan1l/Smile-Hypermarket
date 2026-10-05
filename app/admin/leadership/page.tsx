import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminLeadershipPage() {
  const supabase = await createClient();
  const { data: leaders } = await supabase
    .from("leadership")
    .select("id, name, position, image")
    .order("sort_order");

  return (
    <>
      <header className="mb-8">
        <h1 className="font-display text-4xl tracking-[-0.03em] text-ink">Leadership</h1>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Portraits and profile text for the team shown on the Our Story page.
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(leaders ?? []).map((l) => (
          <li key={l.id}>
            <Link
              href={`/admin/leadership/${l.id}`}
              className="group flex items-center gap-4 rounded-[var(--radius-lg)] border border-line bg-background p-4 transition hover:border-smile-blue"
            >
              <span className="relative size-16 shrink-0 overflow-hidden rounded-full bg-soft-grey">
                {l.image && <Image src={l.image} alt="" fill sizes="64px" className="object-cover" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-ink">{l.name}</span>
                <span className="mt-0.5 block truncate text-sm text-ink-soft">{l.position}</span>
              </span>
              <ChevronRight aria-hidden className="size-5 shrink-0 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-smile-blue" />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
