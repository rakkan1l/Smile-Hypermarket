import Link from "next/link";
import { ArrowRight, Briefcase, Images, Phone, Store, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const cards = [
  { href: "/admin/outlets",    Icon: Store,     title: "Outlets",     blurb: "Photos, galleries, phone numbers, addresses and departments for each store." },
  { href: "/admin/careers",    Icon: Briefcase, title: "Vacancies",   blurb: "Post a new job, edit an existing one, or take a filled role down." },
  { href: "/admin/leadership", Icon: Users,     title: "Leadership",  blurb: "Portraits and profile text for the leadership team." },
  { href: "/admin/images",     Icon: Images,    title: "Site images", blurb: "The home page hero and other brand-wide photography." },
  { href: "/admin/contact",    Icon: Phone,     title: "Contact",     blurb: "Email addresses, office and WhatsApp numbers, and social links." },
];

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ count: outlets }, { count: openJobs }] = await Promise.all([
    supabase.from("outlets").select("*", { count: "exact", head: true }),
    supabase.from("jobs").select("*", { count: "exact", head: true }).eq("status", "open"),
  ]);

  return (
    <>
      <header className="mb-10">
        <h1 className="font-display text-4xl tracking-[-0.03em] text-ink sm:text-5xl">
          Manage your website
        </h1>
        <p className="mt-3 text-ink-soft">
          Signed in as {user?.email}. Changes go live within a few seconds of saving.
        </p>
        <p className="mt-6 flex flex-wrap gap-x-6 gap-y-1 font-ui text-sm text-ink-muted">
          <span>{outlets ?? 0} outlets</span>
          <span>{openJobs ?? 0} vacancies currently advertised</span>
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ href, Icon, title, blurb }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-background p-6 transition hover:border-smile-blue hover:shadow-[var(--shadow-soft)]"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-light-blue text-smile-blue">
                <Icon aria-hidden className="size-5" />
              </span>
              <h2 className="mt-5 text-lg font-semibold tracking-[-0.01em] text-ink">{title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{blurb}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-ui text-sm text-smile-blue">
                Open
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
